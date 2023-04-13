import React from 'react';
import {useState, useCallback, useContext} from 'react';
//import DatePicker from 'react-native-date-picker'
import DatePicker from 'react-native-date-picker';

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
import {Dropdown} from '../../../components/atoms/Dropdown';
import {PrimaryButton} from '../../../components/atoms/Button';
import SelectDob from '../../../components/atoms/SelectDob';
import {TextType} from '../../../components/atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../../../components/atoms/globalStyles';

//Context
import {LoggedInUserContext} from '../../../context/LoggedInUserContext';

export default function EditAge({navigation}) {
  const {dob, setDob, error, submitAge} = useContext(LoggedInUserContext);

  const today = new Date();

  return (
    <View style={styles.screen}>
      <SelectDob input={dob} setInput={setDob} />
      <PrimaryButton
        type="filled"
        title="Submit"
        onPress={() =>
          submitAge({
            navigation,
          })
        }
      />
      {error && (
        <TextType type="p1" text={error} textStyle={globalStyles.error} />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
    //justifyContent: "center",
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
