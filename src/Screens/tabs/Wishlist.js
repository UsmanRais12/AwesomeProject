import React from 'react';
import { View, Text, StyleSheet , Dimensions, FlatList, TouchableOpacity,Image} from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';

const Wishlist = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.wishlist)
  console.log(JSON.stringify(items))
  return (
    <View style={styles.container}>
      <Header title='Wishlist Items' isCart={false} rightIcon={require('../../Images/cart.png')}/>
      <FlatList
    data={items.data}
    renderItem={({ item, index }) => (
      <TouchableOpacity style={styles.productItem} activeOpacity={1} onPress={() => { navigation.navigate('ProductDetail', { data: item }) }}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View>
          <Text style={styles.name}>{item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}</Text>
          <Text style={styles.description}>{item.description.length > 30 ? item.description.substring(0, 30) + '...' : item.description}</Text>
          <Text style={styles.price}>{'$' + item.price}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.flatListContent}
  />
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
  }

})
export default Wishlist;
