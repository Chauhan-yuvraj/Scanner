import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase/firebase";

import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Button } from "../components/common/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validation = (email: string, password: string) => {
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
      console.log(
        `user logged in with email:${email} , password : ${password}`
      );
      console.log("Navigating!!!!!!!!");
      router.replace('/home')
      console.log("Navigating");
      
    } catch (error) {
      console.error("Login Error", error.message);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-8 justify-between">
      {/* Header Section */}
      <View className="space-y-4">
        <Text className="text-[#1F41BB] text-3xl font-bold text-center">
          Login here
        </Text>
        <Text className="font-semibold text-lg text-gray-700 text-center">
          Welcome back! You've been missed!
        </Text>
      </View>

      {/* Input Fields */}
      <View className="space-y-4">
        <TextInput
          placeholder="Email"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-4 py-3"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-4 py-3"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text className="text-right text-[#1F41BB] text-base font-medium">
          Forgot your password?
        </Text>
      </View>
      <View>
        {/* Login Button */}
        <Button onpress={handleLogin} text="Sign in" />

        {/* Create Account Link */}
        <View className="items-center pt-2">
          <Link href="./SignUpPage" asChild>
            <Pressable>
              <Text className=" ">Create new account</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      {/* Social Login Options */}
      <View className="space-y-4 pb-8">
        <Text className="text-[#1F41BB] text-lg font-medium text-center">
          Or Continue with
        </Text>
        <View className="flex-row justify-center gap-4">
          <Pressable className="p-3 bg-[#ECECEC] rounded-md">
            <AntDesign name="google" size={24} color="black" />
          </Pressable>
          <Pressable className="p-3 bg-[#ECECEC] rounded-md">
            <AntDesign name="facebook-square" size={24} color="black" />
          </Pressable>
          <Pressable className="p-3 bg-[#ECECEC] rounded-md">
            <Entypo name="mail" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
