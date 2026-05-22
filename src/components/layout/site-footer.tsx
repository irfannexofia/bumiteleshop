export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} Bumitele Shop. All rights reserved.</p>
        <p>Built with Next.js, Drizzle, and Neon on Vercel.</p>
      </div>
    </footer>
  );
}
