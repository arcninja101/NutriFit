
import React, { useState } from 'react';
import { View, Text, TextInput, Button,StyleSheet,ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';



//const backgroundImage = require("../assets/bgimgcalorie.png");

export default function App() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [maintenanceCalories, setMaintenanceCalories] = useState(null);
  const navigation = useNavigation();


  const calculateMaintenanceCalories = () => {
    if (age && weight && height) {
      let bmr;
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }

      const activityMultiplier = parseFloat(activityLevel);
      const maintenanceCalories = bmr * activityMultiplier;
      setMaintenanceCalories(maintenanceCalories.toFixed(2));
    }
  };
  const goToBodyType = () => {
    props.navigation.navigate('CurrentBodyTypeScreen');
  };

  return (
    <View style={styles.container}>
     {/* <ImageBackground source={backgroundImage} style={styles.backgroundImage} /> */}
     <View style={styles.button2style}>
        <Button title="Back" onPress={() => navigation.goBack()} color={"black"} />
      </View>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#FFBC6E", left: 267, top: 39, position: "absolute" }}>NutriFit </Text>


      <Text style={styles.label}>Age:</Text>
      <TextInput
        keyboardType="numeric"
        value={age}
        placeholder='Enter Age'
        onChangeText={setAge}
        style={styles.input}
      />
      <Text style={styles.label}>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Text style={styles.label}>Weight (kg):</Text>
      <TextInput
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        placeholder='Enter Weight'
      />
      <Text style={styles.label}>Height (cm):</Text>
      <TextInput
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
        placeholder='Enter Height'

      />
      <Text style={styles.label}>Activity Level:</Text>
      <Picker
        selectedValue={activityLevel}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sedentary (Little or no exercise)" value="1.2" />
        <Picker.Item label="Light exercise/sports 1-3 days/week" value="1.375" />
        <Picker.Item label="Moderate exercise/sports 3-5 days/week)" value="1.55" />
        <Picker.Item label="Hard exercise/sports 6-7 days a week" value="1.725" />
        <Picker.Item label="Very hard exercise/sports & physical job" value="1.9" />
      </Picker>
      <View style={styles.buttonstyle}>
        <Button title="Calculate Maintenance Calories" onPress={calculateMaintenanceCalories} color={"black"} />
      </View>
      {maintenanceCalories !== null && <Text style={styles.result}>Maintenance Calories: {maintenanceCalories} kcal/day</Text>}
      <View style={styles.button1style}>
        <Button title="Body Type" onPress={() => {navigation.navigate('CurrentBodyTypeScreen', { maintenanceCalories });}}
          color={"black"}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight:"bold",
    color:"darkgreen",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:20,
    backgroundColor:"white",
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 10,
    backgroundColor:"white",
    borderRadius:20,
  },
  backgroundImage: {
    position: 'absolute',
    width: "100%",
    height: "100%",
  },
  button1style:{
    position: "absolute",
    top: 400,
    left: 20,
  },
  button2style: {
    position: "absolute",
    top: 39,
    left: 20,
    borderRadius: 4,
  },
  result: {
    fontSize: 18,
    marginTop: 10,
    padding:5,
    borderRadius:20,
    top:17,
    fontWeight:"bold",
    color:"white",
    backgroundColor:"#3E7419"
  },
  buttonstyle:{
    top:10,
}
});
