# Ödeme Pro — `ptanbd` (tema-moda-3)

## Amaç
Profesyonel 3 adımlı ödeme (PLAN-PRO F3): Bilgiler/Adres → Ödeme yöntemi (kapıda / havale) → Onay. Üye ise kayıtlı adres seçimi + yeni adres (isteğe bağlı adres defterine kaydetme), misafir ise misafir formu + giriş bağlantısı. MxStore.siparis.olustur ile POST /api/public/siparis (fiyat sunucuda); başarıda siparis-tamam sayfasına no ile geçer, sepet temizlenir. Sunucu alan hatası ilgili adıma döner. API yoksa (statik yayın) desing.number doluysa WhatsApp + mxOrdersV1 yedeği; o da yoksa kapalı uyarısı.

## Meta
- version: `1.0.0`
- category: `e-commerce`
- icon: `payments`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
