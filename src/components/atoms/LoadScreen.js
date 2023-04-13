import React from 'react';
import {useState} from 'react';
//import DatePicker from 'react-native-date-picker'

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
  ActivityIndicator,
} from 'react-native';

// Components

//Styling
//import { styles } from './style';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const LoadScreen = props => {
  return (
    <View style={styles.loadScreen}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  loadScreen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    justifyContent: 'center',
  },
});
