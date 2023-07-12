import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';

interface Props {
  modalOpen: boolean;
  selectedMarker: EntityLocation;
  modalClose: () => void;
  deleteMarker: () => void;
}

export default function ModalComponent(props: Props) {
  const [customDescription, setCustomDescription] = useState('');

  const handleSaveDescription = () => {
    if (customDescription.trim() !== '') {
      props.selectedMarker.newDescription = customDescription;
      setCustomDescription('');
    } else {
      Alert.alert('Erro', 'Por favor, insira uma descrição válida');
    }
  };

  const handleDeleteMarker = () => {
    Alert.alert(
      'Excluir marcador',
      'Tem certeza que deseja excluir este marcador?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            props.deleteMarker();
            props.modalClose();
          },
        },
      ],
    );
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={props.modalOpen}>
        <View style={styles.modalContainer}>
          {props.selectedMarker && (
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>{props.selectedMarker.description}</Text>
              <View style={styles.imageContainer}>
                <Image style={styles.modalImage} source={{ uri: props.selectedMarker.image }} />
                {props.selectedMarker.newDescription && (
                  <Text style={styles.newDescription}>{props.selectedMarker.newDescription}</Text>
                )}
                <TextInput
                  style={styles.inputDescription}
                  placeholder="Insira uma nova descrição"
                  onChangeText={text => setCustomDescription(text)}
                  value={customDescription}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.saveButton} onPress={handleSaveDescription}>
                  <AntDesign style={styles.saveButtonText}name="save" size={24} color="black" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.modalButton} onPress={props.modalClose}>
                  <AntDesign name="closecircleo" size={40} color="black" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.deleteButton} onPress={handleDeleteMarker}>
                  <AntDesign style={styles.buttonText}name="delete" size={24} color="black" />
                </TouchableHighlight>
          
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 350,
  },
  modalDescription: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  modalImage: {
    width: 400,
    height: 400,
    marginBottom: 20,
    borderRadius: 60,
    marginTop: 20,
    marginHorizontal: 20,
  },
  newDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputDescription: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: 'rgb(100,128,139)',
    borderRadius: 30,
    padding:20
  },
  deleteButton: {

    backgroundColor: 'red',
    borderRadius: 30,
   padding:20,
   marginHorizontal:100
   
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButton: {
    marginHorizontal:30,
    borderRadius: 10,
    padding:10,
  },
});
