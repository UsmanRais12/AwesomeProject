import React from 'react';
import { View, Text, StyleSheet , Image, Pressable } from 'react-native';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
const User = () => {
  return (
    <View style={styles.container}>
     <Header title={'Profile'}/>
     <Image source={require('../../Images/user.png')} style={styles.user}/>
     <Text style={styles.name}>Usman</Text>
     <Text style={[styles.name , {fontSize:18, marginTop:0}]}>usman@gmail.com</Text>
     <Pressable style={[styles.tab,{marginTop:40}]}>
      <Text style={{color:'#000000'}}>Edit Profile</Text>
     </Pressable>
     <Pressable style={[styles.tab,{marginTop:10}]}>
      <Text style={{color:'#000000'}}>Orders</Text>
     </Pressable>
     <Pressable style={[styles.tab,{marginTop:10}]}>
      <Text style={{color:'#000000'}}>Address</Text>
     </Pressable>
     <Pressable style={[styles.tab,{marginTop:10}]}>
      <Text style={{color:'#000000'}}>Payment Method</Text>
     </Pressable>
     <Pressable style={[styles.tab,{marginTop:10}]} onPress={()=>{ AsyncStorage.setItem('IS_USER_LOGGED_IN', 'null'); }}>
      <Text style={{color:'#000000'}}>Logout</Text>
     </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fffff'
  },
  user:{
    width:100,
    height:100,
    alignSelf:'center',
    marginTop:50,
  },
  name:{
    alignSelf:'center',
    marginTop:10,
    fontSize:20,
    fontWeight:'600',
    color:'#000000'
  },
  tab:{
    width:'90%',
    height:50,
    alignSelf:'center',
    borderBottomColor:'#504848',
    borderBottomWidth:0.3,
    paddingLeft:20,
    justifyContent:'center'
  }
})
export default User;
