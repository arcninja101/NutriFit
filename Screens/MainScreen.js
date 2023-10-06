
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { Card } from 'react-native-elements';

// import { Linking } from 'react-native';

// import { initializeApp } from 'firebase/app';
// import Svg, { Image } from 'react-native-svg';

// const backgroundImage = require('../assets/bgimg3.jpg');

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

// export default function MainScreen(props) {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState('');

//   const openNutritionWebsite = async () => {
//     const url = 'https://www.medicalnewstoday.com/categories/nutrition-diet';

//     try {
//       const supported = await Linking.canOpenURL(url);

//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         console.error('Cannot open the URL:', url);
//       }
//     } catch (error) {
//       console.error('Error opening the URL:', error);
//     }
//   };

//   useEffect(() => {
//     const db = getFirestore(app);
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, 'Users', user.uid); // Replace 'Users' with your Firestore collection name
//           const userDocSnapshot = await getDoc(userDocRef);
//           if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             const userDisplayName = userData.Name; // Make sure to use the correct field name in Firestore
//             setUserName(userDisplayName);
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Card title="Local Modules">
//           {/*react-native-elements Card*/}
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using
//             "react-native-elements"
//           </Text>
//         </Card>
//         <Card title="Local Modules">
//           {/*react-native-elements Card*/}
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using
//             "react-native-elements"
//           </Text>
          
//         </Card>
//       <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFBC6E', left: 267, top: 39, position: 'absolute' }}>
//         NutriFit
//       </Text>
//       <View style={styles.button1style}>
//         <Button title="Calculate BMI" onPress={() => navigation.navigate('BMICalculator')} color="black" />
//       </View>
//       <View style={styles.button2style}>
//         <Button title="Calculate Maintenance Calorie" onPress={() => navigation.navigate('CalorieCalculator')} color="black" />
//       </View>
//       <TouchableOpacity
//         style={styles.button3style}
//         onPress={() => openNutritionWebsite()}
//       >
//         <View style={styles.buttonContainer}>
//           <Text style={styles.buttonText}>Read more about Nutrition</Text>
//         </View>
//       </TouchableOpacity>

//       <Text style={styles.text}>Welcome {userName}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     top: -300,
//   },
//   button1style: {
//     position: 'absolute',
//     top: 500,
//     left: 133,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
//   button2style: {
//     position: 'absolute',
//     top: 550,
//     left: 70,
//   },
//   button3style: {
//     position: 'absolute',
//     top: 600,
//     left: 133,
//   },
//   buttonContainer: {
//     backgroundColor: 'rgba(255, 92, 87, 0.8)', // Customize the color here
//     borderRadius: 20, // Adjust the border radius as needed
//     padding: 10,
//     left:-40,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });




// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { Card } from 'react-native-elements';

// import { Linking } from 'react-native';

// import { initializeApp } from 'firebase/app';
// import Svg, { Image } from 'react-native-svg';

// const backgroundImage = require('../assets/bgimg3.jpg');

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

// export default function MainScreen(props) {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState('');

//   const openNutritionWebsite = async () => {
//     const url = 'https://www.medicalnewstoday.com/categories/nutrition-diet';

//     try {
//       const supported = await Linking.canOpenURL(url);

//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         console.error('Cannot open the URL:', url);
//       }
//     } catch (error) {
//       console.error('Error opening the URL:', error);
//     }
//   };

