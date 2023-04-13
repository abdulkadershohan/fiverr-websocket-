import {React, useState, useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
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

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//My Components

// Screens
import EventProfileTopTab from '../../navigation/EventProfileTopTab';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
Entypo.loadFont();

//Context
import {EventContext} from '../../context/EventContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;
const Tab = createMaterialTopTabNavigator();

export default function EventProfile({route, navigation}) {
  var {id} = route.params;
  const {
    eventProfile,
    getEventProfileData,
    get_event_status,
    post_event_status,
    interested,
    setInterested,
    attending,
    setAttending,
  } = useContext(EventContext);
  const isVisible = useIsFocused();
  useEffect(() => {
    if (isVisible) {
      console.log(
        '*** -- called when Event Profile screen opens or when we back on the screen -- *** ',
      );
      console.log('ididid -->>' + id);
      getEventProfileData(id);
      get_event_status({type: 'attending', event_id: id});
      get_event_status({type: 'interested', event_id: id});
      console.log('************* event PROFILE ************  ' + eventProfile);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      <View style={styles.screen}>
        <View style={styles.organiserAvatarSection}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => {
              //navigation.push('Business Events');
            }}>
            <Image
              source={{uri: eventProfile.event_image1}}
              style={styles.organiserAvatar}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.eventTitle}>
          <Text style={styles.Title}>{eventProfile.name}</Text>
        </View>
        <View style={styles.attendInterestedSection}>
          {attending && (
            <TouchableOpacity
              style={styles.roundButtonTouched}
              onPress={() => {
                post_event_status({type: 'remove-attending', event_id: id});
                setAttending(false);
                //setInterested(false);
              }}>
              <Text style={styles.text}>{'Attending'}</Text>
            </TouchableOpacity>
          )}
          {!attending && (
            <TouchableOpacity
              style={styles.roundButtonUntouched}
              onPress={() => {
                post_event_status({type: 'attending', event_id: id});
                setAttending(true);
                setInterested(false);
              }}>
              <Text style={styles.text}>{'Attend'}</Text>
            </TouchableOpacity>
          )}

          {interested && (
            <TouchableOpacity
              style={styles.roundButtonTouched}
              onPress={() => {
                post_event_status({type: 'remove-interested', event_id: id});
                setInterested(false);
                setAttending(false);
              }}>
              <Text style={styles.text}>{'Interested'}</Text>
            </TouchableOpacity>
          )}

          {!interested && (
            <TouchableOpacity
              style={styles.roundButtonUntouched}
              onPress={() => {
                post_event_status({type: 'interested', event_id: id});
                setInterested(true);
                setAttending(false);
              }}>
              <Text style={styles.text}>{'Interested'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <EventProfileTopTab id={id} />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    paddingTop: 0,
    Height: windowHeight * 0.038,
  },
  eventTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:'1%'
  },
  attendInterestedSection: {
    paddingTop: 0,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabStyle: {
    backgroundColor: '#0E0E2C',
  },
  roundButtonUntouched: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC',
    width: windowWidth * 0.25,
    height: windowHeight * 0.035,
    marginHorizontal: 10,
  },
  roundButtonTouched: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: 'black',
    width: windowWidth * 0.25,
    height: windowHeight * 0.035,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  Title: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingTop: '2%',
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  jobLocation: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 30,
    paddingBottom: 5,
  },
  icons: {
    marginLeft: windowWidth * 0.62,
    //marginRight: 0,
    paddingTop: 20,
    paddingBottom: 30,
  },
  organiserAvatarSection: {
    flexDirection: 'row',
    paddingTop: '2%',
    //backgroundColor:'#0E0E2C',
    // alignItems: 'center',
    justifyContent: 'center',
    //flex: 1,
  },

  organiserAvatar: {
    //width: pictureWidth*0.4,
    height: pictureWidth*0.2,
    aspectRatio:1,
    borderRadius: 100,
  },
});
