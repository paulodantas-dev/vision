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

export function RegisterForm() {
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>last name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  <Input
                    type={visible.password ? "text" : "password"}
                    {...field}
                  />
                  {visible.password ? (
                    <Eye
                      onClick={() => {
                        setVisible((prev) => {
                          return { ...prev, password: !prev.password };
                        });
                      }}
                      className="h-5 w-5 absolute right-3 top-1/4"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => {
                        setVisible((prev) => {
                          return { ...prev, password: !prev.password };
                        });
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <div className="w-full relative">
                  <Input
                    type={visible.confirmPassword ? "text" : "password"}
                    {...field}
                  />
                  {visible.confirmPassword ? (
                    <Eye
                      onClick={() => {
                        setVisible((prev) => {
                          return {
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          };
                        });
                      }}
                      className="h-5 w-5 absolute right-3 top-1/4"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => {
                        setVisible((prev) => {
                          return {
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          };
                        });
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
              router.push("/auth/login");
            }}
            className="p-0"
            variant={"link"}
          >
            Already have an account?
          </Button>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  );
}
