"use client";

import { useEffect, useState } from "react";

import { CreateServerDialog } from "@/components/dialogs/create-server-dialog";

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
      <CreateServerDialog />
    </>
  );
}
