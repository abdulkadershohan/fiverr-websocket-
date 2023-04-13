import React from 'react';
import {useState, useCallback} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';

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
  Platform,
} from 'react-native';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from './globalStyles';

export const Dropdown = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.data);

  const onOpen = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <DropDownPicker
      zIndex={props.zIndex}
      zIndexInverse={props.zIndexInverse}
      //containerStyle={{height: 40}}
      //style={{ backgroundColor: '#ffffff' }}
      //dropDownStyle={{ backgroundColor: 'white' }}
      placeholder={props.placeholder}
      placeholderStyle={{
        color: 'grey',
      }}
      searchPlaceholder="Search..."
      open={props.open}
      value={props.input}
      items={items}
      onOpen={props.onOpen}
      setOpen={props.setOpen}
      setValue={props.setInput}
      setItems={setItems}
      searchable
      containerProps={{
        width: '80%',
        height: '6%',
        marginBottom: 20,
        borderRadius: 50,
      }}
      searchContainerStyle={{
        borderBottomColor: 'transparent',
      }}
    />
  );
};

// Local Styles
const styles = StyleSheet.create({
  container: {
    //width :'80%',
    marginBottom: 20,
    borderRadius: 50,
  },
  placeholder: {
    color: 'grey',
  },
});

/*
 <DropDownPicker
      style={{borderRadius: 25, width :'80%', marginBottom : 20,}}
      placeholderStyle={{
        ...styles.placeholder, ...props.placeholderStyle
      }}
      searchPlaceholder="Search..."
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      searchable
      containerProps={{...styles.container, ...props.containerStyles}}
      searchContainerStyle={{
        borderBottomColor: "transparent",
      }}
    />
*/
