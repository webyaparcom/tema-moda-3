# Üye Girişi (Pro) — `e99pku` (tema-moda-3)

## Amaç
Müşteri giriş modülü (PLAN-PRO F3). MxStore.uye.giris → POST /api/public/uye/giris (mx_uye çerezi); Giriş | Üye ol sekmeleri, şifre göster/gizle, şifremi unuttum bağlantısı, just-validate doğrulama, sunucu hata mesajları (401/429), zaten girişliyse Hesabım kartı, üyelik kullanılamıyorsa bilgi kutusu. Başarıda ?donus= yoluna ya da hesabim sayfasına yönlendirir.

## Meta
- version: `1.0.0`
- category: `e-commerce`
- icon: `login`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
