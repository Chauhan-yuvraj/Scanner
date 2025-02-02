import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase";

import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validation = (email, password) => {
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a Valid Email Address");
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      );

      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validation(email, password)) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Logged In!");
    } catch (error) {
      console.error("Login Error", error.message);
    }
  };

  return (
    <View className="h-screen  border  flex flex-col justify-around ">
      <View className="flex flex-col items-center gap-2 ">
        <Text className="text-[#1F41BB] text-3xl font-bold ">Login here</Text>
        <Text className="font-bold text-lg">
          Welcome back you've been missed!
        </Text>
      </View>
      <View className="flex gap-4 first-letter px-5">
        <TextInput
          placeholder="Email"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2 "
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text className=" text-right text-[#1F41BB]">
          Forget your password?
        </Text>
        <Pressable
          className="bg-[#1F41BB] py-4 rounded-md"
          onPress={handleLogin}
        >
          <Text className="text-center text-white text-lg font-bold">
            Sign in
          </Text>
        </Pressable>
        <Link href="/SignUp">
          <Text className="text-center">Create new account</Text>
        </Link>
      </View>
      <View className="flex flex-col items-center">
        <Text className="text-[#1F41BB] text-lg py-4 ">Or Continue with</Text>
        <View className="flex flex-row justify-center gap-4 ">
          <View className="p-2 bg-[#ECECEC] rounded-md">
            <AntDesign name="google" size={24} color="black" />
          </View>
          <View className="p-2 bg-[#ECECEC] rounded-md">
            <AntDesign name="facebook-square" size={24} color="black" />
          </View>
          <View className="p-2 bg-[#ECECEC] rounded-md">
            <Entypo name="mail" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
}
