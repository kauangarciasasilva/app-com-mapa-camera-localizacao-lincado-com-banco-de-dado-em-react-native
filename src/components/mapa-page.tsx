import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Image } from "expo-image";
import { Entypo } from '@expo/vector-icons';
import ModalComponent from './modal-componets';

export default function Mapa({ navigation, route }) {

  const [modalOpen, setModalOpen] = useState(false);

  const [atualImage, setAtualImage] = useState<EntityLocation>(null);

  const [marker, setMarker] = useState([{
    id: 1,
    description: "Ponte Metálica",
    newDescription: '',
    data: "Construída em 1912",
    latitude: -22.117745,
    longitude: -43.211875,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },
  {
    id: 2,
    description: "Casa de Cultura",
    data: "Construída no século XIX",
    newDescription: '',
    latitude: -22.119760,
    longitude: -43.210125,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },
  {
    id: 3,
    description: "Parque das Águas",
    data: "Inaugurado em 2007",
    newDescription: '',
    latitude: -22.117402,
    longitude: -43.220875,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },
  {
    id: 4,
    description: "Igreja Matriz de São Sebastião",
    data: "Construída em 1852",
    latitude: -22.118594,
    newDescription: '',
    longitude: -43.212493,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },



  ]);

  return (

    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.1184,
          longitude: -43.2100,
          latitudeDelta: 0.0150,
          longitudeDelta: 0.00100,
        }}
      >
        {marker.map(item => {

          return (
            <View key={item.id}>
              <Marker key={item.id} coordinate={{ latitude: item.latitude, longitude: item.longitude }}
               description={item.description} onPress={() => {  setAtualImage(item);setModalOpen(true);
                }}
              > 
                <View style={styles.imgContainer}>
                  <Image style={styles.tamanhoImg} source={item.image} />
                </View>
              </Marker>
            </View>
          )
        })}
        <ModalComponent modalOpen={modalOpen} selectedMarker={atualImage} modalClose={() => { setModalOpen(false); } } deleteMarker={function (): void {
          throw new Error('Function not implemented.');
        } } />
      </MapView>
          <TouchableHighlight style={styles.botton} onPress={() => navigation.navigate('camera')}>
            <Entypo name="camera" size={40} color="black" />
          </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  botton: {
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    elevation: 5,
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 30,
    position: 'absolute',
    bottom: 60,
    marginHorizontal: 460
  },

  imgContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden'
  },

  tamanhoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },

});

