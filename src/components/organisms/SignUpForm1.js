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
import {PrimaryButton} from '../atoms/Button';
import {InputText} from '../atoms/InputText';
import {TextType} from '../atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Responsive Font Size
const h1FontSize = windowWidth * 0.0822;
const fontSizeReductions = 4;

// Global styling
import {globalStyles, mainColour} from '../atoms/globalStyles';

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

const marginBottom = '6%';

export default function SignUpForm1({navigation}) {
  const {submitRegForm1} = useContext(AuthContext);
  const {
    firstName,
    setFirstName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
  } = useContext(LoggedInUserContext);

  console.log(email);
  console.log(password);

  return (
    <>
      <InputText
        placeholderText="First Name"
        input={firstName}
        setInput={setFirstName}
        inputStyle={styles.inputStyle}
      />
      <InputText placeholderText="Email" input={email} setInput={setEmail} />
      <InputText
        placeholderText="Password"
        secureTextEntry={true}
        input={password}
        setInput={setPassword}
        inputStyle={styles.inputStyle}
      />
      <InputText
        placeholderText="Confirm Password"
        secureTextEntry={true}
        input={confirmPassword}
        setInput={setConfirmPassword}
        inputStyle={styles.inputStyle}
      />

      <View style={styles.privacyRow}>
        {/*<TextType
          type="p2"
          text="By clicking Sign up, you agree to SayHi's hehehehehehe"
  />*/}
        <Text style={styles.policyWhiteText}>
          By clicking Sign up, you agree to SayHi's
        </Text>
        <PrimaryButton
          type="no fill"
          title=" User Agreement"
          textStyle={styles.policyTextButton}
          //onPress={() => navigation.push('Login')}
        />
        <Text style={styles.policyWhiteText}>,</Text>
        <PrimaryButton
          type="no fill"
          title="Privacy Policy"
          textStyle={styles.policyTextButton}
          //onPress={() => navigation.push('Login')}
        />
        <Text style={styles.policyWhiteText}> and </Text>
        <PrimaryButton
          type="no fill"
          title="Cookie Policy"
          textStyle={styles.policyTextButton}
          //onPress={() => navigation.push('Login')}
        />
        <Text style={styles.policyWhiteText}>.</Text>

        <TouchableOpacity
          onPress={() => navigation.push('Login')}></TouchableOpacity>
      </View>

      <PrimaryButton
        type="filled"
        title="Sign Up"
        onPress={() => {
          submitRegForm1({navigation});
        }}
      />
      {error && (
        <TextType type="p1" text={error} textStyle={globalStyles.error} />
      )}

      <View style={globalStyles.row}>
        <TextType type="p1" text="Already have an account?" />
        <TouchableOpacity
          onPress={() => navigation.push('Login')}
          style={styles.textButton}>
          <PrimaryButton
            type="no fill"
            title="Sign in"
            onPress={() => navigation.push('Login')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
  privacyRow: {
    flexDirection: 'row',
    paddingHorizontal: '12%',
    paddingVertical: '2%',
    marginBottom: marginBottom,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  inputStyle: {
    marginBottom: marginBottom,
  },
  textButton: {
    alignSelf: 'flex-start',
    color: mainColour,
    paddingHorizontal: 10,
  },
  policyTextButton: {
    fontSize: h1FontSize - fontSizeReductions * 5.5,
    //fontWeight: 'bold',
    color: mainColour,
    //alignSelf: 'flex-start',
    textAlign: 'center',
  },
  policyWhiteText: {
    fontSize: h1FontSize - fontSizeReductions * 5.5,
    //fontWeight: 'bold',
    color: 'white',
    //alignSelf: 'flex-start',
    textAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
