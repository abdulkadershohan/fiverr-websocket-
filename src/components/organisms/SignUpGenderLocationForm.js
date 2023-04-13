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
import {Dropdown} from '../atoms/Dropdown';
import {PrimaryButton} from '../atoms/Button';
import SelectDob from '../atoms/SelectDob';
import {TextType} from '../atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../atoms/globalStyles';

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

export default function SignUpGenderLocationForm({navigation}) {
  const {submitGenderLocation} = useContext(AuthContext);

  const {
    gender,
    setGender,
    ethnicity,
    setEthnicity,
    dob,
    setDob,
    country,
    setCountry,
    city,
    setCity,
    error,
  } = useContext(LoggedInUserContext);

  const genders = [
    {label: 'Woman', value: 'Woman'},
    {label: 'Man', value: 'Man'},
    {label: 'Non Binary', value: 'Non Binary'},
  ];

  const ethnicities = [
    {label: 'Black British', value: 'Black British'},
    {label: 'Asian', value: 'Asian'},
    {label: 'white', value: 'white'},
  ];

  const countries = [
    {label: 'UK', value: 'UK'},
    {label: 'US', value: 'US'},
    {label: 'Germany', value: 'Germany'},
    {label: 'France', value: 'France'},
  ];

  const cities = [
    {label: 'London', value: 'London'},
    {label: 'Manchester', value: 'Manchester'},
    {label: 'Birmingham', value: 'Birmingham'},
    {label: 'Oxford', value: 'Oxford'},
  ];

  const [genderOpen, setGenderOpen] = useState(false);
  const [ethnicityOpen, setEthnicityOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const onGenderOpen = useCallback(() => {
    setEthnicityOpen(false);
    setCountryOpen(false);
    setCityOpen(false);
  }, []);

  const onEthnicityOpen = useCallback(() => {
    setGenderOpen(false);
    setCountryOpen(false);
    setCityOpen(false);
  }, []);

  const onCountryOpen = useCallback(() => {
    setGenderOpen(false);
    setCityOpen(false);
    setEthnicityOpen(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setGenderOpen(false);
    setCountryOpen(false);
    setEthnicityOpen(false);
  }, []);

  const today = new Date();

  return (
    <>
      <Dropdown
        placeholder="Select your gender"
        data={genders}
        input={gender}
        setInput={setGender}
        open={genderOpen}
        setOpen={setGenderOpen}
        onOpen={onGenderOpen}
        zIndex={5000}
        zIndexInverse={1000}
      />
      <Dropdown
        placeholder="Select your ethnicity"
        data={ethnicities}
        input={ethnicity}
        setInput={setEthnicity}
        open={ethnicityOpen}
        setOpen={setEthnicityOpen}
        onOpen={onEthnicityOpen}
        zIndex={4000}
        zIndexInverse={2000}
      />
      <SelectDob input={dob} setInput={setDob} />
      <Dropdown
        placeholder="Select your country"
        data={countries}
        input={country}
        setInput={setCountry}
        open={countryOpen}
        setOpen={setCountryOpen}
        onOpen={onCountryOpen}
        zIndex={2000}
        zIndexInverse={4000}
      />
      <Dropdown
        placeholder="Select your city"
        data={cities}
        input={city}
        setInput={setCity}
        open={cityOpen}
        setOpen={setCityOpen}
        onOpen={onCityOpen}
        zIndex={1000}
        zIndexInverse={5000}
      />
      <PrimaryButton
        type="filled"
        title="Continue"
        onPress={() => submitGenderLocation({navigation})}
      />
      {error && <TextType type="p1" text={error} textStyle={globalStyles.error} />}
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
