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

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SendMessage = props => {
  return (
    <View style={{...styles.input, ...props.inputStyle}}>
      <TextInput
        value={props.value}
        /*onChangeText={input => {
          props.setInput(input);
        }}*/
        multiline
        onChangeText={answer => props.onChangeText(answer)}
        style={{...styles.text, ...props.textStyle}}
        placeholder={props.placeholderText}
        placeholderTextColor="grey"
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry}
        //onChange = {textChangeHandler}
      />
      {/*(props.ws.readyState == 2 || props.ws.readyState == 3) && (
        <TouchableOpacity
          style={{alignItems: 'baseline', paddingRight: 20}}
          onPress={() => alert('connection is low try again later')}>
          <MaterialCommunityIcons
            name="wifi-alert"
            size={20}
            color={'#F91F6D'}
          />
        </TouchableOpacity>
      )*/}
      { (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: 'grey',
    borderWidth: 0.8,
    borderRadius: 30,
    width: '95%',
    //height: '6%',
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'baseline',
  },

  text: {
    flex: 1,
    padding: 8,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    //minHeight:'5%',
  },
  send: {
    // flex: 1,
    padding: 8,
    marginRight: 10,
    color: '#1FA1FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

//export default PrimaryButton;
