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

export default function EditEthnicity({navigation}) {
  const {ethnicity, setEthnicity, error, submitEthnicity} =
    useContext(LoggedInUserContext);

  const ethnicities = [
    {label: 'Black British', value: 'Black British'},
    {label: 'Asian', value: 'Asian'},
    {label: 'white', value: 'white'},
  ];

  const [ethnicityOpen, setEthnicityOpen] = useState(false);

  return (
    <View style={styles.screen}>
      <Dropdown
        placeholder="Select ethnicity"
        data={ethnicities}
        input={ethnicity}
        setInput={setEthnicity}
        open={ethnicityOpen}
        setOpen={setEthnicityOpen}
        zIndex={4000}
        zIndexInverse={2000}
      />
      <PrimaryButton
        type="filled"
        title="Submit"
        onPress={() =>
          submitEthnicity({
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
