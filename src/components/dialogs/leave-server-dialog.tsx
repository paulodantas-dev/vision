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
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

export function LeaveServerDialog() {
  const { isOpen, onClose, type, data } = useDialog();
  const router = useRouter();
  const { toast } = useToast();

  const isDialogpen = isOpen && type === "leaveServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onLeave = async () => {
    try {
      setIsLoading(true);

      await fetch(`/api/servers/${server?.id}/leave`, {
        method: "POST",
        next: {
          tags: ["leaveServer"],
        },
      });

      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("[SERVER_LEAVE_ERROR]", error);
      toast({
        variant: "destructive",
        description: "Failed to leave server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center tracking-wider">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-emerald-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="primary"
              className="min-w-20"
              onClick={onLeave}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
