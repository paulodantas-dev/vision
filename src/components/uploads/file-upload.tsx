"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";

import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
  const { toast } = useToast();

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="relative h-40 w-40">
          <Image
            fill
            src={value}
            alt="Upload"
            sizes="48px"
            className="rounded-full object-cover"
          />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 h-full max-h-[16rem]">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-full max-h-[16rem]">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.error("[DROPZONE_VALUE]", error);
          toast({
            variant: "destructive",
            description:
              "An error occurred while uploading the file. Please try again later.",
          });
        }}
        className="bg-slate-800/20 cursor-pointer m-0"
        appearance={{
          button:
            "ut-uploading:cursor-not-allowed rounded-r-none bg-emerald-500 dark:bg-emerald-900 after:bg-emerald-500 dark:after:bg-emerald-900",
          label: "text-slate-950 dark:text-slate-100",
          allowedContent: "text-slate-950 dark:text-slate-100",
          uploadIcon: "text-slate-950 dark:text-slate-100",
        }}
      />
    </div>
  );
}
