import React from 'react';
import { View, Text, Dimensions, Pressable, StyleSheet } from 'react-native';

const CustomButton = ({ bg, title, onClick, color }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onClick}
    >
      <Text style={[styles.text, { color: color }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get('window').width - 40,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CustomButton;
