import React, { useState } from 'react';
import { View, Text, StyleSheet , TextInput, Pressable } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';



const SignUp = () => {
    const navigation = useNavigation();
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpass,setConfirmPass] = useState('')
    const AddUser =()=>{
        firestore()
  .collection('Users')
  .add({
    name:name,
    email:email,
    mobile:number,
    password:password
  })
  .then(() => {
   navigation.navigate('Login')
  });
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput style={styles.input} placeholder='Enter Name' placeholderTextColor='gray' onChangeText={(txt)=>{setName(txt)}} value={name}/>
      <TextInput style={styles.input} keyboardType= 'email-address' placeholder='Enter Email' placeholderTextColor='gray' onChangeText={(txt)=>{setEmail(txt)}} value={email}/>
      <TextInput style={styles.input} keyboardType='numeric' placeholder='Enter Phone no' placeholderTextColor='gray' onChangeText={(txt)=>{setNumber(txt)}} value={number}/>
      <TextInput style={styles.input} secureTextEntry={true} placeholder='Enter Password' placeholderTextColor='gray' onChangeText={(txt)=>{setPassword(txt)}} value={password}/>
      <TextInput style={styles.input} secureTextEntry={true} placeholder='Confirm Password' placeholderTextColor='gray' onChangeText={(txt)=>{setConfirmPass(txt)}} value={confirmpass}/>
      <CustomButton bg={'#ffbc2c'} title={'Sign Up'} color={'#ffff'} onClick={()=>{if(password == confirmpass){AddUser();}else{Alert.alert('Password Mismatch','Incorrect password Confirmation.')}}}/>
        <Text style={styles.loginText} onPress={()=>{navigation.navigate('Login')}}>Login</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffff',
    },
    title:{
        color:'black',
        fontSize:36,
        marginLeft:20,
        marginTop:50,
        marginBottom:50,
    },
    input:{
        width:'90%',
        height:50,
        borderRadius:10,
        borderWidth:0.5,
        paddingLeft:20,
        alignSelf:'center',
        marginTop:10,
        color:"#000000"
    },
    loginText:{
        alignSelf:'center',
        marginTop:20,
        fontSize:18,
        textDecorationLine:'underline',
        color:'gray'
    }
})
export default SignUp;
