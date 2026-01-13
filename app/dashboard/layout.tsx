export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen bg-slate-50">{children}</section>;
}
