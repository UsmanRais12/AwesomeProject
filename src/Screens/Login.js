import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const [load ,setLoad] = useState(false)
  const loginUser = () => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
  
          if (userData.password === password) {
            AsyncStorage.setItem('IS_USER_LOGGED_IN', 'true'); 
            setMessage('Login successful');
            setLoad(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      navigation.goBack()
    }, 2000);

    return () => clearTimeout(delay);
  }, []);
          } else {
            setMessage('Incorrect password');
          }
        } else {
          setMessage('User not found');
        }
      })
      .catch(error => {
        console.log('Error fetching user data:', error);
      });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Enter Email"
        placeholderTextColor="gray"
        onChangeText={txt => {
          setEmail(txt);
        }}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Enter Password"
        placeholderTextColor="gray"
        onChangeText={txt => {
          setPassword(txt);
        }}
        value={password}
      />
      <CustomButton
        bg={'#ffbc2c'}
        title={'Login'}
        color={'#ffff'}
        onClick={loginUser}
      />
      <Text
        style={styles.loginText}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        Sign Up
      </Text>
      <Text style={load ? { ...styles.loginText, color: 'green' } : { ...styles.loginText, color: 'red' }}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  title: {
    color: 'black',
    fontSize: 36,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 50,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    alignSelf: 'center',
    marginTop: 10,
    color:'#000000'
  },
  loginText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    textDecorationLine: 'underline',
    color: 'gray',
  },
});

export default Login;
