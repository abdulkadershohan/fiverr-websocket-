import React from 'react';
import {useState, useEffect, useContext} from 'react';
import * as Keychain from 'react-native-keychain';

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

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

// My Components
import {PrimaryButton} from '../atoms/Button';
import {InputText} from '../atoms/InputText';
import {TextType} from '../atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';
import {mainColour} from '../atoms/globalStyles';

export default function FPForm({navigation}) {
  const {login, get_verification_code_fp} = useContext(AuthContext);

  const {email, setEmail, password, setPassword, error} =
    useContext(LoggedInUserContext);

  return (
    <>
      <InputText
        placeholderText="Email "
        input={email}
        setInput={setEmail}
        inputStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      />
      {error && <TextType type="p1" text={error} textStyle={styles.error} />}
      <PrimaryButton
        type="filled"
        title="Continue"
        onPress={() => {
          get_verification_code_fp({navigation});
        }}
      />
      <View style={globalStyles.row}>
        <TextType type="p1" text="Don't have an account?" />
        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <PrimaryButton
            type="no fill"
            title=" Sign up"
            onPress={() => navigation.push('Sign up')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
  },
  forgotPassword: {
    left: '20%',
    paddingBottom: 20,
    fontSize: 13,
    color: 'grey',
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
    paddingHorizontal: '10%',
    textAlign: 'center',
    //paddingBottom: '5%',
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderColor: mainColour,
    borderWidth: 1,
    color: 'white',
  },
  textStyle: {
    color: 'white',
  },
});
