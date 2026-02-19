using System.Threading.RateLimiting;
using System.Text;
using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using EduExcellenceV2.Infrastructure.Persistence.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EduExcellenceDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ILanguageSchoolService, LanguageSchoolService>();
builder.Services.AddScoped<ISummerSchoolService, SummerSchoolService>();
builder.Services.AddScoped<IUniversityService, UniversityService>();
builder.Services.AddScoped<IMasterProgramService, MasterProgramService>();
builder.Services.AddScoped<IInternshipProgramService, InternshipProgramService>();
builder.Services.AddScoped<IHighSchoolService, HighSchoolService>();
builder.Services.AddScoped<IVisaService, VisaService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IBlogPostService, BlogPostService>();
builder.Services.AddScoped<IGalleryService, GalleryService>();
builder.Services.AddScoped<ITestimonialService, TestimonialService>();
builder.Services.AddScoped<IFaqService, FaqService>();
builder.Services.AddScoped<ISiteSettingsService, SiteSettingsService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IErasmusPageService, ErasmusPageService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured");
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "EduExcellence";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "EduExcellence";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = true,
        ValidAudience = jwtAudience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// Login rate limiting: IP başına dakikada 5 deneme (brute force koruması)
builder.Services.AddRateLimiter(options =>
{
    options.AddPolicy("LoginPolicy", context =>
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? context.Request.Headers["X-Forwarded-For"].FirstOrDefault() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateLimiterOptions
        {
            Window = TimeSpan.FromMinutes(1),
            PermitLimit = 5,
            QueueLimit = 0
        });
    });
    options.AddPolicy("ContactPolicy", context =>
    {
        var ip = context.Connection.RemoteIpAddress?.ToString() ?? context.Request.Headers["X-Forwarded-For"].FirstOrDefault() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(ip, _ => new FixedWindowRateLimiterOptions
        {
            Window = TimeSpan.FromMinutes(1),
            PermitLimit = 5,
            QueueLimit = 0
        });
    });
    options.RejectionStatusCode = 429;
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalFrontend", policy =>
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapGet("/", () => Results.Redirect("/swagger"));
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("LocalFrontend"); // CORS, rate limiter'dan önce olmalı ki 429 yanıtı da CORS header alsın
app.UseRateLimiter();
// Ülke bayrakları: /uploads/flags/* -> ContentRoot/uploads/flags
var uploadsPath = Path.Combine(app.Environment.ContentRootPath, "uploads");
Directory.CreateDirectory(Path.Combine(uploadsPath, "flags"));
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
