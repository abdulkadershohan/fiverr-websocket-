import React from 'react';
import {useState, useCallback} from 'react';
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
import {Dropdown} from '../components/atoms/Dropdown';
import {TextType} from '../components/atoms/TextType';
import {ProgressBar} from '../components/atoms/ProgressBar';
import { Logo } from '../components/atoms/Logo';

// My Components - organisms
import SignUpGenderLocationForm from '../components/organisms/SignUpGenderLocationForm';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

const margin = windowWidth*0.015;
const margin2 = margin / 2;
const marginBottom = margin.toString() + '%';
const margin2Bottom = margin2.toString() + '%';

export default function SignUpGenderLocation({navigation}) {
  //alignSelf: 'flex-start',paddingLeft: '10%' << putting text on left hand side of screen
  //color = '#09A48E'
  return (
    <View style={{...globalStyles.screen, ...styles.screen}}>
      <Logo style={styles.logo} />
      <TextType
        type="h4"
        text="Create your sayHi profile"
        textStyle={{marginBottom: marginBottom}}
      />
      <TextType type="p1" text="1 of 7" textStyle={globalStyles.progressText} />
      <ProgressBar progress={0.14} />
      <View style={{marginBottom: margin2Bottom}}></View>
      <SignUpGenderLocationForm navigation={navigation} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    paddingRight: '12%',
    paddingBottom: 10,
    color: '#32629F',
    alignSelf: 'flex-end',
    fontSize: 12,
  },
});