//   useEffect(() => {
//     const db = getFirestore(app);
//     const auth = getAuth();

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, 'Users', user.uid); // Replace 'Users' with your Firestore collection name
//           const userDocSnapshot = await getDoc(userDocRef);
//           if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             const userDisplayName = userData.Name; // Make sure to use the correct field name in Firestore
//             setUserName(userDisplayName);
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFBC6E', left: 267, top: 39, position: 'absolute' }}>
//           NutriFit
//         </Text>
//         <Card title="Local Modules">
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using "react-native-elements"
//           </Text>
//           <View style={styles.button1style}>
//             <Button title="Calculate BMI" onPress={() => navigation.navigate('BMICalculator')} color="black" />
//           </View>
//         </Card>
//         <Card title="Local Modules">
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using "react-native-elements"
//           </Text>
//           <View style={styles.button2style}>
//             <Button title="Calculate Maintenance Calorie" onPress={() => navigation.navigate('CalorieCalculator')} color="black" />
//           </View>
//         </Card>
//         <Card title="Nutrition">
//           <Text style={styles.paragraph}>Read more about Nutrition</Text>
//           <TouchableOpacity style={styles.button3style} onPress={() => openNutritionWebsite()}>
//             <View style={styles.buttonContainer}>
//               <Text style={styles.buttonText}>Go to website</Text>
//             </View>
//           </TouchableOpacity>
//         </Card>
//         <Text style={styles.text}>Welcome {userName}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     top: -300,
//   },
//   button1style: {
//     marginTop: 10,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
//   button2style: {
//     marginTop: 10,
//   },
//   button3style: {
//     marginTop: 10,
//   },
//   buttonContainer: {
//     backgroundColor: 'rgba(255, 92, 87, 0.8)',
//     borderRadius: 20,
//     padding: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     left:65
//   },
// });



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Card } from 'react-native-elements';

import { Linking } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { initializeApp } from 'firebase/app';
import Svg, { Image } from 'react-native-svg';

const backgroundImage = require('../assets/bgimg3.jpg');



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

export default function MainScreen(props) {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [latestBMI, setLatestBMI] = useState(null);
  const [latestMaintenanceCalories, setLatestMaintenanceCalories] = useState(null);
  const Drawer = createDrawerNavigator();


  const openNutritionWebsite = async () => {
    const url = 'https://www.medicalnewstoday.com/categories/nutrition-diet';

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Cannot open the URL:', url);
      }
    } catch (error) {
      console.error('Error opening the URL:', error);
    }
  };

  useEffect(() => {
    const db = getFirestore(app);
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'Users', user.uid); // Replace 'Users' with your Firestore collection name
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const userDisplayName = userData.Name; // Make sure to use the correct field name in Firestore
            setUserName(userDisplayName);
            // Fetch the latest BMI and maintenance calories
            const latestBMIValue = userData.BMIHistory ? userData.BMIHistory[0] : null;
            const latestCaloriesValue = userData.Calories ? userData.Calories[0] : null;

            setLatestBMI(latestBMIValue);
            setLatestMaintenanceCalories(latestCaloriesValue);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome {userName}</Text>
        {/* <Text style={styles.nutrifitText}>NutriFit</Text> */}
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFBC6E', left: 240, top: 3, position: 'absolute' }}>
          NutriFit
        </Text>
        {latestBMI !== null && (
          <Card title="Latest BMI">
            <Text style={styles.paragraph}>Your current BMI: {latestBMI}</Text>
          </Card>
        )}

        {latestMaintenanceCalories !== null && (
          <Card title="Latest Maintenance Calories">
            <Text style={styles.paragraph}>Your current maintenance calories: {latestMaintenanceCalories} kcal/day</Text>
          </Card>
        )}

        <Card title="Local Modules">
          <Text style={styles.paragraph}>
            To know your Body Mass Index (BMI) click here
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('BMICalculator')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Calculate BMI</Text>
            </View>
          </TouchableOpacity>
        </Card>
        <Card title="Local Modules">
          <Text style={styles.paragraph}>
            To calculate your daily maintenance calories click here
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('CalorieCalculator')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Calculate Maintenance Calorie</Text>
            </View>
          </TouchableOpacity>
        </Card>
        {/* <Card title="Local Modules">
          <Text style={styles.paragraph}>
            React Native Card View for Android and IOS using "react-native-elements"
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('CalorieCalculator')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Calculate Maintenance Calorie</Text>
            </View>
          </TouchableOpacity>
        </Card> */}
        {/* <Card title="Local Modules">
          <Text style={styles.paragraph}>
            React Native Card View for Android and IOS using "react-native-elements"
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('CalorieCalculator')}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Calculate Maintenance Calorie</Text>
            </View>
          </TouchableOpacity>
        </Card> */}
        <Card title="Nutrition">
          <Text style={styles.paragraph}>Read more about Nutrition</Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => openNutritionWebsite()}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Read more</Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    paddingBottom: 10,
    paddingTop: 60,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
  buttonStyle: {
    marginTop: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 92, 87, 0.8)',
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});