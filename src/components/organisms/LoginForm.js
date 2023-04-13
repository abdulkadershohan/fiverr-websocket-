import React from 'react';
import {useState, useEffect, useContext} from 'react';
import * as Keychain from 'react-native-keychain';
import messaging from '@react-native-firebase/messaging';

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
  Clipboard,
} from 'react-native';

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {NotificationContext} from '../../context/NotificationContext';

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

export default function LoginForm({navigation}) {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString(generatedToken);
    alert('Copied Successfully');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const {login, logout} = useContext(AuthContext);
  const {email, setEmail, password, setPassword, accessToken, error} =
    useContext(LoggedInUserContext);

  //token, title, message, image
  const title = 'title';
  const message = 'message';
  const image =
    'https://imageio.forbes.com/specials-images/imageserve/5ceec355142c500008f42068/Rihanna-Diamond-Ball-Forbes-Women/0x0.jpg?format=jpg&crop=1950,1950,x32,y257,safe&height=1950&width=1950';
  const [generatedToken, setGeneratedToken] = useState();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      fetchToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const newFcmToken = await messaging().getToken();
      console.log('newFcmToken: ', newFcmToken);
      return newFcmToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchToken = async () => {
    const token = await getFcmToken();
    if (token) {
      setGeneratedToken(token);
    }
  };

  useEffect(() => {
    fb_notifs();
  });

  const fb_notifs = async () => {
    requestUserPermission();
    await messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      Alert.alert('onNotificationOpenedApp');
    });
    // Quiet and Background State -> Check whether an initial notification is available
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      })
      .catch(error => console.log('failed', error));

    // Foreground State
    await messaging().onMessage(async remoteMessage => {
      console.log('foreground', remoteMessage);
      Alert.alert(
        'A new FCM message arrived! Whilst in Foreground',
        JSON.stringify(remoteMessage),
      );
    });
  };

  const logo = 'logoo -- ' + generatedToken;

  return (
    <>
      <InputText
        placeholderText="Email "
        input={email}
        setInput={setEmail}
        inputStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      />
      <InputText
        placeholderText="Password"
        secureTextEntry={true}
        input={password}
        setInput={setPassword}
        inputStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
      />

      <PrimaryButton
        type="no fill"
        title=" Forgot Password?"
        textStyle={styles.forgotPassword}
        onPress={() => navigation.push('Forgot Password')}
      />
      <PrimaryButton
        type="filled"
        title="Login"
        onPress={() => {
          //send_notification(generatedToken, title, message, image);
          //copyToClipboard();
          login({navigation}); //{email, password}
        }}
      />

      {error && (
        <TextType
          type="p1"
          text={error} //{'Incorrect login details.. try again '}
          textStyle={globalStyles.error}
        />
      )}

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
    color: '#C797D8',
  },
  forgotPassword: {
    left: '20%',
    paddingBottom: 20,
    fontSize: 13,
    color: mainColour,
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
