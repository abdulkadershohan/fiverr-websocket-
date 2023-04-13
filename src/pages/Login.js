import React from 'react';
import {useState, useEffect, useContext} from 'react';
import messaging from '@react-native-firebase/messaging';

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

// My Components

// My Components - atoms
import {PrimaryButton} from '../components/atoms/Button';
import {InputText} from '../components/atoms/InputText';
import {TextType} from '../components/atoms/TextType';
import {HideKeyboard} from '../components/atoms/HideKeyboard';
import { Logo } from '../components/atoms/Logo';

// My Components - organisms
import LoginForm from '../components/organisms/LoginForm';

// Context
import {NotificationContext} from '../context/NotificationContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

export default function Login({navigation}) {
  return (
    <HideKeyboard>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <Logo style={styles.logo} />
        <LoginForm navigation={navigation} />
      </View>
    </HideKeyboard>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    //width: windowHeight * 0.1,
    height: windowHeight * 0.07,
    borderRadius: 10,
    paddingRight: 30,
    aspectRatio: 1,
    marginBottom: '9%',
  },
});
