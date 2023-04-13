import React from 'react';
import {useState, useContext} from 'react';
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
} from 'react-native';

// My Components

// My Components - atoms
import {PrimaryButton} from '../components/atoms/Button';
import {InputText} from '../components/atoms/InputText';
import {TextType} from '../components/atoms/TextType';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../components/atoms/globalStyles';

//Context
import {AuthContext} from '../context/AuthContext';

export default function Home({navigation}) {
  const {logout} = useContext(AuthContext);

  return (
    <View style={{...globalStyles.screen, ...styles.screen}}>
      <TextType type="h2" text="Home" />
      <View style={{paddingBottom: 30}} />

      <PrimaryButton
        type="outline"
        title="Logoutttt"
        onPress={() => logout()}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
