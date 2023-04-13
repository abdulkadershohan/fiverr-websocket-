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
import {ProgressBar} from '../atoms/ProgressBar';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Context
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

const interests = [
  'Music',
  'Travelling',
  'Sport',
  'Gaming',
  'Reading',
  'Business',
  'Investing',
  'Christianity',
  'Islam',
  'Hinduism',
  'Sikhism',
  'Judaism',
  'Buddhism',
];

export default function EditInterests() {
  const {
    music,
    setMusic,
    travelling,
    setTravelling,
    sport,
    setSport,
    gaming,
    setGaming,
    reading,
    setReading,
    business,
    setBusiness,
    investing,
    setInvesting,
    christianity,
    setChristianity,
    islam,
    setIslam,
    hinduism,
    setHinduism,
    sikhism,
    setSikhism,
    judaism,
    setJudaism,
    buddhism,
    setBuddhism,
    error,
  } = useContext(LoggedInUserContext);
  return (
    <>
      <View style={styles.chipRow}>
        <Chip title={interests[0]} active={music} setActive={setMusic} />
        <Chip
          title={interests[1]}
          active={travelling}
          setActive={setTravelling}
        />
        <Chip title={interests[2]} active={sport} setActive={setSport} />
        <Chip title={interests[3]} active={gaming} setActive={setGaming} />
      </View>

      <View style={styles.chipRow}>
        <Chip title={interests[4]} active={reading} setActive={setReading} />
        <Chip title={interests[5]} active={business} setActive={setBusiness} />
        <Chip
          title={interests[6]}
          active={investing}
          setActive={setInvesting}
        />
      </View>

      <View style={styles.chipRow}>
        <Chip
          title={interests[7]}
          active={christianity}
          setActive={setChristianity}
        />
        <Chip title={interests[8]} active={islam} setActive={setIslam} />
        <Chip title={interests[9]} active={hinduism} setActive={setHinduism} />
      </View>

      <View style={styles.chipRow}>
        <Chip title={interests[10]} active={sikhism} setActive={setSikhism} />
        <Chip title={interests[11]} active={judaism} setActive={setJudaism} />
        <Chip title={interests[12]} active={buddhism} setActive={setBuddhism} />
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
