"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema";

export function LoginForm() {
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="w-full relative">
                  <Input type={visible ? "text" : "password"} {...field} />
                  {visible ? (
                    <Eye
                      onClick={() => {
                        setVisible((prev) => !prev);
                      }}
                      className="h-5 w-5 absolute right-3 top-1/4"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => {
                        setVisible((prev) => !prev);
                      }}
                      className="h-5 w-5 absolute right-3 top-1/4"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={() => {
              router.push("/auth/register");
            }}
            className="p-0"
            variant={"link"}
          >
            Register
          </Button>
          <Button type="submit">Enter</Button>
        </div>
      </form>
    </Form>
  );
}
