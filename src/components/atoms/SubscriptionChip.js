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

import { PrimaryButton } from './Button';
import { mainColour } from './globalStyles';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const marginBottom = '5%'

export const SubscriptionChip = props => {
  //Default state isActive = False (0 = False)
  //const [isActive, setIsActive] = useState(0);
  const ChipOnPress = () => {
    props.setActive(!props.active);
    console.log(props.active);
  };

  const backgroundColor = () => {
    if (props.type == 'Free' && props.active) {
      return '#13748A';
    } else if (props.type == 'Free' && !props.active) {
      return 'transparent';
    } else if (props.type == 'Paid' && props.active) {
      return 'transparent';
    } else if (props.type == 'Paid' && !props.active) {
      return '#13748A';
    }
  };
  return (
    <Pressable
      style={{
        ...props.style,
        ...{
          backgroundColor: backgroundColor(),
        },
        ...styles.chipStyle,
      }}
      onPress={ChipOnPress}>
      <Text style={styles.titleText}>{props.title}</Text>
      <Text style={styles.text}>{props.benefit1}</Text>
      <Text style={styles.text}>{props.benefit2}</Text>
      <Text style={styles.text}>{props.benefit3}</Text>
      <Text style={styles.text}>{props.benefit4}</Text>
      {/*<PrimaryButton
          buttonStyle={styles.buttonFilled}
          type="filled"
          title={props.buttonTitle}
          onPress={() => submitSubscriptionPlan({navigation})}
    />*/}
    </Pressable>
  );
};

// Styles
const styles = StyleSheet.create({
  buttonFilled: {
    width: '50%',
    //height: '5%',
    borderRadius: 10,
    height: windowHeight * 0.04, //"6%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: marginBottom,
    backgroundColor: mainColour,
  },
  benefitsRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
    letterSpacing: 0.25,
    color: 'white',
    marginBottom: windowHeight * 0.02,
  },
  text: {
    fontSize: 12,
    //lineHeight: 21,
    fontWeight: '500',
    //letterSpacing: 0.25,
    color: 'white',
    alignSelf: 'flex-start',
    paddingVertical: windowHeight * 0.007,
  },
  chipStyle: {
    borderColor: '#13748A',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.03,
    marginHorizontal: windowWidth * 0.02,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 10,
    width: windowWidth * 0.42, //
    height: windowHeight * 0.28, //
  },
});
