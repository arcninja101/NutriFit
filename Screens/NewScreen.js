
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, FlatList } from 'react-native';
// import { ref, listAll, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebaseConfig';

// export default function NewScreen({ route }) {
//   const { uid } = route.params;
//   const [imageUrls, setImageUrls] = useState([]);

//   useEffect(() => {
//     // Function to fetch and set the list of image URLs
//     const fetchImageUrls = async () => {
//       try {
//         const folderRef = ref(storage, `images/${uid}`);
//         const fileList = await listAll(folderRef);

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
//         const folderRef = ref(storage, `images/${uid}`);
//         const fileList = await listAll(folderRef);

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
import { View, Text, Image, FlatList } from 'react-native';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export default function NewScreen({ route }) {
  const { uid } = route.params;
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        // Create a reference to the user's folder with their UID as the name
        const folderRef = ref(storage, `images/${uid}`);

        // List all items (images) in the folder
        const fileList = await listAll(folderRef);

        // Fetch the download URLs for all images in parallel
        const urls = await Promise.all(
          fileList.items.map(async (item) => {
            const imageUrl = await getDownloadURL(item);
            return imageUrl;
          })
        );

        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, [uid]);

  return (
    <View>
      <Text>User's Uploaded Images:</Text>
      <FlatList
        data={imageUrls}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
        )}
      />
    </View>
  );
}
