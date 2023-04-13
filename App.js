import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Navigators
import AppNav from './src/navigation/AppNav';

import * as Keychain from 'react-native-keychain';

//Context
import {AuthProvider} from './src/context/AuthContext';
import {NotificationProvider} from './src/context/NotificationContext';
import {EventProvider} from './src/context/EventContext';
import {LoggedInUserProvider} from './src/context/LoggedInUserContext';
import {UserProvider} from './src/context/UserContext';
import {NetworkingProvider} from './src/context/NetworkingContext';

//Screens
import HomeScreenPublic from './src/pages/Home/HomeScreenPublic';
import HomeTopTab from './src/navigation/HomeTopTab';

//

function App() {
  return (
    <NotificationProvider>
      <LoggedInUserProvider>
        <AuthProvider>
          <UserProvider>
            <EventProvider>
              <NetworkingProvider>
                  <AppNav />
              </NetworkingProvider>
            </EventProvider>
          </UserProvider>
        </AuthProvider>
      </LoggedInUserProvider>
    </NotificationProvider>
  );
}

export default App;
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
