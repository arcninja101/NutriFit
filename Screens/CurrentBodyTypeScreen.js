import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

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

export default function CurrentBodyTypeScreen({ route }) {
  const { maintenanceCalories } = route.params;
  const [selectedCurrentBodyType, setSelectedCurrentBodyType] = useState(null);
  const navigation = useNavigation();

  const handleCurrentBodyTypeSelect = (bodyType) => {
    setSelectedCurrentBodyType(bodyType);
    navigation.navigate('DesiredBodyTypeScreen', {
      selectedCurrentBodyType: bodyType,
      maintenanceCalories,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {bodyTypes.map((bodyType, index) => (
        <View key={index} style={styles.bodyTypeContainer}>
          <Card containerStyle={styles.cardContainer}>
            <Image source={bodyType.image} style={styles.bodyTypeImage} />
            <Text style={styles.bodyTypeName}>{bodyType.name}</Text>
            <TouchableOpacity
              style={[styles.selectButton, !maintenanceCalories && styles.disabledButton]}
              onPress={() => handleCurrentBodyTypeSelect(bodyType)}
              disabled={!maintenanceCalories}
            >
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </Card>
        </View>
      ))}
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
   // backgroundColor: '#101d32',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, // Add margin to the top
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
    //backgroundColor: '#21293e',
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
});
