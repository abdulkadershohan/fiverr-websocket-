import React from 'react';
import {useState} from 'react';

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

// Components
import EditQAForm from '../../../components/organisms/EditQAForm';

import {globalStyles} from '../../../components/atoms/globalStyles';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditQAProfile({navigation}) {
  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}>
          <Text style={styles.title}> Answer some questions </Text>
          <Text style={styles.title}> to help with conversation starters </Text>
        </View>
        <EditQAForm buttonTitle="Submit" navigation={navigation} />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    //paddingHorizontal: 20,
    //paddingTop: 30,
  },
  scrollScreen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingTop: 50,
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
});
