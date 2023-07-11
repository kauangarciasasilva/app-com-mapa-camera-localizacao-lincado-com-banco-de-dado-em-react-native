import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";

import CameraPage from "./src/components/camera-component";
import Mapa from "./src/components/mapa-component";






export default function App(navigation) {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="mapa" component={Mapa} options={{
          title: 'Map',
          headerStyle: {
            backgroundColor: 'rgb(1,4,9)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }} />
        <Stack.Screen name="camera" component={CameraPage} options={{
          title: 'Camera',
          headerStyle: {
            backgroundColor: 'rgb(1,4,9)',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      


      </Stack.Navigator>
    </NavigationContainer>

  );
}