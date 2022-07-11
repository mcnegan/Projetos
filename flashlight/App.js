import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false); //false

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    Torch.switchState(toggle);
    
  }, [toggle]);

  useEffect(() => {

    /**
     * Quando o Dispositivo for chacoalhado o Flash será ligado. 
     */
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);

      /*
      Quando o componente for desmontado
      essa função será chamada.
      */
     return () => subscription.remove();

    });
  }, []);

  return (
  
  <View style={toggle ? style.containerLight : style.containerBlack}>
    <TouchableOpacity onPress={handleChangeToggle}>

      <Image 
      style={toggle ? style.lightingOn:style.lightingOff}
      source={toggle ? require('./assets/icons/lanternaOn.png'):require('./assets/icons/lanternaOff.png')} />
      <Image 
      style={toggle ? style.lightingOn:style.lightingOff}
      source={require('./assets/icons/logo1.png')} />

    </TouchableOpacity>

  </View>
  
  );  
};

export default App;

const style = StyleSheet.create({
  containerBlack:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  containerLight:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },

  lightingOn:{
    resizeMode:'contain',
    alignSelf:'center',
    width: 200,
    height: 200,

  },
  lightingOff:{
    resizeMode:'contain',
    alignSelf:'center',
    tintColor:'white',
    width: 200,
    height: 200,

  },
  
});
