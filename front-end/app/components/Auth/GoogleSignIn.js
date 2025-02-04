import React, { useEffect } from "react";
import { Alert, Pressable, Text } from "react-native";
import * as Google from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../services/firebase/firebase"; // Your Firebase auth import

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "963296948965-gbill6pu4lm1lns6jdn3fup8d3ap53ss.apps.googleusercontent.com", // From Expo client
    webClientId:
      "63296948965-7eoqa6vvnrb7degj3khkdut1d9l8kni1.apps.googleusercontent.com", // From Firebase
    androidClientId:
      "963296948965-bej0ji0m4j0latrefr8sj5g1upqrjdtn.apps.googleusercontent.com", // From Google Cloud Console (Android)
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

  const handle =() =>{
    console.log("pressed");
    
  }
  return (
    <Pressable 
    onPress={handle} 
    disabled={!request}
    style={{
      backgroundColor: "#ECECEC",
      padding: 10,
      borderRadius: 5,
      alignItems: "center"
    }}
  >
    <Text style={{ color: "#000" }}>
      Sign In with Google
    </Text>
  </Pressable>
  );
}
