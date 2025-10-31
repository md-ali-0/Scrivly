import "@/src/styles.css";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Scrivly Editor",
  description: "A beautiful, minimal rich text editor for React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
