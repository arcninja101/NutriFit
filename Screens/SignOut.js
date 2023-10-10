// // SignOut.js
// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { CommonActions } from '@react-navigation/native';

// const SignOut = () => {
//   const navigation = useNavigation();

//   // Handle the sign-out button press
//   const handleSignOut = () => {
//     // Implement your sign-out logic here
//     // For example, clear user data or perform any necessary actions.

//     // Reset the navigation stack to the initial route
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: 'Home' }], // Replace 'Home' with your initial route
//       })
//     );
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Do you want to sign out?</Text>
//       <Button title="Sign Out" onPress={handleSignOut} />
//     </View>
//   );
// };

// export default SignOut;



// SignOut.js
import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const SignOut = () => {
  const navigation = useNavigation();
  const [signedOut, setSignedOut] = useState(false);

  // Handle the sign-out button press
  const handleSignOut = () => {
    // Implement your sign-out logic here
    // For example, clear user data or perform any necessary actions.

    // Reset the navigation stack to the initial route
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }], // Replace 'Home' with your initial route
      })
    );

    // Set signedOut state to true to trigger the alert
    setSignedOut(true);
  };

  // Show an alert when signedOut state is true
  if (signedOut) {
    Alert.alert(
      'Signed Out',
      'You have successfully signed out.',
      [{ text: 'OK', onPress: () => setSignedOut(false) }],
      { cancelable: false }
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Do you want to sign out?</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default SignOut;
