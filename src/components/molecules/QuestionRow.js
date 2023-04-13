import React from 'react';
import {useState, useCallback} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

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

export const QuestionRow = props => {
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
      <TouchableOpacity onPress={QOnPress} style={styles.questionRow}>
        <Text style={styles.questionText}>{props.question}</Text>

        {qClicked ? (
          <Ionicons
            name="md-chevron-up"
            size={20}
            color="#C6C6C6"
            style={styles.arrow}
          />
        ) : (
          <Ionicons
            name="md-chevron-down"
            size={20}
            color="#C6C6C6"
            style={styles.arrow}
          />
        )}
      </TouchableOpacity>

      {qClicked && (
        <TextInput
          value={props.answer}
          onChangeText={answer => props.setAnswer(answer)}
          multiline={true}
          style={styles.questionInputText}
        />
      )}
      {/*qClicked && (
        <PrimaryButton
          buttonStyle={styles.submitQuestionButton}
          textStyle={styles.submitQuestionText}
          type="filled"
          title="Submit"
          onPress={() => navigation.push('Sign up 5')}
        />
      )*/}
      <View style={styles.questionGap} />
    </>
  );
};

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
    paddingTop: 50,
  },
  questionRow: {
    //backgroundColor: isActive ?'#13748A': 'transparent',
    flexDirection: 'row',
    //marginBottom : 15,
    paddingBottom: 5,
    //Height : windowHeight*0.038,
    paddingLeft: '10%',
    paddingRight: '15%',
    alignSelf: 'flex-start',
  },
  questionGap: {
    //backgroundColor: isActive ?'#13748A': 'transparent',
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 5,
    Height: windowHeight * 0.038,
    width: '85%',
    //borderBottomColor: 'grey',
    //borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: '5%',
  },

  underline: {
    //backgroundColor: isActive ?'#13748A': 'transparent',
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 5,
    Height: windowHeight * 0.038,
    width: '85%',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: '5%',
  },

  questionText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 0,
    alignSelf: 'flex-start',
    //textAlign: 'left'
  },

  questionInputText: {
    width: '80%',
    //height: 40,
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderColor: 'white',
    color: 'white',
    borderRadius: 10,
  },

  submitQuestionButton: {
    width: '25%',
    borderRadius: 25,
    height: windowHeight * 0.03, //"6%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#09A48E',
  },

  submitQuestionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0E0E2C',
  },

  arrow: {
    position: 'absolute',
    left: windowWidth * 0.85,
  },
});
