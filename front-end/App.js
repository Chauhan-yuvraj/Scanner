  import { firebase } from '@react-native-firebase/auth';
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';

  export default function App() {
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
    }
    return (
      <View style={styles.container}>
        <Text>Hello , My Name is yuvraj</Text>
        <Text></Text>
        {/* <StatusBar style="auto" /> */}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
