import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "RESUME.AI | Build your resume, your way",
  description: "AI-powered resume builder with drag-and-drop canvas and Gemini suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

