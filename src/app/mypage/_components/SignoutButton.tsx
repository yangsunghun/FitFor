"use client";

import { signOut } from "@/lib/utils/auth/auth";
import React from "react";

const SignoutButton = () => {
  return (
    <button className="m-4 rounded-xl border p-4" onClick={() => signOut()}>
      Sign out
    </button>
  );
};

export default SignoutButton;
