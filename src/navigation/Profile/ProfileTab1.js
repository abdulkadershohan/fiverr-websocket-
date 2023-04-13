import {React, useContext} from 'react';
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

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProfileTab2 from './ProfileTab2';

//My Components
import {ProfileTabBar1} from '../../components/atoms/MyTabBars';

// Screens
import HomeScreenPublic from '../../pages/Home/HomeScreenPublic';
import HomeScreenPrivate from '../../pages/Home/HomeScreenPrivate';
import QA from '../../pages/Profile/QA';
import UserEvents from '../../pages/Events/UserEvents';
//import EventsScreen from '../screens/events';
//import ProfileEvents from '../screens/Profile/ProfileEvents';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Screen names
const ProfileName = 'Profile';
const QAName = 'Q&A';
const EventsName = 'Events';

const Tab = createMaterialTopTabNavigator();

export default function ProfileTab1({email}) {
  return (
    <Tab.Navigator
      tabBar={props => <ProfileTabBar1 {...props} />}
      style={{
        backgroundColor: '#0E0E2C',
      }}>
      <Tab.Screen
        name={ProfileName}
        component={ProfileTab2}
        initialParams={{email: email}}
      />

      <Tab.Screen name={QAName} component={QA} initialParams={{email: email}} />

      <Tab.Screen
        name={EventsName}
        component={UserEvents}
        initialParams={{other_user_email: email}}
      />
    </Tab.Navigator>
  );
} //initialParams={{email: email}}
