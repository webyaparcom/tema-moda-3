# Siparişlerim (Pro) — `5ic48z` (tema-moda-3)

## Amaç
Sipariş geçmişi (PLAN-PRO F3). Üyede MxStore.siparis.listem → GET /api/public/siparis?sayfa= (sayfalama) ve açılır detay MxStore.siparis.detay → GET /api/public/siparis/:no: kalemler, ara toplam/kargo/toplam, adres, ödeme yöntemi, mx-stepper durum ilerlemesi (beklemede→onaylandı→hazırlanıyor→kargoda→teslim; iptal uyarısı). Misafirde / üyelik kullanılamıyorsa mxOrdersV1 yerel geçmişi + sipariş no + e-posta sorgusu (?email=).

## Meta
- version: `1.0.0`
- category: `e-commerce`
- icon: `receipt_long`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
