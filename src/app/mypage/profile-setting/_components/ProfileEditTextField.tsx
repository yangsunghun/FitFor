import { TextField } from "@/components/ui/TextField";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
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
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  return (
    <div className="relative flex w-full flex-col">
      <label htmlFor={id} className="mb-2 text-title2 font-bold tb:text-body tb:font-medium">
        {label}
      </label>
      <TextField
        variant={error ? "error" : "default"}
        id={id}
        version={isTabletOrSmaller ? "app" : "desktop"}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        {...register(id)}
        className="tb:font-regular h-14 border-none p-4 text-title2 font-medium tb:h-11 tb:p-3 tb:text-body"
      />
      {error && (
        <p className="absolute -bottom-[26px] left-0 mt-1 text-body font-normal text-status-danger tb:text-caption tb:font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
export default ProfileEditTextField;
