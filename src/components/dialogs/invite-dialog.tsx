"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";

import { useDialog } from "@/hooks/use-dialog-store";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InviteModal() {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { onOpen, onClose, isOpen, type, data } = useDialog();
  const { toast } = useToast();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const isDialogOpen = isOpen && type === "invite";

  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/servers/${data.server?.id}/invite-code`,
        {
          method: "PATCH",
          next: {
            tags: ["inviteServer"],
          },
        }
      );

      const result = await response.json();

      onOpen("invite", { server: result });
    } catch (error) {
      console.error(`DIALOG-INVITE: ${error}`);
      toast({
        variant: "destructive",
        description: "Failed to generate a new invite link. Please try again.",
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="uppercase text-xs font-bold">
              Server invite link
            </Label>
            <div className="flex items-center gap-2">
              <Input
                disabled
                className="focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-text"
                value={inviteUrl}
              />
              <Button disabled={isLoading} onClick={onCopy} size="icon">
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-slate-500 w-fit-content self-center"
          >
            {isLoading ? "Generating..." : "Generate a new link"}
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
