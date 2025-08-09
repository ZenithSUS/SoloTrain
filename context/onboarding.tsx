import { createContext, useContext, useMemo, useState } from "react";

export type OnboardingData = {
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  goal?: string;
};

const OnboardingContext = createContext<{
  data: OnboardingData;
  setData: (update: Partial<OnboardingData>) => void;
}>({
  data: {},
  setData: () => {},
});

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setDataState] = useState<OnboardingData>({});

  const setData = (update: Partial<OnboardingData>) => {
    setDataState((prev) => ({ ...prev, ...update }));
  };

  const value = useMemo(() => ({ data, setData }), [data]);

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingProvider",
    );
  }
  return context;
};
