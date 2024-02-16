import React from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteAddress } from '../redux/Slices/AddressSlice';

const Address = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addressList = useSelector(state => state.address);
  const defaultAddress =async(item) =>{
    await AsyncStorage.setItem('MY_ADDRESS',''+item.city+','+item.state+','+item.address+','+',type: '+item.type)
    navigation.goBack();
  }
  console.log(addressList.data)
  return (
    <View style={styles.container}>
      <Header leftIcon={require('../Images/back.png')} title={'My Addresses'} onClickLeftIcon={() => {navigation.goBack();}} isCart={true}/>
      <FlatList
        data={addressList.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable style={[styles.list, index === addressList.data.length - 1 && styles.lastListItem]} onPress={()=>{defaultAddress(item)}}>
            <Text style={styles.text}>{'State: '+item.state}</Text>
            <Text style={styles.text}>{'City: '+item.city}</Text>
            <Text style={styles.text}>{'Address: '+item.address}</Text>
            <Text style={[styles.text,{position:'absolute',right:10,top:10 ,backgroundColor:'#4163c2',padding:5,color:'#ffffff', fontSize:12, fontWeight:'600'}]}>{item.type}</Text>
            <View style={styles.bottomView}>
              <Pressable onPress={()=>{navigation.navigate('AddAddress',{type:'edit',data:item})}}>
              <Image style={[styles.bottomicon,{marginRight:10}]} source={require('../Images/edit.png')}/>
              </Pressable>
              <Pressable onPress={()=>{dispatch(deleteAddress(item.id))}}>
              <Image style={styles.bottomicon} source={require('../Images/delete.png')}/>
              </Pressable>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.flatListContent}
      />
        <Pressable style={styles.addButton} onPress={() => {navigation.navigate('AddAddress',{type:'new'})}}>
        <Image style={{width: 24, height: 24, tintColor: '#ffffff'}} source={require('../Images/plus.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#e65716',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 50,
    marginBottom: 50,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  bottomView:{
    position:"absolute",
    bottom:10,
    right:10,
    flexDirection:'row'
  },
  bottomicon:{
    width:24,
    height:24
  }
});

export default Address;



