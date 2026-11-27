# GLUTRACK KIDS — Full-Stack Production (Next.js + Prisma + Supabase PostgreSQL)

## Langkah Setup Database Supabase & Deploy
1. Ekstrak folder ini dan buka di VS Code.
2. Buka file `.env` dan ganti `[YOUR-DATABASE-PASSWORD]` dengan password database Supabase kamu.
3. Jalankan perintah berikut di Terminal VS Code:
   ```bash
   npm install
   npx prisma db push
   npm run db:seed
   ```
4. Upload ke GitHub (`git init`, `git add .`, `git commit`, `git push`).
5. Import di Vercel, masukkan `DATABASE_URL` dan `JWT_SECRET` di menu **Environment Variables**, lalu klik **Deploy**.
