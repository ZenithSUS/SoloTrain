// Get button style classes based on state
export const getButtonClasses = (state: string, isAnimating: boolean) => {
  const baseClasses =
    "rounded-md bg-primary px-4 py-3 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  if (state === "hiding" || isAnimating) {
    return `${baseClasses} opacity-20 scale-95`;
  }

  return `${baseClasses} opacity-100 scale-100 hover:bg-primary/90 active:scale-95`;
};
