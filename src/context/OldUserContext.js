import React, {useState, createContext, useContext} from 'react';
import * as Keychain from 'react-native-keychain';

//context
import {AuthContext} from './AuthContext';
import {NotificationContext} from './NotificationContext';
import {LoggedInUserContext} from './LoggedInUserContext';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const {email, interests, getAge, dob, open_tos} = useContext(AuthContext);
  const {isTokenExpired, accessToken} = useContext(LoggedInUserContext);
  const {
    sayHiNotif,
    setSayHiNotif,
    chatNotif,
    setChatNotif,
    showNotification,
    domain,
  } = useContext(NotificationContext);

  const [userProfile, setUserProfile] = useState(['']);
  const [userInterests, setUserInterests] = useState(['']);
  const [userOpenTos, setUserOpenTos] = useState(['']);
  const [userQAs, setUserQAs] = useState(['']);

  // get another clicked on user's profile data (not logged in user)
  const getUserProfileData = async user_email => {
    console.log('******* GETTING USER PROFILE DATA FOR ' + user_email);
    const url = domain + 'api/user-profile/?email=' + user_email;
    console.log(url);
    await isTokenExpired();
    const accessCredentials = await Keychain.getGenericPassword({
      service: 'access',
    });
    console.log(
      '***** getUserProfileData accessCredentials ***** -> ' +
        accessCredentials.password,
    );
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + accessCredentials.password,
          },
        }),
      );
    });
  };

  // get another clicked on user's interests (not logged in user)
  const getUserProfileInterests = async user_email => {
    console.log(
      '************** getting ' +
        user_email +
        ' interests from API starting **************',
    );
    isTokenExpired();
    const accessCredentials = await Keychain.getGenericPassword({
      service: 'access',
    });
    console.log(
      '  *** credentials.password ***  ' + accessCredentials.password,
    );
    const url = domain + 'api/user-interests/?email=' + user_email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log('interests below');
        console.log(json);
        setUserInterests(json);
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  // get another clicked on user's open tos data (not logged in user)
  const getUserProfileOpenTos = async user_email => {
    console.log(
      '************** getting ' +
        user_email +
        ' open tos from API starting **************',
    );
    isTokenExpired();
    const accessCredentials = await Keychain.getGenericPassword({
      service: 'access',
    });
    console.log(
      '  *** credentials.password ***  ' + accessCredentials.password,
    );
    const url = domain + 'api/user-open-tos/?email=' + user_email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log('open tos below');
        console.log(json);
        setUserOpenTos(json);
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  // get another clicked on user's Q&A data (not logged in user)
  const getUserProfileQAs = async user_email => {
    console.log(
      '************** getting ' +
        user_email +
        ' qas from API starting **************',
    );
    isTokenExpired();
    const accessCredentials = await Keychain.getGenericPassword({
      service: 'access',
    });
    console.log(
      '  *** credentials.password ***  ' + accessCredentials.password,
    );

    const url = domain + 'api/user-qas/?email=' + user_email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log('open qas below');
        console.log(json);
        setUserQAs(json);
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        getUserProfileData,
        getUserProfileInterests,
        getUserProfileOpenTos,
        getUserProfileQAs,
        userInterests,
        userOpenTos,
        userQAs,
      }}>
      {children}
    </UserContext.Provider>
  );
};
