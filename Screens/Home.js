import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  UserCredential,
  signInWithEmailAndPassword,
  getReactNativePersistence
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// import {app,auth} from "../firebaseConfig";

// Import the bg img
const backgroundImage = require('../assets/bgimg2.png');

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
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function Home(props) {
  const [emailid, setemailid] = useState('');
  const [password, setpassword] = useState('');

  const clearInputFields = () => {
    setemailid('');
    setpassword('');
  };


  const handleSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailid, password);
      const user = userCredential.user;
      console.log('User signed in:', user.email);

      // Navigate to MainScreen.js
      props.navigation.navigate('MainScreen');
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        alert('Invalid email or password. Please check your credentials and try again.');
      } else {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    }
  };

  const handleSignup = () => {
    // Handle the text input here
    props.navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFBC6E', left: 267, top: 39, position: 'absolute' }}>
        NutriFit
      </Text>
      <TextInput
        label="Email ID"
        value={emailid}
        onChangeText={(emailid) => setemailid(emailid)}
        placeholder={'Email ID'}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setpassword(password)}
        placeholder={'Password'}
        secureTextEntry
        style={styles.input}
      />
      <TouchableHighlight underlayColor={'grey'} onPress={handleSignin} style={styles.button1style}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign-in</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight underlayColor={'grey'} onPress={handleSignup} style={styles.button2style}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
        </View>
      </TouchableHighlight>
      <Text style={{ left: 163, top: 280, fontSize: 18, color: 'white', fontWeight: 'bold' }}>OR</Text>
      <Text style={{ left: 90, top: 590, fontSize: 14, color: 'white', fontWeight: 'bold' }}>
        *Sign in to access app features*
      </Text>
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
    top: 200,
    left: 55,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    //paddingHorizontal:5,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1style: {
    position: 'absolute',
    top: 360,
    left: 102,
    width: 150,
    marginTop: 10,
  },
  button2style: {
    position: 'absolute',
    top: 455,
    left: 94,
    padding: 10,
    width: 170,
    marginTop: 10,
  },
});