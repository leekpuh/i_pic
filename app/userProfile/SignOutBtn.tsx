"use client"
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return (
      <button
        className="border p-2 border-gray-300 justify-items-center rounded-full cursor-pointer hover:border-blue-500"
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
      >
        <span>Выйти</span>
      </button>
  );
}
