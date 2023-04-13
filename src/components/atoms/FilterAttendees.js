import {React, useState, useContext, useEffect} from 'react';
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
  Dimensions,
  Platform,
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {
  NavigationContainer,
  validatePathConfig,
} from '@react-navigation/native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
Feather.loadFont();

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../../components/atoms/globalStyles';

//Context
import {EventContext} from '../../context/EventContext';

const filterColour = '#9D9999'; //'#13748A';

export const FilterAttendees = props => {
  //alignSelf: 'flex-start',paddingLeft: '10%' << putting text on left hand side of screen
  //color = '#09A48E'

  const {attendees} = useContext(EventContext);

  const [filterClicked, setFilterClicked] = useState(false);

  const handleOnPress = item => {
    //props.clearSearchText('');
    const newItems = props.selectedItems.map(val => {
      if (val.id == item.id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });
    props.setSelectedItems(newItems);
    console.log('**** newItems  -  ' + newItems);

    const newUniqueItems = Array.from(
      new Set(
        props.selectedItems
          .filter(i => i.selected == true)
          .map(obj => obj[props.filterColumn]),
      ),
    );
    props.setUniqueItems(newUniqueItems);

    console.log('** newUniqueItems ' + newUniqueItems);
    console.log(props.selectedItems.filter(i => i.selected == true));
  };

  const selectAll = () => {
    //props.clearSearchText('');
    const newItems = props.selectedItems.map(val => {
      return {...val, selected: true};
    });
    props.setSelectedItems(newItems);
    props.setUniqueItems(
      Array.from(
        new Set(props.selectedItems.map(obj => obj[props.filterColumn])),
      ), //obj => obj.city
    );
    console.log(props.selectedItems.filter(i => i.selected == true));
  };
  const deSelectAll = () => {
    //props.clearSearchText('');
    const newItems = props.selectedItems.map(val => {
      return {...val, selected: false};
    });
    props.setSelectedItems(newItems);
    props.setUniqueItems([]);
    console.log(attendees);
    console.log(props.selectedItems.filter(i => i.selected == false));
    console.log('*******' + props.uniqueItems);
  };

  const [multiSliderValue, setMultiSliderValue] = useState([18, 50]);

  if (props.title != 'Age') {
    return (
      <>
        <View
          style={{
            ...{
              width: windowWidth * 0.27,
              height: windowHeight * 0.036,
              //margin: 2,
              borderWidth: props.filterClicked ? 1.5 : 0.8,
              padding: 4,
              borderColor: filterColour, // '#13748A', // 'white',
              //color: props.filterClicked ? '#2AAFCC' : 'white',
              borderRadius: 15,
              marginBottom: 0,
              paddingBottom: 0,
              paddingRight: '5%',
              marginRight: windowWidth * 0.025,
            },
            ...props.titleStyle,
          }}>
          <TouchableOpacity
            onPress={() => {
              //setFilterClicked(!filterClicked);
              props.onOpen();
            }}>
            <Text style={styles.title}>{props.title}</Text>
            {props.filterClicked ? (
              <Ionicons
                name="md-chevron-up"
                size={20}
                color={filterColour} //"#13748A" //"#C6C6C6"
                style={styles.arrow}
              />
            ) : (
              <Ionicons
                name="md-chevron-down"
                size={20}
                color={filterColour} //"#C6C6C6"
                style={styles.arrow}
              />
            )}
          </TouchableOpacity>
        </View>
        {props.filterClicked ? (
          <View style={styles.row}>
            <View style={{...styles.dropdownList, ...props.listStyle}}>
              {/*<ScrollView>*/}
              {props.selectedItems.filter(i => i.selected == true).length !==
                props.selectedItems.length && (
                <TouchableOpacity onPress={() => selectAll()}>
                  <Text style={styles.text}>Select all</Text>
                </TouchableOpacity>
              )}
              {props.selectedItems.filter(i => i.selected == true).length ==
                props.selectedItems.length && (
                <TouchableOpacity onPress={() => deSelectAll()}>
                  <Text style={styles.text}>Deselect all</Text>
                </TouchableOpacity>
              )}
              <View style={styles.underline} />
              <FlatList
                data={props.selectedItems}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handleOnPress(item)}>
                    <View style={styles.rowItem}>
                      <View>
                        <Text style={styles.text}>
                          {item[props.filterColumn]}
                        </Text>
                      </View>
                      {item.selected ? (
                        <Ionicons
                          name="checkmark-outline"
                          size={20}
                          color="#2AAFCC"
                          style={styles.tick}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                )}
              />
              {/*</ScrollView>*/}
            </View>
          </View>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <View
          style={{
            ...{
              width: windowWidth * 0.27,
              height: windowHeight * 0.036,
              //margin: 2,
              borderWidth: props.filterClicked ? 1.5 : 0.8,
              padding: 4,
              borderColor: filterColour, //'#13748A', // 'white',
              //color: props.filterClicked ? '#2AAFCC' : 'white',
              borderRadius: 15,
              marginBottom: 0,
              paddingBottom: 0,
              paddingRight: '5%',
              marginRight: windowWidth * 0.025,
            },
            ...props.titleStyle,
          }}>
          <TouchableOpacity
            onPress={() => {
              //setFilterClicked(!filterClicked);
              props.onOpen();
            }}>
            <Text style={styles.title}>{props.title}</Text>
            {props.filterClicked ? (
              <Ionicons
                name="md-chevron-up"
                size={20}
                color={filterColour} //"#13748A" //"#C6C6C6"
                style={styles.arrow}
              />
            ) : (
              <Ionicons
                name="md-chevron-down"
                size={20}
                color={filterColour} //"#13748A" //"#C6C6C6"
                style={styles.arrow}
              />
            )}
          </TouchableOpacity>
        </View>
        {props.filterClicked ? (
          <>
            <View style={styles.ageTextRow}>
              <Text style={styles.text}>{props.multiSliderValue[0]}+</Text>
            </View>
            <View style={{...styles.ageRow, ...props.listStyle}}>
              <MultiSlider
                values={[props.multiSliderValue[0]]}
                min={18}
                max={50}
                sliderLength={150}
                onValuesChange={values => props.setMultiSliderValue(values)}
              />
            </View>
          </>
        ) : null}
      </>
    );
  }
};
/// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#0E0E2C',
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
  },
  ageTextRow: {
    flexDirection: 'row',
    position: 'absolute',
    left: '36.5%',
    bottom: '35%',
    //height: windowHeight * 0.22,
    //marginBottom:windowHeight * 0.006,
    //paddingTop: 100,
  },
  row: {
    flexDirection: 'row',
    height: windowHeight * 0.22,
    //marginBottom:windowHeight * 0.006,
    //paddingTop: 100,
  },
  ageRow: {
    flexDirection: 'row',
    height: windowHeight * 0.12,
    //marginBottom:windowHeight * 0.006,
    //paddingTop: 100,
  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white', // '#13748A', //'white',
    alignSelf: 'center',
    //textAlign: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    padding: '1%',
    alignSelf: 'flex-start',
    //textAlign: 'left'
  },
  dropdownTitle: {
    width: windowWidth * 0.27,
    height: windowHeight * 0.036,
    //margin: 2,
    borderWidth: 0.5,
    padding: 4,
    borderColor: filterColour, //'#13748A', // 'white',
    color: 'white',
    borderRadius: 15,
    marginBottom: 0,
    paddingBottom: 0,
    paddingRight: '5%',
    marginRight: windowWidth * 0.025,
  },
  dropdownList: {
    marginTop: windowHeight * 0.006,
    paddingTop: windowHeight * 0.006,
    width: windowWidth * 0.5,
    height: windowHeight * 0.165,
    //margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderColor: filterColour, //'#13748A',//'white',
    color: 'white',
    borderRadius: 10,
    backgroundColor: '#0E0E2C',
    //borderTopWidth:1,
  },

  arrow: {
    position: 'absolute',
    left: '100%',
    //left: windowWidth * 0.19,
  },
  tick: {
    position: 'absolute',
    right: windowWidth * 0.005,
    //bottom : windowHeight * -0.1
  },
  underline: {
    //backgroundColor: isActive ?'#13748A': 'transparent',
    flexDirection: 'row',
    marginBottom: windowHeight * 0.006,
    paddingBottom: windowHeight * 0.006,
    Height: windowHeight * 0.038,
    //width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: '5%',
  },
});
