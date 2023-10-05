

// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// const bodyTypes = [
//   {
//     name: '7% Bodyfat',
//     image: require('../assets/7%.png'),
//     bodyFatPercentage: 7,
//   },
//   {
//     name: '10%',
//     image: require('../assets/10%.png'),
//     bodyFatPercentage: 10,
//   },
//   {
//     name: '12%',
//     image: require('../assets/12%.png'),
//     bodyFatPercentage: 12,
//   },
//   {
//     name: '15%',
//     image: require('../assets/15%.png'),
//     bodyFatPercentage: 15,
//   },
//   {
//     name: '22%',
//     image: require('../assets/22%.png'),
//     bodyFatPercentage: 22,
//   },
//   // Add more body types as needed
// ];

// export default function BodyTypeScreen({ route }) {
//   const { maintenanceCalories } = route.params;
//   const [selectedBodyType, setSelectedBodyType] = useState(null);

//   const calculateDeficitSurplus = () => {
//     if (selectedBodyType) {
//       const bodyFatPercentage = selectedBodyType.bodyFatPercentage;
//       const caloriesNeeded = maintenanceCalories;
//       const deficitSurplus = (caloriesNeeded * (bodyFatPercentage / 100)).toFixed(2);
//       return deficitSurplus;
//     }
//     return null;
//   };
  

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <Text style={styles.title}>Choose a Body Type</Text>
//       {bodyTypes.map((bodyType, index) => (
//         <View key={index} style={styles.bodyTypeContainer}>
//           <View style={styles.bodyTypeItem}>
//             <Image source={bodyType.image} style={styles.bodyTypeImage} />
//             <Text style={styles.bodyTypeName}>{bodyType.name}</Text>
//           </View>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.selectButton, !maintenanceCalories && styles.disabledButton]}
//               onPress={() => setSelectedBodyType(bodyType)}
//               disabled={!maintenanceCalories}
//             >
//               <Text style={styles.buttonText}>Select</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//       {selectedBodyType && (
//         <View style={styles.result}>
//           <Text style={styles.resultText}>
//             Selected Body Type: {selectedBodyType.name}
//           </Text>
//           <Text style={styles.resultText}>
//             Body Fat Percentage: {selectedBodyType.bodyFatPercentage}%
//           </Text>
//           <Text style={styles.resultText}>
//             {calculateDeficitSurplus()} kcal {calculateDeficitSurplus() > maintenanceCalories ? 'surplus' : 'deficit'}
//           </Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     flexGrow: 1,
//     backgroundColor: '#101d32', // Dark background color
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#50a7c2', // Blue text color
//   },
//   bodyTypeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   bodyTypeItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   bodyTypeImage: {
//     width: 150,
//     height: 150,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   bodyTypeName: {
//     color: 'white', // White text color
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   selectButton: {
//     backgroundColor: '#50a7c2', // Blue button background color
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   disabledButton: {
//     backgroundColor: '#707070', // Grayed-out button background color
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   result: {
//     marginTop: 20,
//   },
//   resultText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: 'white', // White text color
//   },
// });


import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'; // Import Card component

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
  },
];

export default function BodyTypeScreen({ route }) {
  const { maintenanceCalories } = route.params;
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const calculateDeficitSurplus = () => {
    if (selectedBodyType) {
      const bodyFatPercentage = selectedBodyType.bodyFatPercentage;
      const caloriesNeeded = maintenanceCalories;
      const deficitSurplus = (caloriesNeeded * (bodyFatPercentage / 100)).toFixed(2);
      return deficitSurplus;
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>Choose a Body Type</Text>
      {bodyTypes.map((bodyType, index) => (
        <View key={index} style={styles.bodyTypeContainer}>
          <Card containerStyle={styles.cardContainer}> {/* Use Card component */}
            <Image source={bodyType.image} style={styles.bodyTypeImage} />
            <Text style={styles.bodyTypeName}>{bodyType.name}</Text>
            <TouchableOpacity
              style={[styles.selectButton, !maintenanceCalories && styles.disabledButton]}
              onPress={() => setSelectedBodyType(bodyType)}
              disabled={!maintenanceCalories}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </Card>
        </View>
      ))}
      {selectedBodyType && (
  <View style={styles.result}>
    <Text style={styles.resultText}>
      Selected Body Type: {selectedBodyType.name}
    </Text>
    <Text style={styles.resultText}>
      Body Fat Percentage: {selectedBodyType.bodyFatPercentage}%
    </Text>
    <Text style={styles.resultText}>
      {calculateDeficitSurplus()} kcal{' '}
      {calculateDeficitSurplus() > maintenanceCalories
        ? 'surplus'
        : 'deficit'}
    </Text>
  </View>
)}
    </ScrollView>
  );
}

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
    borderRadius: 10, // Adjust as needed
    backgroundColor: '#21293e', // Card background color
    borderWidth: 0, // Remove card border
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
