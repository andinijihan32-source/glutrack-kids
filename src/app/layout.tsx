import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/appContext";
import AppShell from "@/components/AppShell";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GLUTRACK KIDS — Kendalikan Gula, Cegah Diabetes Sejak Dini!",
  description:
    "Platform edukasi dan pendampingan pola hidup sehat anak untuk mengontrol konsumsi gula dan mencegah diabetes sejak dini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={nunito.className}>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
