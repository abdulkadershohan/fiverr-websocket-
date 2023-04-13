import React from 'react';

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

//default function EditProfileRowInput({title, inputText})
//const EditProfileRowInput = props =>
export const EditProfileRowInput = props => {
  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment

    <>
      <View style={styles.row}>
        <Text style={styles.titleText}>{props.title}</Text>
        <View style={styles.EditRow}>
          <Text>Hi</Text>
        </View>
      </View>
      <View style={styles.RowUnderline} />
    </>
  );
};

/*
 <TextInput
            value={props.input}
            onChangeText={input => {
              props.setInput(input);
            }}
            style={{...styles.text, ...props.textStyle}}
            placeholder={props.placeholderText}
            placeholderTextColor="grey"
            //autoCapitalize="none"
            secureTextEntry={props.secureTextEntry}
            //onChange = {textChangeHandler}
          />
*/
// Styles
const styles = StyleSheet.create({
  row: {
    backgroundColor: '#0E0E2C',
    flexDirection: 'row',
    paddingTop: 0,
    Height: windowHeight * 0.038,
    //paddingBottom : 5,
    //marginBottom : 5
    //paddingVertical : 20
  },

  EditRow: {
    position: 'absolute',
    left: windowWidth * 0.3,
  },

  RowUnderline: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: windowWidth * 0.3,
    marginBottom: 35,
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
