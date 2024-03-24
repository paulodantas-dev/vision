"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog-store";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function DeleteServerDialog() {
  const { isOpen, onClose, type, data } = useDialog();
  const router = useRouter();
  const { toast } = useToast();
  const isDialogOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await fetch(`/api/servers/${server?.id}`, {
        method: "DELETE",
        next: {
          tags: ["deleteServer"],
        },
      });

      onClose();
      router.refresh();
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      console.error("SERVER_DIALOG_ERROR", error);
      toast({
        variant: "destructive",
        description: "Failed to kick member",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center tracking-wider">
            Are you sure you want to do this? <br />
            <span className="text-emerald-500 font-semibold">
              {server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="min-w-20"
              variant="primary"
              onClick={onDelete}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
