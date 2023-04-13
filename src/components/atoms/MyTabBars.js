import * as React from 'react';
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
  Dimensions,
} from 'react-native';
// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: windowWidth * 0.03,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={
              isFocused
                ? {
                    selected: true,
                  }
                : {}
            }
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? '#E6E6E6' : 'transparent',
              fontSize: 12,
              borderRadius: 100,
              //marginHorizontal: 0.1 * windowWidth,
              marginStart: 0.1 * windowWidth,
              marginEnd: 0.16 * windowWidth,
              paddingVertical: windowHeight * 0.008, //color : isFocused ? '#424242' : '#9E9E9E',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: isFocused ? '#424242' : '#9E9E9E',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function ProfileTabBar1({state, descriptors, navigation, position}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 0,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={
              isFocused
                ? {
                    selected: true,
                  }
                : {}
            }
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? '#E6E6E6' : 'transparent',
              fontSize: 12,
              borderRadius: 100,
              marginHorizontal: 0.06 * windowWidth,
              paddingVertical: windowHeight * 0.008, //color : isFocused ? '#424242' : '#9E9E9E',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: isFocused ? '#424242' : '#9E9E9E',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
