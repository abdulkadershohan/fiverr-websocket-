import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Navigators
import AuthStack from './AuthStack';
import AppStack from './AppStack';

//Screens
import Login from '../pages/Login';
import VerifyEmail from '../pages/VerifyEmail';
import EditName from '../pages/Profile/EditProfile/EditName';

import * as Keychain from 'react-native-keychain';

//Context
import {AuthContext} from '../context/AuthContext';
import {LoggedInUserContext} from '../context/LoggedInUserContext';

import {navigationRef} from '../services/NavigationService';

// {accessToken ? <AppStack /> : <AuthStack />}
//<EditName/>

function AppNav() {
  const {isVerified, profileCreated, loggedIn, accessToken} =
    useContext(LoggedInUserContext);
  return (
    <NavigationContainer ref={navigationRef}>
      {accessToken && loggedIn && isVerified && profileCreated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export default AppNav;
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
