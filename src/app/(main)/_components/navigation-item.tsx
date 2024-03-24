"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { ActionTooltip } from "./action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export function NavigationItem({ id, imageUrl, name }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-slate-800 dark:bg-slate-100 rounded-r-full transition-all w-1",
            params?.serverId !== id && "group-hover:h-5",
            params?.serverId === id
              ? "h-9 bg-emerald-500 dark:bg-emerald-900"
              : "h-2"
          )}
        />
        <div
          className={
            "relative ml-4 group flex h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all overflow-hidden"
          }
        >
          <Image fill src={imageUrl} alt="Channel" sizes="48px" />
        </div>
      </button>
    </ActionTooltip>
  );
}
