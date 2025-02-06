import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import GoogleSignInButton from "../components/Auth/GoogleSignIn";
import { replace } from "expo-router/build/global-state/routing";
// Import the Google sign-in button
export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validation = (
    name: string,
    email: string,
    password: string,
    confirmpassword: string
  ) => {
    if (name.length < 2) {
      Alert.alert("Error", "Enter a Valid Name");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Enter a Valid Email Address");
      return false;
    }
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password should be 8 characters long with an uppercase, lowercase, number, and special character"
      );
      return false;
    }
    if (password !== confirmpassword) {
      Alert.alert("Error", "Confirm Password doesn't match Password");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validation(name, email, password, confirmpassword)) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
        ecoImpact: { bottlesSaved: 0, co2Saved: 0 },
      });
      console.log(
        `{user registered with  username: ${name} , email : ${email} , password : ${password}}`
      );
      Alert.alert("Success", "You are now registered!");
      router.push("/login"); // Corrected path
    } catch (error) {
      console.error("Registration Error:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="h-screen border flex flex-col justify-around">
      <View className="flex flex-col items-center gap-2">
        <Text className="text-[#1F41BB] text-3xl font-bold">
          Create Account
        </Text>
        <Text className="font-bold text-lg text-center px-8">
          Create an Account so you can see behind the barcode
        </Text>
      </View>

      <View className="flex gap-4 px-5">
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
          placeholder="Confirm Password"
          className="border border-[#1F41BB] bg-[#F1F4FF] text-lg rounded-md px-2"
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

        <Link href="/login">
          <Text className="text-center">Already Have an account?</Text>
        </Link>
      </View>

      {/* Google Sign-In Button */}
      <View className="flex flex-col items-center">
        <Text className="text-[#1F41BB] text-lg py-4">Or Continue with</Text>
        <GoogleSignInButton />
      </View>
    </View>
  );
}
