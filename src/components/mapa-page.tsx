import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import ModalComponent from './modal-componets';
import { onValue, push, ref, update } from 'firebase/database';

import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { db } from '../../firebase-config';
 
export default function Mapa({ navigation, route ,handleDescription,customDescription,}) {  
  const [modalOpen, setModalOpen] = useState(null);
  const [atualImage, setAtualImage] = useState<EntityLocation>(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [places, setPlaces] = useState<EntityLocation[]>([]);
  

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização não concedida');
    } else {
      getCurrentLocation();
    }
  };
  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    setCurrentLocation({ latitude, longitude });
  };


  useEffect(() => {
    getPlaces();
    getLocationPermission();
  }, []);

  async function addItem(imageUrl: string) {
    await getCurrentLocation();
    let newPlace = {
      id: Math.random(),
      title: '',
      imagePath: imageUrl,
      photoDate: '',
      coords: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      description: ''
    }
    push(ref(db, 'places'), newPlace);
  }
  async function updateItem() {
    currentLocation.description = customDescription;
    update(ref(db, '/places/' + currentLocation.id), currentLocation);
    setModalOpen({ modalOpen:false });
    handleDescription('');
}

  const handleCameraPress = () => {
    navigation.navigate('camera', { callback: (imageUrl) => addItem(imageUrl) });
  }

  const handleMarkerPress = (item: EntityLocation) => {
    setAtualImage(item);
    setModalOpen(true);
  };

  async function getPlaces() {
    return onValue(ref(db, '/places'), (snapshot) => {
      try {
        setPlaces([]);
        if (snapshot !== undefined) {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            let childValue = childSnapshot.val()
            childValue.id = childKey;
            setPlaces((places) => [...places, (childValue as EntityLocation)])
          })

        }
      } catch (e) {
        console.log('Erro', e)
      }
    });
  }

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude || -22.1184,
            longitude: currentLocation.longitude || -43.21,
            latitudeDelta: 0.015,
            longitudeDelta: 0.001,
          }}
          showsUserLocation={true}
        >
          {places.map((item) => (
            <Marker
              key={Math.random().toString()}
              coordinate={{ latitude: item.coords.latitude, longitude: item.coords.longitude }}
              onPress={() => handleMarkerPress(item)}
              pinColor="red"
            >
              <View style={styles.imgContainer}>
                <Image style={styles.tamanhoImg} source={{ uri: item.imagePath }} />
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text >Carregando mapa...</Text>
      )}

      <ModalComponent
        modalOpen={modalOpen}
        selectedMarker={atualImage}
        modalClose={() => setModalOpen(false)}
        handleDescription={updateItem}
        

        deleteMarker={() => {
          //Vamos fazer hoje
        } }          />
      <TouchableHighlight style={styles.button} onPress={handleCameraPress}>
        <Entypo name="camera" size={40} color="black" />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    elevation: 5,
    height: 100,
    width: 100,
    borderRadius: 30,
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
  imgContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  tamanhoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});