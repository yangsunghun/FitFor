import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CircleNotch className="text-primary h-8 w-8 animate-spin tb:h-6 tb:w-6" />
      <p className="text-muted-foreground mt-4 text-body tb:text-caption">정보를 불러오는 중입니다.</p>
    </div>
  );
};

export default LoadingSpinner;
