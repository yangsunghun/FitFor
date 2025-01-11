"use client";

import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  id: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
};

const AuthInput = <T extends FieldValues>({ id, type, placeholder, register, error }: InputProps<T>) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className="border-input placeholder:text-muted-foreground mb-2 flex h-9 w-full rounded-2xl border px-3 py-7 leading-6 transition-colors focus-visible:outline-none focus-visible:ring"
      />
      {error && <span className="mb-2 text-red-800">{error}</span>}
    </>
  );
};

export default AuthInput;
