import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Rivera — Creative Developer & Designer",
  description:
    "Portfolio of Alex Rivera — a creative developer and designer crafting immersive digital experiences with code and design.",
  keywords: ["developer", "designer", "portfolio", "creative", "frontend", "UI/UX"],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera — Creative Developer & Designer",
    description: "Crafting immersive digital experiences with code and design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} font-sans bg-[#0f0f0f] text-white antialiased overflow-x-hidden`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}