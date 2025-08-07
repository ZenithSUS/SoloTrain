import { createContext, useContext, useState } from "react";

type OnboardingData = {
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  goal?: string;
};

const OnboardingContext = createContext<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}>({
  data: {},
  setData: () => {},
});

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<OnboardingData>({});
  return (
    <OnboardingContext.Provider value={{ data, setData }}>
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
