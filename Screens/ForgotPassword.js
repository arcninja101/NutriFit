import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const sendResetEmail = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent successfully
        Alert.alert(
          'Password Reset Email Sent',
          'Check your email to reset your password.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Home'); // Navigate to the "Home" screen
              },
            },
          ]
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Send Reset Email" onPress={sendResetEmail} />
    </View>
  );
}

// ... Styles

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
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
  });
  