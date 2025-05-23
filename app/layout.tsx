import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import Header from './components/Header';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <MantineProvider>
          <Header />
          <main className="mt-5">{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}