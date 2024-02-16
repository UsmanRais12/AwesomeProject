import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image ,Text, TouchableOpacity } from 'react-native';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addProducts } from '../../redux/Slices/ProductsSlice';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const  fetchProducts = async () => {
    await fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
   
        const productsWithQty = json.map(item => ({
          ...item,
          qty: 1,
        }));
  
        setProducts(productsWithQty);
        dispatch(addProducts(productsWithQty));
      });
  };
  

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../Images/menu.png')}
        rightIcon={require('../../Images/cart.png')}
        title="Grocery App"
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.productItem} activeOpacity={1} onPress={()=>{navigation.navigate('ProductDetail', {data:item})}}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
            <Text style={styles.name}>{+item.title.length > 20 ? item.title.substring(0,20)+'...': item.title }</Text>
            <Text style={styles.description}>{+item.description.length > 30 ? item.description.substring(0,30)+'...': item.description}</Text>
            <Text style={styles.price}>{'$'+item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Home;
