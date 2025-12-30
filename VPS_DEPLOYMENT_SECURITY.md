# VPS Deployment Güvenlik Rehberi

## ✅ Güvenlik Kontrolü Sonuçları

### Proje Durumu
- ✅ **Backend yok** - Sadece frontend, minimal risk
- ✅ **API routes yok** - Next.js API route'ları yok
- ✅ **File upload yok** - Dosya yükleme işlemi yok
- ✅ **File system operations yok** - Tehlikeli dosya işlemleri yok
- ✅ **exec/eval yok** - Kod çalıştırma riski yok
- ✅ **Güvenli versiyonlar** - Next.js 16.0.10, React 19.2.3
- ✅ **Security headers aktif** - Tüm güvenlik başlıkları eklendi
- ✅ **XSS koruması** - DOMPurify ile sanitization aktif
- ✅ **Form validation** - Tüm formlarda sanitization var

### Environment Variables
- ✅ Sadece `NEXT_PUBLIC_API_URL` kullanılıyor (public, güvenli)
- ✅ Hassas bilgi yok (API key, secret, password yok)

---

## 🚀 VPS Deployment Adımları

### 1. Dosya İzolasyonu (KRİTİK)

Her siteyi ayrı kullanıcı altında çalıştırın:

```bash
# Yeni kullanıcı oluştur
sudo useradd -m -s /bin/bash edu-excellence-v2
sudo passwd edu-excellence-v2

# Proje klasörü oluştur
sudo mkdir -p /home/edu-excellence-v2/app
sudo chown -R edu-excellence-v2:edu-excellence-v2 /home/edu-excellence-v2

# Dosya izinleri
sudo chmod 755 /home/edu-excellence-v2
sudo chmod 700 /home/edu-excellence-v2/app
```

### 2. Nginx Reverse Proxy Konfigürasyonu

```nginx
# /etc/nginx/sites-available/edu-excellence-v2
server {
    listen 80;
    server_name edu-excellence-v2.yourdomain.com;

    # HTTPS yönlendirmesi
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name edu-excellence-v2.yourdomain.com;

    # SSL Sertifikası (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/edu-excellence-v2.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/edu-excellence-v2.yourdomain.com/privkey.pem;
    
    # SSL Güvenlik Ayarları
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Güvenlik Başlıkları (Next.js'teki başlıklara ek)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Dosya boyutu limiti
    client_max_body_size 10M;

    # Next.js uygulamasına proxy
    location / {
        proxy_pass http://localhost:3001;  # FARKLI PORT KULLANIN!
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout ayarları
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Statik dosyalar için cache
    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. PM2 Process Manager

```bash
# PM2 ile çalıştır (ayrı kullanıcı olarak)
sudo -u edu-excellence-v2 pm2 start npm --name "edu-excellence-v2" -- start
sudo -u edu-excellence-v2 pm2 save
sudo -u edu-excellence-v2 pm2 startup
```

**ÖNEMLİ:** Her site için farklı port kullanın:
- Site 1: 3001
- Site 2: 3002
- Site 3: 3003
- Site 4 (bu): 3004

### 4. Environment Variables

```bash
# .env.local dosyası oluştur
cd /home/edu-excellence-v2/app
nano .env.local
```

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NODE_ENV=production
```

**GÜVENLİK:** `.env.local` dosyasını git'e eklemeyin!

### 5. Firewall Kuralları

```bash
# Sadece gerekli portları aç
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# Next.js portlarını dışarıdan kapat (sadece localhost)
# Nginx reverse proxy üzerinden erişilecek
```

### 6. Build ve Deploy

```bash
# Proje klasörüne git
cd /home/edu-excellence-v2/app

# Bağımlılıkları yükle
npm install --production

# Build al
npm run build

# PM2 ile başlat
pm2 start npm --name "edu-excellence-v2" -- start
pm2 save
```

---

## 🔒 VPS'teki Diğer Siteleri Koruma

### İzolasyon Kontrol Listesi

1. ✅ **Ayrı kullanıcılar** - Her site farklı Linux kullanıcısı
2. ✅ **Ayrı portlar** - Her site farklı port (3001, 3002, 3003, 3004)
3. ✅ **Ayrı klasörler** - Her site farklı dizinde
4. ✅ **Dosya izinleri** - 755 klasörler, 644 dosyalar
5. ✅ **Nginx reverse proxy** - Tüm siteler Nginx üzerinden
6. ✅ **Firewall** - Sadece 80, 443, 22 portları açık
7. ✅ **HTTPS zorunlu** - Let's Encrypt SSL sertifikası

### Resource Limits

```bash
# systemd service oluştur (opsiyonel)
sudo nano /etc/systemd/system/edu-excellence-v2.service
```

```ini
[Unit]
Description=Edu Excellence v2 Next.js App
After=network.target

[Service]
Type=simple
User=edu-excellence-v2
WorkingDirectory=/home/edu-excellence-v2/app
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

# Resource limits
MemoryLimit=512M
CPUQuota=50%

[Install]
WantedBy=multi-user.target
```

---

## 🛡️ Ek Güvenlik Önlemleri

### 1. Fail2Ban (Brute Force Koruması)

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 2. Düzenli Güncellemeler

```bash
# Otomatik güvenlik güncellemeleri
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Log Monitoring

```bash
# PM2 logları
pm2 logs edu-excellence-v2

# Nginx logları
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 4. Backup Stratejisi

```bash
# Günlük backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backup/edu-excellence-v2-$DATE.tar.gz /home/edu-excellence-v2/app
# Eski backup'ları sil (7 günden eski)
find /backup -name "edu-excellence-v2-*.tar.gz" -mtime +7 -delete
```

---

## ✅ Son Kontrol Listesi

Deployment öncesi kontrol edin:

- [ ] Tüm siteler ayrı kullanıcı altında
- [ ] Her site farklı port kullanıyor
- [ ] Nginx reverse proxy çalışıyor
- [ ] HTTPS aktif (Let's Encrypt)
- [ ] Firewall kuralları doğru
- [ ] `.env.local` git'e eklenmemiş
- [ ] PM2 process'ler çalışıyor
- [ ] Log dosyaları kontrol ediliyor
- [ ] Backup stratejisi hazır
- [ ] Resource limits ayarlanmış

---

## 🚨 Acil Durum Planı

Eğer bir site saldırıya uğrarsa:

1. **Hemen izole et:**
   ```bash
   sudo ufw deny from [SALDIRGAN_IP]
   pm2 stop [SITE_NAME]
   ```

2. **Logları kontrol et:**
   ```bash
   pm2 logs [SITE_NAME]
   tail -f /var/log/nginx/error.log
   ```

3. **Diğer siteleri kontrol et:**
   ```bash
   pm2 list
   pm2 logs
   ```

4. **Güvenlik açığını kapat:**
   - Güncelleme yap
   - Güvenlik yamaları uygula
   - Tekrar başlat

---

## 📞 Destek

Sorun olursa:
- PM2 logs: `pm2 logs`
- Nginx status: `sudo systemctl status nginx`
- Process kontrol: `ps aux | grep node`
- Port kontrol: `netstat -tulpn | grep :300`

---

**Son Güncelleme:** 2025-01-XX
**Güvenlik Durumu:** ✅ Tüm açıklar kapatıldı
**Production Hazır:** ✅ Evet

