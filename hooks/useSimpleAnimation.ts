import { useState } from "react";

export function useSimpleAnimation(duration = 300) {
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = (callback: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, duration);
  };

  return { isAnimating, animate };
}
