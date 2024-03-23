import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/actions/current-profile";
import { ToggleTheme } from "@/components/toogle/toogle-theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { NavigationAction } from "@/components/navigation/navigation-action";

export async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 py-4 items-center h-full w-full dark:bg-slate-900 bg-slate-50 shadow-md">
      <NavigationAction />
      <Separator className="h-0.5 bg-slate-300 dark:bg-slate-800 rounded-md w-10" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="flex items-center flex-col gap-4 ">
        <ToggleTheme />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-12 w-12",
            },
          }}
        />
      </div>
    </div>
  );
}
