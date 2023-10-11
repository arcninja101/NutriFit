



import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';

export default function ResultScreen({ route }) {
  const {
    selectedCurrentBodyType,
    selectedDesiredBodyType,
    maintenanceCalories,
  } = route.params;

  const navigation = useNavigation();

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
      <View style={styles.button}>
      <Button title="Go to Home" onPress={() => navigation.navigate('MainScreen')} />

      </View>
      <Text style={styles.resultText}>
        Current Body Type: {selectedCurrentBodyType.name}
      </Text>
      <Text style={styles.resultText}>
        Desired Body Type: {selectedDesiredBodyType.name}
      </Text>
      <Text style={styles.resultText}>
        Maintenance Calories: {maintenanceCalories} kcal
      </Text>
      <Text> </Text>
      <Text style={styles.finaltext}>Result: {calculateDeficitSurplus()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button:{
    position:"absolute",
    top:20,
    left:10,
  },
  finaltext:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#3E7419"
  }
});
