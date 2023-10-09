// import React, { useState } from 'react';
// import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker'; // You may need to install this package
// import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
// import { collection, addDoc, serverTimestamp,getFirestore } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: 'AIzaSyBnYk_i7HmsBsBEgNX0Bsjg7VC25w_cGXw',
//     authDomain: 'nutrifit-29526.firebaseapp.com',
//     databaseURL: 'https://nutrifit-29526.firebaseio.com',
//     projectId: 'nutrifit-29526',
//     storageBucket: 'nutrifit-29526.appspot.com',
//     messagingSenderId: 'sender-id',
//     appId: '1:337410191828:android:78054b4d777dce4c602641',
//     measurementId: 'G-measurement-id',
//   };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();
  


// export default function ImageUpload({ navigation }) {
//   const [imageUri, setImageUri] = useState(null);

//   const handleImageUpload = () => {
//     launchImageLibrary({ mediaType: 'photo' }, async (response) => {
//       if (response.uri) {
//         try {
//           const imageRef = ref(getStorage(), `images/${Date.now()}.jpg`);
//           await uploadString(imageRef, response.uri, 'data_url');

//           const downloadUrl = await getDownloadURL(imageRef);
//           const uploadDate = serverTimestamp();

//           // Store the download URL and upload date in Firestore
//           await addDoc(collection(db, 'images'), {
//             imageUrl: downloadUrl,
//             uploadDate: uploadDate,
//           });

//           Alert.alert(
//             'Image Uploaded',
//             'The image has been successfully uploaded and stored.',
//             [
//               {
//                 text: 'OK',
//                 onPress: () => {
//                   setImageUri(null);
//                 },
//               },
//             ]
//           );
//         } catch (error) {
//           console.error('Error uploading image:', error);
//           Alert.alert('Upload Error', 'An error occurred while uploading the image.');
//         }
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {imageUri ? (
//         <Image source={{ uri: imageUri }} style={styles.image} />
//       ) : (
//         <Text>No Image Selected</Text>
//       )}

//       <TouchableOpacity onPress={handleImageUpload}>
//         <Text style={styles.uploadButton}>Upload Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 20,
//   },
//   uploadButton: {
//     fontSize: 18,
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });



// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebaseConfig';

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       //aspect: [16, 9],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }






// import React, { useState, useCallback } from 'react';
// import { Button, Image, View, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import { storage } from '../firebaseConfig';

// export default function ImageUpload({ navigation }) {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadURL, setDownloadURL] = useState(null);

//   const pickImage = useCallback(async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   }, []);

//   const uploadImage = async (userUid) => {
//     try {
//       if (!image) {
//         console.error('No image selected');
//         return;
//       }

//       setUploading(true);

//       // Reference the user's folder with their UID as the name
//       const folderRef = ref(storage, `images/${userUid}`);

//       // Generate a unique filename for the image
//       const timestamp = new Date().getTime();
//       const fileName = `${timestamp}.jpg`;

//       // Create a reference to the file in the user's folder
//       const fileRef = ref(folderRef, fileName);

//       // Upload the image to Firebase Storage
//       await uploadBytes(fileRef, image);

//       // Get the download URL for the uploaded image
//       const imageURL = await getDownloadURL(fileRef);

//       setDownloadURL(imageURL);
//       console.log('Image uploaded:', imageURL);

//       // Navigate to the NewsScreen with the image URL
//       navigation.navigate('NewScreen', { uid: userUid });
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Get the user's UID
//   const auth = getAuth();
//   const user = auth.currentUser;

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       <Button title="Upload" onPress={() => uploadImage(user.uid)} disabled={!image || uploading} />
//       {uploading && <Text>Uploading...</Text>}
//       <Button
//         title="Next"
//         onPress={() => navigation.navigate('NewScreen', { uid: user.uid })}
//         disabled={!downloadURL}
//       />
//     </View>
//   );
// }



import React, { useState, useCallback } from 'react';
import { Button, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { storage } from '../firebaseConfig';

export default function ImageUpload({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1, // Set quality to 1 (full quality) to avoid compression
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }, []);

  const uploadImage = async (userUid) => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }

      setUploading(true);

      // Get the user's UID
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      // Reference the user's folder with their UID as the name
      const folderRef = ref(storage, `images/${userUid}`);

      // Generate a unique filename for the image
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}.jpg`;

      // Create a reference to the file in the user's folder
      const fileRef = ref(folderRef, fileName);

      // Convert the image URI to a Blob
      const response = await fetch(image);
      const blob = await response.blob();

      // Upload the Blob to Firebase Storage without compression
      await uploadBytes(fileRef, blob);

      // Get the download URL for the uploaded image
      const imageURL = await getDownloadURL(fileRef);

      setDownloadURL(imageURL);
      console.log('Image uploaded:', imageURL);

      // Navigate to the NewsScreen with the image URL
      navigation.navigate('NewScreen', { uid: userUid });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  // Get the user's UID
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} disabled={uploading} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload" onPress={() => uploadImage(user.uid)} disabled={!image || uploading} />
      {uploading && <Text>Uploading...</Text>}
      <Button
        title="Next"
        onPress={() => navigation.navigate('NewScreen', { uid: user.uid })}
        disabled={!downloadURL}
      />
    </View>
  );
}

