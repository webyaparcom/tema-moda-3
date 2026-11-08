# Hesabım (Pro) — `ul4tvx` (tema-moda-3)

## Amaç
Üye hesap paneli (PLAN-PRO F3). Sol menü: Bilgilerim (MxStore.uye.guncelle → PATCH /api/public/uye/ben), Adreslerim (GET|POST /api/public/uye/adres, PATCH|DELETE /api/public/uye/adres/:id; varsayılan rozeti), Siparişlerim özeti (GET /api/public/siparis), Şifre (POST /api/public/uye/sifre), Çıkış (POST /api/public/uye/cikis). Oturum yoksa desing girisUrl sayfasına ?donus= ile yönlendirir; URL hash (#adreslerim…) ile panel açılır; mobilde menü üstte yatay kaydırmalı.

## Meta
- version: `1.0.0`
- category: `e-commerce`
- icon: `account_circle`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
