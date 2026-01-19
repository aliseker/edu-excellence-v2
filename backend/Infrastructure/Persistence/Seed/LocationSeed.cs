using EduExcellenceV2.Domain.Entities;
namespace EduExcellenceV2.Infrastructure.Persistence.Seed;

public static class LocationSeed
{
    public static readonly DateTime SeedDate = new(2025, 1, 1);

    public static IEnumerable<CountryEntity> Countries()
    {
        return new List<CountryEntity>
        {
            Country(1, "İngiltere", "ingiltere"),
            Country(2, "Amerika", "amerika"),
            Country(3, "Kanada", "kanada"),
            Country(4, "İrlanda", "irlanda"),
            Country(5, "Malta", "malta"),
            Country(6, "Avustralya", "avustralya"),
            Country(7, "Almanya", "almanya"),
            Country(8, "Fransa", "fransa"),
            Country(9, "İspanya", "ispanya"),
            Country(10, "İtalya", "italya"),
            Country(11, "İsviçre", "isvicre"),
            Country(12, "Polonya", "polonya"),
            Country(13, "Macaristan", "macaristan"),
            Country(14, "Avusturya", "avusturya"),
            Country(15, "Litvanya", "litvanya"),
            Country(16, "Hollanda", "hollanda"),
            Country(17, "İsveç", "isvec"),
            Country(18, "Yeni Zelanda", "yeni-zelanda")
        };
    }

    public static IEnumerable<City> Cities()
    {
        var id = 1;
        City City(string name, int countryId) => new()
        {
            Id = id++,
            Name = name,
            CountryId = countryId,
            CreatedAt = SeedDate
        };

        return new List<City>
        {
            // Ingiltere
            City("Londra", 1),
            City("Manchester", 1),
            City("Birmingham", 1),
            City("Liverpool", 1),
            City("Brighton", 1),

            // Amerika
            City("New York", 2),
            City("Los Angeles", 2),
            City("Boston", 2),
            City("Chicago", 2),
            City("San Francisco", 2),

            // Kanada
            City("Toronto", 3),
            City("Vancouver", 3),
            City("Montreal", 3),
            City("Ottawa", 3),
            City("Calgary", 3),

            // Irlanda
            City("Dublin", 4),
            City("Cork", 4),
            City("Galway", 4),

            // Malta
            City("Valletta", 5),
            City("Sliema", 5),
            City("St. Julian's", 5),

            // Avustralya
            City("Sydney", 6),
            City("Melbourne", 6),
            City("Brisbane", 6),
            City("Perth", 6),

            // Almanya
            City("Berlin", 7),
            City("Munich", 7),
            City("Frankfurt", 7),
            City("Hamburg", 7),

            // Fransa
            City("Paris", 8),
            City("Lyon", 8),
            City("Marseille", 8),
            City("Toulouse", 8),

            // Ispanya
            City("Madrid", 9),
            City("Barcelona", 9),
            City("Valencia", 9),
            City("Sevilla", 9),

            // Italya
            City("Roma", 10),
            City("Milano", 10),
            City("Floransa", 10),
            City("Bolonya", 10),

            // Isvicre
            City("Zurih", 11),
            City("Cenevre", 11),
            City("Lozan", 11),

            // Polonya
            City("Varşova", 12),
            City("Krakow", 12),
            City("Wroclaw", 12),

            // Macaristan
            City("Budapeşte", 13),
            City("Debrecen", 13),

            // Avusturya
            City("Viyana", 14),
            City("Salzburg", 14),
            City("Graz", 14),

            // Litvanya
            City("Vilnius", 15),
            City("Kaunas", 15),

            // Hollanda
            City("Amsterdam", 16),
            City("Rotterdam", 16),
            City("Eindhoven", 16),

            // Isvec
            City("Stockholm", 17),
            City("Gothenburg", 17),

            // Yeni Zelanda
            City("Auckland", 18),
            City("Wellington", 18)
        };
    }

    private static CountryEntity Country(int id, string name, string slug) => new()
    {
        Id = id,
        Name = name,
        Slug = slug,
        IsActive = true,
        CreatedAt = SeedDate
    };
}
