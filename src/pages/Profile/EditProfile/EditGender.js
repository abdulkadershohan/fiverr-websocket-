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

export default function EditGender({navigation}) {
  const {gender, setGender, error, submitGender} =
    useContext(LoggedInUserContext);

  const genders = [
    {label: 'Woman', value: 'Woman'},
    {label: 'Man', value: 'Man'},
    {label: 'Non Binary', value: 'Non Binary'},
  ];

  const [genderOpen, setGenderOpen] = useState(false);
  return (
    <View style={styles.screen}>
      <Dropdown
        placeholder="Select gender"
        data={genders}
        input={gender}
        setInput={setGender}
        open={genderOpen}
        setOpen={setGenderOpen}
        //onOpen={onGenderOpen}
        zIndex={5000}
        zIndexInverse={1000}
      />
      <PrimaryButton
        type="filled"
        title="Submit"
        onPress={() =>
          submitGender({
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
