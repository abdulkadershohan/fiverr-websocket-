import {React, useContext, useEffect} from 'react';
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

import {NavigationContainer} from '@react-navigation/native';

//Atoms
import {ViewQARow} from '../../components/molecules/ViewQARow';

//Context
import {UserContext} from '../../context/UserContext';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function QA({route, navigation}) {
  const {getUserProfileData} = useContext(UserContext);
  const {userProfile} = useContext(LoggedInUserContext);
  //var qas = [];
  var {email} = route.params;
  const isVisible = useIsFocused();

  useEffect(() => {
    if (isVisible) {
      console.log('use effect my QAQAQAAA ---> ' + email);
      getUserProfileData(email);
      console.log('***^^^^ QAss ---->>>> ' + userProfile.qas);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  if (typeof userProfile.qas !== 'undefined') {
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          {userProfile.qas.map(qa => {
            return <ViewQARow question={qa[0]} answer={qa[1]} />;
          })}
        </View>
      </ScrollView>
    );
  } else {
    return <ScrollView style={styles.scrollView} />;
  }
}

// Styles
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    paddingTop: windowHeight * 0.03,
  },
  hashtags: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 15,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 20,
  },
});
