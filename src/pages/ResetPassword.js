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
} from 'react-native';

// My Components

// My Components - atoms
import {PrimaryButton} from '../components/atoms/Button';
import {InputText} from '../components/atoms/InputText';
import {TextType} from '../components/atoms/TextType';

// My Components - organisms
import ResetPasswordForm from '../components/organisms/ResetPasswordForm';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

export default function ResetPassword({navigation}) {
  return (
    <View style={{...globalStyles.screen, ...styles.screen}}>
      <TextType type="h3" text="Reset password" textStyle={styles.title} />
      <TextType
        type="p1"
        text="Set the new password for your account, so you can login and access our platform."
        textStyle={styles.text}
      />
      <View style={{paddingBottom: 30}} />
      <ResetPasswordForm navigation={navigation} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    right: '18%',
    paddingBottom: '5%',
    //fontSize : 20,
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center',
    left: '6%',
    //paddingBottom: '5%',
    textAlign: 'left',
    paddingLeft: '3%',
    paddingRight: '15%',
    //fontSize : 20,
  },
});
