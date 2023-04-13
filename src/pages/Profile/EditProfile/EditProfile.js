import {React, useState, useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

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

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//Components - atoms
import EditProfileRow from '../../../components/atoms/EditProfileRow';
import {LoadScreen} from '../../../components/atoms/LoadScreen';

//Context
import {LoggedInUserContext} from '../../../context/LoggedInUserContext';
import {UserContext} from '../../../context/UserContext';

// Responsive UI??
// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditProfile({navigation}) {
  const isVisible = useIsFocused();

  //const {getToken} = useContext(AuthContext);

  const {
    email,
    firstName,
    lastName,
    age,
    gender,
    ethnicity,
    city,
    role,
    company,
    university,
    course,
    editProfilePageData,
    setError,
    student,
    loading,
    setLoading,
    userProfile,
    setUserProfile,
  } = useContext(LoggedInUserContext);
  const {getUserProfileData} = useContext(UserContext);

  useEffect(() => {
    if (isVisible) {
      console.log('called when screen open or when back on screen ');
      setError(null);
      setLoading(true);
      editProfilePageData();
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  const job_text = company || role ? role + ' @ ' + company : role;
  const uni_text =
    university || course ? course + ' @ ' + university : university;
  const occupation_text = student ? uni_text : job_text;

  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      {loading ? (
        <LoadScreen />
      ) : (
        <ScrollView style={styles.screen}>
          <EditProfileRow
            title={'Photos'}
            navigation={navigation}
            page={'Edit Photos'}
          />
          <EditProfileRow
            title={'Interests'}
            navigation={navigation}
            page={'Edit Interests'}
          />
          <EditProfileRow
            title={'Open To'}
            navigation={navigation}
            page={'Edit Open To'}
          />
          <EditProfileRow
            title={'Q&A'}
            navigation={navigation}
            page={'Edit Q&A'}
          />
          <EditProfileRow
            title={'Name'}
            inputText={firstName}
            navigation={navigation}
            page={'Edit Name'}
          />
          <EditProfileRow
            title={'Age'}
            inputText={age}
            navigation={navigation}
            page={'Edit Age'}
          />
          <EditProfileRow
            title={'Gender'}
            inputText={gender}
            navigation={navigation}
            page={'Edit Gender'}
          />
          <EditProfileRow
            title={'Ethnicity'}
            inputText={ethnicity}
            navigation={navigation}
            page={'Edit Ethnicity'}
          />
          <EditProfileRow
            title={'Location'}
            inputText={city}
            navigation={navigation}
            page={'Edit Location'}
          />
          <EditProfileRow
            title={'Occupation'}
            inputText={occupation_text}
            navigation={navigation}
            page={'Edit Occupation'}
          />
          <EditProfileRow
            title={'Blocked List'}
            navigation={navigation}
            page={'Edit Blocked List'}
          />
          <View style={styles.screen} />
        </ScrollView>
      )}
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: windowWidth * 0.08,
    //width : '50%',
    //height : '100%'
  },
  scrollScreen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
  },

  titleText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 10,
  },

  titleTextRow: {
    //flex: 1,
    flexDirection: 'row',

    // width : '100%',
    //height : '10%',
    //paddingTop : '1%',
    //paddingBottom : '5%'
  },

  dropdownRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    paddingTop: '1%',
    paddingBottom: '5%',
  },
  dropdownDivider: {width: '10%'},
});
