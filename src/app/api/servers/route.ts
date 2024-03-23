import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { MemberRole } from "@prisma/client";
import { randomUUID } from "crypto";

import { currentProfile } from "@/actions/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: randomUUID(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    revalidateTag("createServer");
    revalidatePath(`/servers/${server.id}`);

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
