import React from 'react';
import {useState, useCallback, useContext, useEffect} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';
import * as RNIap from 'react-native-iap';

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

// My Components

// My Components - atoms
import {PrimaryButton} from '../../components/atoms/Button';
import {Dropdown} from '../../components/atoms/Dropdown';
import {TextType} from '../../components/atoms/TextType';
import {ProgressBar} from '../../components/atoms/ProgressBar';

// My Components - organisms
import EditOpenTo from '../../components/organisms/EditOpenTo';
import EditSubscription from '../../components/organisms/EditSubscription';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Global styling
import {globalStyles} from '../../components/atoms/globalStyles';

//Context
import {AuthContext} from '../../context/AuthContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

const margin = windowWidth * 0.015;
const margin2 = margin / 2;
const margin3 = margin + 2;
const marginBottom = margin.toString() + '%';
const margin2Bottom = margin2.toString() + '%';
const margin3Bottom = margin3.toString() + '%';

export default function Subscription({navigation}) {
  const {submitOpenTo} = useContext(AuthContext);
  const {
    error,
    submitSubscriptionPlan,
    getSubscriptionPlan,
    sayHiText,
    freePlan,
  } = useContext(LoggedInUserContext);

  const itemSkus = Platform.select({
    ios: ['plan1'],
    android: [],
  });

  /*
  const initIAp = async () => {
    //check payment is done
    try {
      //connect to in app purchases
      await RNIap.initConnection(); // RNIap.endConnection();
      // get list of subscriptions
      const subscriptions = await RNIap.getSubscriptions(itemSkus);
      console.log('** localisedPrice ** -> ' + subscriptions[0].localisedPrice);
      await RNIap.purchaseUpdatedListener(purchase => {
        if (purchase) {
          const receipt = purchase?.transactionReceipt;
          if (receipt) {
            console.log('purchase receipt : ' + receipt);
            const ackResult = RNIap.finishTransaction({purchase});
            console.log('purchase ackResult : ' + ackResult);
          }
        }
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  //onPress={() => subscribeButtonClick(subscriptions[0].productId)}
  const subscribeButtonClick = async sku => {
    // start purchase code...
    try {
      const request_result = await RNIap.requestSubscription(sku);
      console.log('purchase requestSubscription result: ' + request_result);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const purchaseErrorListener = RNIap.purchaseErrorListener(err => {
    console.log(' purchase error ->> ' + err);
  });

  useEffect(() => {
    initIAp();

    return () => {
      RNIap.purchaseUpdatedListener.remove();
      RNIap.purchaseErrorListener.remove();
      RNIap.endConnection();
    };
  }, []);
*/
  const subscriptionText = freePlan
    ? sayHiText
    : 'You can say hi to as many people as you want to with a paid plan';
  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <TextType
          type="h4"
          text="Subscription"
          textStyle={{marginBottom: marginBottom}}
        />

        <TextType
          type="h6"
          text={subscriptionText}
          textStyle={{
            marginBottom: marginBottom,
            paddingHorizontal: windowWidth * 0.1,
          }}
        />

        <EditSubscription />

        <PrimaryButton
          buttonStyle={{marginTop: 20}}
          type="filled"
          title="Submit"
          onPress={() => {
            submitSubscriptionPlan({navigation});
            if (freePlan == false) {
              //subscribeButtonClick(subscriptions[0].productId)
            }
          }}
        />
        {error && <TextType type="p1" text={error} textStyle={styles.error} />}
        <View style={{paddingBottom: windowHeight * 0.05}} />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0E2C',
    flex: 1,
  },

  scrollScreen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingTop: 20,
  },

  progressText: {
    paddingRight: '12%',
    paddingBottom: 10,
    color: '#32629F',
    alignSelf: 'flex-end',
    fontSize: 12,
  },

  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    color: 'red',
    paddingHorizontal: '10%',
    textAlign: 'center',
  },
});
