import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import Home from "./src/home/home";
import { Camera } from "expo-camera";
import CameraPage from "./src/components/camera-component";




export default function App(){

    const Stack = createNativeStackNavigator();

       
    
    return(
        <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="home" component={Home}  options={{
          title: 'Map',
          headerStyle: {
            backgroundColor: 'rgb(1,4,9)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
       
        }}/>   
        <Stack.Screen name="camera" component={CameraPage}  options={{
            title: 'Map',
            headerStyle: {
              backgroundColor: 'rgb(1,4,9)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
   
         
        </Stack.Navigator>
      </NavigationContainer>
 
    );
}