# Ödeme (Demo) — `8deitq` (tema-moda-3)

## Amaç
Statik e-ticaret demosu için SAHTE ödeme adımı: sepet özeti → iletişim/adres formu → ödeme yöntemi (kart / havale / kapıda) → kart formu (Luhn, SKT, CVC; hiçbir kart verisi saklanmaz, gönderilmez, günlüğe yazılmaz) → «3D Secure» SMS simülasyonu (doğru / yanlış / iptal / başarısız dene, failRate) → MxStore.siparis.olustur ile DEMO- numaralı kayıt → sipariş-tamam sayfasına yönlendirme. Üstte kalıcı DEMO uyarısı; TR/EN/AR, Arapçada RTL. API gerekmez.

## Meta
- version: `1.0.0`
- category: `e-commerce`
- tags: odeme, demo, checkout, 3d-secure, luhn, rtl
- icon: `credit_score`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
