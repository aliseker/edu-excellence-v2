# Edu Excellence V2 Backend API

Clean Architecture (Onion Architecture) ile geliştirilmiş .NET 8 Web API projesi.

## Proje Yapısı

```
backend/
├── EduExcellenceV2.Domain/          # Domain Layer (Entities)
├── EduExcellenceV2.Application/     # Application Layer (DTOs, Interfaces, Services)
├── EduExcellenceV2.Infrastructure/ # Infrastructure Layer (Data Access, Repositories)
└── EduExcellenceV2.API/            # Presentation Layer (Controllers, API)
```

## Teknolojiler

- .NET 8.0
- Entity Framework Core 8.0
- SQL Server
- JWT Authentication
- BCrypt (Password Hashing)
- Swagger/OpenAPI

## Database

- **Database Name:** EduExcellenceV2Db
- **User:** owner
- **Password:** Owner123*v1

## Varsayılan Admin Kullanıcı

İlk çalıştırmada otomatik oluşturulur:
- **Email:** admin@eduexcellence.com.tr
- **Password:** Admin123!

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin girişi
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi (Authorize gerekli)

### Blog Management (Authorize gerekli)
- `GET /api/blog` - Tüm blogları listele
- `GET /api/blog/{id}` - Blog detayı
- `POST /api/blog` - Yeni blog ekle
- `PUT /api/blog/{id}` - Blog güncelle
- `DELETE /api/blog/{id}` - Blog sil

### Dil Okulu Management (Authorize gerekli)
- `GET /api/dilokulu` - Tüm dil okullarını listele
- `GET /api/dilokulu/{id}` - Dil okulu detayı
- `POST /api/dilokulu` - Yeni dil okulu ekle
- `PUT /api/dilokulu/{id}` - Dil okulu güncelle
- `DELETE /api/dilokulu/{id}` - Dil okulu sil

## Çalıştırma

1. Database bağlantı stringini `appsettings.json` dosyasında kontrol edin
2. Projeyi çalıştırın:
   ```bash
   cd EduExcellenceV2.API
   dotnet run
   ```
3. Swagger UI: `https://localhost:7166/swagger` (veya belirtilen port)

## Migration

Migration'lar otomatik olarak uygulanır. Manuel migration için:

```bash
cd EduExcellenceV2.Infrastructure
dotnet ef migrations add MigrationName --startup-project ../EduExcellenceV2.API
dotnet ef database update --startup-project ../EduExcellenceV2.API
```

## Güvenlik

- JWT Token Authentication
- BCrypt ile şifre hashleme
- Authorize attribute ile endpoint koruması
- CORS yapılandırması
