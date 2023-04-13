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

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const interests = [
  'Music',
  'Travelling',
  'Sport',
  'Gaming',
  'Business',
  'Investing',
  'Christianity',
  'Islam',
  'Hinduism',
  'Sikhism',
  'Judaism',
  'Buddhism',
];

export const Chip = props => {
  //Default state isActive = False (0 = False)
  //const [isActive, setIsActive] = useState(0);
  const ChipOnPress = () => {
    console.log(props.active + 'hi');
    //when button is pressed set isActive to True
    //If button is pressed again it will set isActive to False & so on
    props.setActive(!props.active);
    console.log(props.active);
  };

  return (
    <Pressable
      style={{
        ...props.style,
        ...{
          backgroundColor: props.active ? '#13748A' : 'transparent',
        },
        ...styles.chipStyle,
      }}
      onPress={ChipOnPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

// Styles
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: 'white',
  },
  chipStyle: {
    borderColor: '#13748A',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 10,
  },
});
