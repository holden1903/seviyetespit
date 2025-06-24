# Seviye Tespit

Bu proje, **seviyetespit.com.tr** için geliştirilmiş bir İngilizce seviye tespit uygulamasıdır.

## Özellikler
- 25 soruluk seviye tespit testi (A1–C1)
- Test sonuçlarını Firebase Firestore'da kaydetme
- Admin panel üzerinden sonuçların listelenmesi
- Firebase Authentication ile admin girişi (login)
- Test sonucu PDF olarak indirme (Türkçe karakter destekli)
- Responsive ve modern tasarım
- Logo eklenmiş başlık alanı

## Kurulum

1. Depoyu klonla veya zip'ten çıkar.
2. Proje klasörüne git:
   ```bash
   cd seviyetespit-github-ready
   ```
3. Gerekli paketleri yükle:
   ```bash
   npm install
   ```
4. Uygulamayı başlat:
   ```bash
   npm start
   ```
   Tarayıcıda `http://localhost:3000` adresine gidin.

## Firebase Ayarları

1. Firebase Console'da yeni proje oluşturun.
2. Firestore Database ve Authentication (Email/Password) ekleyin.
3. `src/firebase.js` dosyasındaki `firebaseConfig` alanını kendi projenize göre güncelleyin.

## Deploy

### Netlify / Vercel (Önerilen)
1. Projeyi GitHub'a pushlayın.
2. Netlify veya Vercel hesabınıza bağlayın.
3. Build komutu: `npm run build`, Publish klasörü: `build`.
4. Deploy edin.

### GitHub Pages (Alternatif)
1. `package.json` içine `"homepage": "https://<kullanıcı_adı>.github.io/seviyetespit"` ekleyin.
2. `npm install --save-dev gh-pages`
3. `scripts` bölümüne:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. `npm run deploy` komutunu çalıştırın.
5. GitHub sayfasından Pages ayarlarını `gh-pages` branch'ine yönlendirin.
