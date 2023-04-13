import {React, useState, useContext} from 'react';

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
} from 'react-native';

// Components
import {EditProfileRowInput} from '../../../components/atoms/EditProfileRowInput';
import {PrimaryButton} from '../../../components/atoms/Button';
import {TextType} from '../../../components/atoms/TextType';

//Context
import {LoggedInUserContext} from '../../../context/LoggedInUserContext';

//Global styling
import {globalStyles} from '../../../components/atoms/globalStyles';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditName({navigation}) {
  const {firstName, setFirstName, lastName, setLastName, error, submitName} =
    useContext(LoggedInUserContext);
  return (
    <View style={styles.screen}>
      <EditProfileRowInput
        title={'First Name'}
        input={firstName}
        setInput={setFirstName}
      />
      <EditProfileRowInput
        title={'Last Name'}
        input={lastName}
        setInput={setLastName}
      />
      <View style={styles.submit}>
        <PrimaryButton
          type="filled"
          title="Submit"
          onPress={() =>
            submitName({
              navigation,
            })
          }
        />
        {error && (
          <TextType type="p1" text={error} textStyle={globalStyles.error} />
        )}
      </View>
    </View>
  );
}

/*
<EditProfileRowInput
        title={'First Name'}
        input={firstName}
        setInput={setFirstName}
      />
      <EditProfileRowInput
        title={'Last Name'}
        input={lastName}
        setInput={setLastName}
      />
*/
// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  submit: {
    alignItems: 'center',
  },

  section: {
    paddingBottom: 30,
  },

  row: {
    backgroundColor: '#0E0E2C',
    flexDirection: 'row',
    paddingTop: 0,
    Height: windowHeight * 0.038,
    //paddingBottom : 5,
    //marginBottom : 5
    //paddingVertical : 20
  },

  EditRow: {
    position: 'absolute',
    left: windowWidth * 0.3,
  },

  RowUnderline: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: windowWidth * 0.3,
    marginBottom: 15,
  },

  title: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 0,
    textAlign: 'center',
  },

  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
