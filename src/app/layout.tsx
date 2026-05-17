import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--space-grotesk-font",
  display: "swap",
});
//
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
    <html lang="en" className={spaceGrotesk.variable}>
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
