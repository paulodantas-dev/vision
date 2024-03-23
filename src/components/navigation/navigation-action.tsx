"use client";

import { Plus } from "lucide-react";

import { useDialog } from "@/hooks/use-dialog-store";
import { ActionTooltip } from "@/components/tooltip/action-tooltip";

export function NavigationAction() {
  const { onOpen } = useDialog();

  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button onClick={() => onOpen("createServer")} className="group">
        <div className="flex items-center justify-center h-12 w-12 rounded-3xl group-hover:rounded-2xl transition-all bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-900">
          <Plus
            className="group-hover:text-slate-100 transition text-emerald-500"
            size={25}
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
