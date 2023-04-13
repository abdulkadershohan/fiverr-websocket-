import React from 'react';
import {useState, useContext} from 'react';

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

// My Components - atoms
import {PrimaryButton} from '../../../components/atoms/Button';
import {TextType} from '../../../components/atoms/TextType';

// Components
import EditOpenTo from '../../../components/organisms/EditOpenTo';

//Global styling
import {globalStyles} from '../../../components/atoms/globalStyles';

//Context
import {LoggedInUserContext} from '../../../context/LoggedInUserContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditOpenTosProfile({navigation}) {
  const {submitOpenTos, error} = useContext(LoggedInUserContext);
  return (
    <View style={{...globalStyles.screen, ...styles.screen}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}>
        <Text style={styles.title}> Select what you're open to </Text>
        <Text style={styles.title}> to help like minded people find you </Text>
      </View>
      <EditOpenTo />
      {error && <TextType type="p1" text={error} textStyle={globalStyles.error} />}
      <PrimaryButton
        buttonStyle={styles.buttonStyle}
        type="filled"
        title="Submit"
        onPress={() => submitOpenTos({navigation})}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  section: {
    paddingBottom: 30,
  },

  chipRow: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  buttonStyle: {
    marginTop: 20,
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
