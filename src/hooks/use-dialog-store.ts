import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type DialogType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage";

interface DialogData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface DialogStore {
  type: DialogType | null;
  data: DialogData;
  isOpen: boolean;
  onOpen: (type: DialogType, data?: DialogData) => void;
  onClose: () => void;
}

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
