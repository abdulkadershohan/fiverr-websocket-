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

export default function EditLocation({navigation}) {
  const {country, setCountry, city, setCity, error, submitLocation} =
    useContext(LoggedInUserContext);

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

  const [countryOpen, setCountryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const onCountryOpen = useCallback(() => {
    setCityOpen(false);
  }, []);

  const onCityOpen = useCallback(() => {
    setCountryOpen(false);
  }, []);

  const today = new Date();
  return (
    <View style={styles.screen}>
      <Dropdown
        placeholder="Select country"
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
        placeholder="Select city"
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
        title="Submit"
        onPress={() =>
          submitLocation({
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
