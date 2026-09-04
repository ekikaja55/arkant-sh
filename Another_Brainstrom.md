Hammersmith-One font
Oke, banyak yang mau dibahas. Aku pecah satu-satu biar jelas.

## Auth: Google OAuth nambah kompleksitas gak?

Justru **sebaliknya** — Google OAuth itu biasanya *mengurangi* kompleksitas dibanding bikin auth manual (email+password), karena:
- Gak perlu handle password hashing, reset password flow, verifikasi email
- Supabase Auth atau **Auth.js (NextAuth, tapi juga support SvelteKit)** udah nyediain Google provider tinggal pasang
- User experience-nya juga lebih ringan buat pembeli casual yang males daftar

Kompleksitas nambah kalau kamu butuh **role-based access** (artist vs buyer vs admin) di atas OAuth itu — tapi itu memang perlu ada regardless dari metode auth apa pun, jadi bukan "biaya tambahan" dari Google-nya.

**Saranku:** pakai Supabase Auth (kalau kamu pilih Supabase sebagai DB juga) dengan Google provider + email magic link sebagai fallback. Ini kombo paling minim maintenance buat solo dev.

## Level 2 section-builder — masih possible?

Ya, **masih realistis**, dengan catatan scope-nya dijaga:
- Kamu define **daftar komponen fix** (Hero, Gallery Grid, About, Shop Grid, Testimonial, Contact/WA button) — bukan bikin komponen arbitrary
- Artist pilih komponen mana yang dipakai + urutannya (drag reorder pakai library kayak `svelte-dnd-action`, itu udah lumayan matang buat Svelte)
- Tiap komponen punya *pengaturan terbatas* (warna aksen, jumlah kolom, dsb) — bukan freeform styling

Effort ini jauh lebih terkendali daripada true canvas builder karena kamu gak perlu handle positioning bebas, cuma reorder + toggle + konfigurasi terbatas per komponen. Ini kerjaan yang solo dev bisa selesaikan dalam hitungan minggu, bukan bulan.

## Payment: 3 pendekatan kamu

Ini analisisnya:

**1. Payment gateway (Midtrans, Xendit, dll)**
Paling aman dan scalable, tapi ada biaya integrasi (verifikasi bisnis, kadang perlu PT/badan usaha untuk beberapa gateway lokal Indonesia) dan effort dev lumayan (webhook handling, status transaksi, dll). Untuk MVP solo project, ini **overkill di awal**.

**2. Manual (simpan rekening/QRIS artist, konfirmasi via WA)**
Dari sisi kompleksitas dev ini paling ringan — bener kata kamu, "kita cuma nempelin metode pembayaran, sisanya urus sendiri."

Tapi soal keamanan nomor rekening: ini bukan soal "aman/gak aman" secara teknis (nomor rekening bukan credential rahasia, gak bisa dipakai buat curi uang orang), tapi lebih ke **privasi dan trust**. Beberapa hal yang perlu kamu pikirkan:
- Nomor rekening artist sebaiknya cuma visible ke buyer yang udah checkout/order (bukan public di showcase page), biar gak discrape sembarangan
- Kamu (sebagai platform) gak pegang liability soal transaksi — ini harus jelas di ToS kalau nanti ada, karena kalau ada penipuan (artist gak kirim barang, atau buyer klaim udah bayar padahal belum) kamu jadi pihak yang harus jawab ke user meski platform gak megang uangnya

**3. Semi-manual (upload bukti bayar → dashboard → notif WA)**
Ini **titik manis** buat kamu sekarang — better UX daripada opsi 2 karena ada jejak transaksi yang tercatat (histori order, status pending/paid/completed), tapi kompleksitas dev-nya masih jauh di bawah payment gateway. Kamu cuma butuh:
- Tabel `orders` dengan status enum (pending, proof_uploaded, confirmed, completed)
- Upload bukti bayar ke storage (Vercel Blob atau Supabase Storage)
- Trigger notif ke WA artist (bisa pakai WA Business API atau sekadar `wa.me` link kayak yang dipakai di web Cho)

**Rekomendasiku: mulai dari opsi 3.** Ini kasih value tambahan dibanding sekadar "nempel rekening" (ada tracking, ada histori, kesan lebih profesional/marketplace) tapi gak butuh effort integrasi payment gateway yang berat di awal. Nanti kalau platform udah jalan dan butuh scale, baru migrasi ke opsi 1.

---

Balik ke soal DB tadi — dengan kamu udah condong ke Supabase Auth, ini otomatis ngarah ke pakai **Supabase sebagai DB juga** (Postgres + Auth + Storage jadi satu ekosistem, sekalian buat nyimpen bukti bayar di step 3 tadi). Ini ngurangin jumlah service yang perlu kamu maintain sebagai solo dev. Kalau dipasangkan sama **Drizzle ORM**, itu ringan dan type-safe banget buat SvelteKit.

Gimana, mau lanjut bahas struktur data (skema tabel: artists, showcases, orders, products) atau masih ada bagian konsep lain yang mau digali dulu?
