import React from 'react';
import {useState, useCallback, useContext} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';

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
  Platform,
} from 'react-native';

// My Components

// My Components - atoms
import {PrimaryButton} from '../components/atoms/Button';
import {Dropdown} from '../components/atoms/Dropdown';
import {TextType} from '../components/atoms/TextType';
import {ProgressBar} from '../components/atoms/ProgressBar';
import { Logo } from '../components/atoms/Logo';

// My Components - organisms
import EditInterests from '../components/organisms/EditInterests';
import EditOpenTo from '../components/organisms/EditOpenTo';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

//Context
import {AuthContext} from '../context/AuthContext';
import {LoggedInUserContext} from '../context/LoggedInUserContext';

const margin = windowWidth * 0.015;
const margin2 = margin / 2;
const margin3 = margin + 2;
const marginBottom = margin.toString() + '%';
const margin2Bottom = margin2.toString() + '%';
const margin3Bottom = margin3.toString() + '%';

export default function SignUpOpenTo({navigation}) {
  const {submitOpenTo} = useContext(AuthContext);
  const {error} = useContext(LoggedInUserContext);
  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
      <Logo style={styles.logo} />
        <TextType
          type="h5"
          text="Select what you're open to"
          textStyle={{marginBottom: marginBottom}}
        />
        <TextType
          type="p1"
          text="4 of 7"
          textStyle={globalStyles.progressText}
        />
        <ProgressBar progress={0.6} />
        <EditOpenTo />

        <PrimaryButton
          buttonStyle={{marginTop: 20}}
          type="filled"
          title="Continue"
          onPress={() => submitOpenTo({navigation})}
        />
        {error && <TextType type="p1" text={error} textStyle={globalStyles.error} />}
        <View style={{paddingBottom: 200}} />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0E2C',
    flex: 1,
  },

  scrollScreen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingTop: 20,
  },

  progressText: {
    paddingRight: '12%',
    paddingBottom: 10,
    color: '#32629F',
    alignSelf: 'flex-end',
    fontSize: 12,
  },

  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
});
