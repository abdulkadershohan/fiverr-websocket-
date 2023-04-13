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
  KeyboardAvoidingView,
} from 'react-native';

// Components

//Styling
//import { styles } from './style';
import {mainColour} from './globalStyles';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const marginBottom = '5%'

export const PrimaryButton = props => {
  if (props.type == 'no fill') {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Text style={{...styles.textButton, ...props.textStyle}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  } else if (props.type == 'filled') {
    return (
      <TouchableOpacity
        style={{...styles.buttonFilled, ...props.buttonStyle}}
        onPress={props.onPress}>
        <Text style={{...styles.textDark, ...props.textStyle}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  } else if (props.type == 'outline')
    return (
      <TouchableOpacity
        style={{...styles.buttonOutline, ...props.buttonStyle}}
        onPress={props.onPress}>
        <Text style={{...styles.textLight, ...props.textStyle}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
};

// Styles
const styles = StyleSheet.create({
  buttonOutline: {
    width: '80%',
    borderRadius: 25,
    height: windowHeight * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: marginBottom,
    backgroundColor: 'transparent',
    borderColor: mainColour,
    borderWidth: 1.5,
  },

  buttonFilled: {
    width: '80%',
    borderRadius: 25,
    height: windowHeight * 0.06, //"6%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: marginBottom,
    backgroundColor: mainColour,
  },

  buttonNoFill: {
    fontSize: 15,
    fontWeight: 'bold',
    color: mainColour,
  },

  textButton: {
    fontSize: 15,
    fontWeight: 'bold',
    color: mainColour,
    alignSelf: 'flex-start',
  },

  textDark: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  textLight: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#dbdbdb',
    padding: 10,
  },
});
