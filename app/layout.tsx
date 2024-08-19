import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/custom/Navbar";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitness Journal",
  description: "Coded by Cole",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user={session?.user?.name} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}