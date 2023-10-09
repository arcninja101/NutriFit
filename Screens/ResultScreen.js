




import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const {
    selectedCurrentBodyType,
    selectedDesiredBodyType,
    maintenanceCalories,
  } = route.params;

  const calculateDeficitSurplus = () => {
    if (selectedCurrentBodyType && selectedDesiredBodyType) {
      const currentBodyFatPercentage = selectedCurrentBodyType.bodyFatPercentage;
      const desiredBodyFatPercentage = selectedDesiredBodyType.bodyFatPercentage;

      // Calculate calorie requirements for current and desired body fat percentages
      const currentCalories = maintenanceCalories / (1 - currentBodyFatPercentage / 100);
      const desiredCalories = maintenanceCalories / (1 - desiredBodyFatPercentage / 100);

      // Calculate the calorie surplus or deficit
      const calorieChange = desiredCalories - currentCalories;

      // Calculate the rate of weight change (assuming 7700 kcal per kg of body fat)
      const weightChangeRate = calorieChange / (maintenanceCalories * 0.2); // Assuming 7700 kcal per 1 kg

      if (calorieChange > 0) {
        return `${calorieChange.toFixed(2)} kcal surplus, ${weightChangeRate.toFixed(
          2
        )} kg/week gain`;
      } else if (calorieChange < 0) {
        return `${Math.abs(calorieChange).toFixed(2)} kcal deficit, ${Math.abs(
          weightChangeRate
        ).toFixed(2)} kg/week loss`;
      } else {
        return 'No calorie change';
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        Current Body Type: {selectedCurrentBodyType.name}
      </Text>
      <Text style={styles.resultText}>
        Desired Body Type: {selectedDesiredBodyType.name}
      </Text>
      <Text style={styles.resultText}>
        Maintenance Calories: {maintenanceCalories} kcal
      </Text>
      <Text style={styles.resultText}>Result: {calculateDeficitSurplus()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#101d32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    //color: 'white',
  },
});





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// // Initialize Firestore
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
// const db = getFirestore(app);
// const auth = getAuth(app);

// export default function ResultScreen({ route }) {
//   const {
//     selectedCurrentBodyType,
//     selectedDesiredBodyType,
//     maintenanceCalories,
//     user,
//   } = route.params;

//   const [result, setResult] = useState('');

//   useEffect(() => {
//     if (user) {
//       calculateDeficitSurplus();
//     }
//   }, [user]);

//   const calculateDeficitSurplus = async () => {
//     if (selectedCurrentBodyType && selectedDesiredBodyType) {
//       const currentBodyFatPercentage = selectedCurrentBodyType.bodyFatPercentage;
//       const desiredBodyFatPercentage = selectedDesiredBodyType.bodyFatPercentage;

//       // Calculate calorie requirements for current and desired body fat percentages
//       const currentCalories = maintenanceCalories / (1 - currentBodyFatPercentage / 100);
//       const desiredCalories = maintenanceCalories / (1 - desiredBodyFatPercentage / 100);

//       // Calculate the calorie surplus or deficit
//       const calorieChange = desiredCalories - currentCalories;

//       // Calculate the rate of weight change (assuming 7700 kcal per kg of body fat)
//       const weightChangeRate = calorieChange / (maintenanceCalories * 0.2); // Assuming 7700 kcal per 1 kg

//       let resultString = '';
//       if (calorieChange > 0) {
//         resultString = `${calorieChange.toFixed(2)} kcal surplus, ${weightChangeRate.toFixed(
//           2
//         )} kg/week gain`;
//       } else if (calorieChange < 0) {
//         resultString = `${Math.abs(calorieChange).toFixed(2)} kcal deficit, ${Math.abs(
//           weightChangeRate
//         ).toFixed(2)} kg/week loss`;
//       } else {
//         resultString = 'No calorie change';
//       }

//       // Update Firestore with the result
//       try {
//         const userDocRef = doc(db, 'Users', user.uid); // Replace 'Users' with your Firestore collection name
//         await updateDoc(userDocRef, {
//           surplusOrDeficit: arrayUnion(resultString), // Store the result as a string
//         });

//         console.log('Firestore updated with result:', resultString);
//       } catch (error) {
//         console.error('Error updating Firestore:', error);
//       }

//       setResult(resultString);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.resultText}>
//         Current Body Type: {selectedCurrentBodyType.name}
//       </Text>
//       <Text style={styles.resultText}>
//         Desired Body Type: {selectedDesiredBodyType.name}
//       </Text>
//       <Text style={styles.resultText}>
//         Maintenance Calories: {maintenanceCalories} kcal
//       </Text>
//       <Text style={styles.resultText}>Result: {result}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   resultText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'black',
//   },
// });
