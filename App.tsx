import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import CameraPage from "./src/homePage/camera-page";
import Mapa from "./src/homePage/mapa-page";

import LoginPage from "./src/homePage/login-page";
export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="mapa" component={Mapa} options={{ headerShown: false }} />
        <Stack.Screen name="camera" component={CameraPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}