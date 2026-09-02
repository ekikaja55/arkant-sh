https://squoosh.app

arkant-sh/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Nav.svelte
│   │   │   │   ├── Footer.svelte
│   │   │   │   └── ThemeToggle.svelte
│   │   │   ├── sections/
│   │   │   │   ├── Hero.svelte
│   │   │   │   ├── About.svelte
│   │   │   │   ├── Experience.svelte
│   │   │   │   ├── Projects.svelte
│   │   │   │   └── Contact.svelte
│   │   │   ├── ui/
│   │   │   │   ├── ProjectCard.svelte
│   │   │   │   ├── TimelineItem.svelte
│   │   │   │   ├── Badge.svelte          # status badge (live/wip/archived)
│   │   │   │   ├── LineNumbers.svelte    # scroll-linked line number decor
│   │   │   │   └── TypedText.svelte      # typing effect component
│   │   │   └── three/
│   │   │       ├── WireframeScene.svelte # Threlte canvas wrapper
│   │   │       └── WireframeMesh.svelte
│   │   ├── data/
│   │   │   └── cv.ts                     # data kamu yang sudah ada
│   │   ├── stores/
│   │   │   └── theme.svelte.ts           # kalau butuh state lebih dari mode-watcher
│   │   ├── utils/
│   │   │   ├── animations.ts             # reusable GSAP timeline functions
│   │   │   └── cn.ts                     # clsx + tailwind-merge helper
│   │   └── types/
│   │       └── index.ts                  # Experience, Project, SkillCategory interfaces
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +layout.ts                    # kalau butuh prerender config
│   │   ├── +page.svelte                  # single-page portfolio
│   │   └── projects/
│   │       └── [slug]/
│   │           └── +page.svelte          # optional: detail page per project
│   ├── app.css                           # tailwind import + custom vanilla CSS + theme vars
│   ├── app.html
│   └── app.d.ts
├── static/
│   ├── assets/
│   │   ├── og-image.png
│   │   └── favicon.svg
│   └── fonts/                            # kalau self-host font (recommended buat performa)
├── svelte.config.js
├── vite.config.ts
├── tailwind.config.js                    # opsional di v4, tapi enak buat theme tokens custom
└── package.json


Sebelum bilang "beres", ada beberapa hal yang kita udah bahas tapi belum kamu eksekusi — worth di-checklist biar gak ada yang kelewat:

## Yang mungkin masih perlu dicek/dikerjain

1. **Thumbnail project** — kamu bilang mau isi sendiri nanti, cek apakah sudah ditaruh di `static/assets/` dan path-nya di `cv.ts` udah bener.
2. **`year` di data project** — kita skip dulu waktu itu karena gak ada info pasti, isi kalau relevan.
3. **Mobile nav** — waktu bikin `Nav.svelte`, mobile menu (`sm:hidden`) sengaja belum diisi. Cek apakah nav di layar kecil sekarang kelihatan rapi atau perlu hamburger menu.
4. **Font preload di `app.html`** — pastikan path-nya `InterVariable.woff2` (bukan `Inter-Variable.woff2`) dan JetBrains Mono weight yang dipreload sudah sesuai yang dipakai di atas fold.
5. **Cross-browser & real device check** — semua testing kita based on Firefox desktop. Worth dicoba sekali di Chrome/Safari, dan kalau ada HP beneran, cek performa Threlte scene-nya (WebGL kadang beda perform di device low-end).
6. **Meta tags / SEO dasar** — title, description, OG image, favicon — belum kita sentuh sama sekali. Portfolio biasanya perlu ini minimal buat share link ke rekruter/klien.
7. **Build check** — jalanin `npm run build` sekali sebelum deploy, mastiin gak ada error yang cuma muncul di production build (kadang beda dari dev mode, terutama soal SSR + Threlte/window access).

## Deploy ke Vercel

Setelah semua di atas oke:
```bash
git init
git add .
git commit -m "initial portfolio"
git push  # ke GitHub repo
```
Terus import repo itu di Vercel dashboard — adapter Vercel yang udah kepasang bakal auto-detect settingan build-nya.

---

Mau kita bahas salah satu dari poin di atas dulu (misal meta tags/SEO, atau mobile nav), atau kamu udah cukup pede buat langsung build & deploy duluan terus lihat hasilnya di production?
