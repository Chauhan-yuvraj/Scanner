import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function SignUp() {
  return (
    <View className="h-screen  border  flex flex-col justify-around ">
    <View className="flex flex-col items-center gap-2 ">
      <Text className="text-[#1F41BB] text-3xl font-bold">Create Account</Text>
      <Text className="font-bold text-lg text-center px-8 ">
          Create an Account , so you can see behind the barcode 
      </Text>
    </View>
    <View className="flex gap-4 first-letter px-5">
      <TextInput
        placeholder="Email"
        className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2"
      />
      <TextInput
        placeholder="Password"
        className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2 "
      />
      <TextInput
        placeholder=" Confirm Password"
        className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2 "
      />
      <Pressable className="bg-[#1F41BB] py-4 rounded-md ">
        <Text className="text-center text-white text-lg font-bold">
          Sign Up
        </Text>
      </Pressable>
      <Link href="/Login">
        <Text className="text-center" >Already Have an account</Text>
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
  )
}