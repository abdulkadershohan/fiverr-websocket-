import {React, useState, useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import ConfettiExplosion from 'react-confetti-explosion';
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

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Navigation
import ProfileTab1 from '../../navigation/Profile/ProfileTab1';

// Screens
import Interests from './Interests';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
Entypo.loadFont();
Ionicons.loadFont();

//Context
import {UserContext} from '../../context/UserContext';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;

export default function UserPhotos({route, navigation}) {
  const {getUserProfileData} = useContext(UserContext);
  const {userProfile} = useContext(LoggedInUserContext);
  var {email} = route.params;
  const isVisible = useIsFocused();

  useEffect(() => {
    if (isVisible) {
      console.log(
        '*** -- called when User Profile screen opens or when we back on the screen -- *** ',
      );
      console.log(email);
      getUserProfileData(email);
      console.log('************* USER PROFILE ************');
      console.log(userProfile);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      <ScrollView
        style={{
          backgroundColor: '#0E0E2C',
          paddingBottom: 10,
        }}>
          <View style={styles.row}>
        <Image source={{uri: userProfile.avatar}} style={styles.main_image} />
        </View>
        <View style={styles.row}>
        <Image source={{uri: userProfile.image1}} style={styles.main_image} />
        </View>
        <View style={styles.row}>
        <Image source={{uri: userProfile.image2}} style={styles.main_image} />
        </View>
      </ScrollView>
    </>
  );
}

// Styles
const styles = StyleSheet.create({

  row: {
    flex: 1,
    //backgroundColor: '#0E0E2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:'1%',
    
  },
  main_image: {
    width: pictureWidth,
    height: pictureHeight,
    borderRadius: 30,
    marginRight: windowWidth * 0.03,
    marginTop: 0,
    marginHorizontal: 10,
    marginBottom: windowHeight * 0.03,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image1: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    borderRadius: 10,
    right: windowWidth * 0.05,
    top: windowHeight * 0.07,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image2: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    borderRadius: 10,
    right: windowWidth * 0.05,
    top: windowHeight * 0.21,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC', //: '#2AAFCC',
    width: windowWidth * 0.5,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'center',
    //right: windowWidth * 0.5,
    top: windowHeight * 0.33,
    position: 'absolute',
  },
  roundButton1Hi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#386E7A', //: '#2AAFCC',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    right: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton1NoHi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    right: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton2Hi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#386E7A',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    left: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton2NoHi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    left: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  nameAge: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: windowWidth * 0.08, //30
    paddingTop: 20,
    paddingBottom: 30,
  },

  jobLocation: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 30,
    paddingBottom: 5,
  },
  icons: {
    marginLeft: windowWidth * 0.62,
    //marginRight: 0,
    paddingTop: 20,
    paddingBottom: 30,
  },
  /*row: {
    backgroundColor: '#0E0E2C',
    flexDirection: 'row',
    paddingTop: 0,
    Height: windowHeight * 0.038,
  },*/
});
