
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require("../assets/bgimgbmi.png");

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmiResult, setBMIResult] = useState(null);
  const navigation = useNavigation();
  const [isPickerVisible, setIsPickerVisible] = useState(false); // Track whether Picker is visible

  const calculateBMI = () => {
    // Convert weight and height to numbers
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Convert weight to kg if in lbs
    const weightInKg = weightUnit === 'lbs' ? weightValue * 0.45359237 : weightValue;

    // Convert height to meters if in inches
    const heightInMeters = heightUnit === 'inches' ? heightValue * 0.0254 : heightValue / 100;

    if (!isNaN(weightInKg) && !isNaN(heightInMeters) && heightInMeters > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      setBMIResult(bmi.toFixed(2));
    } else {
      setBMIResult(null);
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
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.button2style}>
        <Button title="Back" onPress={() => navigation.goBack()} color={"black"} />
      </View>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#FFBC6E", left: 267, top: 39, position: "absolute" }}>NutriFit </Text>

      <Text style={styles.title}>BMI Calculator</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={`Enter weight (${weightUnit})`}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
          style={styles.input}
          onFocus={() => setIsPickerVisible(true)} // Show Picker when TextInput is focused
        />
        {isPickerVisible && (
          <Picker
            selectedValue={weightUnit}
            onValueChange={(itemValue) => {
              setWeightUnit(itemValue);
              setIsPickerVisible(false); // Hide Picker when an option is selected
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
          onFocus={() => setIsPickerVisible(true)} // Show Picker when TextInput is focused
        />
        {isPickerVisible && (
          <Picker
            selectedValue={heightUnit}
            onValueChange={(itemValue) => {
              setHeightUnit(itemValue);
              setIsPickerVisible(false); // Hide Picker when an option is selected
            }}
            style={styles.picker}
          >
            <Picker.Item label="cm" value="cm" />
            <Picker.Item label="inches" value="inches" />
          </Picker>
        )}
      </View>

      <View style={styles.buttonstyle}>
        <Button title="Calculate BMI" onPress={calculateBMI} />
      </View>
      {bmiResult !== null && (
        <View>
        <Text style={styles.resultText}>Your BMI: {bmiResult}</Text>
        <Text style={styles.resultText}>BMI Category: {getBMICategory()}</Text>

         </View> 

      )}

      {/* <StatusBar style="auto" /> */}
      <Text style={styles.disclaimerText}>
        *DISCLAIMER: This scale is not applicable for bodybuilders as the weight may vary due to muscle mass and body fat percentage*
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    top: -35,
    left: 44,
  },
  backgroundImage: {
    position: 'absolute',
    width: "100%",
    height: "100%",
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "red",
    top:-45,
    left:70,
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    top:25,
    left:40,
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
  },
  buttonstyle: {
    position: "absolute",
    top: 430,
    left: 163,
    borderRadius: 40,
  },
  button2style: {
    position: "absolute",
    top: 39,
    left: 20,
    borderRadius: 4,
  },
  textInputContainer: {
    position: 'relative',
    width: '80%',
  },
  picker: {
    position: 'absolute',
    right: 10,
    top: -50,
    left:200,
    height: 40,
    width: 100,
    color:"grey",
  },
  disclaimerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    top: 715,
    position: "absolute",
    justifyContent: "center",
  },
});