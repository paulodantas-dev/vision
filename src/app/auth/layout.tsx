interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center p-2 bg-gradient-to-br dark:from-neutral-900 dark:via-slate-800 dark:to-neutral-900 from-neutral-200 via-slate-400 to-neutral-200">
      {children}
    </div>
  );
}
