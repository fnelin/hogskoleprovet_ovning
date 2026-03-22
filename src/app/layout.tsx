import type { Metadata } from "next";
import { Nunito, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import Sidhuvud from "@/components/ui/header";
import Sidfot from "@/components/ui/footer";


const nunitoSans = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Högskoleprepp",
  description: "En sida för att hitta övningsuppgifter till högskoleprovet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${nunitoSans.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Sidhuvud />
        <main>{children}</main>
        <Sidfot />
      </body>
    </html>
  );
}
