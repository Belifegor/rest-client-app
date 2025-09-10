import "@/app/globals.css";
import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = { title: "REST Client", description: "Mini Postman on Next.js" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gray-900 text-white antialiased">
        <NextIntlClientProvider>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
