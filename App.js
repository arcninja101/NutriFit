import { initializeApp } from 'firebase/app';
import { StatusBar } from 'expo-status-bar';
import React,{useState}  from 'react';
import { ImageBackground, Image, StyleSheet, Text, View ,Pressable,TextInput,Button,KeyboardAvoidingView, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';







import Home from "./Screens/Home";
import SignUp from './Screens/SignUp';
import BMICalculator from './Screens/BMICalculator';
import CalorieCalculator from "./Screens/CalorieCalculator"
import CurrentBodyTypeScreen from './Screens/CurrentBodyTypeScreen';
import DesiredBodyTypeScreen from './Screens/DesiredBodyTypeScreen';
import ResultScreen from './Screens/ResultScreen';
import MainScreen from "./Screens/MainScreen";
import ImageUpload from './Screens/ImageUpload';
import NewScreen from './Screens/NewScreen';
import SignOut from './Screens/SignOut';
import ForgotPassword from './Screens/ForgotPassword';


import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator ();
const Drawer = createDrawerNavigator();

const FuncDrawer = () =>{
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main Page" component={MainScreen} />
      <Drawer.Screen name="BMI Calculator" component={BMICalculator} />
      <Drawer.Screen name="Maintenance Calorie Calculator" component={CalorieCalculator} />
      <Drawer.Screen name="Images" component={ImageUpload} />
      <Drawer.Screen name="Sign Out" component={SignOut} />
      <Drawer.Screen name="Forgot Password" component={ForgotPassword} />
      



      {/* <Drawer.Screen name="AllBMI" component={AllBMI} />  */}

    </Drawer.Navigator>
  );
}

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name="BMICalculator" component={BMICalculator} options={{headerShown:false}}/>
        <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} options={{headerShown:false}} />
        <Stack.Screen name="CurrentBodyTypeScreen" component={CurrentBodyTypeScreen} options={{headerShown: true, headerTitle: 'Choose Current Body Type'}} />
<Stack.Screen name="DesiredBodyTypeScreen" component={DesiredBodyTypeScreen} options={{headerShown: true, headerTitle: 'Choose Desired Body Type'}} />

        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{headerShown:true, headerTitle:"Result"}} />
        <Stack.Screen name="MainScreen" component={FuncDrawer} options={{headerShown:false}} />
        <Stack.Screen name="NewScreen" component={NewScreen} options={{headerShown:false}} />
        





      </Stack.Navigator>
    </NavigationContainer>
  );
}
















