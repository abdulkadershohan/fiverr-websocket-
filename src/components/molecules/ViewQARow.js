import React from 'react';
import {useState, useCallback} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

import { mainColour } from '../atoms/globalStyles';

//My componenets - Atoms

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
import {PrimaryButton} from '../atoms/Button';

// My Components - atoms
import {TextType} from '../atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';

export const ViewQARow = props => {
  const [qClicked, setQClicked] = useState(false);
  const [answer, setAnswer] = useState('');

  const QOnPress = () => {
    setQClicked(!qClicked);
  };

  const submitAnswer = () => {
    setAnswer(!qClicked);
  };

  return (
    <>
      <View style={styles.qaRow}>
        <Text style={styles.questionText}>{props.question}</Text>
        <Text style={styles.answerText}>{props.answer}</Text>
      </View>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  qaRow: {
    paddingBottom: '5%',
    paddingLeft: '7%',
    paddingRight: '7%',
    alignSelf: 'flex-start',
  },
  questionText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: '3%',
    alignSelf: 'flex-start',
  },

  answerText: {
    //width: '80%',
    //height: 40,
    //margin: 10,
    //borderWidth: 0.5,
    padding: 10,
    //borderColor: 'white',
    color: mainColour,
    borderRadius: 10,
  },
});
