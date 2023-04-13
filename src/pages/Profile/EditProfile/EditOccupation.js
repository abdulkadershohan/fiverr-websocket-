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
import {Dropdown} from '../../../components/atoms/Dropdown';
import {TextType} from '../../../components/atoms/TextType';
import {ProgressBar} from '../../../components/atoms/ProgressBar';

// My Components - organisms
import SignUpFormProfessional from '../../../components/organisms/SignUpFormProfessional';
import SignUpFormStudent from '../../../components/organisms/SignUpFormStudent';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

// Context
import {LoggedInUserContext} from '../../../context/LoggedInUserContext';

// Global styling
import { globalStyles } from '../../../components/atoms/globalStyles';
import { mainColour } from '../../../components/atoms/globalStyles';

const margin = windowWidth * 0.015;
const margin2 = margin / 2;
const margin3 = margin + 2;
const marginBottom = margin.toString() + '%';
const margin2Bottom = margin2.toString() + '%';
const margin3Bottom = margin3.toString() + '%';

export default function EditOccupation({navigation}) {
  const {
    university,
    setUniversity,
    course,
    setCourse,
    year,
    setYear,
    role,
    setRole,
    company,
    setCompany,
    error,
    student,
    setStudent,
  } = useContext(LoggedInUserContext);
  //const [studentClicked, setStudentClicked] = useState(false);
  const studentOnPress = () => {
    setStudent(!student);
    //setStudentClicked(!studentClicked);
    setUniversity('');
    setCourse('');
    setYear('');
    setRole('');
    setCompany('');
  };
  return (
    <View style={{...globalStyles.screen, ...styles.screen}}>
      <TextType
        type="h4"
        text="Edit Your Occupation"
        textStyle={{marginBottom: marginBottom}}
      />
      <View style={{marginBottom: margin2Bottom}}></View>
      <View style={styles.studentText}>
        <TextType
          type="h5"
          text="I'm a student"
          textStyle={{marginBottom: margin3Bottom}}
        />
        {student ? (
          <Text style={styles.toggleText}>Yes</Text>
        ) : (
          <Text style={styles.toggleText}>No</Text>
        )}
        <TouchableOpacity onPress={studentOnPress} style={styles.questionRow}>
          {student ? (
            <MaterialCommunityIcons
              name="toggle-switch"
              size={40}
              color={mainColour}
              style={styles.toggle}
            />
          ) : (
            <MaterialCommunityIcons
              name="toggle-switch-off"
              size={40}
              color="grey"
              style={styles.toggle}
            />
          )}
        </TouchableOpacity>
      </View>
      {student ? (
        <SignUpFormStudent navigation={navigation} page={'edit profile'} />
      ) : (
        <SignUpFormProfessional navigation={navigation} page={'edit profile'}/>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal : '10%',
  },
  studentText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    right: '12%',
    //paddingHorizontal : '10%',
  },

  progressText: {
    paddingRight: '12%',
    paddingBottom: '5%',
    color: '#32629F',
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  toggle: {
    position: 'absolute',
    left: windowWidth * 0.37,
    bottom: '40%',
  },
  toggleText: {
    color: 'white',
    left: windowWidth * 0.36,
    fontWeight: '600',
    paddingRight: '0%',
    //bottom: '40%',
  },
});
