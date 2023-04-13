import React from 'react';
import {useState, useCallback, useContext} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';

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
import {Dropdown} from '../atoms/Dropdown';
import {PrimaryButton} from '../atoms/Button';
import {TextType} from '../atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

export default function SignUpFormStudent({navigation, page}) {
  const {submitCompanyOrUni} = useContext(AuthContext);
  const {university, setUniversity, course, setCourse, year, setYear, error} =
    useContext(LoggedInUserContext);

  const universities = [
    {label: 'Queen Mary UoL', value: 'Queen Mary UoL'},
    {label: 'KCL', value: 'KCL'},
    {label: 'LSE', value: 'LSE'},
    {label: 'Imperial', value: 'Imperial'},
    {label: 'Brunel', value: 'Brunel'},
    {label: 'Coventry', value: 'Coventry'},
    {label: 'Nottingham', value: 'Nottingham'},
    {label: 'Warwick', value: 'Warwick'},
  ];

  const courses = [
    {label: 'Mathematics', value: 'Mathematics'},
    {label: 'Computer Science', value: 'Computer Science'},
    {label: 'AI', value: 'AI'},
  ];

  const years = [
    {label: 'foundation', value: 'foundation'},
    {label: 'first', value: 'first'},
    {label: 'second', value: 'second'},
    {label: 'third', value: 'third'},
    {label: 'fourth', value: 'fourth'},
    {label: 'masters', value: 'masters'},
  ];

  const [universityOpen, setUniversityOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  const onUniversityOpen = useCallback(() => {
    setCourseOpen(false);
    setYearOpen(false);
  }, []);

  const onCourseOpen = useCallback(() => {
    setUniversityOpen(false);
    setYearOpen(false);
  }, []);

  const onYearOpen = useCallback(() => {
    setUniversityOpen(false);
    setCourseOpen(false);
  }, []);

  return (
    <>
      <Dropdown
        placeholder="University"
        data={universities}
        input={university}
        setInput={setUniversity}
        open={universityOpen}
        setOpen={setUniversityOpen}
        onOpen={onUniversityOpen}
        zIndex={3000}
        zIndexInverse={1000}
      />
      <Dropdown
        placeholder="Course"
        data={courses}
        input={course}
        setInput={setCourse}
        open={courseOpen}
        setOpen={setCourseOpen}
        onOpen={onCourseOpen}
        zIndex={2000}
        zIndexInverse={2000}
      />
      <Dropdown
        placeholder="Current Year"
        data={years}
        input={year}
        setInput={setYear}
        open={yearOpen}
        setOpen={setYearOpen}
        onOpen={onYearOpen}
        zIndex={1000}
        zIndexInverse={3000}
      />
      <PrimaryButton
        type="filled"
        title="Continue"
        onPress={() => submitCompanyOrUni(navigation, page)}
      />
      {error && (
        <TextType type="p1" text={error} textStyle={globalStyles.error} />
      )}
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
});
