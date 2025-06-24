# Seviye Tespit

Bu proje, seviyetespit.com.tr için hazırlanmış React SPA'dır.

## Deploy Ayarları

### Netlify
- `netlify.toml` ve `public/_redirects` ile SPA fallback sağlanmıştır.
- `build` komutu: `npm run build`
- Publish dizini: `build`

### Vercel
- `vercel.json` ile SPA fallback sağlanmıştır.
- Proje kökünde `package.json` kullanılarak build yapılır.

## Kullanım
1. `npm install`
2. `npm run build`
3. Netlify: ZIP içindeki build klasörünü deploy et.
4. Vercel: GitHub üzerinden deploy veya CLI ile `vercel --prod`.

