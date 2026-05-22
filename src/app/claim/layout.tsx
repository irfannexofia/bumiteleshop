export default function ClaimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-lg bg-slate-50 shadow-xl">
      {children}
    </div>
  );
}
