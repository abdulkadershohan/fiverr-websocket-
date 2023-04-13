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
    KeyboardAvoidingView,
  } from 'react-native';

import * as Progress from 'react-native-progress';
import { mainColour } from './globalStyles';

export const ProgressBar = props => {
  return (
    <Progress.Bar
      progress={props.progress}
      width={300}
      height={8}
      color= {mainColour}
      style={{...props.style,...styles.progressStyle}}
    />
  );
};

// Styles
const styles = StyleSheet.create({
    progressStyle: {
        marginBottom: 20
    },

  });
  
