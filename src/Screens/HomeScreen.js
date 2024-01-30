import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Share } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import Clipboard from '@react-native-clipboard/clipboard';

const HomeScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getQuotes();
    }, []);

    const getQuotes = async () => {
        const response = await fetch('https://type.fit/api/quotes');
        const result = await response.json();
        console.log(result)
        setData(result);
    }

    const handleShare = (text) => {
        Share.share({
            message: text,
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.quotes}>Quotes</Text>
                <Text style={styles.hub}>Hub</Text>
            </View>
            <View>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={styles.quoteItem}>
                            <Image source={require('../Images/open.png')} style={[styles.openImage, { marginLeft: 10 }]} />
                            <Text style={[styles.quoteText, { color: 'black' }]}>{item.text}</Text>
                            <Text style={[styles.quoteText, { alignSelf: 'flex-end', color: 'red' }]}>{'~' + item.author}</Text>
                            <Image source={require('../Images/close.png')} style={[styles.openImage, { marginRight: 10, alignSelf: 'flex-end', tintColor: 'red' }]} />
                            <View style={styles.quoteBottomView}>
                                <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={() => { Clipboard.setString(item.text + '\n' + '~' + item.author) }}>
                                    <Image source={require('../Images/copy.png')} style={styles.buttonIcon} />
                                </Pressable>
                                <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={() => { handleShare(item.text) }}>
                                    <Image source={require('../Images/share.png')} style={styles.buttonIcon} />
                                </Pressable>
                            </View>
                        </View>
                    )
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    quotes: {
        fontSize: 20,
        fontWeight: '800',
        color: 'black'
    },
    hub: {
        fontSize: 20,
        color: 'red'
    },
    quoteItem: {
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 20,
        elevation: 1,
        backgroundColor: 'white',
        paddingBottom: 5,
    },
    openImage: {
        height: 20,
        width: 20,
        marginTop: 10,
    },
    quoteText: {
        margin: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    quoteBottomView: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#e6e6e6',
        width: '40%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        width: 25,
        height: 25,
    },
    pressed: {
        opacity: 0.7
    }
});

export default HomeScreen;
