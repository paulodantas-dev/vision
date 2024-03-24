import { ServerSidebar } from "@/app/(main)/_components/server-sidebar";

interface LayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <section className="h-full">
      <header className="hidden md:flex h-full w-60 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </header>
      <main className="h-full md:pl-60">{children}</main>
    </section>
  );
}
