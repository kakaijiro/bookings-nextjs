"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex min-h-16 min-w-48 items-center justify-center bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}
