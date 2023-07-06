import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

export default function Mapa({navigation}) {
  const [markers] = useState([]);
 
  return (
    <View style={styles.container}>
    
        <MapView
          style={styles.map}
        >
          {markers.map(item => (
            <Marker
              key={item.id}
              coordinate={{latitude:item.latitude,longitude:item.longitude}}
              description={item.description}
              image={item.images}
            />
          ))}
        </MapView>
      
      <TouchableHighlight
        style={styles.botton}
        onPress={() => navigation.navigate('camera')}>

        <MaterialIcons name="camera" size={40} color="black" />

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
    backgroundColor: 'rgb(100,128,139)',
    elevation: 5,
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 30,
    position: 'absolute',
    bottom: 60,
    marginHorizontal: 460


  },
});

