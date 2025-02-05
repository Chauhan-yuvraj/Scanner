import React, { useEffect } from "react";
import { Alert, Pressable, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../services/firebase/firebase"; // Your Firebase auth import

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "963296948965-7eoqa6vvnrb7degj3khkdut1d9l8kni1.apps.googleusercontent.com", // From Expo client
    webClientId:
      "963296948965-etj23cmqvhs2g6uh0m120en5q7lnqmmn.apps.googleusercontent.com", // From Firebase
    androidClientId:
      "963296948965-1c66m8cfclnacf8urbnupmdaeuokcuco.apps.googleusercontent.com", // From Google Cloud Console (Android)
    iosClientId:
      "963296948965-8a510eq5434sgmoikqoodonp2apn3a9v.apps.googleusercontent.com", // From Google Cloud Console (iOS)
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          // Handle post-login logic here
        })
        .catch((error) => {
          console.error("Firebase Authentication Error:", error);
          Alert.alert("Error", "Google sign-in failed");
        });
    }
  }, [response]);

  const handle = () => {
    console.log("pressed");
  };
  return (
    <Pressable
    onPress={async () => {
      try {
        const result = await promptAsync();
        console.log("Google Auth Response:", result);
      } catch (error) {
        console.error("Google Auth Error:", error);
        Alert.alert("Error", "Google sign-in failed");
      }
    }}
      disabled={!request}
      style={{
        backgroundColor: "#ECECEC",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#000" }}>Sign In with Google</Text>
    </Pressable>
  );
}
