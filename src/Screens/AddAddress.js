import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Header from '../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../Components/CustomButton';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../redux/Slices/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddress = () => {
  const route = useRoute();
  const navigation = useNavigation()
  const [btn,setBtn] = useState(route.params.type === 'edit'? route.params.data.type === 'Home'? 0 : 1 : 0);
  const [state, setState] = useState(route.params.type === 'edit'? route.params.data.state : '');
  const [city , setCity] = useState(route.params.type === 'edit'? route.params.data.city : '');
  const [address, setAddress] = useState(route.params.type === 'edit'? route.params.data.address : '')
  const dispatch = useDispatch(addAddress);
  // console.log(route.params.data.state)
  return (
    <View style={styles.container}>
      <Header leftIcon={require('../Images/back.png')} title={route.params.type === 'edit' ? 'Edit Address':'Add New Address' } onClickLeftIcon={()=>{navigation.goBack();}} isCart={true}/>
      <TextInput style={[styles.input, {marginTop:60, color:'black'}]} placeholder='Enter State' placeholderTextColor={'gray'} onChangeText={(txt)=>{setState(txt)}} value={state}/>
      <TextInput style={[styles.input,{color:'black'}]} placeholder='Enter City' placeholderTextColor={'gray'} onChangeText={(txt)=>{setCity(txt)}} value={city}/>
      <TextInput style={[styles.input,{color:'black'}]} placeholder='Enter Street Adress' placeholderTextColor={'gray'} onChangeText={(txt)=>{setAddress(txt)}} value={address}/>
      <View style={styles.typeView}>
        <Pressable style={({pressed})=>[styles.typeBtn, pressed || btn === 0 ?{borderColor:'blue', borderWidth: 1} : null]} onPress={()=>{setBtn(0)}}> 
        <Image source={require('../Images/home.png')} style={{width:34, height:34}}/>
        <Text style={{color:'#000000'}}>Home</Text>
        </Pressable>

        <Pressable style={({pressed})=>[styles.typeBtn, pressed || btn === 1 ? {borderColor:'blue', borderWidth: 1}: null]} onPress={()=>{setBtn(1)}} > 
        <Image source={require('../Images/office.png')} style={{width:34, height:34}}/>
        <Text style={{color:'#000000'}}>Work</Text>
        </Pressable>
      </View>
      <CustomButton
  bg={'#f8b422'}
  title={'Save Address'}
  color={'#ffffff'}
  onClick={() => {
    if (route.params.type === 'edit') {
      dispatch(updateAddress({
        state: state,
        city: city,
        address: address,
        type: btn === 0 ? 'Home' : 'Office',
        id: route.params.data.id
      }));
    } else {
      dispatch(addAddress({
        state: state,
        city: city,
        address: address,
        type: btn === 0 ? 'Home' : 'Office',
        id: uuid.v4()
      }));
    }
    navigation.goBack();
  }}
/>

    </View>
  );
}
const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#ffffff',
},
addButton:{
  width:50,
  height:50,
  backgroundColor:'#e65716',
  borderRadius:25,
  position:"absolute",
  bottom:50,
  right:20,
  justifyContent:'center',
  alignItems:'center'
},
input:{
    width:'90%',
    height:50,
    borderRadius:10,
    borderWidth:0.3,
    paddingLeft:20,
    marginTop:20,
    alignSelf:'center'
},
typeView:{
    width:'100%',
    flexDirection:'row',
    marginTop:20,
    justifyContent:'space-evenly',
    alignItems:"center"
},
typeBtn:{
    width: 60,
    height:60,
    borderRadius:10,
    borderWidth:0.5,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:'center'
}
})
export default AddAddress;
