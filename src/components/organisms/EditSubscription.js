import React from 'react';
import {useState, useContext} from 'react';

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

// Components
import {Chip} from '../atoms/Chip';
import {SubscriptionChip} from '../atoms/SubscriptionChip';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Context
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

const OpenTo = ['Free', '£12.99/Mo'];

const FreeBenefits = [
  'See all events',
  'See people attending events',
  'Say hi to 10 people a month',
];

const PaidBenefits = [
  'See all events',
  'See people attending events',
  'Say hi to an unlimited number of people',
];

export default function EditSubscription() {
  const {
    meetingPeople,
    setMeetingPeople,
    travelBuddy,
    setTravelBuddy,
    freePlan,
    setFreePlan,
  } = useContext(LoggedInUserContext);
  return (
    <>
      <View style={styles.chipRow}>
        <SubscriptionChip
          type={'Free'}
          title={OpenTo[0]}
          benefit1={FreeBenefits[0]}
          benefit2={FreeBenefits[1]}
          benefit3={FreeBenefits[2]}
          active={freePlan}
          setActive={setFreePlan}
          buttonTitle={'Select'}
        />
        <View style={{paddingHorizontal: windowWidth * 0.01}} />
        <SubscriptionChip
          type={'Paid'}
          title={OpenTo[1]}
          active={freePlan}
          setActive={setFreePlan}
          benefit1={PaidBenefits[0]}
          benefit2={PaidBenefits[1]}
          benefit3={PaidBenefits[2]}
          buttonTitle={'Buy'}
        />
      </View>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  section: {
    paddingBottom: 30,
  },

  chipRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  title: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 0,
    textAlign: 'center',
  },

  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
