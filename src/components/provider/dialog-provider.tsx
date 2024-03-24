"use client";

import { useEffect, useState } from "react";

import { CreateServerDialog } from "@/components/dialogs/create-server-dialog";
import { InviteModal } from "@/components/dialogs/invite-dialog";
import { EditServerDialog } from "@/components/dialogs/edit-server-dialog";
import { EditMembersDialog } from "@/components/dialogs/edit-members-dialog";
import { CreateChannelDialog } from "@/components/dialogs/create-channel-dialog";
import { LeaveServerDialog } from "@/components/dialogs/leave-server-dialog";
import { DeleteServerDialog } from "@/components/dialogs/delete-server-dialog";

//provide  hydration error for the modal
export function ModalProvider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <InviteModal />
      <CreateServerDialog />
      <EditServerDialog />
      <LeaveServerDialog />
      <DeleteServerDialog />
      <CreateChannelDialog />
      <EditMembersDialog />
    </>
  );
}
