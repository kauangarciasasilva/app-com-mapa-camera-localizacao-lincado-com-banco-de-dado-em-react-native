import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight ,Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import ModalComponent from './modal-componets';

export default function Mapa({ navigation, route }) {
  const [newMarker, setNewMarker] = useState(null);
  const [selectedMarkerImage, setSelectedMarkerImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [atualImage, setAtualImage] = useState(null);

  const [marker, setMarker] = useState([
    {
      id: 1,
      newName: '',
      newDescription: '',
      data: '',
      latitude: -22.117745,
      longitude: -43.211875,
      image:'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
    },
  ]);

  useEffect(() => {
    if (route.params?.image && route.params?.markerId) {
      const updatedMarker = marker.map((item) => {
        if (item.id === route.params.markerId) {
          return { ...item, image: route.params.image };
        }
        return item;
      });
      setMarker(updatedMarker);
    }
  }, [route.params?.image, route.params?.markerId]);

 
  useEffect(() => {
    if (newMarker) {
      setMarker((prevMarker) => [...prevMarker, newMarker]);
      setNewMarker(null);
    }
  }, [newMarker]);

  useEffect(() => {
    if (route.params?.image) {
      const markerId = route.params.markerId;
      const updatedMarker = marker.find((item) => item.id === markerId);
      if (updatedMarker) {
        updatedMarker.image = route.params.image;
        setSelectedMarkerImage(route.params.image);
        setMarker((prevMarker) => [...prevMarker]);
      }
    }
  }, [route.params?.image]);

  const handleCameraPress = () => {
    if (atualImage) {
      navigation.navigate('camera', { markerId: atualImage.id });
    }
  };

  const handleMarkerPress = (item) => {
    setAtualImage(item);
    setModalOpen(true);
  };

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.1184,
          longitude: -43.21,
          latitudeDelta: 0.015,
          longitudeDelta: 0.001, 
     
        }}
        showsUserLocation={true}
       
       
      >
        {marker.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            onPress={() => handleMarkerPress(item)}
            pinColor="red"
          >
            <View style={styles.imgContainer}>
              {selectedMarkerImage && atualImage?.id === item.id ? (
                <Image style={styles.tamanhoImg} source={{ uri: selectedMarkerImage }} />
              ) : (
                <Image style={styles.tamanhoImg} source={{ uri: item.image }} />
              )}
            </View>
          </Marker>
        ))}
      </MapView>
      
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