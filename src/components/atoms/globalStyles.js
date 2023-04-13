import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const mainColour = '#22C8EC';

export const globalStyles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2.5%',
    color: '#F91F6D', //'#C071FF',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 30,
  },

  image: {
    marginBottom: 50,
    width: windowHeight * 0.1,
    height: windowHeight * 0.1,
  },

  inputView: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: '80%',
    height: '6%',
    marginBottom: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'black',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#09A48E',
  },

  forgot_button: {
    height: 30,
    marginBottom: 20,
    color: 'white',
  },

  joinNow: {
    fontSize: 15,
    fontWeight: 'bold',

    color: '#09A48E',
  },

  loginText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  progressText: {
    paddingRight: '12%',
    paddingBottom: 10,
    color: '#C3D2E5',
    alignSelf: 'flex-end',
    fontSize: 12,
  },
});
