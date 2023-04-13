import React from 'react';
import {useState, useCallback, useContext} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';

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

// My Components - atoms
import {TextType} from '../atoms/TextType';
import {QuestionRow} from '../molecules/QuestionRow';
import {PrimaryButton} from '../atoms/Button';

// My Components - molecules
import {UploadPhoto} from '../molecules/UploadPhoto';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

export default function UploadPhotoForm({navigation, http_type}) {
  const {submitPhotos, registerUser} = useContext(AuthContext);

  const {
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
    image1Loading,
    setImage1Loading,
    image2Loading,
    setImage2Loading,
    image3Loading,
    setImage3Loading,
    error,
  } = useContext(LoggedInUserContext);

  console.log('UploadPhotoForm image1 -> ' + JSON.stringify(image1));

  console.log('image1Loading -> ' + image1Loading);
  console.log('image2Loading -> ' + image2Loading);
  console.log('image3Loading -> ' + image3Loading);

  return (
    <>
      <View style={styles.row}>
        <UploadPhoto
          //uploadPhoto={() => chooseFile({setFilePath1})}
          filePath={image1}
          setFilePath={setImage1}
          source={{
            uri: image1.uri,
          }} //filepath1 not filey
          style={styles.image1}
          imageLoading={image1Loading}
        />

        <UploadPhoto
          //uploadPhoto={() => chooseFile({setFilePath1})}
          filePath={image2}
          setFilePath={setImage2}
          source={{
            uri: image2.uri,
          }} //filepath1 not filey
          style={styles.image2}
          addButtonStyle={styles.addButton2}
          deleteButtonStyle={styles.deleteButton2}
          imageLoading={image2Loading}
        />
        <UploadPhoto
          //uploadPhoto={() => chooseFile({setFilePath1})}
          filePath={image3}
          setFilePath={setImage3}
          source={{
            uri: image3?.uri,
          }} //filepath1 not filey
          style={styles.image3}
          addButtonStyle={styles.addButton3}
          deleteButtonStyle={styles.deleteButton3}
          imageLoading={image3Loading}
        />
      </View>
      <View style={styles.submitButton}>
        <PrimaryButton
          buttonStyle={{marginTop: 20}}
          type="filled"
          title="Submit"
          onPress={() => {
            if (http_type == 'POST') {
              submitPhotos({navigation: navigation, http_type: http_type}); //includes submit photos
            } else if (http_type == 'PATCH') {
              submitPhotos({navigation: navigation, http_type: http_type});
            }
          }}
        />
        {error && (
          <TextType type="p1" text={error} textStyle={globalStyles.error} />
        )}
      </View>
      <View style={{paddingBottom: 200}} />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image1: {
    //backgroundColor: '#D9D9D9',
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: 0,
    marginRight: windowWidth * 0.025,
    marginLeft: windowWidth * 0.025,
    //alignSelf: 'flex-start',
    //right : '30%',
    //left: '30%',
  },
  image2: {
    //backgroundColor: '#D9D9D9',
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: 0,
    marginRight: windowWidth * 0.025,
    marginLeft: windowWidth * 0.025,
    //alignSelf: 'flex-start',
    right: '50%',
    //left: '30%',
  },
  addButton2: {
    //alignItems: 'center',
    justifyContent: 'center',
    right: '135%',
    //top: '6%',
  },
  deleteButton2: {
    //alignItems: 'center',
    justifyContent: 'center',
    right: '70%',
    bottom: '30%',
    paddingRight: '7%',
  },
  image3: {
    //backgroundColor: '#D9D9D9',
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: 0,
    marginRight: windowWidth * 0.025,
    marginLeft: windowWidth * 0.025,
    //alignSelf: 'flex-start',
    right: '100%',
    //left: '30%',
  },
  addButton3: {
    //alignItems: 'center',
    justifyContent: 'center',
    right: '182%',
    //top: '6%',
  },
  deleteButton3: {
    //alignItems: 'center',
    justifyContent: 'center',
    right: '120%',
    bottom: '30%',
    paddingRight: '7%',
  },
  row: {
    //alignSelf: 'flex-start',
    marginVertical: '5%',
    flexDirection: 'row',
    marginHorizontal: '5%',
    //justifyContent:'center',
    //alignItems :'center',
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: '5%',
  },

  scrollScreen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingTop: 50,
  },

  progressText: {
    paddingRight: '10%',
    paddingBottom: 10,
    color: '#32629F',
    alignSelf: 'flex-end',
    fontSize: 12,
  },

  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
});
