import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
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
  const [cameraType, setCameraType] = useState<number>(Camera.Constants.Type['back']);

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
      console.log('tirou foto')
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
      const imageUrl = await uploadImage(uri);
      console.log('retornou')
      route.params.callback(imageUrl);
   
    }
  }

  const toggleCameraType = () => {
    setCameraType((prevType) =>
      prevType === Camera.Constants.Type['back']
        ? Camera.Constants.Type['front']
        : Camera.Constants.Type['back']
    );
  };
  const closeCamera = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>

      {permission && (
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.styleCamera}
          type={cameraType}
        >
        </Camera>
      )}

      {
        isUploading ?
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            opacity: 0.8,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image style={{ width: 100, height: 80 }} source={{ uri: 'https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700' }} />
            <Text style={{ color: 'white', fontSize: 30 }}>carregando ....</Text>
          </View> : <View></View>
      }

      <TouchableOpacity style={styles.bottonClose} onPress={closeCamera}>
        <MaterialIcons name="close" size={80} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottonCenter} onPress={takePicture}>
        <MaterialIcons name="camera" size={100} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
        <MaterialIcons name="flip-camera-android" size={80} color="black" />
      </TouchableOpacity>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  toggleButton: {
    position: 'absolute',
    bottom: 50,
    padding: 15,
    right: 50,
  },
  styleCamera: {
    flex: 1,
    height: '100%',
    marginTop: 35
  },
  bottonCenter: {
    position: 'absolute',
    bottom: 40,
    padding: 15,
    left: 195,
  },
  bottonClose: {
    position: 'absolute',
    top: 45,    
    left: 18,
  }
});
