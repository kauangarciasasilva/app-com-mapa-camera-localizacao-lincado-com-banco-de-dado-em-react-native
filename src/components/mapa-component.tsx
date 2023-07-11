import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { Image } from "expo-image";
import { Entypo } from '@expo/vector-icons';
import ModalComponent from './modal-componets';

export default function Mapa({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const openModal = (marker) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const [marker, setMarker] = useState([{
    id: 1,
    description: "Ponte Metálica",
    data: "Construída em 1912",
    latitude: -22.117745,
    longitude: -43.211875,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },
  {
    id: 2,
    description: "Casa de Cultura",
    data: "Construída no século XIX",
    latitude: -22.119760,
    longitude: -43.210125,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },
  {
    id: 3,
    description: "Parque das Águas",
    data: "Inaugurado em 2007",
    latitude: -22.117402,
    longitude: -43.220875,
    image: 'https://img.freepik.com/fotos-gratis/terra-e-galaxia-elementos-desta-imagem-fornecidos-pela-nasa_335224-750.jpg?w=2000',
  },
  {
    id: 4,
    description: "Igreja Matriz de São Sebastião",
    data: "Construída em 1852",
    latitude: -22.118594,
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
              <Marker
                key={item.id}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                description={item.description}
                onPress={() => openModal(item)}

              >
                <View style={styles.imgContainer}>


                  <Image style={styles.tamanhoImg} source={item.image} />


                </View>

              </Marker>
            </View>
          )
        })}




      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedMarker && (
            <View style={styles.modalContent}>
              
              <Text style={styles.modalDescription}>{selectedMarker.description}</Text>
              <Image style={styles.modalImage} source={{ uri: selectedMarker.image }} />
              <Text style={styles.modalData}>{selectedMarker.data}</Text>
              <TouchableHighlight style={styles.modalButton} onPress={closeModal}>
              <AntDesign name="closecircleo" size={40} color="black" />
              </TouchableHighlight>
            </View>
          )}
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.botton}
        onPress={() => navigation.navigate('camera')}>

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom:350,
  
  },
  modalImage: {
    width: 400,
    height: 400,
    marginBottom: 20,
    borderRadius: 60,
    marginTop:20,
    marginHorizontal:20
  },
  modalDescription: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalData: {
    fontSize: 17,
    marginBottom: 10,
  },
  modalButton: {
   
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

