import React from 'react';

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

// Icons

import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

// Responsive UI??
// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditProfileRow({title, inputText, navigation, page}) {
  //let a = ['Interests', 'Q&A', 'Open To'];

  if (
    title == 'Photos' ||
    title == 'Interests' ||
    title == 'Open To' ||
    title == 'Q&A' ||
    title == 'Blocked List'
  ) {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.push(page)}>
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.titleText}>{title}</Text>
              <Ionicons
                name="md-chevron-forward"
                size={20}
                color="#C6C6C6"
                style={styles.arrow}
              />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.RowUnderline}></View>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.push(page)}>
          <View style={styles.row}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <Ionicons
            name="md-chevron-forward"
            size={20}
            color="#C6C6C6"
            style={styles.arrow}
          />
          <View style={styles.row}>
            <Text style={styles.text}>{inputText}</Text>
          </View>
          <View style={styles.RowUnderline}></View>
        </TouchableOpacity>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 10,
    paddingBottom: 15,
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
    flexDirection: 'row',
    //position: 'absolute',
    //left: windowWidth*0.3,
  },

  RowUnderline: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    //marginLeft: windowWidth*0.3,
    marginBottom: 15,
  },

  titleText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 10,
  },

  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '300',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 10,
    Left: windowWidth * 0.5,
    //marginLeft : 'auto',
  },

  arrow: {
    position: 'absolute',
    left: windowWidth * 0.76,
  },
});
