import React from 'react';
import {useState, useCallback} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

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
  Platform,
} from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

// My Components - atoms

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from './globalStyles';

export default function SelectDob(props) {
  //export const SelectDob = props => {
  const today = new Date();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={{...styles.input, ...props.inputStyle}}
        onPress={() => setOpen(true)}>
        {props.input.toDateString() == today.toDateString() ? (
          <Text style={styles.text}> Select your date of birth </Text>
        ) : (
          <Text style={styles.inputText}>
            {props.input.toDateString().split(' ')[2] +
              ' ' +
              props.input.toDateString().split(' ')[1] +
              ' ' +
              props.input.toDateString().split(' ')[3] +
              ' '}
          </Text>
        )}

        {open ? (
          <Ionicons
            name="md-chevron-up"
            size={20}
            color="black"
            style={styles.arrow}
          />
        ) : (
          <Ionicons
            name="md-chevron-down"
            size={20}
            color="black"
            style={styles.arrow}
          />
        )}
        <DatePicker
          modal
          mode="date"
          open={open}
          date={props.input}
          onConfirm={input => {
            setOpen(false);
            props.setInput(input);
          }}
          onCancel={() => {
            setOpen(false);
            //setDate(date);
          }}
        />
      </TouchableOpacity>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 7,
    width: '80%',
    height: '6%',
    marginBottom: 15,
    justifyContent: 'center',
    paddingTop: 4,
    //alignItems : 'center'
  },

  text: {
    height: 50,
    flex: 1,
    padding: 10,
    color: 'grey',
    justifyContent: 'center',
  },
  inputText: {
    height: 50,
    flex: 1,
    padding: 10,
    color: 'black',
    justifyContent: 'center',
  },

  arrow: {
    //position : 'absolute',
    // left: windowWidth*0.85,
    alignSelf: 'flex-end',
    marginEnd: '4%',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
