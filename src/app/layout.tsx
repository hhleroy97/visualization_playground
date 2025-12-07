import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hartley Viz Lab",
  description: "Local visualization playground built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <header className="border-b bg-card/60 backdrop-blur">
          <div className="container mx-auto flex items-center justify-between py-4 px-4">
            <Link href="/" className="font-semibold text-lg">
              Hartley Viz Lab
            </Link>
            <nav className="space-x-4 text-sm text-muted-foreground">
              <Link href="/viz" className="hover:text-foreground">
                Visualizations
              </Link>
              <Link href="/admin" className="hover:text-foreground">
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
