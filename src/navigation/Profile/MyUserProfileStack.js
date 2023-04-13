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

import {createStackNavigator} from '@react-navigation/stack';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Screens
import MyUserProfile from '../../pages/Profile/MyUserProfile';
import EditProfile from '../../pages/Profile/EditProfile/EditProfile';
import EditInterestsProfile from '../../pages/Profile/EditProfile/EditInterestsProfile';
import EditOpenTosProfile from '../../pages/Profile/EditProfile/EditOpenTosProfile';
import EditQAProfile from '../../pages/Profile/EditProfile/EditQAProfile';
import EditName from '../../pages/Profile/EditProfile/EditName';
import EditAge from '../../pages/Profile/EditProfile/EditAge';
import EditGender from '../../pages/Profile/EditProfile/EditGender';
import EditEthnicity from '../../pages/Profile/EditProfile/EditEthnicity';
import EditLocation from '../../pages/Profile/EditProfile/EditLocation';
import EditJob from '../../pages/Profile/EditProfile/EditJob';
import EditBlocked from '../../pages/Profile/EditProfile/EditBlocked';
import UserProfile from '../../pages/Profile/UserProfile';
import EventProfile from '../../pages/Events/EventProfile';
import EditPhotos from '../../pages/Profile/EditProfile/EditPhotos';
import EditOccupation from '../../pages/Profile/EditProfile/EditOccupation';
import UserPhotos from '../../pages/Profile/UserPhotos';
import NetworkTopTab from '../NetworkTopTab';

const NetworkTopTabName = 'Network';
const MyUserProfileName = 'My User Profile';
const ProfilePicturesName = 'My Photos';
const EditProfileName = 'Edit Profile';
const EditInterestsProfileName = 'Edit Interests';
const EditOpenTosProfileName = 'Edit Open To';
const EditQAProfileName = 'Edit Q&A';
const EditNameName = 'Edit Name';
const EditAgeName = 'Edit Age';
const EditGenderName = 'Edit Gender';
const EditEthnicityName = 'Edit Ethnicity';
const EditLocationName = 'Edit Location';
const EditJobName = 'Edit Job';
const EditReligionName = 'Edit Religion';
const EditPrivacyName = 'Edit Privacy';
const EditBlockedName = 'Edit Blocked List';
const UserProfileName = 'User Profile';
const EventProfileName = 'Event Profile';
const UserPhotosName = 'User Photos';
const EditPhotosName = 'Edit Photos';
const EditOccupationName = 'Edit Occupation';

const Stack = createStackNavigator();

const MyUserProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MyUserProfileName}
        component={MyUserProfile}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditProfileName}
        component={EditProfile}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditInterestsProfileName}
        component={EditInterestsProfile}
        //title = '' removes title on screen
        options={{
          title: EditInterestsProfileName,
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditOpenTosProfileName}
        component={EditOpenTosProfile}
        //title = '' removes title on screen
        options={{
          title: EditOpenTosProfileName,
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditQAProfileName}
        component={EditQAProfile}
        //title = '' removes title on screen
        options={{
          title: EditQAProfileName,
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditNameName}
        component={EditName}
        //title = '' removes title on screen
        options={{
          title: EditNameName,
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditAgeName}
        component={EditAge}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditGenderName}
        component={EditGender}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditEthnicityName}
        component={EditEthnicity}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditLocationName}
        component={EditLocation}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditJobName}
        component={EditJob}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditBlockedName}
        component={EditBlocked}
        //title = '' removes title on screen
        options={{
          title: 'Blocked users',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={UserProfileName}
        component={UserProfile}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EventProfileName}
        component={EventProfile}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={UserPhotosName}
        component={UserPhotos}
        //initialParams={{type: 'fun'}}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditPhotosName}
        component={EditPhotos}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={EditOccupationName}
        component={EditOccupation}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      <Stack.Screen
        name={NetworkTopTabName}
        component={NetworkTopTab}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
      
    </Stack.Navigator>
  );
};
/*
 <Stack.Screen
        name={UploadPhotosName}
        component={SignUp6}
        //title = '' removes title on screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#0E0E2C',
          },
          headerTitleStyle: {
            color: 'white',
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
          },
          headerShadowVisible: false, //removes header underline
        }}
      />
*/
export default MyUserProfileStack;
