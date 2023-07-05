import {  View, StyleSheet, TouchableHighlight,Text} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import MapView from "react-native-maps";


export default function TelaComponent(navigation) {


  return (
    <View style={styles.container}>
      
      <MapView style={styles.map} />
      <View>
         <TouchableHighlight 
      style={styles.botton}
      onPress={() => navigation.navigate('camera')}>
       
       <Text 
        style={{color:'#fff',fontSize:10}}
         >
         <MaterialIcons name="camera" size={40} color="black" />
        </Text>
      </TouchableHighlight>
  
    </View>
    
      </View>
      
     

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
    width: '100%',
    height: '100%',
  },
  styleCamera: {
    aspecRatio: 1,
    flex: 1,
  },
  botton:{
    justifyContent:'center',
    backgroundColor:'rgb(100,128,139)',
    elevation:5,
    alignItems:'center',
    height:100,
    width:100,
    borderRadius:30,
    position:'absolute',
    bottom:60,
    marginHorizontal:460
    
    
  },
 
});