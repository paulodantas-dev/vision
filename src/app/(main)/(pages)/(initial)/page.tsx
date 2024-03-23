import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/actions/initial-profile";

export default async function Page() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>oi</div>;
}
