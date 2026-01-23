import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/nav/nav-bar";
import { authClient } from "@/lib/auth/client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova - Smart Living",
  description: "Your gateway to intelligent home management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NeonAuthUIProvider
          authClient={authClient}
          redirectTo="/dashboard" // Redirect to dashboard after login
          emailOTP // OTP option
        >
          <NavBar />
          <main className="flex-1">{children}</main>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
