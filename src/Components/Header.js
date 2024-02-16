import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, Dimensions, StyleSheet, Pressable , Text} from 'react-native';
import { useSelector } from 'react-redux';
const {height , width} = Dimensions.get('window')
const Header = ({title , leftIcon , rightIcon , onClickLeftIcon , onClickRightIcon, isCart}) => {
    const cartItems = useSelector(state => state.cart)
    const navigation = useNavigation();
  return (
    <View style={styles.header}>
        <Pressable style={styles.button} onPress={()=>{onClickLeftIcon();}}>
            <Image source={leftIcon} style={styles.icon}/>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        {isCart && <View></View>}
        {!isCart &&     <Pressable style={styles.button} onPress={()=>{navigation.navigate('Cart')}}>
        <Image source={rightIcon} style={[styles.icon, {width:40,height:40}]}/>
        {cartItems.data.length == '0'? null: (
            <View style={styles.count}>
            <Text style={{color:'#000'}}>{cartItems.data.length}</Text>
         </View>
        ) }
        </Pressable>}
    </View>
  );
}
const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        width: width,
        height: 65,
        backgroundColor: '#398cdf',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    button:{
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        width:30,
        height:30,
        tintColor:'#ffff'
    },
    title:{
        color:'#fff',
        fontSize:20,
    },
    count:{
        width:20,
        height:20,
        borderRadius:10,
        backgroundColor:'#fff',
        position:'absolute',
        right:0,
        top:0,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default Header;
