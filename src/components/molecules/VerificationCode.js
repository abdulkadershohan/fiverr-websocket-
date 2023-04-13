import React from 'react';
import {useState, useCallback, useRef, useContext} from 'react';

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


// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';
import { mainColour } from '../atoms/globalStyles';

import {AuthContext} from '../../context/AuthContext';

export default function VerificationCode({input, setInput}) {
  //const [initialArr, setInitialArr] = useState(['', '', '', '', '']);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();

  const {verificationCode, setVerificationCode} = useContext(AuthContext);

  return (
    <>
      <View style={styles.row}>
        <TextInput
          style={styles.cell}
          keyboardType="number-pad"
          maxLength={1}
          ref={firstInput}
          onChangeText={text => {
            setVerificationCode({...verificationCode, one: text});
            text && secondInput.current.focus();
          }}
        />
        <TextInput
          style={styles.cell}
          keyboardType="number-pad"
          maxLength={1}
          ref={secondInput}
          onChangeText={text => {
            setVerificationCode({...verificationCode, two: text});
            text ? thirdInput.current.focus() : firstInput.current.focus();
          }}
        />

        <TextInput
          style={styles.cell}
          keyboardType="number-pad"
          maxLength={1}
          ref={thirdInput}
          onChangeText={text => {
            setVerificationCode({...verificationCode, three: text});
            text ? fourthInput.current.focus() : secondInput.current.focus();
          }}
        />

        <TextInput
          style={styles.cell}
          keyboardType="number-pad"
          maxLength={1}
          ref={fourthInput}
          onChangeText={text => {
            setVerificationCode({...verificationCode, four: text});
            text ? fifthInput.current.focus() : thirdInput.current.focus();
          }}
        />

        <TextInput
          style={styles.cell}
          keyboardType="number-pad"
          maxLength={1}
          ref={fifthInput}
          onChangeText={text => {
            setVerificationCode({...verificationCode, five: text});
            !text && fourthInput.current.focus();
          }}
        />
      </View>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  //root: {flex: 1, padding: 20},
  //codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: mainColour,
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    alignContent: 'center',
    marginLeft: '2%',
  },
  row: {
    flexDirection: 'row',
    paddingTop: '10%',
  },
  input: {
    position: 'absolute',
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: 'transparent',
    width: 32,
    top: 0,
    bottom: 0,
    colour: 'white',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: '#09A48E',
    borderWidth: 0.5,
  },
});
