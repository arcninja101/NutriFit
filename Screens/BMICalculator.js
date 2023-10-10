

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';

// import { initializeApp } from 'firebase/app';
// import { initializeAuth, getAuth, createUserWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';
// import { getFirestore, doc, setDoc, arrayUnion, collection, addDoc,getDoc } from 'firebase/firestore';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// const backgroundImage = require("../assets/bgimgbmi.png");

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

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
// const db = getFirestore(app);

// export default function BMICalculator() {
//   const [weight, setWeight] = useState('');
//   const [height, setHeight] = useState('');
//   const [weightUnit, setWeightUnit] = useState('kg');
//   const [heightUnit, setHeightUnit] = useState('cm');
//   const [bmiResult, setBMIResult] = useState(null);
//   const [bmiHistory, setBMIHistory] = useState([]);
//   const [weightHistory, setWeightHistory] = useState([]); // Add state for weight history

//   const navigation = useNavigation();
//   const [isPickerVisible, setIsPickerVisible] = useState(false); // Track whether Picker is visible

//   useEffect(() => {
//     const fetchBMIHistory = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const docRef = doc(db, "Users", user.uid); // Correctly create the document reference
//           const docSnap = await getDoc(docRef); // Use getDoc to fetch the document snapshot
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             if (data && data.BMIHistory) {
//               setBMIHistory(data.BMIHistory);
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching BMI history: ", error);
//       }
//     };
  
//     fetchBMIHistory();
//   }, []);
  

//   const calculateBMI = () => {
//     // Convert weight and height to numbers
//     const weightValue = parseFloat(weight);
//     const heightValue = parseFloat(height);

//     // Convert weight to kg if in lbs
//     const weightInKg = weightUnit === 'lbs' ? weightValue * 0.45359237 : weightValue;

//     // Convert height to meters if in inches
//     const heightInMeters = heightUnit === 'inches' ? heightValue * 0.0254 : heightValue / 100;

//     if (!isNaN(weightInKg) && !isNaN(heightInMeters) && heightInMeters > 0) {
//       const bmi = weightInKg / (heightInMeters * heightInMeters);
//       setBMIResult(bmi.toFixed(2));

//       // Add the BMI value to the history array
//       setBMIHistory([...bmiHistory, bmi.toFixed(2)]);
//       setWeightHistory([...weightHistory, weightInKg.toFixed(2)]);

//     } else {
//       setBMIResult(null);
//     }
//   };

//   const saveBMIAndWeightHistoryToFirestore = async () => {
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const docRef = doc(db, "Users", user.uid);
//         await setDoc(docRef, {
//           BMIHistory: arrayUnion(...bmiHistory),
//           WeightHistory: arrayUnion(...weightHistory),
//         }, { merge: true });
//         Alert.alert("BMI and Weight History Saved", "Your BMI and weight history have been saved to Firestore.");
//       }
//     } catch (error) {
//       console.error("Error saving BMI and weight history: ", error);
//     }
//   };
//   const getBMICategory = () => {
//     if (bmiResult === null) {
//       return '';
//     } else if (bmiResult < 18.5) {
//       return 'Underweight';
//     } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
//       return 'Healthy Weight';
//     } else {
//       return 'Overweight';
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
//       <View style={styles.button2style}>
//         <Button title="Back" onPress={() => navigation.goBack()} color={"black"} />
//       </View>
//       <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#FFBC6E", left: 267, top: 39, position: "absolute" }}>NutriFit </Text>

//       <Text style={styles.title}>BMI Calculator</Text>
//       <View style={styles.textInputContainer}>
//         <TextInput
//           placeholder={`Enter weight (${weightUnit})`}
//           value={weight}
//           onChangeText={(text) => setWeight(text)}
//           keyboardType="numeric"
//           style={styles.input}
//           onFocus={() => setIsPickerVisible(true)} // Show Picker when TextInput is focused
//         />
//         {isPickerVisible && (
//           <Picker
//             selectedValue={weightUnit}
//             onValueChange={(itemValue) => {
//               setWeightUnit(itemValue);
//               setIsPickerVisible(false); // Hide Picker when an option is selected
//             }}
//             style={styles.picker}
//           >
//             <Picker.Item label="kg" value="kg" />
//             <Picker.Item label="lbs" value="lbs" />
//           </Picker>
//         )}
//       </View>
//       <View style={styles.textInputContainer}>
//         <TextInput
//           placeholder={`Enter height (${heightUnit})`}
//           value={height}
//           onChangeText={(text) => setHeight(text)}
//           keyboardType="numeric"
//           style={styles.input}
//           onFocus={() => setIsPickerVisible(true)} // Show Picker when TextInput is focused
//         />
//         {isPickerVisible && (
//           <Picker
//             selectedValue={heightUnit}
//             onValueChange={(itemValue) => {
//               setHeightUnit(itemValue);
//               setIsPickerVisible(false); // Hide Picker when an option is selected
//             }}
//             style={styles.picker}
//           >
//             <Picker.Item label="cm" value="cm" />
//             <Picker.Item label="inches" value="inches" />
//           </Picker>
//         )}
//       </View>

//       <View style={styles.buttonstyle}>
//         <Button title="Calculate BMI" onPress={calculateBMI} />
//       </View>
//       {bmiResult !== null && (
//         <View>
//           <Text style={styles.resultText}>Your BMI: {bmiResult}</Text>
//           <Text style={styles.resultText}>BMI Category: {getBMICategory()}</Text>
//         </View>
//       )}

//       <Button title="Save Data" onPress={saveBMIAndWeightHistoryToFirestore} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     top: -35,
//     left: 44,
//   },
//   backgroundImage: {
//     position: 'absolute',
//     width: "100%",
//     height: "100%",
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'white',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     backgroundColor: "white",
//     borderRadius: 20,
//     shadowColor: "red",
//     top:-45,
//     left:70,
//   },
//   resultText: {
//     marginTop: 20,
//     fontSize: 18,
//     top:25,
//     left:40,
//     justifyContent:"center",
//     alignItems:"center",
//     alignContent:"center",
//   },
//   buttonstyle: {
//     position: "absolute",
//     top: 430,
//     left: 163,
//     borderRadius: 40,
//   },
//   button2style: {
//     position: "absolute",
//     top: 39,
//     left: 20,
//     borderRadius: 4,
//   },
//   textInputContainer: {
//     position: 'relative',
//     width: '80%',
//   },
//   picker: {
//     position: 'absolute',
//     right: 10,
//     top: -50,
//     left:200,
//     height: 40,
//     width: 100,
//     color:"grey",
//   },
//   disclaimerText: {
//     fontSize: 10,
//     fontWeight: "bold",
//     color: "white",
//     top: 715,
//     position: "absolute",
//     justifyContent: "center",
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, createUserWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, arrayUnion, collection, addDoc,getDoc } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmiResult, setBMIResult] = useState(null);
  const [bmiHistory, setBMIHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBMIHistory = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && data.BMIHistory) {
              setBMIHistory(data.BMIHistory);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching BMI history: ", error);
      }
    };
  
    fetchBMIHistory();
  }, []);

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const weightInKg = weightUnit === 'lbs' ? weightValue * 0.45359237 : weightValue;
    const heightInMeters = heightUnit === 'inches' ? heightValue * 0.0254 : heightValue / 100;

    if (!isNaN(weightInKg) && !isNaN(heightInMeters) && heightInMeters > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      setBMIResult(bmi.toFixed(2));

      setBMIHistory([...bmiHistory, bmi.toFixed(2)]);
      setWeightHistory([...weightHistory, weightInKg.toFixed(2)]);
    } else {
      setBMIResult(null);
    }
  };

  const saveBMIAndWeightHistoryToFirestore = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        await setDoc(docRef, {
          BMIHistory: arrayUnion(...bmiHistory),
          WeightHistory: arrayUnion(...weightHistory),
        }, { merge: true });
        Alert.alert("BMI and Weight History Saved", "Your BMI and weight history have been saved to Firestore.");
      }
    } catch (error) {
      console.error("Error saving BMI and weight history: ", error);
    }
  };

  const getBMICategory = () => {
    if (bmiResult === null) {
      return '';
    } else if (bmiResult < 18.5) {
      return 'Underweight';
    } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
      return 'Healthy Weight';
    } else {
      return 'Overweight';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={`Enter weight (${weightUnit})`}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
          style={styles.input}
          onFocus={() => setIsPickerVisible(true)}
        />
        {isPickerVisible && (
          <Picker
            selectedValue={weightUnit}
            onValueChange={(itemValue) => {
              setWeightUnit(itemValue);
              setIsPickerVisible(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lbs" value="lbs" />
          </Picker>
        )}
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={`Enter height (${heightUnit})`}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
          style={styles.input}
          onFocus={() => setIsPickerVisible(true)}
        />
        {isPickerVisible && (
          <Picker
            selectedValue={heightUnit}
            onValueChange={(itemValue) => {
              setHeightUnit(itemValue);
              setIsPickerVisible(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="cm" value="cm" />
            <Picker.Item label="inches" value="inches" />
          </Picker>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Calculate BMI" onPress={calculateBMI} />
      </View>
      {bmiResult !== null && (
        <View>
          <Text style={styles.resultText}>Your BMI: {bmiResult}</Text>
          <Text style={styles.resultText}>BMI Category: {getBMICategory()}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save Data" onPress={saveBMIAndWeightHistoryToFirestore} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#FDFDFD', // Background color with pastel shade
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top:-15
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
  },
  textInputContainer: {
    width: '80%',
  },
  picker: {
    position: 'absolute',
    right: 10,
    top: -7,
    height: 40,
    width: 100,
    color: 'gray',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
    borderRadius: 20,
  },
});
