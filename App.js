/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Magic } from '@magic-sdk/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const m = new Magic('pk_live_DC044CC269FFE772'); // ✨

const App = () => {
  const [email, setEmail] = useState('')
  const [token,setToken] = useState('')
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const handleLogin = async (email) => {
    console.log(email);
  

     if (email) {
        const token =  await m.auth.loginWithEmailOTP({ email:email  });
        if(token){
          setToken(token)
          AsyncStorage.setItem('token', token)
        }
     }
  };

  useEffect(()=>{
    let value = ''
    AsyncStorage.getItem('token').then((val)=>{
      value = val
    })
    console.log(value)
    if(value){
      setToken(JSON.parse(value))
    }
  },[])

  return (
    <View style={[backgroundStyle,{flex:1,justifyContent:'center'}]}>
     
      <View style={{flex:1}}>
     
      {/* Remember to render the `Relayer` component into your app! */}
      <m.Relayer />
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       { token == '' ?<>
        <TextInput style={{height:40,width:'80%',borderWidth:2}} onChangeText={(text)=>setEmail(text)}/>
        <TouchableOpacity onPress={()=>handleLogin(email)} style={{width:50,height:40,backgroundColor:'green',marginTop:20,alignItems:'center'}}>
          <Text>Log in</Text>
        </TouchableOpacity>
        </> :
        <Text>{`Logged in with token ${token}`}</Text>
        }
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
