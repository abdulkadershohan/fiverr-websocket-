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

// My Components - atoms
import {TextType} from '../components/atoms/TextType';
import {ProgressBar} from '../components/atoms/ProgressBar';
import { Logo } from '../components/atoms/Logo';

// My Components - organisms
import QAForm from '../components/organisms/QAForm';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

export default function SignUpQA({navigation}) {
  const [qClicked, setQClicked] = useState(false);

  const QOnPress = () => {
    setQClicked(!qClicked);
  };

  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <TextType
          type="h4"
          text="Profile Q&A"
          textStyle={{paddingBottom: 30}}
        />
        <TextType
          type="h6"
          text="Because there's more to you than small talk"
          textStyle={{paddingBottom: 30}}
        />
        <TextType
          type="p1"
          text="6 of 7"
          textStyle={globalStyles.progressText}
        />
        <ProgressBar progress={0.84} style={{marginBottom: 20}} />
        <QAForm navigation={navigation} buttonTitle="Continue" />

        <View style={{paddingBottom: 40}} />
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
  logo: {
    //width: windowHeight * 0.1,
    height: windowHeight * 0.07,
    borderRadius: 10,
    paddingRight: 30,
    aspectRatio: 1,
    marginBottom: '9%',
  },
});
