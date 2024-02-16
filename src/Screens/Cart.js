import React, { useEffect } from 'react';
import { View, Text, StyleSheet , Dimensions, FlatList, TouchableOpacity,Image, Pressable} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { AddtoCart, ReduceFromCart, RemoveFromCart } from '../redux/Slices/CartSlice';
import CheckoutLayout from '../Components/CheckoutLayout';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart)
  const cartItems = useSelector((state) => state.cart.data);
  const getTotal=()=>{
    let total = 0;
    cartItems.map((item)=>{
      total = total+item.qty*item.price
    })
    return total;
  }

  console.log(JSON.stringify(items))
  return (
    <View style={styles.container}>
      <Header title='Cart Items' isCart={true}/>
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
          <Pressable onPress={()=>{dispatch(AddtoCart(item))}}>
            <Image style={styles.icons} source={require('../Images/plus.png')}/>
          </Pressable>
          <Text style={{fontSize:18, color:'black', marginTop:5, fontWeight:'600'}}>{item.qty}</Text>
          <Pressable onPress={()=>{
            if(item.qty>1){
                dispatch(ReduceFromCart(item))
            }else{
                dispatch(RemoveFromCart(index))
            }
          }}>
            <Image  style={styles.icons} source={require('../Images/minus.png')}/>
          </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.flatListContent}
  />
  {cartItems.length < 1&&(
    <View style={styles.noItems}>
      <Text style={{color:"gray"}}>No Items in Cart</Text>
    </View>
  )}
  {cartItems.length > 0 && ( <CheckoutLayout items={cartItems.length} total={getTotal()} children='Checkout'/>)}
    
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
  flatListContent: {
    paddingBottom: 70, // Adjust as needed
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
  }


})
export default Cart;
