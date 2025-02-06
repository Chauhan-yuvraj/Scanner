import { Link } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  link?: string;
  onpress?: () => void;
  btnClass?: string;
  textClass?: string;
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({
  link,
  onpress,
  text,
  btnClass,
  textClass,
}) => {
  const handlePress = onpress || (() => {});
  const textclass = textClass || "";
  const btnclass = btnClass || "";
  return (
    <>
      {link ? (
        <Link href={link} asChild>
          <Pressable
            onPress={handlePress}
            className={`px-12 py-3 shadow-md  bg-[#1F41BB] rounded-md ${btnClass}`}
          >
            <Text className={` text-white text-center text-lg ${textclass}`}>
              {" "}
              {text}{" "}
            </Text>
          </Pressable>
        </Link>
      ) : (
        <Pressable
          onPress={handlePress}
          className={`px-12 py-3 shadow-md  bg-[#1F41BB] rounded-md ${btnclass}`}
        >
          <Text className={` text-white text-center text-lg ${textclass}`}>
            {" "}
            {text}{" "}
          </Text>
        </Pressable>
      )}
    </>
  );
};
