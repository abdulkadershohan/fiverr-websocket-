import {NavigationHelpersContext} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

/*
import { useNavigationState } from '@react-navigation/native'    
const routes = useNavigationState(state => state.routes)
const currentRoute = routes[routes.length -1].name
console.log('currentRoute: ',currentRoute)
*/
import React, {useState, createContext, useContext} from 'react';

import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';

import {NotificationContext} from './NotificationContext';
import {LoggedInUserContext} from './LoggedInUserContext';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const {setSayHiNotif, setChatNotif, domain} = useContext(NotificationContext);

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    accessToken,
    setAccessToken,
    getToken,
    getTokenRefresh,
    isTokenExpired,
    id,
    setId,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    ethnicity,
    setEthnicity,
    dob,
    setDob,
    getAge,
    age,
    setAge,
    country,
    setCountry,
    city,
    setCity,
    student,
    setStudent,
    university,
    setUniversity,
    course,
    setCourse,
    year,
    setYear,
    role,
    setRole,
    company,
    setCompany,
    profileCreated,
    setProfileCreated,
    interests,
    interests_bool,
    open_tos,
    open_tos_bool,
    music,
    setMusic,
    travelling,
    setTravelling,
    sport,
    setSport,
    gaming,
    setGaming,
    reading,
    setReading,
    business,
    setBusiness,
    investing,
    setInvesting,
    christianity,
    setChristianity,
    islam,
    setIslam,
    hinduism,
    setHinduism,
    sikhism,
    setSikhism,
    judaism,
    setJudaism,
    buddhism,
    setBuddhism,
    meetingPeople,
    setMeetingPeople,
    travelBuddy,
    setTravelBuddy,
    gymBuddy,
    setGymBuddies,
    studyBuddy,
    setStudyBuddies,
    mentoring,
    setMentoring,
    angelInvesting,
    setAngelInvesting,
    cofounding,
    setCofounding,
    clubbing,
    brunches,
    festivals,
    concerts,
    gameNight,
    entrepreneurial,
    networking,
    career,
    conferences,
    events,
    events_bool,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
    answer1,
    setAnswer1,
    answer2,
    setAnswer2,
    answer3,
    setAnswer3,
    answer4,
    setAnswer4,
    answer5,
    setAnswer5,
    answer6,
    setAnswer6,
    answer7,
    setAnswer7,
    filePath1,
    setFilePath1,
    filePath2,
    setFilePath2,
    filePath3,
    setFilePath3,
    image1Loading,
    setImage1Loading,
    image2Loading,
    setImage2Loading,
    image3Loading,
    setImage3Loading,
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
    questions,
    answers,
    cities,
    roles,
    submitName,
    submitAge,
    submitGender,
    submitEthnicity,
    submitLocation,
    submitJob,
    today,
    getUserData,
    formatDate,
    avatarId,
    image1Id,
    image2Id,
    loggedIn,
    setLoggedIn,
    get_notif_ids,
    getSubscriptionPlan,
    getPhotos,
    submitProfileCreated,
  } = useContext(LoggedInUserContext);

  //var ws_notifications = useRef(null);

  const messageHandlers = new Set();
  const addMessageHandler = handler => {
    messageHandlers.add(handler);
  };
  const removeMessageHandler = handler => {
    messageHandlers.delete(handler);
  };

  const [userAuth, setUserAuth] = useState(false);
  /*const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const refreshedToken = accessToken;*/

  const [profileType, setProfileType] = useState('');

  //const [verificationCode, setVerificationCode] = useState('');
  const [verificationCode, setVerificationCode] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
  });
  const [isVerified, setIsVerified] = useState(false);

  function isValidEmail(x) {
    return /\S+@\S+\.\S+/.test(x);
  }

  // Checking if an email exists in the DB already, if not user can progress to next step in onboarding
  // then saves user's email, first name & password
  const email_exists = async ({navigation}) => {
    setEmail(email);
    console.log('************** posting data to API starting **************');
    //'http://127.0.0.1:8000/api/user_exists/' << old
    const url = domain + 'api/user_exists/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    try {
      var json = await response.json();
      if (json == 'exists') {
        console.log(json);
        setError('This email exists already');
      } else {
        console.log(json);
        setError(null);
        setFirstName(firstName);
        setPassword(password);
        console.log(firstName + ' --- ' + email + ' --- ' + password + ' --- ');
        //navigation.push('Sign up 2');
        navigation.push('Verify Email');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  //submitRegForm1 = ({firstName,email,password,confirmPassword,navigation,})
  // SubmitRegForm1 checks whether the user's first name, email & password are acceptable
  //then checks if their email already exists in the DB using email_exists() function above
  const submitRegForm1 = ({navigation}) => {
    if (firstName.length < 2) {
      setError('Your first name is required');
    } else if (!isValidEmail(email)) {
      setError('Email is invalid');
    } else if (password.length < 8) {
      setError('Password should be min 8 characters');
    } else if (confirmPassword.length == 0) {
      setError('Confirm Password is a required feild');
    } else if (password !== confirmPassword) {
      setError('Password and confirm password should match.');
    } else {
      //email_exists({navigation});
      get_verification_code({navigation});
      //setError(null);
      //setFirstName(firstName);
      //setEmail(email);
      //setPassword(password);
      //console.log(firstName + ' --- ' + email + ' --- ' + password + ' --- ');
      //navigation.push('Sign up 2');
    }
  };

  // SubmitRegForm2 checks whether the users gender, ethnicity, dob etc are acceptable then saves them
  const submitGenderLocation = async ({navigation}) => {
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );

    if (gender.length == 0) {
      setError('Your gender is required');
    } else if (ethnicity.length == 0) {
      setError('Your ethnicity is required');
    } else if (dob.toDateString() == today.toDateString()) {
      setError('Your date of birth is required');
    } else if (country.length == 0) {
      setError('Your country is required');
    } else if (city.length == 0) {
      setError('Your city is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          dob: formatDate(dob),
          gender: gender,
          ethnicity: ethnicity,
          country: country,
          city: city,
          role: role,
          company: company,
        }),
      });

      try {
        var json = await response.json();
        console.log(json);
        navigation.push('Sign up occupation');
        setError(null);
      } catch (issue) {
        console.log(issue);
        setError('Problem please contact us');
      }
    }
  };

  // SubmitRegForm1 checks whether the users role & company are acceptable then saves them
  const submitCompanyOrUni = async (navigation, page) => {
    console.log('***** STUDENT STATUS ***** --->> ' + student);
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    var companyOrUniBody = '';
    if (!student) {
      console.log('role.length --->  ' + role.length);
      if (role.length == 0) {
        setError('Your role is required');
      } else if (company.length == 0) {
        setError('Your company is required');
      } else {
        setError(null);
        console.log(' ***** ' + role + ' --- ' + company + ' --- ' + ' ***** ');
        companyOrUniBody = JSON.stringify({
          email: email,
          role: role,
          company: company,
          university: university,
          course: course,
          year: year,
          student: false,
        });
        const url = domain + 'api/update-user/' + email + '/';
        let response = await fetch(url, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + access_token, //accessToken,
          },
          body: companyOrUniBody,
        });
        try {
          var json = await response.json();
          console.log(json);
          if (page == 'edit profile') {
            navigation.goBack();
          } else {
            navigation.push('Sign up interests');
          }
        } catch (issue) {
          console.log(issue);
          setError('Problem please contact us');
        }
      }
    } else if (student) {
      console.log('university.length --->  ' + university.length);
      if (university.length == 0) {
        setError('Your university is required');
      } else if (course.length == 0) {
        setError('Your course is required');
      } else if (year.length == 0) {
        setError('Your year is required');
      } else {
        setError(null);
        console.log(
          university + ' ---' + course + ' ---' + year + ' ---' + student,
        );
        companyOrUniBody = JSON.stringify({
          email: email,
          role: 'Student',
          company: company,
          university: university,
          course: course,
          year: year,
          student: true,
        });
        const url = domain + 'api/update-user/' + email + '/';
        let response = await fetch(url, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + access_token, //accessToken,
          },
          body: companyOrUniBody,
        });
        try {
          var json = await response.json();
          console.log(json);
          if (page == 'edit profile') {
            navigation.goBack();
          } else {
            navigation.push('Sign up interests');
          }
        } catch (issue) {
          console.log(issue);
          setError('Problem please contact us');
        }
      }
    }
  };

  // SubmitRegForm4 checks whether user has picked at least one interest and one open to
  // then if so saves interests and open to
  const submitInterests = async ({navigation}) => {
    console.log('******** updating interests data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (
      music == 0 &&
      travelling == 0 &&
      sport == 0 &&
      gaming == 0 &&
      reading == 0 &&
      business == 0 &&
      investing == 0 &&
      christianity == 0 &&
      islam == 0 &&
      hinduism == 0 &&
      sikhism == 0 &&
      judaism == 0 &&
      buddhism == 0
    ) {
      setError('Pick at least 1 interest');
      console.loh('***** ERROR *****');
    } else {
      const interests_db = [];
      let i = 0;
      while (i < interests_bool.length) {
        if (interests_bool[i] == true) {
          interests_db.push(interests[i]);
        }
        i++;
      }
      const url = domain + 'api/my-interests/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          interests: interests_db,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.push('Sign up open to');
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  const submitOpenTo = async ({navigation}) => {
    console.log('******** updating Open To data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (
      meetingPeople == 0 &&
      travelBuddy == 0 &&
      gymBuddy == 0 &&
      studyBuddy == 0 &&
      mentoring == 0 &&
      angelInvesting == 0 &&
      cofounding == 0
    ) {
      setError("Pick at least 1 thing you're open to");
    } else {
      setError(null);
      const open_tos_db = [];
      let j = 0;
      while (j < open_tos_bool.length) {
        if (open_tos_bool[j] == true) {
          open_tos_db.push(open_tos[j]);
        }
        j++;
      }
      const url = domain + 'api/my-open-tos/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          open_tos: open_tos_db,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.push('Sign up events');
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  const submitEventCategories = async ({navigation}) => {
    console.log('******** updating Open To data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (
      clubbing == 0 &&
      brunches == 0 &&
      festivals == 0 &&
      concerts == 0 &&
      gameNight == 0 &&
      entrepreneurial == 0 &&
      networking == 0 &&
      career == 0 &&
      conferences == 0
    ) {
      setError("Pick at least 1 event category you're interested");
    } else {
      setError(null);
      const events_db = [];
      let j = 0;
      while (j < events_bool.length) {
        if (events_bool[j] == true) {
          events_db.push(events[j]);
        }
        j++;
      }
      const url = domain + 'api/my-events-categories/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          event_categories: events_db,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.push('Sign up QA');
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  // SubmitQA checks whether the user has answered at least three questions
  // then if so saves them
  const submitQA = async ({navigation}) => {
    console.log('******** updating Q&A data via API starting ********');
    const qas = [];
    const answeredQs = [];

    let i = 0;
    while (i < answers.length) {
      if (answers[i].length > 15) {
        answeredQs.push(answers[i]);
      }
      i++;
    }

    if (answeredQs.length < 3) {
      setError(
        'Answer at least 3 questions \n An answer must have at least 15 characters',
      );
    } else {
      setError(null);
      let k = 0;
      while (k < answers.length) {
        if (answers[k].length > 15) {
          qas.push([questions[k], answers[k]]);
        }
        k++;
      }

      let access_token = await isTokenExpired();
      console.log(
        '  *** access_token ***  ' + access_token, //accessToken,
      );
      console.log(
        '************** posting user QA data to API starting **************',
      );
      const url = domain + 'api/my-qas/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          qas: qas,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          navigation.push('Sign up photos');
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  // SubmitPhotos saves user's photos
  const submitPhotos = async ({navigation, http_type}) => {
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (image1 == false || image2 == false || image3 == false) {
      setError('Upload at least 3 photos');
    } else {
      setError(null);
      //registerUser({navigation});  << this should be uncommented it.. commented it to test image upload only
      const all_images = [image1, image2, image3];
      const all_image_ids = [avatarId, image1Id, image2Id];
      const image_types = ['Avatar', 'Image1', 'Image2'];
      var i = 0;
      all_images.forEach(async function (image, index) {
        i = i + 1;
        console.log('iiiiii image -> ' + i + ' : ' + JSON.stringify(image));
        console.log('iiiiii -> ' + i);
        const form = new FormData();
        form.append('user', email);
        form.append('image', {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
        form.append('type', image_types[index]);
        console.log('form -> ' + i + ' : ' + JSON.stringify(form));
        var url = '';
        var headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        };
        if (http_type == 'PATCH') {
          url = domain + 'api/user-photos/' + all_image_ids[index] + '/';
        } else if (http_type == 'POST') {
          url = domain + 'api/user-photos/';
        }
        if (!image.uri.includes('say-hi-app.s3')) {
          console.log(
            ' submitPhotos response -> ' +
              i +
              ' url : ' +
              JSON.stringify(url) +
              ' http_type : ' +
              http_type +
              ' headers : ' +
              JSON.stringify(headers) +
              ' body : ' +
              JSON.stringify(form),
          );
          if (image == image1) {
            console.log('imageeeee 1');
            setImage1Loading(true);
          } else if (image == image2) {
            setImage2Loading(true);
            console.log('imageeeee 2');
          } else if (image == image3) {
            setImage3Loading(true);
            console.log('imageeeee 3');
          }
          let response = await fetch(url, {
            method: http_type,
            headers: headers,
            body: form,
          });
          try {
            var json = await response.json(); //.text()
            console.log('json ->> ' + json);
            //getPhotos();
            getPhotos()
              .then(response => response.json())
              .then(json_response => {
                setImage1({uri: json_response.avatar});
                setImage2({uri: json_response.image1});
                setImage3({uri: json_response.image2});
              })
              .then(() => {
                setTimeout(() => {
                  if (image == image1) {
                    console.log('imageeeee 1');
                    setImage1Loading(false);
                  } else if (image == image2) {
                    setImage2Loading(false);
                    console.log('imageeeee 2');
                  } else if (image == image3) {
                    setImage3Loading(false);
                    console.log('imageeeee 3');
                  }
                }, 1500);
              });
          } catch (issue) {
            if (image == image1) {
              console.log('imageeeee 1');
              setImage1Loading(false);
            } else if (image == image2) {
              setImage2Loading(false);
              console.log('imageeeee 2');
            } else if (image == image3) {
              setImage3Loading(false);
              console.log('imageeeee 3');
            }
            console.log('issue ->> ' + issue);
            setError(issue);
          }
        }
      });

      if (i == all_images.length && http_type == 'PATCH') {
        console.log('iiiiii = all_images.length -> ' + all_images.length);

        navigation.goBack();
      } else if (i == all_images.length && http_type == 'POST') {
        setProfileCreated(true);
        submitProfileCreated();
        navigation.push('Login');
      }
    }
  };

  // registerUser finally submits all the user's onboarding info to the DB
  const registerUser = async ({navigation, http_type}) => {
    console.log('*** starting register user function ***');
    console.log(formatDate(dob));

    const qas = [];
    const interests_db = [];
    const open_tos_db = [];

    let i = 0;
    while (i < interests_bool.length) {
      if (interests_bool[i] == true) {
        interests_db.push(interests[i]);
      }
      i++;
    }

    let j = 0;
    while (j < open_tos_bool.length) {
      if (open_tos_bool[j] == true) {
        open_tos_db.push(open_tos[j]);
      }
      j++;
    }

    let k = 0;
    while (k < answers.length) {
      if (answers[k].length > 15) {
        qas.push([questions[k], answers[k]]);
      }
      k++;
    }
    console.log('************** posting data to API starting **************');
    const url = domain + 'api/register/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          first_name: firstName,
          dob: formatDate(dob),
          gender: gender,
          ethnicity: ethnicity,
          country: country,
          city: city,
          role: role,
          company: company,
          profileCreated: true,
        },
        interests: interests_db,
        open_tos: open_tos_db,
        qas: qas,
      }),
    });

    try {
      var json = await response.json();
      console.log(json);
      setError(null);
      submitPhotos({navigation: navigation, http_type: http_type});
      //navigation.push('Login');
    } catch (issue) {
      console.log(issue);
      setError('Problem please contact us');
    }
  };

  //send the user a verification code to their email - during onboarding
  const send_verification_code_again = async () => {
    setEmail(email);
    console.log('************** posting data to API starting **************');
    const url = domain + 'api/send_verification_email_again/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {email: email, password: password, first_name: firstName},
      }),
    });

    try {
      var json = await response.json();
      if (json.length == 5) {
        console.log('JSONNNNN  ->> ' + json);
        setError(null);
        Alert.alert('Verification code sent to your email - ' + email);
        //setError(null);
      } else {
        console.log(json);
        setError('User with this email does not exist ');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  //send the user a verification code to their email - during onboarding
  const get_verification_code = async ({navigation}) => {
    setEmail(email);
    console.log('************** posting data to API starting **************');
    const url = domain + 'api/verification_email/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {email: email, password: password, first_name: firstName},
      }),
    });

    try {
      var json = await response.json();
      if (json.length == 5) {
        console.log(json);
        setError(null);
        Alert.alert('Verification code sent to your email - ' + email);
        navigation.push('Verify Email');
        //setError(null);
      } else {
        console.log(json);
        setError('User with this email already exists ');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  //send the user a verification code to their email - when user forgets their password
  const get_verification_code_fp = async ({navigation}) => {
    setEmail(email);
    console.log('************** posting data to API starting **************');
    const url = domain + 'api/verification_email/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    try {
      var json = await response.json();
      if (json.length == 5) {
        console.log(json);
        setError(null);
        Alert.alert('Verification code sent to your email - ' + email);
        navigation.push('Verify Email FP');
        //setError(null);
      } else {
        console.log(json);
        setError('User with this email does not exist ');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  //checks whether the verification code the user enters is correct
  // if so they are then sent to the login page to login
  const validate_verification_code = async ({navigation}) => {
    let final_verification_code =
      verificationCode.one +
      verificationCode.two +
      verificationCode.three +
      verificationCode.four +
      verificationCode.five;
    console.log(final_verification_code);
    console.log('************** posting data to API starting **************');
    const url = domain + 'api/verify_confirmation_code/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        verification_code: final_verification_code,
      }),
    });

    try {
      var json = await response.json();
      if (json.status == 'verified') {
        console.log('***** VERIFIED ****');
        setIsVerified(true);
        setError(null);
        setId(json.id);
        Alert.alert(
          'Verification code is correct please continue creating an account',
        );
        getToken();
        navigation.push('Sign up gender location');
      } else {
        console.log(json);
        setError('Verification code is incorrect please try again');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  //checks whether the verification code the user enters is correct - when user forgets password
  // if so they are then sent to the reset password page
  const validate_verification_code_FP = async ({navigation}) => {
    let final_verification_code =
      verificationCode.one +
      verificationCode.two +
      verificationCode.three +
      verificationCode.four +
      verificationCode.five;
    console.log(final_verification_code);
    console.log('************** posting data to API starting **************');
    const url = domain + 'api/verify_confirmation_code/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        verification_code: final_verification_code,
      }),
    });

    try {
      var json = await response.json();
      if (json == 'verified') {
        setIsVerified(true);
        setError(null);
        setPassword(null);
        setConfirmPassword(null);
        //Alert.alert('Verification code is correct please enter your new password');
        navigation.push('Reset Password');
      } else {
        console.log(json);
        setError('Verification code is incorrect please try again');
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  // checks new password is acceptable then submits to the DB
  const reset_password = async ({navigation}) => {
    if (password.length < 8) {
      setError('Password should be min 8 characters');
    } else if (confirmPassword.length == 0) {
      setError('Confirm Password is a required feild');
    } else if (password !== confirmPassword) {
      setError('Password and confirm password should match.');
    } else {
      setError(null);
      console.log('************** posting data to API starting **************');
      const url = domain + 'api/reset_password/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      try {
        var json = await response.json();
        if (json == 'password changed successfully') {
          console.log(json);
          Alert.alert('password changed successfully please log in');
          navigation.push('Login');
        } else {
          console.log(json);
          setError('Problem please try again');
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  // Login gets the logged in user's token with their email and password
  const login = async ({navigation}) => {
    await Keychain.resetGenericPassword();
    getToken();
    getUserData({navigation});
    console.log('login');
    get_notif_ids(email)
      .then(data => data.json())
      .then(data => {
        console.log('get_notif_ids   ->>' + get_notif_ids);
        setChatNotif(data.message_ids);
        setSayHiNotif(data.say_hi_ids);
      })
      .then(console.log('get_notif_ids done'))
      .catch(() => console.log('get_notif_ids promise error'));
    getSubscriptionPlan();
    setLoggedIn(true);
    setImage1Loading(false);
    setImage2Loading(false);
    setImage3Loading(false);
  };

  // Logout updates the user data to default
  const logout = async () => {
    await Keychain.resetGenericPassword();
    setUserAuth(false);
    setAccessToken(undefined);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        submitRegForm1,
        submitGenderLocation,
        submitCompanyOrUni,
        submitInterests,
        submitOpenTo,
        submitEventCategories,
        submitQA,
        submitPhotos,
        registerUser,
        verificationCode,
        get_verification_code_fp,
        validate_verification_code,
        validate_verification_code_FP,
        reset_password,
        isVerified,
        setIsVerified,
        setVerificationCode,
        get_verification_code,
        login,
        logout,
        getAge,
        profileType,
        setProfileType,
        send_verification_code_again,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
