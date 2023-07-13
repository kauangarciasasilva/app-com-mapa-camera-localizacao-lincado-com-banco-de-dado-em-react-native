import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraPage({ navigation,route }) {

  const [camera, setCamera] = useState(null);
  const [Permission, setPermission] = useState(null);

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
      navigation.navigate('mapa', { image: uri, markerId: route.params.markerId });
    }
  }
  
  return (
    <View style={styles.container}>
      <Camera
        ref={(l) => setCamera(l)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'}
      />
      <View style={styles.botton}>

        <TouchableHighlight style={styles.bottonCenter} onPress={() => { takePicture() }}>
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
    aspecRatio: 1,
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
    marginHorizontal: 250
  }, 


  bottonCenter: {
    alignItems: 'center',
  }
});