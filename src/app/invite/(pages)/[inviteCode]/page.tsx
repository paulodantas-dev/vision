import { redirectToSignIn } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/actions/current-profile";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

export default async function Page({ params }: InviteCodePageProps) {
  if (!params.inviteCode) {
    return redirect("/");
  }

  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const alreadyBelongsServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (alreadyBelongsServer) {
    return redirect(`/servers/${alreadyBelongsServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return notFound();
}
