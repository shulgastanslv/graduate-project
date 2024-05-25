import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import type { AppProps } from 'next/app';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import { DefaultSeo } from 'next-seo';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corp Net Cast",
  description: "Web application for remote work of IT company employees",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
          >
            <Toaster theme="light" position='bottom-center'/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
