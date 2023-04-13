import * as React from 'react';
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
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import Attendees from '../pages/Events/Attendees';
import Events from '../pages/Events/Events';

//Screen names
const AttendeesScreenName = "Who's Going";
const EventsScreenName = 'Events';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();
//HomeScreenPublic should be a stack
export default function EventsTopTab({route}) {
  const {type} = route.params;

  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      <View></View>

      <Tab.Navigator
        style={styles.screen}
        screenOptions={{
          //makes background colour of tabs transparent
          tabBarStyle: {
            backgroundColor: 'transparent',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
            textTransform: 'none'
          },
          tabBarItemStyle: {
            //marginHorizontal: 0.1 * windowWidth,
            padding: 3,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#BBBBBB',
        }}
        /*tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#BBBBBB',
        }}*/
      >
        <Tab.Screen
          name={AttendeesScreenName}
          component={Attendees}
          initialParams={{type: type}}
        />
        <Tab.Screen
          name={EventsScreenName}
          component={Events}
          initialParams={{type: type}}
        />
      </Tab.Navigator>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    paddingVertical: 10,
  },
});
