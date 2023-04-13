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

export const EditProfileRowInput = props => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.titleText}>{props.title}</Text>
        <View style={styles.EditRow}>
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
      </View>
      <View style={styles.RowUnderline}></View>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  row: {
    backgroundColor: '#0E0E2C',
    flexDirection: 'row',
    paddingTop: 0,
    Height: windowHeight * 0.038,
    //paddingVertical : 20
  },

  EditRow: {
    position: 'absolute',
    left: windowWidth * 0.3,
  },

  RowUnderline: {
    flexDirection: 'row',
    width: '60%',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: windowWidth * 0.3,
    marginBottom: '10M%',
  },
  underline: {
    //backgroundColor: isActive ?'#13748A': 'transparent',
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 5,
    Height: windowHeight * 0.038,
    //width: '85%',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: '5%',
  },
  titleText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 10,
  },

  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 10,
    Left: windowWidth * 0.5,
    marginLeft: 'auto',
  },
});

//export default PrimaryButton;
