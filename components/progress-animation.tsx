import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const ProgressAnimation = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    // Remove Shadow wrapper if react-native-shadow-2 causes issues
    <View className="relative h-[120px] w-[120px] rounded-full bg-gray-900 shadow-lg shadow-purple-600/40">
      <Svg width="120" height="120" className="absolute">
        <Defs>
          <LinearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#5A31D4" />
            <Stop offset="100%" stopColor="#3AA6F5" />
          </LinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1f1f1f"
          strokeWidth="10"
          fill="none"
        />

        {/* Main progress circle */}
        <Circle
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#glow)"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </Svg>

      <View className="absolute inset-0 flex items-center justify-center">
        <Text
          className="text-sm font-bold text-gray-200"
          style={{
            textShadowColor: "rgba(90, 49, 212, 0.5)",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 4,
          }}
        >
          {progress}%
        </Text>
      </View>

      {/* Dynamic glow overlay */}
      <View
        className="absolute bottom-1 left-1 right-1 top-1 rounded-full border border-purple-600/20 bg-purple-600/10"
        style={{ opacity: (progress / 100) * 0.3 }}
      />
    </View>
  );
};

export default ProgressAnimation;
