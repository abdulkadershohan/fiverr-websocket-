import React from 'react';
import {useState, useCallback, useContext} from 'react';
import * as Progress from 'react-native-progress';
import {mainColour} from '../components/atoms/globalStyles';

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

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

// My Components - atoms
import {TextType} from '../components/atoms/TextType';
import {PrimaryButton} from '../components/atoms/Button';
import {InputText} from '../components/atoms/InputText';
import {ProgressBar} from '../components/atoms/ProgressBar';

import VerificationCode from '../components/molecules/VerificationCode';

// My Components - organisms
import QAForm from '../components/organisms/QAForm';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

//Context
import {AuthContext} from '../context/AuthContext';
import {LoggedInUserContext} from '../context/LoggedInUserContext';

const cell_count = 5;
//

export default function VerifyEmail({navigation}) {
  const {
    get_verification_code,
    validate_verification_code,
    send_verification_code_again,
  } = useContext(AuthContext);

  const {email, error} = useContext(LoggedInUserContext);
  //const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [code, setCode] = useState(['']);
  const title_email =
    'Please enter the verification code we sent to your email address  ' +
    email;
  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <TextType
          type="h4"
          text="Verify your email"
          textStyle={{paddingBottom: 30}}
        />
        <TextType type="h5" text={title_email} textStyle={{padding: 30}} />

        <VerificationCode input={code} setInput={setCode} code={code} />

        <View style={{marginTop: '5%'}} />
        {error && <TextType type="p1" text={error} textStyle={globalStyles.error} />}
        <View style={styles.row}>
          <PrimaryButton
            type="outline"
            title="Send Again"
            buttonStyle={styles.receiveCode}
            textStyle={styles.receiveCodeTextStyle}
            onPress={() => send_verification_code_again()}
          />
          <PrimaryButton
            type="filled"
            title="Submit"
            buttonStyle={styles.submitCode}
            onPress={() => validate_verification_code({navigation})}
          />
        </View>
        <View style={{paddingBottom: 40}} />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0E2C',
    flex: 1,
  },

  scrollScreen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingTop: 50,
  },

  //root: {flex: 1, padding: 20},
  //codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#09A48E',
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    alignContent: 'center',
  },
  focusCell: {
    borderColor: '#09A48E',
  },
  receiveCodeTextStyle: {
    color: 'white',
  },
  sendCodeTextStyle: {
    color: 'white',
  },
  receiveCode: {
    width: '30%',
    //borderColor: '#09A48E',
    //borderWidth: 2,
    //backgroundColor: 'transparent',
    marginRight: '2%',
    //alignItems : 'flex-start'
  },
  submitCode: {
    width: '30%',
    marginLeft: '2%',
    //alignItems : 'flex-start'
  },
  row: {
    flexDirection: 'row',
    paddingTop: '5%',
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
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
  },
});
