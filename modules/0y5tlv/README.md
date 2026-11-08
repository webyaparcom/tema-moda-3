# Login — `0y5tlv` (tema-moda-3)

## Amaç
Giriş ve kayıt modülü (PLAN-PRO F3). Varsayılan MxStore: /api/public/uye/giris + /kayit (mx_uye çerezi, KVKK onayı, donus/nextUrl yönlendirmesi); üyelik kullanılamıyorsa bilgi kutusu. MxStore yüklenmezse eski desing apiBase (https://{{domain}}/api /user /newuser) yolu yedek.

## Meta
- version: `1.1.0`
- category: `login`
- icon: `login`

## Dosyalar
- `back.js` — sunucu tarafı çizim
- `index.html` — şablon
- `index.jpeg` — önizleme görseli
- `index.json` — tanım
- `README.md` — bu belge

## Not
Bu klasör siteye özel kurulum örneğidir; kurulum kaynağı `projeler/webyapar/data/tema/tema-set/icerik/moda-3/spec.js` → `tema-set/araclar/demo-kur.js` (webmaker uçları). Burası elle değiştirilmez; değişiklik spec'te yapılıp yeniden kurulur.
