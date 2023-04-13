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
import {TextType} from '../atoms/TextType';
import {QuestionRow} from '../molecules/QuestionRow';
import {PrimaryButton} from '../atoms/Button';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';

//Context
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

export default function EditQAForm({navigation, buttonTitle}) {
  const {apiSubmitQA} = useContext(LoggedInUserContext);

  const {
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    answer1,
    setAnswer1,
    answer2,
    setAnswer2,
    answer3,
    setAnswer3,
    answer4,
    setAnswer4,
    answer5,
    setAnswer5,
    answer6,
    setAnswer6,
    answer7,
    setAnswer7,
    error,
  } = useContext(LoggedInUserContext);

  return (
    <>
      <QuestionRow question={q1} answer={answer1} setAnswer={setAnswer1} />
      <QuestionRow question={q2} answer={answer2} setAnswer={setAnswer2} />
      <QuestionRow question={q3} answer={answer3} setAnswer={setAnswer3} />
      <QuestionRow question={q4} answer={answer4} setAnswer={setAnswer4} />
      <QuestionRow question={q5} answer={answer5} setAnswer={setAnswer5} />
      <QuestionRow question={q6} answer={answer6} setAnswer={setAnswer6} />
      <QuestionRow question={q7} answer={answer7} setAnswer={setAnswer7} />
      {error && (
        <TextType type="p1" text={error} textStyle={globalStyles.error} />
      )}
      <PrimaryButton
        buttonStyle={{marginTop: 20}}
        type="filled"
        title={buttonTitle}
        onPress={() => apiSubmitQA({navigation})}
      />
      <View style={{paddingBottom: 200}} />
    </>
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
    paddingTop: 50,
  },
  questionRow: {
    //backgroundColor: isActive ?'#13748A': 'transparent',
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 5,
    Height: windowHeight * 0.038,
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
    //textAlign: 'left'
  },

  questionInputText: {
    width: '90%',
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

  progressText: {
    paddingRight: '10%',
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
