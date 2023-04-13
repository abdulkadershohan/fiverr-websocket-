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
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

// My Components
import {PrimaryButton} from '../atoms/Button';
import {InputText} from '../atoms/InputText';
import {TextType} from '../atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';

export default function ResetPasswordForm({navigation}) {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    reset_password,
    error,
  } = useContext(LoggedInUserContext);
  //const [password, setPassword] = useState('');

  return (
    <>
      <InputText
        placeholderText="New password"
        secureTextEntry={true}
        input={password}
        setInput={setPassword}
      />

      <InputText
        placeholderText="Confim new password"
        secureTextEntry={true}
        input={confirmPassword}
        setInput={setConfirmPassword}
      />

      {error && <TextType type="p1" text={error} textStyle={styles.error} />}

      <PrimaryButton
        type="outline"
        title="Reset Password"
        onPress={() => reset_password({navigation})}
      />
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
  },
});
