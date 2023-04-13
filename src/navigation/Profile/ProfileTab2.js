import {React, useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//Navigation
import {MyTabBar} from '../../components/atoms/MyTabBars';

//Context
import {UserContext} from '../../context/UserContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

//My Screens
import Interests from '../../pages/Profile/Interests';
import OpenTo from '../../pages/Profile/OpenTo';

//Screen names
const InterestsName = 'Interests';
const OpenToName = 'Open to';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;
const Tab = createMaterialTopTabNavigator();

export default function ProfileTab2({route, navigation, type}) {
  //const {userProfile} = useContext(UserContext);
  const {student, userProfile, setUserProfile} =
    useContext(LoggedInUserContext);
  var {email} = route.params;

  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      <View
        style={{
          backgroundColor: '#0E0E2C',
          paddingVertical: windowHeight * 0.02,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              height: windowHeight * 0.038,
              backgroundColor: 'transparent',
            }}>
            <Ionicons
              name="briefcase"
              size={20}
              color="#4C4C85"
              style={styles.icons}
            />

            {!student && (
              <Text style={styles.Job}>
                {userProfile.role} @ {userProfile.company}
              </Text>
            )}
            {student && (
              <Text style={styles.Job}>
                {userProfile.course} @ {userProfile.university}
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: windowHeight * 0.037,
              backgroundColor: 'transparent',
            }}>
            <Ionicons
              name="location-sharp"
              size={20}
              color="#4C4C85"
              style={styles.icons}
            />

            <Text style={styles.Location}>{userProfile.city}</Text>
          </View>
        </View>
      </View>

      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        style={{
          backgroundColor: '#0E0E2C',
        }}>
        <Tab.Screen
          name={InterestsName}
          component={Interests}
          initialParams={{email: email}}
        />
        <Tab.Screen
          name={OpenToName}
          component={OpenTo}
          initialParams={{email: email}}
        />
      </Tab.Navigator>
    </>
  );
}
const padVert = windowWidth * 0.03;
// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Job: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: windowWidth * 0.04,
    paddingVertical: padVert,
  },

  Location: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: windowWidth * 0.04,
    paddingVertical: padVert,
  },

  icons: {
    marginLeft: windowWidth * 0.07,
    marginRight: 0,
    paddingVertical: padVert,
  },
});
