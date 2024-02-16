import React, { useState } from 'react';
import { View, Text , StyleSheet ,Image, Pressable, Alert} from 'react-native';
import Header from '../Components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../Components/CustomButton';
import { useDispatch } from 'react-redux';
import { addItemtoWishList } from '../redux/Slices/WishlistSlice';
import { AddtoCart } from '../redux/Slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../Components/AskForLoginModal';

const ProductDetail = () => {
    
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [modalIsVisible , setModalIsVisible] = useState(false)
    const [qty,setQty] = useState(1)
    const checkUserStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
        console.log(status);
    
        if (status === null) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        return false;
      }
    };
    
  return (
    <View style={styles.container}>
      <Header leftIcon={require('../Images/back.png')} rightIcon={require('../Images/cart.png')} onClickLeftIcon={()=>{navigation.goBack()}}
       title='Product Details'/>
       <ScrollView>
       <Image source={{uri:route.params.data.image}} style={styles.banner}/>
       <Text style={styles.title}>{route.params.data.title}</Text>
       <Text style={styles.desc}>{route.params.data.description}</Text>
       <View style={{flexDirection:'row'}}>
        <Text style={[styles.price,{color:'#000'}]}>Price:</Text>
       <Text style={styles.price}>{'$'+ route.params.data.price}</Text>
       <View style={styles.qtyView}>
       <Pressable onPress={()=>{setQty(qty + 1)}}>
            <Image style={styles.icons} source={require('../Images/plus.png')}/>
          </Pressable>
          <Text style={{fontSize:24, color:'black', marginTop:5, fontWeight:'600'}}>{qty}</Text>
          <Pressable onPress={()=>{
            if(qty > 1){
                setQty(qty - 1)
            }
          }}>
            <Image  style={styles.icons} source={require('../Images/minus.png')}/>
          </Pressable>
       </View>
       </View>
       <Pressable style={styles.wishlistBtn} onPress={async () => {
    if (await checkUserStatus()) {
      dispatch(addItemtoWishList(route.params.data));
    } else {
      setModalIsVisible(true);
    }
  }}>
        <Image style={styles.heart} source={require('../Images/wishlist.png')}/>
       </Pressable> 
       <CustomButton
  bg='#FFC55C'
  title='Add to Cart'
  color='#808080'
  onClick={async () => {
    if (await checkUserStatus()) {
      dispatch(AddtoCart({
        id: route.params.data.id,
        title: route.params.data.title,
        price: route.params.data.price,
        category: route.params.data.category,
        description: route.params.data.description,
        image: route.params.data.image,
        qty: qty,
      }));
    } else {
      setModalIsVisible(true);
    }
  }}
  
/>
<AskForLoginModal modalIsVisible={modalIsVisible} onClickSignin={()=>{setModalIsVisible(false); navigation.navigate('Login')}} onClickSignup={()=>{setModalIsVisible(false); navigation.navigate('SignUp')}} onClose={()=>{setModalIsVisible(false)}}/>
       </ScrollView >
    </View>
  );
}
const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:"#fff"
},
banner:{
    width:'100%',
    height:350,
    resizeMode:'center'
},
title:{
    fontSize:22,
    color:'#000',
    fontWeight:'600',
    marginLeft:20,
    marginTop:20,
    textAlign:'center',
    alignContent:'center',
    justifyContent:'center'
},
desc:{
    fontSize:16,
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    color:'gray'
},
price:{
    color:'green',
    marginLeft:20,
    marginTop:20,
    fontSize:20,
    fontWeight:'800'
},
wishlistBtn:{
    position:'absolute',
    right:10,
    top:30,
    backgroundColor:'#dddddd',
    justifyContent:'center',
    alignItems:'center',
    width:50,
    height:50,
    borderRadius:25,
},
heart:{
    width:24,
    height:24,
},
qtyView:{
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

})
export default ProductDetail;
