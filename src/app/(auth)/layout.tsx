interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-100">
      {children}
    </div>
  );
}
