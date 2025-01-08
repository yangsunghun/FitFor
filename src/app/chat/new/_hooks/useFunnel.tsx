import React, { useState, ReactElement } from "react";

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

  // 모든 Step을 children으로 가지고 있다가, 진행에 필요한 순서에 맞는 Step을 보여준다.
  const Funnel = ({ children }: FunnelProps) => {
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