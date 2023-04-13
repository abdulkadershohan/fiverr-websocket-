import React, {useRef, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ListItem,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  Pressable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MyTabBar} from '../components/atoms/MyTabBars';
import {useIsFocused} from '@react-navigation/native';

//Context
import {AuthContext} from '../context/AuthContext';
import {LoggedInUserContext} from '../context/LoggedInUserContext';

//atoms
import {Logo} from '../components/atoms/Logo';

// import ActionSheet
import ActionSheet from 'react-native-actionsheet';

// Screens
import HomeScreenPublic from '../pages/Home/HomeScreenPublic';
import HomeScreenPrivate from '../pages/Home/HomeScreenPrivate';

//Screen names
const HomeScreenPublicName = 'Public';
const HomeScreenPrivateName = 'Private';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
Entypo.loadFont();
Ionicons.loadFont();
Fontisto.loadFont();

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createMaterialTopTabNavigator();

export default function HomeTopTab({navigation}) {
  const isVisible = useIsFocused();

  const {logout} = useContext(AuthContext);
  const {getSubscriptionPlan} = useContext(LoggedInUserContext);

  let actionSheet = useRef();
  var optionArray = ['Subscription', 'Your Activity', 'Log out', 'Cancel'];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  useEffect(() => {
    if (isVisible) {
      getSubscriptionPlan();
    }
  }, [isVisible]);

  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      <View style={styles.screen}>
        <View style={{flexDirection: 'row'}}>
          {/*<Ionicons
            name="sunny-outline"
            size={22}
            color="white"
            style={styles.weather}
  />*/}
          
          <Logo style={styles.logo} />
          <TouchableOpacity
            style={styles.roundButton1}
            onPress={showActionSheet}>
            <Ionicons
              name="md-menu"
              size={28}
              color="white"
              style={styles.menu}
            />
          </TouchableOpacity>
          <ActionSheet
            ref={actionSheet}
            //title={'Which one do you like ?'}
            // Options Array to show in bottom sheet
            options={optionArray}
            cancelButtonIndex={3}
            // Highlight any specific option
            destructiveButtonIndex={[0]}
            onPress={index => {
              // Clicking on the option will give you alert
              if (optionArray[index] == 'Log out') {
                logout();
              } else if (optionArray[index] == 'Subscription') {
                navigation.push('Subscription');
              } else {
              }
              //alert(optionArray[index]);
            }}
          />
        </View>
        <Text style={styles.title}> Events </Text>
      </View>
      <Tab.Navigator
        style={styles.tabBackground}
        screenOptions={{
          activeTintColor: '#424242',
          inactiveTintColor: '#9E9E9E',
        }}
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name={HomeScreenPublicName} component={HomeScreenPublic} />
        <Tab.Screen
          name={HomeScreenPrivateName}
          component={HomeScreenPrivate}
        />
      </Tab.Navigator>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    //paddingTop: windowHeight * 0.04,
  },
  tabBackground: {
    backgroundColor: '#0E0E2C',
  },

  title: {
    color: 'white',
    fontSize: 0.06 * windowWidth,
    fontWeight: '600',
    //marginVertical: windowHeight*0.02,
    //paddingTop: windowHeight*0.05,
    marginLeft: windowWidth * 0.05,
    paddingBottom: windowHeight * 0.02,
    //marginHorizontal: 0.1 * windowWidth,
    textAlign: 'left',
    backgroundColor: '#0E0E2C',
  },

  menu: {
    marginLeft: windowWidth * 0.75,
    //marginRight: 0,
    //paddingTop: 0,
    //paddingBottom: 30,
    paddingVertical: 3,
  },
  weather: {
    marginLeft: windowWidth * 0.05,
    //marginRight: 0,
    paddingTop: 0,
    paddingBottom: 30,
  },
  logo: {
    width: '1%',
    height: '1%',
    marginLeft: windowWidth * 0.05,
    //aspectRatio:1,
    //resizeMode: 'cover'
    //marginRight: 0,
    //paddingTop: 0,
    //paddingBottom: 30,
  },
  logoContainer: {
    width: '1%',
    height: '1%',
    marginLeft: windowWidth * 0.05,
  },
});
