import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanush Accessories | 18k Gold-Plated Everyday Jewelry",
  description: "Discover anti-tarnish, 18k gold-plated everyday jewelry from Sanush Accessories.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
