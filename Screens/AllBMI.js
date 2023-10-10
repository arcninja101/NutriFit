import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase app outside the component
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
const db = getFirestore(app);
const auth = getAuth();

const AllBMI = () => {
  const [bmiHistory, setBMIHistory] = useState([]);
  const [userUID, setUserUID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes to get the user UID
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUID = user.uid;
        setUserUID(userUID);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchBMIHistory = async (userUID) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const q = query(collection(db, 'Users'), where('UID', '==', userUID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userBMIHistory = userData.BMIHistory || [];
        setBMIHistory(userBMIHistory);
      } else {
        setBMIHistory([]);
      }
    } catch (error) {
      console.error('Error fetching BMI history:', error);
      setError(error.message); // Set error message in state
    } finally {
      setLoading(false);
    }
  };

  const renderBMIItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI History</Text>
      <Button
        title="Retrieve BMI History"
        onPress={() => fetchBMIHistory(userUID)}
        disabled={loading}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={bmiHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBMIItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  item: {
    margin: 10,
    fontSize: 18,
  },
});

export default AllBMI;
