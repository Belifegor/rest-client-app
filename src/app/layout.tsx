import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "REST Client", description: "Mini Postman on Next.js" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
