import Image from "next/image";
import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="backdrop-blur-sm dark:bg-neutral-950/30 bg-neutral-200/30 rounded-lg w-full max-w-md p-8 flex flex-col gap-4">
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
}
