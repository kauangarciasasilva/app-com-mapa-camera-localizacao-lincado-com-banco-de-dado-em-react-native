import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function CameraPage({ navigation }) {

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
      console.log(uri);

      await MediaLibrary.saveToLibraryAsync(uri);
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
       
        <TouchableHighlight
          style={styles.bottonCenter}
          onPress={() => { takePicture() }}
        >
          <MaterialIcons name="camera" size={100} color="black" />
        </TouchableHighlight>
      </View>
       <TouchableHighlight
          style={styles.bottonvoltar}
          onPress={() => navigation.goBack()}
        >
        <Ionicons name="caret-back-circle-outline" size={80} color="black" />
        </TouchableHighlight>
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
    borderRadius: 25,
  },
  styleCamera: {
    aspecRatio: 1,
    flex: 1,
  },
  botton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    marginHorizontal:200


  },
  bottonvoltar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    marginHorizontal:400


  },
 
  bottonCenter: {
    alignItems: 'center',
     
  }
});
