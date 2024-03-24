"use client";

import { Server, Member, Profile } from "@prisma/client";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/hooks/use-dialog-store";

type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export function ServerHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useDialog();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center justify-between h-12 shadow-md border-slate-200 dark:border-slate-800 border-b-2 hover:bg-slate-700/10 dark:hover:bg-slate-700/50 transition-colors">
          {server.name}
          <ChevronDown className="h-6 w-6 " />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-slate-950 dark:text-slate-400 flex flex-col gap-0.5">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-emerald-500 p-3 text-sm cursor-pointer flex items-center justify-between"
          >
            Invite People
            <UserPlus className="h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="p-3 text-sm cursor-pointer flex items-center justify-between"
          >
            Server Settings
            <Settings className="h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="p-3 text-sm cursor-pointer flex items-center justify-between"
          >
            Manage Members
            <Users className="h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="p-3 text-sm cursor-pointer flex items-center justify-between"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 p-3 text-sm cursor-pointer flex items-center justify-between"
          >
            Delete Server
            <Trash className="h-4 w-4 " />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="text-rose-500 p-3 text-sm cursor-pointer flex items-center justify-between"
          >
            Leave Server
            <LogOut className="h-4 w-4 " />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
