import React from 'react';
import {useState} from 'react';
//import DatePicker from 'react-native-date-picker'

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

//Responsive Font Size
const h1FontSize = windowWidth * 0.0822;
const fontSizeReductions = 4;

export const TextType = props => {
  if (props.type == 'h1') {
    return <Text style={{...styles.h0, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'h2') {
    return <Text style={{...styles.h2, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'h3') {
    return <Text style={{...styles.h3, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'h4') {
    return <Text style={{...styles.h4, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'h5') {
    return <Text style={{...styles.h5, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'h6') {
    return <Text style={{...styles.h6, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'p1') {
    return <Text style={{...styles.p1, ...props.textStyle}}>{props.text}</Text>;
  } else if (props.type == 'p2') {
    return <Text style={{...styles.p2, ...props.textStyle}}>{props.text}</Text>;
  }
};

styles = StyleSheet.create({
  h0: {
    fontSize: h1FontSize + 6,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  h1: {
    fontSize: h1FontSize,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  h2: {
    fontSize: h1FontSize - fontSizeReductions * 1.5,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  h3: {
    fontSize: h1FontSize - fontSizeReductions * 2.5,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  h4: {
    fontSize: h1FontSize - fontSizeReductions * 3.2,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  h5: {
    fontSize: h1FontSize - fontSizeReductions * 4,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  h6: {
    fontSize: h1FontSize - fontSizeReductions * 4.5,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },

  p1: {
    fontSize: h1FontSize - fontSizeReductions * 4.5,
    //fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  p2: {
    fontSize: h1FontSize - fontSizeReductions * 5.25,
    //fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
