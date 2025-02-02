import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validation = (name, email, password, confirmpassword) => {
    if (name.length < 2) {
      Alert.alert("Error", "Enter a Valid Email Name");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a Valid Email Address");
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password should 8 digit long with an uppercase an lowercase a number and a special character"
      );
      return false;
    }
    if (password !== confirmpassword) {
      Alert.alert("Error", "Confirm Password doesn't match password");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validation(name, email, password, confirmpassword)) return;
    try {
      const userCredentail = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentail) {
        Alert.alert("you are Registered");
      }
      await setDoc(doc(db, "users", userCredentail.user.uid), {
        name : name,
        email: email,
        password: password,
        createdAt: new Date(),
        ecoImpact: { bottlesSaved: 0, co2Saved: 0 },
      });
      console.log("user registered");
    } catch (error) {
      console.error("Registration Error : ", error.message);
      Alert.alert("Error :" , error.message )
    }
  };

  return (
    <View className="h-screen  border  flex flex-col justify-around ">
      <View className="flex flex-col items-center gap-2 ">
        <Text className="text-[#1F41BB] text-3xl font-bold">
          Create Account  
        </Text>
        <Text className="font-bold text-lg text-center px-8 ">
          Create an Account , so you can see behind the barcode
        </Text>
      </View>
      <View className="flex gap-4 first-letter px-5">
        <TextInput
          placeholder="Username"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Email"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder=" Confirm Password"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2 "
          value={confirmpassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Pressable
          className="bg-[#1F41BB] py-4 rounded-md"
          onPress={handleRegister}
        >
          <Text className="text-center text-white text-lg font-bold">
            Sign Up
          </Text>
        </Pressable>
        <Link href="./LoginPage">
          <Text className="text-center">Already Have an account</Text>
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
