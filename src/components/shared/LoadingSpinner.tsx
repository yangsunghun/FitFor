import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <CircleNotch className="text-primary h-8 w-8 animate-spin" />
      <p className="text-muted-foreground mt-4 text-body">정보를 불러오는 중입니다.</p>
    </div>
  );
};

export default LoadingSpinner;
