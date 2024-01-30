import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get('screen');

const data = [
  require('../Images/quotes.png'),
  require('../Images/quotesa.png'),
  require('../Images/quotesb.png')
];

const Intro = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.listview}>
        <FlatList
          data={data}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                {/* Set the image style to maintain aspect ratio */}
                <Image source={item} style={styles.imageStyle} resizeMode="contain" />
                <Text style={styles.listText}>Welcome to Quote Hub</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.continueButton} onPress={()=>{navigation.navigate('HomeScreen')}}>
          <Text style={styles.buttonText}>Continue to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listview: {
    height: 300,
  },
  itemView: {
    width: width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueButton: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18
  },
  imageStyle: {
    width: width - 20, // Set width to screen width with some padding
    height: 200,
  },
  listText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: 'black'
  }
});

export default Intro;
