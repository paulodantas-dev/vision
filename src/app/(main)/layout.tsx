import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-950 text-slate-950 dark:text-slate-100">
      <div className="hidden md:flex h-full w-20 z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-20 h-full">{children}</main>
    </div>
  );
}
