import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Image } from "expo-image";
import { AntDesign } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';
import { ref, remove, update } from 'firebase/database';
import { db } from '../../firebase-config2';

import { Entypo } from '@expo/vector-icons';
interface Props {
  modalOpen: boolean;
  selectedMarker: EntityLocation;
  modalClose: () => void;
  handleChat: ()=> void;
 
  
}

export default function ModalComponent(props: Props,{navigation, route}) {
  const [customDescription, setCustomDescription] = useState('');
  const [customName, setCustomName] = useState('');
  const [customData, setCustomData] = useState('');
  const [editing, setEditing] = useState(false);
 
  
 

  const handleSaveDescription = () => {
    if (customDescription.trim() !== '' && customName.trim() !== '') {
      
      props.selectedMarker.description = customDescription;
      props.selectedMarker.title = customName;
      update(ref(db, '/places/' + props.selectedMarker.id), props.selectedMarker);
      setCustomDescription('');
      setCustomName('');
      setEditing(false);
      
    
    } else {
      Alert.alert('Erro', 'Por favor, insira uma descrição válida');
    }
  };
  

  const handleEditMarker = () => {
    setEditing(true);
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
            remove(ref(db, '/places/' + props.selectedMarker.id),
            );
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
              <TouchableOpacity style={styles.closeButton} onPress={props.modalClose}>
                <AntDesign name="closecircleo" size={40} color="black" />
              </TouchableOpacity>
              <View>
                {editing ? (
                  <TextInput
                    style={styles.inputDescription}
                    placeholder="Nome do Local"
                    onChangeText={text => setCustomName(text)}
                    value={customName}
                  />
                ) : (
                  <Text style={styles.modalName}>{props.selectedMarker.title}</Text>
                  
                )}
              
                
              </View>
              <View style={styles.imageContainer}>
                <Image style={styles.modalImage} source={{ uri: props.selectedMarker.imagePath }} />
                {editing ? (
                  <TextInput
                    style={styles.inputDescription}
                    placeholder="Insira uma nova descrição"
                    onChangeText={text => setCustomDescription(text)}
                    value={customDescription}
                  />
                ) : (
                  <Text style={styles.newDescription}>{props.selectedMarker.description}</Text>
                )}
                  {editing ? (
                  <TextInput
                   
                    placeholder="Data"
                    onChangeText={text => setCustomData(text)}
                    value={customData}
                  />
                ) : (
                  <Text style={styles.modalData}>{props.selectedMarker.photoDate}</Text>
                  
                )}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMarker}>
                  <AntDesign style={styles.buttonText} name="delete" size={24} color="black" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.saveButton} onPress={props.handleChat}>
                 <Entypo name="chat" size={24} color="black" />
                  </TouchableOpacity>
                {!editing ? (
                  <TouchableOpacity style={styles.editButton} onPress={handleEditMarker}>
                    <AntDesign style={styles.saveButtonText} name="edit" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveDescription}>
                    <AntDesign style={styles.saveButtonText} name="save" size={24} color="black" />
                  </TouchableOpacity>
                  
                  
                )}
                
             
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
  modalData:{
    fontSize: 22,
    fontWeight: 'bold',
   marginTop:10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 40,
    marginHorizontal:10,
    alignItems: 'center',
    marginBottom: 300,
    
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
   marginTop:10
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 60,
    marginTop:20,
    marginHorizontal: 20,
  },
  newDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputDescription: {
    width: '90%',
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 20,
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
    padding: 20,
    marginRight:10
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 20,
    marginRight: 250,
  },
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 30,
    padding: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    borderRadius: 10,
    marginTop: 5,
    marginRight: 390,
    padding: 6,
  },
});
