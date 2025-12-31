# Edu-Excellence v2

Modern yurtdışı eğitim danışmanlık platformu. React 19.2.3 ve Next.js 16.0.10 ile geliştirilmiştir.

## 🚀 Teknolojiler

- **Next.js** 16.0.10
- **React** 19.2.3
- **TypeScript**
- **Tailwind CSS** 4
- **App Router**

## 📁 Proje Yapısı

```
edu-excellence-v2/
├── frontend/              # Next.js frontend uygulaması
│   ├── app/              # Next.js App Router sayfaları
│   ├── components/       # React bileşenleri
│   ├── services/         # API servisleri
│   ├── config/           # Konfigürasyon dosyaları
│   ├── utils/            # Utility fonksiyonları
│   └── public/           # Statik dosyalar
└── backend/              # Backend API (ileride eklenecek)
```

## 📋 Kurulum

### Frontend

```bash
cd frontend
npm install
```

### Environment Variables

`frontend/.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development Server

```bash
cd frontend
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

### Backend

Backend henüz eklenmedi. İleride buraya eklenecek.

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
cd frontend
npm run build
npm start
```

## 📝 Notlar

- Backend API entegrasyonu için `frontend/services/api.ts` dosyasını kullanın
- Admin paneli backend'den sonra eklenecek
- Tüm veriler şu an mock data olarak çalışıyor

## 📄 Lisans

Bu proje özel bir projedir.
