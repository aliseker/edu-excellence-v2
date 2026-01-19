using EduExcellenceV2.Domain.Entities;
using EduExcellenceV2.Infrastructure.Persistence.Seed;
using Microsoft.EntityFrameworkCore;

namespace EduExcellenceV2.Infrastructure.Persistence.Data;

public class EduExcellenceDbContext : DbContext
{
    public EduExcellenceDbContext(DbContextOptions<EduExcellenceDbContext> options) : base(options)
    {
    }

    public DbSet<LanguageSchool> LanguageSchools => Set<LanguageSchool>();
    public DbSet<SummerSchool> SummerSchools => Set<SummerSchool>();
    public DbSet<University> Universities => Set<University>();
    public DbSet<MasterProgram> MasterPrograms => Set<MasterProgram>();
    public DbSet<CountryEntity> Countries => Set<CountryEntity>();
    public DbSet<City> Cities => Set<City>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CountryEntity>().HasData(LocationSeed.Countries());
        modelBuilder.Entity<City>().HasData(LocationSeed.Cities());

        base.OnModelCreating(modelBuilder);
    }
}
