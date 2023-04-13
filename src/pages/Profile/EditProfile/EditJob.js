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

export default function EditJob({navigation}) {
  const {role, setRole, company, setCompany, error, submitJob} =
    useContext(LoggedInUserContext);

  const roles = [
    {label: 'Data Scientist', value: 'Data Scientist'},
    {label: 'Product Manager', value: 'Product Manager'},
    {label: 'Software Engineer', value: 'Software Engineer'},
  ];

  const companies = [
    {label: 'Apple', value: 'Apple'},
    {label: 'IBM', value: 'IBM'},
    {label: 'Google', value: 'Google'},
  ];

  const [roleOpen, setRoleOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const onRoleOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const onCompanyOpen = useCallback(() => {
    setRoleOpen(false);
  }, []);

  return (
    <View style={styles.screen}>
      <Dropdown
        placeholder="Select role"
        data={roles}
        input={role}
        setInput={setRole}
        open={roleOpen}
        setOpen={setRoleOpen}
        onOpen={onRoleOpen}
        zIndex={2000}
        zIndexInverse={1000}
      />
      <Dropdown
        placeholder="Select company"
        data={companies}
        input={company}
        setInput={setCompany}
        open={companyOpen}
        setOpen={setCompanyOpen}
        onOpen={onCompanyOpen}
        zIndex={1000}
        zIndexInverse={2000}
      />
      <PrimaryButton
        type="filled"
        title="Submit"
        onPress={() => submitJob({navigation})}
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
