import React from 'react';
import {useState, useCallback, useContext} from 'react';
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

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

// My Components - atoms
import {TextType} from '../components/atoms/TextType';
import {PrimaryButton} from '../components/atoms/Button';

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
  const {get_verification_code, setIsVerified} = useContext(AuthContext);
  const {email} = useContext(LoggedInUserContext);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: cell_count});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const validate_verification_code = async () => {
    console.log('************** posting data to API starting **************');
    let response = await fetch(
      'http://127.0.0.1:8000/api/verify_confirmation_code/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verification_code: value,
        }),
      },
    );

    try {
      var json = await response.json();
      if (json == 'verified') {
        setIsVerified(true);
        setError(null);
        Alert.alert('Verification code is correct please log in');
        navigation.push('Login');
      } else {
        console.log(json);
        setError('Verification code is incorrect please try again');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <TextType
          type="h4"
          text="Verify your email"
          textStyle={{paddingBottom: 30}}
        />
        <TextType
          type="p1"
          text="5 of 5"
          textStyle={globalStyles.progressText}
        />
        <Progress.Bar
          progress={1}
          width={300}
          height={8}
          color="#09A48E"
          style={{marginBottom: 20}}
        />
        <TextType
          type="h5"
          text="Please enter the verification code we sent to your email address"
          textStyle={{padding: 30}}
        />

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={cell_count}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View style={{marginTop: '5%'}} />
        {error && <TextType type="p1" text={error} textStyle={styles.error} />}
        <View style={styles.row}>
          <PrimaryButton
            type="filled"
            title="Send Again"
            buttonStyle={styles.receiveCode}
            textStyle={styles.receiveCodeTextStyle}
            onPress={() => get_verification_code()}
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
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#09A48E',
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    alignContent: 'center',
    margin: '2%',
    paddingTop: '1%',
  },
  focusCell: {
    borderColor: '#09A48E',
  },
  receiveCodeTextStyle: {
    color: 'white',
  },
  receiveCode: {
    width: '30%',
    borderColor: '#09A48E',
    borderWidth: 2,
    backgroundColor: 'transparent',
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
});
