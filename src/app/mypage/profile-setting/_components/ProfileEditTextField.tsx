import { TextField } from "@/components/ui/TextField";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type ProfileEditTextFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
};

const ProfileEditTextField = <T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  error
}: ProfileEditTextFieldProps<T>) => {
  return (
    <div className="relative flex w-full flex-col">
      <label htmlFor={id} className="mb-2 text-title2 font-bold">
        {label}
      </label>
      <TextField
        variant={error ? "error" : "default"}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        {...register(id)}
        className="h-14 border-none p-4 text-title2 font-medium"
      />
      {error && <p className="absolute -bottom-[26px] left-0 mt-1 text-body font-normal text-status-danger">{error}</p>}
    </div>
  );
};
export default ProfileEditTextField;
