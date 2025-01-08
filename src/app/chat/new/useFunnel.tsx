import React, { ReactElement, useState } from "react";

interface StepProps {
  name: string;
  children: ReactElement;
}

interface FunnelProps {
  children: ReactElement[];
}

export const useFunnel = (initialStep: string) => {
  const [currentStep, setCurrentStep] = useState<string>(initialStep);

  const Step = ({ children }: StepProps) => {
    return <>{children}</>;
  };

  // 모든 Step을 미리 children으로 품고 있다가 진행에 필요한 순서에 맞는 Step을 보여준다.
  const Funnel = ({ children }: FunnelProps) => {
    // Funnel 안에 Step 컴포넌트 말고 다른 컴포넌트를 포함하고 있어야 할 수도 있기 때문에 Step 컴포넌트만 걸러주는 작업이 필요
    const steps = React.Children.toArray(children)
      .map((child) => {
        if (React.isValidElement<StepProps>(child) && child.type === Step) {
          return child;
        }
        return null;
      })
      .filter(Boolean) as ReactElement<StepProps>[];
    const activeStep = steps.find((child) => child.props.name === currentStep);
    return activeStep || null;
  };

  const next = (nextStep: string) => {
    setCurrentStep(nextStep);
  };

  const prev = (prevStep: string) => {
    setCurrentStep(prevStep);
  };

  return { Funnel, Step, next, prev, currentStep };
};
