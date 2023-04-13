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

export default function SignUpFormProfessional({navigation, page}) {
  const {submitCompanyOrUni} = useContext(AuthContext);
  const {role, setRole, company, setCompany, error} =
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
    <>
      <Dropdown
        placeholder="Most recent job title"
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
        placeholder="Most recent company"
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
