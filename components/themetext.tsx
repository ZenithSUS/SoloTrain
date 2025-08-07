import React from "react";
import { Text } from "react-native";

interface ThemeTextProps {
  children: string;
  type: string;
  size?: number | string;
}

const checkType = (type: string) => {
  switch (type) {
    case "title":
      return "text-primtext bold";
    case "subtext":
      return "text-subtext";
    case "primtext":
      return "text-primtext";
    case "accent":
      return "text-accent";
    default:
      return "text-base";
  }
};

const ThemeText = ({ children, type, size }: ThemeTextProps) => {
  return (
    <Text
      className={`${checkType(type)} text-center ${size ? `text-${size}` : ""}`}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
