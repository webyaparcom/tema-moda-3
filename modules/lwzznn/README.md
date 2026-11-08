# Sipariş Tamamlandı — `lwzznn` (tema-moda-3)

## Amaç
Sipariş tamamlandı sayfası (PLAN-PRO F3). URL ?no= (+ ?email=) ve MxStore.siparis.son() ile sipariş numarası, kalemler, ara toplam/kargo/toplam, ödeme yöntemi ve durum rozetini gösterir; üye ya da e-posta varsa GET /api/public/siparis/:no ile sunucudan tazeler. Başarı animasyonu, sipariş no kopyalama, Siparişlerim ve alışverişe devam bağlantıları; numara yoksa boş durum.

## Meta
- version: `1.0.0`
- category: `e-commerce`
- icon: `task_alt`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
