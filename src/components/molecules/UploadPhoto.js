import React from 'react';
import {useState, useContext} from 'react';
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
  Platform,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

//context
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

// My Components - atoms
import {TextType} from '../components/atoms/TextType';


// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';
import { mainColour } from '../atoms/globalStyles';

//import {color} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

export const UploadPhoto = props => {
  var addButtonColour = props.filePath == false ? 'white' : 'transparent';
  const chooseFile = setFilePath => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets[0].fileSize > 25000000) {
        console.log('User tapped custom  button: ', response.customButton);
        alert('Max image size exceeded, choose image under 20MB');
      } else {
        //setFilePath(response.assets[0].uri.split('/').pop()); //file name
        setFilePath(response.assets[0]); //file name setFilePath(response.assets[0].uri)
        //setFilePath(response.assets[0].uri); //file path (uri)
        console.log(props.filePath);
        console.log('*** response ***' + JSON.stringify(response));
        console.log('hey');
      }
    });
  };

  const removeFile = setFilePath => {
    setFilePath(false);
  };
  //onPress={props.uploadPhoto}
  return (
    <View style={styles.row}>
      {props.imageLoading == false && props.filePath == false && (
        <View style={{...styles.image, ...props.style}} />
      )}
      {props.imageLoading == true && props.filePath != false && (
        <View style={{...styles.loadingImage, ...props.style}} />
      )}
      {props.imageLoading == true && props.filePath != false && (
        <TouchableOpacity
          style={{...styles.addButton, ...props.addButtonStyle}}
          onPress={() => alert('image loading')}>
          <FontAwesome name="spinner" size={50} color={mainColour} />
        </TouchableOpacity>
      )}
      {props.imageLoading == false && props.filePath != false && (
        <Image
          //require({props.filePath})
          source={props.source}
          //source={require(props.filePath)}
          //source={require('/Users/mahtah/Documents/SayHi_frontend/sayHi/src/assets/images/users/MahTah.jpg')}
          style={{...styles.image, ...props.style}}
        />
      )}
      {props.imageLoading == false && props.filePath == false && (
        <TouchableOpacity
          style={{...styles.addButton, ...props.addButtonStyle}}
          onPress={() => chooseFile(props.setFilePath)}>
          <Ionicons name="add" size={40} color={addButtonColour} />
        </TouchableOpacity>
      )}
      {props.imageLoading == false && props.filePath != false && (
        <TouchableOpacity
          style={{...styles.deleteButton, ...props.deleteButtonStyle}}
          onPress={() => removeFile(props.setFilePath)}>
          <Ionicons name="close-circle" size={20} color={'white'} />
        </TouchableOpacity>
      )}
      {/*<TouchableOpacity
        style={styles.roundButton}
        onPress={() => chooseFile(props.setFilePath)}>
        <Text style={styles.text}>{'Upload photo'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.roundButton2}
        onPress={() => removeFile(props.setFilePath)}>
        <Text style={styles.text}>{'Remove photo'}</Text>
      </TouchableOpacity>*/}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  row: {
    //alignSelf: 'flex-start',
    //marginBottom: '5%',
    flexDirection: 'row',
  },
  loadingImage: {
    backgroundColor: '#0E0E2C',
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: 0,
    marginRight: windowWidth * 0.025,
    marginLeft: windowWidth * 0.025,
    //alignSelf: 'flex-start',
    //right : '30%',
    //left: '30%',
  },
  image: {
    backgroundColor: '#D9D9D9',
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: 0,
    marginRight: windowWidth * 0.025,
    marginLeft: windowWidth * 0.025,
    //alignSelf: 'flex-start',
    //right : '30%',
    //left: '30%',
  },
  addButton: {
    //alignItems: 'center',
    justifyContent: 'center',
    right: '85%',
    //top: '6%',
  },
  deleteButton: {
    //alignItems: 'center',
    justifyContent: 'center',
    right: '20%',
    bottom: '30%',
    paddingRight: '7%',
  },

  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    left: '60%',
    top: '6%',
    //marginVertical: '8%',
    //marginHorizontal: 70,
    //alignSelf: 'flex-end',
  },
  roundButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    right: '63%',
    top: '19%',
    //marginVertical: '5%',
    //marginHorizontal: 70,
    //alignSelf: 'flex-end',
  },

  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
