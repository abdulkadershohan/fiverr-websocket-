import React from 'react';
import {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ListItem,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const interests = [
  'Music',
  'Travelling',
  'Sport',
  'Gaming',
  'Business',
  'Investing',
  'Christianity',
  'Islam',
  'Hinduism',
  'Sikhism',
  'Judaism',
  'Buddhism',
];

export const Logo = props => {
  return (
    <Image
      source={require('../../assets/images/sayHi/logo-no-glow.png')}
      style={{...styles.logo, ...props.style}}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  logo: {
    //width: windowHeight * 0.1,
    height: windowHeight * 0.07,
    borderRadius: 10,
    paddingRight: 30,
    aspectRatio: 1,
    marginBottom: '9%',
  },
});
