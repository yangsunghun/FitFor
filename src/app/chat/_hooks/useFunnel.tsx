import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type StepProps = {
  name: string;
  children: ReactNode;
};

type FunnelProps = {
  children: Array<ReactElement<StepProps>>;
};

export const useFunnel = (initialStep: string) => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<string>(() => searchParams.get("step") || initialStep);

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      setCurrentStep(stepParam);
    } else {
      window.history.replaceState(null, "", `?step=${currentStep}`);
    }
  }, [currentStep, searchParams]);

  const Step = ({ name, children }: StepProps): ReactNode => {
    return <>{children}</>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const steps = children.filter((child) => child.type === Step);
    const activeStep = steps.find((child) => child.props.name === currentStep);
    return activeStep || null;
  };

  const updateStep = (step: string): void => {
    setCurrentStep(step);
    window.history.pushState(null, "", `?step=${step}`);
  };

  const next = (nextStep: string): void => {
    updateStep(nextStep);
  };

  const prev = (prevStep: string): void => {
    updateStep(prevStep);
  };

  return { Funnel, Step, next, prev, currentStep };
};
