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

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Context
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

const OpenTo = [
  'Meeting New People',
  'Travel Buddies',
  'Gym Buddies',
  'Study buddies',
  'Mentoring',
  'Angel Investing',
  'Cofounding',
];

export default function EditOpenTo() {
  const {
    meetingPeople,
    setMeetingPeople,
    travelBuddy,
    setTravelBuddy,
    gymBuddy,
    setGymBuddies,
    studyBuddy,
    setStudyBuddies,
    mentoring,
    setMentoring,
    angelInvesting,
    setAngelInvesting,
    cofounding,
    setCofounding,
  } = useContext(LoggedInUserContext);
  return (
    <>
      <View style={styles.chipRow}>
        <Chip
          title={OpenTo[0]}
          active={meetingPeople}
          setActive={setMeetingPeople}
        />
      </View>

      <View style={styles.chipRow}>
        <Chip
          title={OpenTo[1]}
          active={travelBuddy}
          setActive={setTravelBuddy}
        />
        <Chip title={OpenTo[2]} active={gymBuddy} setActive={setGymBuddies} />
        <Chip
          title={OpenTo[3]}
          active={studyBuddy}
          setActive={setStudyBuddies}
        />
      </View>

      <View style={styles.chipRow}>
        <Chip title={OpenTo[4]} active={mentoring} setActive={setMentoring} />
        <Chip
          title={OpenTo[5]}
          active={angelInvesting}
          setActive={setAngelInvesting}
        />
        <Chip title={OpenTo[6]} active={cofounding} setActive={setCofounding} />
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
