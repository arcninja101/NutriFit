// import React from 'react';
// import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
// import { Card } from 'react-native-elements';




// const App = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.cardContainer}>
//         <Card title="Local Modules">
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using "react-native-elements"
//           </Text>
//           <Button title="Calculate Maintenance Calories" color="#B27D40" fontWeight="bold" />
//         </Card>
//       </View>
//       <View style={styles.cardContainer}>
//         <Card title="Local Modules">
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using "react-native-elements"
//           </Text>
//         </Card>
//       </View>
//       <View style={styles.cardContainer}>
//         <Card title="Local Modules">
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using "react-native-elements"
//           </Text>
//           <Button title="Calculate Maintenance Calories" color="#B27D40" fontWeight="bold" />
//         </Card>
//       </View>
//       <View style={styles.cardContainer}>
//         <Card title="Local Modules">
//           <Text style={styles.paragraph}>
//             React Native Card View for Android and IOS using "react-native-elements"
//           </Text>
//         </Card>
//       </View>
//     </ScrollView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#ecf0f1',
//   },
//   cardContainer: {
//     paddingHorizontal:30,
//     paddingVertical: 20,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// });



// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, View, Text, Button, Image } from 'react-native';
// import { Card } from 'react-native-elements';

// // Define body fat data
// const bodyFatData = [
//   {
//     title: 'Body Type 1',
//     image: require('../assets/7%.png'), // Replace with the actual image path
//     fatPercentage: 15,
//   },
//   {
//     title: 'Body Type 2',
//     image: require('../assets/10%.png'), // Replace with the actual image path
//     fatPercentage: 20,
//   },
//   // Add more body types as needed
// ];

// const App = () => {
//   const [selectedBodyFat, setSelectedBodyFat] = useState(null);

//   // Function to handle button click
//   const handleCalculate = (fatPercentage) => {
//     // Perform calculations based on the selected body fat percentage
//     console.log(`Calculating for Body Fat Percentage: ${fatPercentage}%`);
//     // Add your calculations here
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {bodyFatData.map((item, index) => (
//         <View style={styles.cardContainer} key={index}>
//           <Card title={item.title}>
//             <Image source={item.image} style={styles.image} />
//             <Text style={styles.paragraph}>
//               Body Fat Percentage: {item.fatPercentage}%
//             </Text>
//             <Button
//               title="Calculate Maintenance Calories"
//               color="#B27D40"
//               fontWeight="bold"
//               onPress={() => handleCalculate(item.fatPercentage)}
//             />
//           </Card>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#ecf0f1',
//   },
//   cardContainer: {
//     paddingHorizontal: 30,
//     paddingVertical: 20,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
//   image: {
//     width: 200, // Adjust the width as needed
//     height: 200, // Adjust the height as needed
//     alignSelf: 'center',
//   },
// });

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const bodyTypes = [
    {
        name: '7%',
        image: require('../assets/7%.png'),
        bodyFatPercentage: 7,
      },
      {
        name: '10%',
        image: require('../assets/10%.png'),
        bodyFatPercentage: 10,
      },
      {
        name: '12%',
        image: require('../assets/12%.png'),
        bodyFatPercentage: 12,
      },
      {
        name: '15%',
        image: require('../assets/15%.png'),
        bodyFatPercentage: 15,
      },
      {
        name: '22%',
        image: require('../assets/22%.png'),
        bodyFatPercentage: 22,
      },];

export default function BodyTypeScreen({ route }) {
  const { maintenanceCalories } = route.params;
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  // Handle body type selection and navigate to ResultScreen
  const handleBodyTypeSelect = (bodyType) => {
    setSelectedBodyType(bodyType);
    navigation.navigate('ResultScreen', { selectedBodyType, maintenanceCalories });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Choose a Body Type</Text>
      {bodyTypes.map((bodyType, index) => (
        <View key={index} style={styles.bodyTypeContainer}>
          <Card containerStyle={styles.cardContainer}>
            <Image source={bodyType.image} style={styles.bodyTypeImage} />
            <Text style={styles.bodyTypeName}>{bodyType.name}</Text>
            <TouchableOpacity
              style={[styles.selectButton, !maintenanceCalories && styles.disabledButton]}
              onPress={() => handleBodyTypeSelect(bodyType)}
              disabled={!maintenanceCalories}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </Card>
        </View>
      ))}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#101d32',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#50a7c2',
      },
      bodyTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      cardContainer: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#21293e',
        borderWidth: 0,
        padding: 20,
      },
      bodyTypeImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
      },
      bodyTypeName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      selectButton: {
        backgroundColor: '#50a7c2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      disabledButton: {
        backgroundColor: '#707070',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      result: {
        marginTop: 20,
      },
      resultText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
      },
});
