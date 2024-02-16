import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

const CheckoutLayout = ({total,items, children}) => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.tab}>
            <Text style={styles.text}>(Items{items})</Text>
            <Text style={styles.text}>{'Total $'+ total}</Text>
        </View>
        <View style={styles.tab}>
          <Pressable style={styles.checkout} onPress={()=>{navigation.navigate('CheckOut')}}>
            <Text style={{color:"#ffff"}}>{children}</Text>
          </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
container:{
    position:'absolute',
    bottom:0,
    height:100,
    width:Dimensions.get('window').width,
    backgroundColor:'#fffffff',
    flexDirection:'row',
},
tab:{
    width:'50%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
},
checkout:{
    width:'80%',
    height:'60%',
    backgroundColor:'#FFC000',
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center'
},
text:{
    fontSize:18,
    fontWeight:'700',
    color:'gray'
}
})
export default CheckoutLayout;
