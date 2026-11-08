# Adreslerim — `mma4qt` (tema-moda-3)

## Amaç
Müşteri teslimat ve fatura adresleri yönetim modülü. Ev, iş, diğer adres türlerini kaydeder, düzenler ve varsayılan adres seçimi yapar. 3 farklı e-ticaret projesinde sipariş teslimatı için kayıtlı adresleri saklar. Hızlı ödeme akışı için adres seçimi ve düzenleme form popup'ı sunar. PLAN-PRO F3: MxStore varsa GET|POST /api/public/uye/adres + PATCH|DELETE /:id (başlık, ad soyad, telefon, il, ilçe, açık adres, posta kodu, varsayılan) ekle/düzenle formu; oturum yoksa girisUrl sayfasına. Eski dataListWeb yolu MxStore yoksa yedek.

## Meta
- version: `1.1.0`
- category: `e-commerce`
- icon: `location_on`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.jpeg` — önizleme görseli
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
