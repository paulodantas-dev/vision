"use client";

import qs from "query-string";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useState } from "react";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/hooks/use-dialog-store";
import { UserAvatar } from "@/components/avatars/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4  text-emerald-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
};

export function EditMembersDialog() {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useDialog();
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState("");

  const { server } = data as {
    server: Server & {
      members: (Member & { profile: Profile })[];
    };
  };

  const isDialogOpen = isOpen && type === "members";

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: data.server?.id,
        },
      });

      const response = await fetch(url, {
        method: "DELETE",
        next: {
          tags: ["deleteMembers"],
        },
      });

      const result = await response.json();

      router.refresh();
      onOpen("members", { server: result });
    } catch (error) {
      console.error("MEMBERS_DIALOG_ERROR", error);
      toast({
        variant: "destructive",
        description: "Failed to kick member",
      });
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: data.server?.id,
        },
      });

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
        next: {
          tags: ["editMembers"],
        },
      });

      const result = await response.json();

      router.refresh();
      onOpen("members", { server: result });
    } catch (error) {
      console.error("MEMBERS_DIALOG_ERROR", error);
      toast({
        variant: "destructive",
        description: "Failed to change role",
      });
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center tracking-wider">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className=" max-h-96 ">
          {server?.members?.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-2">
                <UserAvatar src={member.profile.imageUrl} />
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-semibold flex items-center gap-2">
                    {member.profile.name}
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-slate-600">
                    {member.profile.email}
                  </p>
                </div>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 dark:text-slate-100 text-slate-950 mr-2" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center gap-2">
                          <ShieldQuestion className="w-4 h-4 " />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => onRoleChange(member.id, "GUEST")}
                            >
                              <Shield className="h-4 w-4" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="h-4 w-4 " />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() =>
                                onRoleChange(member.id, "MODERATOR")
                              }
                            >
                              <ShieldCheck className="h-4 w-4 " />
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="h-4 w-4 " />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={() => onKick(member.id)}
                      >
                        <Gavel className="h-4 w-4" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              {loadingId === member.id && (
                <Loader2 className="animate-spin text-slate-800 dark:text-slate-200  w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
