import type { Metadata } from "next";
import { Italiana, Cormorant_Garamond, Lato, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--heading-font",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--tagline-font",
  display: "swap",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--body-font",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--accent-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The SP Events | Creating Magical Experiences",
  description:
    "The SP Events is a premier event management company specializing in creating unforgettable brand experiences through creativity, innovation, and flawless execution.",
  keywords: [
    "event management",
    "corporate events",
    "brand experiences",
    "exhibitions",
    "product launches",
    "virtual events",
    "award ceremonies",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${italiana.variable} ${cormorant.variable} ${lato.variable} ${libreBaskerville.variable}`}>
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
