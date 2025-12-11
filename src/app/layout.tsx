import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hartley Viz Lab",
  description: "Local visualization playground built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <header
          className="relative overflow-hidden border-b-4 border-black/70 bg-white/10 backdrop-blur-xl brutal-noise shadow-[8px_8px_0_rgba(0,0,0,0.65)]"
          style={{ height: "var(--header-height)" }}
        >
          <div className="absolute inset-0 brutal-grid opacity-10 mix-blend-screen pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[hsl(var(--brutal-accent))]/25 via-transparent to-transparent" />
          <div className="container mx-auto flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg border-2 border-black bg-white/80 text-black font-black grid place-items-center shadow-[6px_6px_0_rgba(0,0,0,0.65)]">
                HV
              </div>
              <div className="flex flex-col leading-tight">
                <Link href="/" className="font-semibold text-lg tracking-tight">
                  Hartley Viz Lab
                </Link>
                <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Creative Tech + R3F
                </span>
              </div>
            </div>
            <nav className="flex items-center gap-3 text-sm">
              <Button asChild variant="glass" className="border-black/80 text-black font-semibold">
                <Link href="/viz">Visualizations</Link>
              </Button>
              <Button asChild variant="glass" className="border-white/80 text-white font-semibold">
                <Link href="/admin">Admin</Link>
              </Button>
            </nav>
          </div>
        </header>
        <div
          className="container mx-auto px-4"
          style={{
            paddingTop: "var(--page-vertical-padding)",
            paddingBottom: "var(--page-vertical-padding)",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
