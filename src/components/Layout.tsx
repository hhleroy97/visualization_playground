type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export function Layout({ title, description, children }: LayoutProps) {
  return (
    <main className="relative p-8 md:p-10 space-y-6 max-w-6xl mx-auto">
      <div className="absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(90,240,255,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(255,179,71,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(177,139,255,0.12),transparent_40%)]" />
      </div>
      {(title || description) && (
        <header className="space-y-3">
          {title && <h1 className="text-3xl font-semibold glow-heading">{title}</h1>}
          {description && (
            <p className="text-muted-foreground/90 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
          <div className="edge-divider" />
        </header>
      )}
      <div className="relative z-10 space-y-6">{children}</div>
    </main>
  );
}

