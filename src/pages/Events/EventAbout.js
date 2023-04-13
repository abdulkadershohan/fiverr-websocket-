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

//Context
import {EventContext} from '../../context/EventContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth * 0.19;
const pictureHeight = windowHeight * 0.1;

export default function EventAbout({route, navigation}) {
  var {id} = route.params;
  const {eventProfile, getEventProfileData} = useContext(EventContext);
  const isVisible = useIsFocused();
  useEffect(() => {
    if (isVisible) {
      console.log(
        '*** -- called when Event Profile screen opens or when we back on the screen -- *** ',
      );
      console.log('ididid -->>' + id);
      getEventProfileData(id);
      console.log('************* event PROFILE ************  ' + eventProfile);
    }
  }, [isVisible]);
  return (
    <ScrollView style={styles.screen}>
      {/*<View style={styles.organiserAvatarSection}>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            //navigation.push('Business Events');
          }}>
          <Image
            source={{uri: eventProfile.avatar}}
            style={styles.organiserAvatar}
          />
        </TouchableOpacity>
        </View>
              <View style={styles.organiserName}>
        <Text style={styles.organiserName}>{eventProfile.organiser}</Text>
      </View>
        */}
  <Text style={styles.organiserName}>Organised by {eventProfile.organiser}</Text>
      <View style={styles.EventDetails}>
        <Text style={styles.EventDetailsText}>
          {eventProfile.start_time}, {eventProfile.start_day},{' '}
          {eventProfile.short_date}
        </Text>
        <Text style={styles.EventDetailsText}>
          {eventProfile.address_line1}, {eventProfile.address_line2},{' '}
          {eventProfile.city}
        </Text>
        <Text style={styles.EventDetailsText}>{eventProfile.postcode}</Text>
        <Text style={styles.EventDetailsText}>{eventProfile.min_age}+</Text>
      </View>

      <View style={styles.EventDetails}>
        <Text style={styles.EventDescriptionText}>
          {eventProfile.description}
        </Text>
      </View>
      <View style={styles.EventPhotosSection}>
        <TouchableOpacity
          style={styles.EventPhotosTouchable}
          onPress={() => navigation.push('Business Events')}>
          <Image
            source={{uri: eventProfile.avatar}}
            style={styles.organiserAvatar}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    paddingTop:'10%'
    //justifyContent: 'center',
    //alignItems: 'center',
    //paddingTop : windowHeight*0.03,
  },
  organiserAvatarSection: {
    flexDirection: 'row',
    paddingBottom:'5%',
    //paddingTop: 30,
    //backgroundColor:'#0E0E2C',
    // alignItems: 'center',
    //justifyContent: 'center',
    //flex: 1,
  },

  organiserAvatar: {
    //width: windowHeight * 0.1,
    height: windowHeight * 0.1,
    borderRadius: 10,
    paddingRight: 30,
    aspectRatio:1,
  },

  EventPhotosSection: {
    flexDirection: 'row',
    paddingTop: '5%',
    paddingLeft: '5%',
    //justifyContent: 'center',
  },

  EventPhotosTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },

  organiserName: {
    fontSize: 14,
    fontWeight: '800',
    color: 'white',
    paddingBottom: '2%',
    paddingLeft: '5%',
    //alignSelf:'center'
  },

  EventDetails: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    paddingBottom: '5%',
    paddingLeft: '5%',
    paddingRight: 30,
  },

  EventDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    paddingBottom: '2%',
    //paddingLeft: 30
  },

  EventDescriptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingBottom: 5,
    //paddingLeft: 30
  },
});
