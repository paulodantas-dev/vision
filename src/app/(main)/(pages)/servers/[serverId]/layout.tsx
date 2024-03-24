import { currentProfile } from "@/actions/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerSidebar } from "../_components/server-sidebar";

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
