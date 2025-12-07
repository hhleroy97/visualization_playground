type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export function Layout({ title, description, children }: LayoutProps) {
  return (
    <main className="p-8 space-y-4 max-w-6xl mx-auto">
      {(title || description) && (
        <header className="space-y-2">
          {title && <h1 className="text-2xl font-semibold">{title}</h1>}
          {description && <p className="text-gray-700 max-w-3xl">{description}</p>}
        </header>
      )}
      {children}
    </main>
  );
}

