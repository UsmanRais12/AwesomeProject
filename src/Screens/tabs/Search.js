import {React, useState} from 'react';
import { View, Text, StyleSheet, Image , TextInput, Pressable, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { KeyboardState } from 'react-native-reanimated';

const Search = () => {
  const navigation = useNavigation();
  const productState = useSelector(state => state.product); 
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState(productState.data);
  const [searchedList , setSearchedList] = useState(oldData)
  const filterData = (txt) => {
    let newData = productState.data.filter(item => item.title.toLowerCase().includes(txt.toLowerCase()));
    setSearchedList([newData[0]])
    // console.log(newData[0])
  }

  return (
    <View style={styles.container}>
      <Header title='Search Items'/>
      <View style={styles.SearchView}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <Image style = {styles.icon} source={require('../../Images/search.png')}/>
        <TextInput value={search} onChangeText={(txt)=>{setSearch(txt);filterData(txt)}}style={styles.input} placeholder='Search Products here'/>
        </View>
        {search !== '' && (
  <Pressable style={[styles.icon, { justifyContent: 'center', alignItems: 'center' }]} onPress={()=>{setSearch(''); filterData('')}}>
    <Image style={{ width: 16, height: 16 }} source={require('../../Images/close.png')} />
  </Pressable>
)}
      </View>
      {searchedList.length === 0 ? (
  <Text style={{color:'gray',alignSelf:'center', fontSize:16, marginTop:20, textAlign:'center'}}>Products will showcase here</Text>
) : (
  <View style={{marginTop:20,}}>
      <FlatList
    data={searchedList}
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
)}

    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  }
,
SearchView:{
  width:'90%',
  height:50,
  borderRadius:20,
  borderWidth:0.5,
  alignSelf:'center',
  marginTop:20,
  flexDirection:'row',
  justifyContent:'space-between',
  paddingLeft:20,
  paddingRight:20,
  alignItems:'center'
},
icon:{
  width:24,
  height:24,
  resizeMode:'center'
},
input:{
  width:'80%',
  marginLeft:10,
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
export default Search;
