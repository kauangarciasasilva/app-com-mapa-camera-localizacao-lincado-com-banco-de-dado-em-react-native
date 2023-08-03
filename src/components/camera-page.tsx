import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import { getDownloadURL, getStorage, uploadBytes, } from '@firebase/storage';
import { ref, } from 'firebase/database';
import { app } from '../../firebase-config2';
import { Image } from 'expo-image';

import * as firebaseStorage from '@firebase/storage';

export default function CameraPage({ navigation, route }) {
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState(null);
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImage(imageUrl): Promise<string> {
    setIsUploading(true);
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const storage = firebaseStorage.getStorage(app);
    const storageRef = firebaseStorage.ref(
      storage,
      'images/' + imageUrl.replace(/^.*[\\\/]/, '')
    );
    
    await firebaseStorage.uploadBytes(storageRef, blob);

    const uploadImageUrl = await firebaseStorage.getDownloadURL(storageRef);    
    setIsUploading(false);
    return uploadImageUrl;

  }
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted');
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
      const imageUrl = await uploadImage(uri);
      route.params.callback(imageUrl);
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      {permission && (
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.styleCamera}
          type={CameraType.back}
          ratio={'1:1'}
        />
      )}
      {
        isUploading ?
          <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            opacity: 0.8,
            justifyContent: "center",
            alignItems: 'center'



          }}>
            <Image style={{ width: 100, height: 80 }} source={{ uri: 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!sw800' }} />
            <Text>carregando ....</Text>
          </View> : <></>
      }
      <View style={styles.botton}>
        <TouchableHighlight style={styles.bottonCenter} onPress={takePicture}>
          <MaterialIcons name="camera" size={100} color="black" />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    marginRight: 40,
    marginTop: 15,
  },
  styleCamera: {
    aspectRatio: 1,
    flex: 1,
  },
  botton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 20,
    position: 'absolute',
    bottom: 50,
    marginHorizontal: 230,
  },
  bottonCenter: {
    alignItems: 'center',
  },
});
