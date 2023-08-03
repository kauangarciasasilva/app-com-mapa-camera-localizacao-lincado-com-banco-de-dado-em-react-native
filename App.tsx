import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import CameraPage from "./src/components/camera-page";
import Mapa from "./src/components/mapa-page";

import HomeView from "./src/home/homeview";
import LoginComponent from "./src/components/login-component";
export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginComponent} options={{ headerShown: false }}/>
     
        <Stack.Screen name="mapa" component={Mapa}options={{ headerShown: false }} />
        <Stack.Screen name="camera" component={CameraPage} options={{ headerShown: false }} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}