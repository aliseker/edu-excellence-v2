using EduExcellenceV2.Application.Interfaces;
using EduExcellenceV2.Infrastructure.Persistence.Data;
using EduExcellenceV2.Infrastructure.Persistence.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EduExcellenceDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ILanguageSchoolService, LanguageSchoolService>();
builder.Services.AddScoped<ISummerSchoolService, SummerSchoolService>();
builder.Services.AddScoped<IUniversityService, UniversityService>();
builder.Services.AddScoped<IMasterProgramService, MasterProgramService>();
builder.Services.AddScoped<IInternshipProgramService, InternshipProgramService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddControllers();
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
app.UseCors("LocalFrontend");
app.MapControllers();
app.Run();
