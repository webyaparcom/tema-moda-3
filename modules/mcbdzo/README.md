# Üye Kayıt (Pro) — `mcbdzo` (tema-moda-3)

## Amaç
Müşteri kayıt modülü (PLAN-PRO F3). MxStore.uye.kayit → POST /api/public/uye/kayit {ad, soyad, email, telefon, sifre, kvkk:true} (201 + mx_uye çerezi). Ad/soyad/e-posta/telefon/şifre + tekrar, şifre güç göstergesi (sunucu şartı: ≥8, harf+rakam), KVKK + üyelik sözleşmesi onayı, just-validate doğrulama, sunucu 'alan' hatası ilgili alanın altına; başarıda ?donus= ya da hesabim.

## Meta
- version: `1.0.0`
- category: `e-commerce`
- icon: `person_add`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
