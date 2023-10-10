


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getReactNativePersistence,
} from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';

const backgroundImage = require('../assets/bgimg2.png');

// Firebase configuration
// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBnYk_i7HmsBsBEgNX0Bsjg7VC25w_cGXw',
  authDomain: 'nutrifit-29526.firebaseapp.com',
  databaseURL: 'https://nutrifit-29526.firebaseio.com',
  projectId: 'nutrifit-29526',
  storageBucket: 'nutrifit-29526.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:337410191828:android:78054b4d777dce4c602641',
  measurementId: 'G-measurement-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export default function SignUp(props) {
  const [emailid, setemailid] = useState('');
  const [password, setpassword] = useState('');
  const [username, setUsername] = useState('');

  const Register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailid, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // ... rest of your code ...

      Alert.alert(
        'Registration Successful',
        'You have successfully registered. A verification email has been sent to your email address.',
        [
          {
            text: 'Go To Login Page',
            onPress: () => {
              props.navigation.navigate('Home');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  const Back = () => {
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.button2style}>
        <Button title="Back" onPress={Back} color="black" />
      </View>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFBC6E', left: 267, top: 39, position: 'absolute' }}>
        NutriFit
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        label="Email ID"
        value={emailid}
        onChangeText={(emailid) => setemailid(emailid)}
        placeholder="Email ID"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setpassword(password)}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.box}></View>
      <View style={styles.button1style}>
        <Button title="Register" onPress={Register} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    top: 130,
    left: 55,
  },
  button1style: {
    position: 'absolute',
    top: 350,
    left: 145,
  },
  button2style: {
    position: 'absolute',
    top: 39,
    left: 20,
    borderRadius: 100,
  },
});



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
// import { initializeApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getAuth,
//   UserCredential,
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   getReactNativePersistence,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// import firestore from '@react-native-firebase/firestore';
// import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';

// const backgroundImage = require('../assets/bgimg2.png');

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBnYk_i7HmsBsBEgNX0Bsjg7VC25w_cGXw',
//   authDomain: 'nutrifit-29526.firebaseapp.com',
//   databaseURL: 'https://nutrifit-29526.firebaseio.com',
//   projectId: 'nutrifit-29526',
//   storageBucket: 'nutrifit-29526.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: '1:337410191828:android:78054b4d777dce4c602641',
//   measurementId: 'G-measurement-id',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// const db = getFirestore(app);

// export default function SignUp(props) {
//   const [emailid, setemailid] = useState('');
//   const [password, setpassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [emailVerified, setEmailVerified] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setEmailVerified(user.emailVerified);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const Register = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, emailid, password);
//       const user = userCredential.user;

//       // Send email verification
//       await sendEmailVerification(user);

//       // Display a success message
//       Alert.alert(
//         'Registration Successful',
//         'You have successfully registered. A verification email has been sent to your email address.',
//         [
//           {
//             text: 'OK',
//             onPress: () => {
//               props.navigation.navigate('Home');
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//     }
//   };

//   const Login = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, emailid, password);
//       const user = userCredential.user;

//       if (!user.emailVerified) {
//         Alert.alert('Email Not Verified', 'Please verify your email before logging in.');
//         return;
//       }

//       // Continue with login
//       // ...
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(errorMessage);
//     }
//   };

//   const Back = () => {
//     props.navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
//       <View style={styles.button2style}>
//         <Button title="Back" onPress={Back} color="black" />
//       </View>
//       <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFBC6E', left: 267, top: 39, position: 'absolute' }}>
//         NutriFit
//       </Text>
//       <TextInput
//         label="Username"
//         value={username}
//         onChangeText={(username) => setUsername(username)}
//         placeholder="Username"
//         style={styles.input}
//       />
//       <TextInput
//         label="Email ID"
//         value={emailid}
//         onChangeText={(emailid) => setemailid(emailid)}
//         placeholder="Email ID"
//         style={styles.input}
//       />
//       <TextInput
//         label="Password"
//         value={password}
//         onChangeText={(password) => setpassword(password)}
//         placeholder="Password"
//         secureTextEntry
//         style={styles.input}
//       />
//       <View style={styles.box}></View>
//       <View style={styles.button1style}>
//         <Button title="Register" onPress={Register} color="black" />
//         <Button title="Login" onPress={Login} color="black" />
//       </View>
//       {emailVerified ? null : (
//         <Text style={styles.verifyText}>Please verify your email before logging in.</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   input: {
//     width: 250,
//     height: 44,
//     padding: 10,
//     marginTop: 20,
//     marginBottom: 10,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     top: 130,
//     left: 55,
//   },
//   button1style: {
//     position: 'absolute',
//     top: 350,
//     left: 145,
//   },
//   button2style: {
//     position: 'absolute',
//     top: 39,
//     left: 20,
//     borderRadius: 100,
//   },
//   verifyText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });
