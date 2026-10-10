import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4E Imóveis · Apresentação Comercial Executiva",
  description: "Atendimento Imediato & Gestão de Plantão Imobiliário em Curitiba e RMC",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#07090e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased bg-[#07090e] text-[#f1f5f9] min-h-screen">
        {children}
      </body>
    </html>
  );
}
