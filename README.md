# Edu-Excellence v2

Modern yurtdışı eğitim danışmanlık platformu. React 19.2.1 ve Next.js 16.0.10 ile geliştirilmiştir.

## 🚀 Teknolojiler

- **Next.js** 16.0.10
- **React** 19.2.3
- **TypeScript**
- **Tailwind CSS** 4
- **App Router**

## 📋 Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables

`.env.local` dosyası oluşturun:

```bash
cp .env.local.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Development Server

```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
edu-excellence-v2/
├── app/                    # Next.js App Router sayfaları
│   ├── page.tsx           # Ana sayfa
│   ├── universite/         # Üniversite sayfaları
│   ├── dil-okulu/         # Dil okulu sayfaları
│   ├── yaz-okulu/         # Yaz okulu sayfaları
│   ├── lise/              # Lise sayfaları
│   ├── master-mba/        # Master/MBA sayfaları
│   ├── vize/              # Vize sayfaları
│   ├── iletisim/          # İletişim sayfası
│   ├── hakkimizda/        # Hakkımızda sayfası
│   └── blog/              # Blog sayfaları
├── components/            # React bileşenleri
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── UniversityFilter.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   └── SearchBar.tsx
├── services/              # API servisleri
│   └── api.ts
├── config/                # Konfigürasyon dosyaları
│   └── api.ts
└── public/                # Statik dosyalar
```

## 🎨 Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Üniversite filtreleme sistemi
- ✅ Ülke bazlı dropdown menüler
- ✅ Arama fonksiyonu
- ✅ İletişim formu
- ✅ Blog sistemi
- ✅ API entegrasyonu hazır

## 🔧 Build

```bash
npm run build
npm start
```

## 📝 Notlar

- Backend API entegrasyonu için `services/api.ts` dosyasını kullanın
- Admin paneli backend'den sonra eklenecek
- Tüm veriler şu an mock data olarak çalışıyor

## 📄 Lisans

Bu proje özel bir projedir.
