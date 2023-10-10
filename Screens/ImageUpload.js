


// import React, { useState, useCallback } from 'react';
// import { Button, Image, View, Text, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import { storage } from '../firebaseConfig';
// import { Card } from 'react-native-elements';

// export default function ImageUpload({ navigation }) {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadURL, setDownloadURL] = useState(null);

//   const pickImage = useCallback(async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       quality: 1, // Set quality to 1 (full quality) to avoid compression
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

//       // Get the user's UID
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (!user) {
//         console.error('User not authenticated');
//         return;
//       }

//       // Reference the user's folder with their UID as the name
//       const folderRef = ref(storage, `images/${userUid}`);

//       // Generate a unique filename for the image
//       const timestamp = new Date().getTime();
//       const fileName = `${timestamp}.jpg`;

//       // Create a reference to the file in the user's folder
//       const fileRef = ref(folderRef, fileName);

//       // Convert the image URI to a Blob
//       const response = await fetch(image);
//       const blob = await response.blob();

//       // Upload the Blob to Firebase Storage without compression
//       await uploadBytes(fileRef, blob);

//       // Get the download URL for the uploaded image
//       const imageURL = await getDownloadURL(fileRef);

//       setDownloadURL(imageURL);
//       console.log('Image uploaded:', imageURL);

//       // Clear the selected image
//       setImage(null);
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
//       <Card title="Nutrition" style={styles.cards}>
//         <Card title="Nutrition">
//           <Text style={styles.paragraph}>Your image here</Text>
//           {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         </Card>
//         <Text> </Text>
//         <Button title="Pick image from Gallery" onPress={pickImage} disabled={uploading} />
//         <Button title="Upload" onPress={() => uploadImage(user.uid)} disabled={!image || uploading} />
//       </Card>

//       <Card title="Next" style={styles.nextButtonCard}>
//         <Button
//           title="Next"
//           onPress={() => {
//             // Navigate to the next screen only if downloadURL is available
//             if (downloadURL) {
//               navigation.navigate('NewScreen', { uid: user.uid, downloadURL });
//             }
//           }}
//           disabled={!downloadURL}
//         />
//       </Card>

//       {uploading && <Text>Uploading...</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
//   cards: {
//     marginBottom: 20,
//   },
//   nextButtonCard: {
//     width: '100%',
//   },
// });


// import React, { useState, useCallback, useEffect } from 'react';
// import { Button, Image, View, Text, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// import { storage } from '../firebaseConfig';
// import { Card } from 'react-native-elements';

// export default function ImageUpload({ navigation }) {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadURL, setDownloadURL] = useState(null);
//   const [storageEmpty, setStorageEmpty] = useState(false);

//   // Function to check if storage is empty for the current user
//   const checkStorageEmpty = async (userUid) => {
//     try {
//       // Reference the user's folder inside the "images" folder
//       const folderRef = ref(storage, `images/${userUid}`);

//       // List all items in the user's folder
//       const listResult = await listAll(folderRef);

//       // If the listResult is empty, storage is empty for this user
//       setStorageEmpty(listResult.items.length === 0);
//     } catch (error) {
//       console.error('Error checking storage:', error);
//     }
//   };

//   useEffect(() => {
//     // Get the user's UID
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       // Check if storage is empty for the current user
//       checkStorageEmpty(user.uid);
//     }
//   }, []);

//   const pickImage = useCallback(async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       quality: 1, // Set quality to 1 (full quality) to avoid compression
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

//       // Convert the image URI to a Blob
//       const response = await fetch(image);
//       const blob = await response.blob();

//       // Upload the Blob to Firebase Storage without compression
//       await uploadBytes(fileRef, blob);

//       // Get the download URL for the uploaded image
//       const imageURL = await getDownloadURL(fileRef);

//       setDownloadURL(imageURL);
//       console.log('Image uploaded:', imageURL);

//       // Check if storage is empty after upload
//       checkStorageEmpty(userUid);
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
//       <Card title="Nutrition" style={styles.cards}>
//         <Card title="Nutrition">
//           <Text style={styles.paragraph}>Your image here</Text>
//           {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//         </Card>
//         <Text> </Text>
//         <Button title="Pick image from Gallery" onPress={pickImage} disabled={uploading} />
//         <Button title="Upload" onPress={() => uploadImage(user.uid)} disabled={!image || uploading} />
//       </Card>

//       <Card title="Track Images" style={styles.nextButtonCard}>
//         <Button
//           title="Track Images"
//           onPress={() => {
//             if (storageEmpty) {
//               // Display a message if storage is empty
//               alert('Storage is empty.');
//             } else {
//               // Navigate to the tracking images screen
//               navigation.navigate('NewScreen', { uid: user.uid });
//             }
//           }}
//         />
//       </Card>

//       {uploading && <Text>Uploading...</Text>}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
//   cards: {
//     marginBottom: 20,
//   },
//   nextButtonCard: {
//     width: '100%',
//   },
// });

import React, { useState, useCallback, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { storage } from '../firebaseConfig';
import { Card } from 'react-native-elements';

export default function ImageUpload({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [storageEmpty, setStorageEmpty] = useState(false);
  const [uploadedMessage, setUploadedMessage] = useState('');

  // Function to check if storage is empty for the current user
  const checkStorageEmpty = async (userUid) => {
    try {
      // Reference the user's folder inside the "images" folder
      const folderRef = ref(storage, `images/${userUid}`);

      // List all items in the user's folder
      const listResult = await listAll(folderRef);

      // If the listResult is empty, storage is empty for this user
      setStorageEmpty(listResult.items.length === 0);
    } catch (error) {
      console.error('Error checking storage:', error);
    }
  };

  useEffect(() => {
    // Get the user's UID
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Check if storage is empty for the current user
      checkStorageEmpty(user.uid);
    }
  }, []);

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1, // Set quality to 1 (full quality) to avoid compression
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setUploadedMessage('');
    }
  }, []);

  const uploadImage = async (userUid) => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }

      setUploading(true);

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

      // Clear the selected image
      setImage(null);

      // Show uploaded message
      setUploadedMessage('Image uploaded successfully');
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
    <View style={styles.container}>
      <Card title="Nutrition" style={styles.cards}>
        <Card title="Nutrition">
          {image && !uploadedMessage ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.paragraph}>Your image here</Text>
          )}
          {uploadedMessage && <Text style={styles.uploadedMessage}>{uploadedMessage}</Text>}
        </Card>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pickImage} disabled={uploading}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: !image || uploading ? 'gray' : '#3498db' }]}
            onPress={() => uploadImage(user.uid)}
            disabled={!image || uploading}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card title="Track Images" style={styles.nextButtonCard}>
      <TouchableOpacity
        style={styles.secondCardButtonStyle} // Apply the new style here
        onPress={() => {
          if (storageEmpty) {
            // Display a message if storage is empty
            alert('Storage is empty.');
          } else {
            // Navigate to the tracking images screen
            navigation.navigate('NewScreen', { uid: user.uid });
          }
        }}
      >
        <Text style={styles.buttonText}>Track images</Text>
      </TouchableOpacity>
    </Card>

      {uploading && <Text>Uploading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  uploadedMessage: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#27ae60',
  },
  cards: {
    marginBottom: 20,
  },
  nextButtonCard: {
    
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  secondCardButtonStyle :{
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    top:-3,
    marginTop: 10,
    width: '100%', // Adjust the width to your desired value
  },
  image: {
    width: 200,
    height: 200,
  },
});
