import React, { useEffect } from "react";
import {Text, View ,StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
const Splash=()=>{
    const navigation = useNavigation();
    useEffect(() => {

        const timer = setTimeout(() => {
          navigation.navigate('Intro');
        }, 5000); 
        return () => clearTimeout(timer);
      }, [navigation]);
    return <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.Quotes}>Quotes</Text>
            <Text style={styles.hub}>Hub</Text>
        </View>
        <View style={styles.bottomView}>
            <Text style={styles.tagline}>Find a perfect Quote for yourself</Text>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    row:{
       flexDirection:'row'
    },
    Quotes:{
        fontSize:30,
        fontWeight:'800',
        color:'black'
    },
    hub:{
        fontSize:30,
        color:'red'
    },
    bottomView:{
        position:'absolute',
        bottom:20,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    tagline:{
        color:'red',
        fontWeight:'500',
        fontStyle:'italic'
    }
})
export default Splash;