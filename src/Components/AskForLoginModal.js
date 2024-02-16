import React from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, Pressable, Image} from 'react-native';

const AskForLoginModal = ({modalIsVisible, onClickSignin,onClickSignup, onClose}) => {
  return (
    <Modal visible={modalIsVisible} transparent>
        <View style = {styles.modalView}>
            <View style={styles.mainView}>
                <Pressable style={[styles.btn,{marginTop:50}]} onPress={()=>{onClickSignin();}}>
                    <Text style={styles.btnText}>Login</Text>
                </Pressable>
                <Pressable style={[styles.btn,{marginBottom:20 , marginTop:20}]} onPress={()=>{onClickSignup();}}>
                <Text style={styles.btnText}>Create Account</Text>
               </Pressable>
               <Pressable style={styles.clearBtn} onPress={()=>{onClose();}}>
                <Image source={require('../Images/close.png')} style={styles.icon}/>
               </Pressable>
            </View>
        </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    modalView:{
        width:Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position:'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,0.7)',
        justifyContent:'center',
        alignItems:'center'
    },
    mainView:{
        backgroundColor:'#fff',
        borderRadius:10,
        width:'90%'
    },
    btn:{
        width:'86%',
        height:50,
        alignSelf:'center',
        backgroundColor:'#f79e38',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:'#fff',
        fontSize:18
    },
    icon:{
        width:24,
        height:24
    },
    clearBtn:{
        position:'absolute',
        top:10,
        right:20,
    }
})
export default AskForLoginModal;
