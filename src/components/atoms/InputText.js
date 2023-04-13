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

// Components

//Styling
//import { styles } from './style';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const InputText = props => {
  return (
    <View style={{...styles.input, ...props.inputStyle}}>
      <TextInput
        value={props.input}
        onChangeText={input => {
          props.setInput(input);
        }}
        style={{...styles.text, ...props.textStyle}}
        placeholder={props.placeholderText}
        placeholderTextColor="grey"
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry}
        //onChange = {textChangeHandler}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '80%',
    height: '6%',
    marginBottom: 20,
  },

  text: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'black',
  },
});

//export default PrimaryButton;
