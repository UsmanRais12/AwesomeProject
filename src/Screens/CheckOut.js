import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Components/Header';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AddtoCart, ReduceFromCart, RemoveFromCart } from '../redux/Slices/CartSlice';
import CustomButton from '../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.data);
  const isFocus = useIsFocused();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedAddress , setSelectedAddress] = useState('Please Select Address')

  const getTotal = () => {
    let total = 0;
    cartItems.map((item) => {
      total = total + item.qty * item.price;
    });
    return total;
  };
  useEffect(()=>{getSelectedAddress()},[isFocus])
  const getSelectedAddress = async() =>{
    setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'))
  }
  return (
    <View style={styles.container}>
      <Header title='Check Out' isCart={true} leftIcon={require('../Images/back.png')} onClickLeftIcon={() => { navigation.goBack() }} />
      <Text style={styles.title}>Added Items</Text>
      <View>
        <FlatList
          data={items.data}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.productItem} activeOpacity={1} onPress={() => { navigation.navigate('ProductDetail', { data: item }) }}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}</Text>
                <Text style={styles.description}>{item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description}</Text>
                <View style={styles.qtyview}>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                  <Pressable onPress={() => { dispatch(AddtoCart(item)) }}>
                    <Image style={styles.icons} source={require('../Images/plus.png')} />
                  </Pressable>
                  <Text style={{ fontSize: 18, color: 'black', marginTop: 5, fontWeight: '600' }}>{item.qty}</Text>
                  <Pressable onPress={() => {
                    if (item.qty > 1) {
                      dispatch(ReduceFromCart(item))
                    } else {
                      dispatch(RemoveFromCart(index))
                    }
                  }}>
                    <Image style={styles.icons} source={require('../Images/minus.png')} />
                  </Pressable>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>{'$' + getTotal()}</Text>
      </View>
      <Text style={styles.title}>Select Payment Method</Text>
      
      <Pressable
        style={({ pressed }) => [
          styles.paymentmethods,
          pressed || selectedPaymentMethod === 1 ? { borderWidth: 1 , borderColor:'blue' } : null,
        ]}
        onPress={() => {
          setSelectedPaymentMethod(1);
        }}
      >
        <Image source={require('../Images/card.png')} style={styles.payicon} />
        <Text style={styles.name}>Credit/Debit Card</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.paymentmethods,
          pressed || selectedPaymentMethod === 2 ? { borderWidth: 1, borderColor:'blue'} : null,
        ]}
        onPress={() => {
          setSelectedPaymentMethod(2);
        }}
      >
        <Image source={require('../Images/razorpay.png')} style={styles.payicon} />
        <Text style={styles.name}>Paypal/Phone Pay</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.paymentmethods,
          pressed || selectedPaymentMethod === 0 ? { borderWidth: 1, borderColor:'blue' } : null,
        ]}
        onPress={() => {
          setSelectedPaymentMethod(0);
        }}
      >
        <Image source={require('../Images/cash.png')} style={styles.payicon} />
        <Text style={styles.name}>Cash on Delivery</Text>
      </Pressable>
      
      <View style={styles.addressview}>
        <Text style={styles.title}>Address</Text>
        <Text style={[styles.title,{textDecorationLine:'underline', color:'#2179cc'}]} onPress={()=>{navigation.navigate('Address')}}>Edit Address</Text>
      </View>
      <Text style={{color:'gray', fontSize:16, marginTop:10, marginLeft:10}}>{selectedAddress}</Text>
   

      <CustomButton bg={'green'} title={'Place Order'} color={'#ffffff'}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffff'
  },
  productItem: {
    width: Dimensions.get('window').width - 20,
    height: 120,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    flexDirection:'row'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  name:{
    color:'gray',
    fontSize:18,
    fontWeight:'600',
    marginLeft:20,
  },
  description:{
    marginLeft:20,
    color:'#000'
  },
  price:{
    color:'green',
    fontSize:18,
    fontWeight:'600',
    marginLeft:20,
    marginTop:5,
  },
  qtyview:{
    flexDirection:'row',
    alignItems:'center'
  },
  icons: {
    width: 24,
    height: 20,
    marginLeft: 25,
    marginRight:25,
    marginTop:10,
  },
  noItems:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:"center"
  },
  totalView:{
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginTop:20,
    height:50,
    borderBottomWidth:0.3,
    borderBottomColor:'gray'
  },
  title:{
    fontSize:18,
    color:'#000000',
    marginTop:20,
    marginLeft:10
  },
  total:{
    fontSize:20,
    color:'gray',
    justifyContent:'space-between',
    margin:10,
    marginTop:0,
    fontWeight:'600'
  },
  paymentmethods:{
    flexDirection:'row',
    marginTop:20,
    width:'90%',
    height:50,
    borderWidth:0.5,
    borderColor:'gray',
    alignItems:'center',
    alignSelf:"center",
    borderRadius:25,
  },
  payicon:{
    width:28,
    height:28,
    marginLeft:20,
    tintColor:'green'
  },
  pressed:{
    borderWidth:1
  },
  addressview:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    paddingRight:20
  }

})
export default Checkout;
