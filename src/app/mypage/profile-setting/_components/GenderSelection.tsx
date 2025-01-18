import type { UseFormRegister } from "react-hook-form";

type GenderSelectionProps = {
  register: UseFormRegister<{ nickname: string; introduction: string; gender: string }>;
  error?: string;
};

const GenderSelection = ({ register, error }: GenderSelectionProps) => {
  return (
    <div className="mt-10 w-[30rem]">
      <label className="text-title2 font-bold text-text-04">성별</label>
      <div className="mt-4 flex w-full flex-row gap-12">
        {["male", "female", "none"].map((gender) => (
          <label key={gender} className="flex items-center space-x-2">
            <input
              type="radio"
              value={gender}
              {...register("gender")}
              className="flex h-7 w-7 items-center justify-center rounded-full accent-primary-default focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <span className="text-subtitle font-medium text-text-04">
              {gender === "male" ? "남성" : gender === "female" ? "여성" : "선택하지 않음"}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
    </div>
  );
};

export default GenderSelection;
