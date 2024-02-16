import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Keyboard } from 'react-native';
import Header from '../Components/Header';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Notification from './tabs/Notification';
import Wishlist from './tabs/Wishlist';
import User from './tabs/User';
import { useEffect } from 'react';
const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [keyboardVisible , setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow', 
          () => {
            setKeyboardVisible(true); 
          }
        );
      
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false); 
          }
        );
      
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
      
    return (
        <View style={styles.container}>
            {selectedTab === 0 ? (<Home />) :
                selectedTab === 1 ? (<Search />) :
                    selectedTab === 2 ? (<Notification />) :
                        selectedTab === 3 ? (<Wishlist />) :
                            (<User />)}

           {!keyboardVisible &&(
             <View style={styles.bottomView}>
                 <Pressable style={styles.bottomTab} onPress={() => { setSelectedTab(0) }}>
                    <Image source={selectedTab==0 ? require('../Images/homefill.png'):require('../Images/home.png')} style={styles.bottomIcon} />
                </Pressable>
                <Pressable style={styles.bottomTab} onPress={() => { setSelectedTab(1) }}>
                    <Image source={require('../Images/search.png')} style={styles.bottomIcon} />
                </Pressable>
                <Pressable style={styles.bottomTab} onPress={() => { setSelectedTab(2) }}>
                    <Image source={selectedTab==2 ? require('../Images/notificationf.png'):require('../Images/notification.png')} style={styles.bottomIcon} />
                </Pressable>
                <Pressable style={styles.bottomTab} onPress={() => { setSelectedTab(3) }}>
                    <Image source={selectedTab==3 ? require('../Images/wishlistf.png'):require('../Images/wishlist.png')} style={styles.bottomIcon} />
                </Pressable>
                <Pressable style={styles.bottomTab} onPress={() => { setSelectedTab(4) }}>
                    <Image source={selectedTab==4 ? require('../Images/profilef.png') : require('../Images/profile.png')} style={styles.bottomIcon} />
                </Pressable>
            </View>
           )}
               
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomIcon: {
        width: 24,
        height: 24
    }
})
export default HomeScreen;
