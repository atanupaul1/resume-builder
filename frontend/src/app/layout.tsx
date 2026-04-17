import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV.io | Build your resume, your way",
  description: "Resume builder with drag-and-drop editing, template selection, and PDF export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

