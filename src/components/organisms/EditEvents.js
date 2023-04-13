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

const events = [
  'Clubbing',
  'Brunches',
  'Festivals',
  'Concerts',
  'Game Night',
  'Entrepreneurial',
  'Networking',
  'Career',
  'Conferences',
];

export default function EditEvents() {
  const {
    clubbing,
    setClubbing,
    brunches,
    setBrunches,
    festivals,
    setFestivals,
    concerts,
    setConcerts,
    gameNight,
    setGameNight,
    entrepreneurial,
    setEntrepreneurial,
    networking,
    setNetworking,
    career,
    setCareer,
    conferences,
    setConferences,
  } = useContext(LoggedInUserContext);
  return (
    <>
      <View style={styles.chipRow}>
        <Chip title={events[0]} active={clubbing} setActive={setClubbing} />
        <Chip title={events[1]} active={brunches} setActive={setBrunches} />
        <Chip title={events[2]} active={festivals} setActive={setFestivals} />
      </View>

      <View style={styles.chipRow}>
        <Chip title={events[3]} active={concerts} setActive={setConcerts} />
        <Chip title={events[4]} active={gameNight} setActive={setGameNight} />
      </View>

      <View style={styles.chipRow}>
        <Chip
          title={events[5]}
          active={entrepreneurial}
          setActive={setEntrepreneurial}
        />
        <Chip title={events[6]} active={networking} setActive={setNetworking} />
      </View>

      <View style={styles.chipRow}>
        <Chip title={events[7]} active={career} setActive={setCareer} />
        <Chip
          title={events[8]}
          active={conferences}
          setActive={setConferences}
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
