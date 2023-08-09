import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { getStorageData, setStorageData } from '../shared/secury-storage';

const LoginPage = ({ navigation }) => {
  const [author, setAuthor] = useState('');

  useEffect(() => {
    getAuthor();

  }, []);

  async function getAuthor() {
    const localAuthor = await getStorageData['author'];
    if (localAuthor) {
      navigation.navigate('mapa');
    }
  };

  async function login() {
    await setStorageData('author', author);

    navigation.navigate('mapa');

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{flex:2,top:150}}> 
      
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>Photo Location</Text>
      </View>
      
      <View style={{flex:1,top:150}}>
      <TextInput
        style={styles.input}
        placeholder="Nome do usuário"
        value={author}
        onChangeText={setAuthor}
      />
        </View>
        <View style={{flex:2 ,}}>
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4795B8',
  },
  logo: {
   marginHorizontal:30,
   margin:20,
    width: 150,
    height: 150,
    
  },
  appName: {
    fontSize: 30,
   
    color: 'white'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    padding:15,
    aspectRatio:6,
    margin:10, 
    backgroundColor: '#d3d3d3',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding:10,
    width: 150,
    height: 50,
    margin:70, 
    alignItems: 'center',
    aspectRatio:6,
    
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginPage;