import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MainPageImage from "./components/svg/MainPageImage";
import { Button } from "./components/common/Button";

export default function index() {
  return (
    <>
      <View className="h-screen flex flex-col mx-2 my-2 justify-center ">
        <View className="flex-1 ">
          <MainPageImage />
        </View>
        <View className="flex-1 flex justify-evenly">
          <View className="">
            <Text className="text-4xl text-center color-[#1F41BB]  font-sans font-semibold ">
              Discover What's Behind the Barcode
            </Text>
            <Text className="text-center text-lg my-4 font-sans font-semibold">
              Know what you buy—scan to compare prices, read reviews, and make
              smarter choices.
            </Text>
          </View>
          <View className="">
            <View className="flex flex-row justify-around items-center ">
              {/* <Link href="/screens/auth/LoginPage" asChild className="">
                <Pressable className="px-12 py-3 shadow-md  bg-[#1F41BB] rounded-md ">
                  <Text className=" text-white text-lg">Login</Text>
                </Pressable>
              </Link> */}

              <Button link="/login" text="Login" />

              <Link href="/SignUpPage" asChild className="">
                <Pressable className="px-12 py-3 ">
                  <Text className="text-black text-lg">Register</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
