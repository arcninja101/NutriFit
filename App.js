import { initializeApp } from 'firebase/app';
import { StatusBar } from 'expo-status-bar';
import React,{useState}  from 'react';
import { ImageBackground, Image, StyleSheet, Text, View ,Pressable,TextInput,Button,KeyboardAvoidingView, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';






import Home from "./Screens/Home";
import SignUp from './Screens/SignUp';
import BMICalculator from './Screens/BMICalculator';
import CalorieCalculator from "./Screens/CalorieCalculator"
import BodyTypeScreen from './Screens/BodyTypeScreen';
import CurrentBodyTypeScreen from './Screens/CurrentBodyTypeScreen';
import DesiredBodyTypeScreen from './Screens/DesiredBodyTypeScreen';
import ResultScreen from './Screens/ResultScreen';
import TestBody from "./Screens/TestBody";
import MainScreen from "./Screens/MainScreen";


const Stack = createNativeStackNavigator ();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        <Stack.Screen name="BMICalculator" component={BMICalculator} options={{headerShown:false}}/>
        <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} options={{headerShown:false}} />
        <Stack.Screen name="BodyTypeScreen" component={BodyTypeScreen} options={{headerShown:false}} />
        <Stack.Screen name="CurrentBodyTypeScreen" component={CurrentBodyTypeScreen} options={{headerShown:false}} />
        <Stack.Screen name="DesiredBodyTypeScreen" component={DesiredBodyTypeScreen} options={{headerShown:false}} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{headerShown:false}} />
        <Stack.Screen name="TestBody" component={TestBody} options={{headerShown:false}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}



















//Import the bg img
//const backgroundImage = require('./assets/bgimg2.png');






// export default function App() {
//   const [emailid, setemailid] = useState('');
//   const [password, setpassword] = useState('');
  
//   const handleSignin = () => {
//     console.log('SIGN IN CREDENTIALS', emailid,password);
//   }
//   const handleSignup= () => {
//     console.log('SIGN UP CREDENTIALS', emailid,password);
//   };
//   return (
   
//     <View style={styles.container}>
    
//       <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
//       <Text style={{fontSize:25,fontWeight:'bold',color:"#FFBC6E",left:267,top:39,position:"absolute"}}>NutriFit</Text>
      
//       <TextInput
          
//           label="Email ID"
//           value={emailid}
//           onChangeText={(emailid) => setemailid(emailid)}
//           placeholder={"Email ID"}
//           style={styles.input}
          
//         />
//         <TextInput
//           label="Password"
//           value={password}
//           onChangeText={(password) => setpassword(password)}
//           placeholder={"Password"}
//           secureTextEntry
//           style={styles.input}
//         />
//         <View style={styles.box}>
        
//       </View>
//       <View style={styles.button1style}>
//       <Button title="Sign-in" onPress={handleSignin} color={"black"}/>
//       </View>
//       <View style={styles.button2style}>
//       <Button title="Sign-up" onPress={handleSignup} color={"black"}/>
      
//       </View>
    
//       <Text style={{left:-3,bottom:149,fontSize:18,color:"white"}}>OR</Text>   
    
     
//       <StatusBar style="light" />
     
//     </View>
    
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //backgroundColor: '',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     width: "100%",
//     height: "100%",
//   },
//   footerContainer: {
//     flex: 1 /3,
//     alignItems: 'center',
//   },
//   input: {
    
//     width: 250,
//     height: 44,
//     padding: 10,
//     marginTop: 20,
//     marginBottom: 10,
//     backgroundColor: 'white',
//     borderRadius:20,
//     bottom: 200,
//     position:"relative",
//   },
//   movedInput:{
//     position: 'absolute',
//     top: 130, 
//     left: 0
//   },

//   button1style:{
//     position:"absolute",
//     top:300,
//     left:90,

//   },
//   button2style:{
//     position:"absolute",
//     top:300,
//     left:200,
//     //backgroundColor:"grey",
    
//   }
// });
