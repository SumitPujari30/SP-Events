import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

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
    <html lang="en">
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
