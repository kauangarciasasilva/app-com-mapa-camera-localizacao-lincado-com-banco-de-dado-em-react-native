import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as SecureStore from 'expo-secure-store';

export default function LoginComponent({ navigation, route }) {
  
    const [username, setNameLogin] = useState('');
   
    useEffect(() =>{
        checkLoggedIn();
    })
    const checkLoggedIn = async () => {
        try {
            const storedUsername = await SecureStore.getItemAsync("username");
            if (storedUsername) {
                navigation.navigate("HomePage");
            }
        } catch (error) {
            console.log("Erro ao verificar login:", error);
        }
      };
      const handleLogin = async () => {
        try {
            await SecureStore.setItemAsync("username", username);
            console.log("Nome de usuário salvo com sucesso!");
        } catch (error) {
            console.log("Erro ao salvar o nome de usuário:", error);
        }
      
        navigation.navigate("HomePage")
      };

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 40, marginHorizontal: 139, marginTop: 130 }}>
                    Photo Location
                </Text>
            </View>
            <Image style={styles.img} source={require('../../assets/icon.png')} />


            
                  <TextInput
                    style={styles.inputNameLogin}
                    placeholder="Insira nome do usuario"
                    onChangeText={text => setNameLogin(text)}
                    value={username}
                  />
               
                  
               
          
                <TouchableOpacity onPress={handleLogin}style={styles.botton}>
                    <Text style={{ fontSize: 30 }}>Login</Text>
                </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    inputNameLogin: {
        width: 400,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
      

        marginHorizontal: 70,
        marginTop: 400,
        textAlign: 'center'
    },
    newDescription: {
        fontSize: 18,
        marginBottom: 10,
      },
    container: {
        backgroundColor: '#4795B8',
        flex: 1,
    },
    img: {
        width: 130,
        height: 130,
        marginHorizontal: 200,
        marginTop: 50


    },

    botton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 250,
        borderRadius: 20,
        position: 'absolute',
        marginVertical:900,
        backgroundColor: 'blue',
        marginHorizontal: 150,
    },

});


