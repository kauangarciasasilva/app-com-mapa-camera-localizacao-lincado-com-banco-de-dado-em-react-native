import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import ModalComponent from './modal-componets';
import { onValue, push, ref } from 'firebase/database';
import { db } from '../../firebase-config';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

export default function Mapa({ navigation, route }) {
  const [newMarker, setNewMarker] = useState(null);
  const [selectedMarkerImage, setSelectedMarkerImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [atualImage, setAtualImage] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [placeList , setPlaceList]= useState<EntityLocation[]>([])
 const [marker, setMarker] = useState([
    {
      id: 1,
      title: '',
      description: '',
      photoDate: '',
      coords: { latitude: -22.117745, longitude: -43.211875 },
      imagePath: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
    },
  ]);

  
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
    if (route.params?.imrage && route.params?.markerId) {
      const updatedMarker = marker.map((item) => {
        if (item.id === route.params.markerId) {
          return { ...item, image: route.params.image };
        }
        return item;
      });
      setMarker(updatedMarker);
    }
  }, [route.

params?.image, route.params?.markerId]);

async function addItem(imageUrl: string) {
  const position = await getCurrentLocation();
  console.log(position)
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
  let places = placeList
  places.push(newPlace)
  setPlaceList(places)
  
  push(ref(db,'places'),addItem)
}

  const handleCameraPress = () => {
   
      navigation.navigate('camera');
    }
 
  const handleMarkerPress = (item) => {

    setAtualImage(item);
    setModalOpen(true);
  };
  async function getPlaces() {
    return onValue(ref(db, '/places'), (snapshot) => {
      console.log('dados no Realtime', snapshot)
      try {
        setMarker([]);
        if (snapshot !== undefined) {
          snapshot.forEach((childSnapshot) => {

            const childKey = childSnapshot.key;
            let childValue = childSnapshot.val()
            childValue.id = childKey;
            setMarker((places) => [...places, (childValue as EntityLocation)])
          })

        }
      } catch (e) {
        console.log(e)
      }
    })


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
       


        {marker.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.coords.latitude, longitude: item.coords.longitude }}
            onPress={() => handleMarkerPress(item)}
            pinColor="red"
          >
            <View style={styles.imgContainer}>
              {selectedMarkerImage && atualImage?.id === item.id ? (
                <Image style={styles.tamanhoImg} source={{ uri: selectedMarkerImage }} />
              ) : (
                <Image style={styles.tamanhoImg} source={{ uri: item.imagePath }} />
              )}
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
        deleteMarker={() => {
          const updatedMarker = marker.filter((item) => item.id !== atualImage?.id);
          setMarker(updatedMarker);
        }}
      />
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