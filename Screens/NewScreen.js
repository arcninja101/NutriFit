

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, FlatList } from 'react-native';
// import { ref, listAll, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebaseConfig';

// export default function NewScreen({ route }) {
//   const { uid } = route.params;
//   const [imageUrls, setImageUrls] = useState([]);

//   useEffect(() => {
//     const fetchImageUrls = async () => {
//       try {
//         // Create a reference to the user's folder with their UID as the name
//         const folderRef = ref(storage, `images/${uid}`);

//         // List all items (images) in the folder
//         const fileList = await listAll(folderRef);

//         // Fetch the download URLs for all images in parallel
//         const urls = await Promise.all(
//           fileList.items.map(async (item) => {
//             const imageUrl = await getDownloadURL(item);
//             return imageUrl;
//           })
//         );

//         setImageUrls(urls);
//       } catch (error) {
//         console.error('Error fetching image URLs:', error);
//       }
//     };

//     fetchImageUrls();
//   }, [uid]);

//   return (
//     <View>
//       <Text>User's Uploaded Images:</Text>
//       <FlatList
//         data={imageUrls}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
//         )}
//       />
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export default function NewScreen({ route }) {
  const { uid } = route.params;
  const [imageInfo, setImageInfo] = useState([]);

  useEffect(() => {
    const fetchImageInfo = async () => {
      try {
        const folderRef = ref(storage, `images/${uid}`);
        const fileList = await listAll(folderRef);

        const info = await Promise.all(
          fileList.items.map(async (item) => {
            const imageUrl = await getDownloadURL(item);
            const metadata = await getMetadata(item);

            return { imageUrl, uploadDate: new Date(metadata.timeCreated).toLocaleDateString() };
          })
        );

        setImageInfo(info);
      } catch (error) {
        console.error('Error fetching image info:', error);
      }
    };

    fetchImageInfo();
  }, [uid]);

  const renderImageCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press if needed */}}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.dateText}>Uploaded on: {item.uploadDate}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>User's Uploaded Images:</Text> */}
      <FlatList
        data={imageInfo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImageCard}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    top:24
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
  },
  list: {
    paddingBottom: 20,
  },
});
