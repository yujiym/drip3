import localFont from "next/font/local";
import { Inter } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import Providers from "./providers";
import type { Metadata } from "next";
import "./globals.css";

const matrixSans = localFont({
  src: "../assets/MatrixSans-Regular.ttf",
  variable: "--font-matrix-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "drip3",
  description: "Sell anything, build community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${matrixSans.variable}`}>
        <Providers>
          <LoadingScreen />
          {children}
        </Providers>
      </body>
    </html>
  );
}
