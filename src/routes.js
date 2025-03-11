import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

const isIOS = DeviceInfo.getSystemName() === 'iOS';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './pages/Home';

/** User */
import SignIn from './pages/User/SignIn';

/** DSS */
import Dss from './pages/Dss';
import DssList from './pages/Dss/DssList';
import Questions from './pages/Dss/Questions';
import QuestionsSolved from './pages/Dss/QuestionsSolved';

/** CHecklist */
import ChecklistList from './pages/Checklist';
import Checklist from './pages/Checklist/View';

/** Informatives*/
import Informative from './pages/Informative';
import ShowInformative from './pages/Informative/show';

/** Rotogram */
import Rotogram from './pages/Rotogram';
import ShowRotogram from './pages/Rotogram/show';

/** Guide*/
import Guide from './pages/Guide';
import ShowGuide from './pages/Guide/show';

/** Profile */
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const defaultScreenOptions = {
  headerTitleAlign: 'left',
  headerStyle: {backgroundColor: '#1583f2'},
  headerTintColor: '#FFF',
  headerBackTitleVisible: false,
  borderBottomWidth: 0,
  headerShown: !isIOS,
};

const defaultBottomTabOptions = {
  headerTitleAlign: 'center',
  headerStyle: {backgroundColor: '#1583f2', height: 0},
  headerBackTitleVisible: false,
  borderBottomWidth: 0,
  activeTintColor: '#1583f2',
  activeBackgroundColor: 'transparent',
  headerTintColor: '#1583f2',
  tabBarInactiveBackgroundColor: '#1583f2',
  tabBarActiveBackgroundColor: '#1583f2',
  tabBarStyle: {borderTopWidth: 0},
};

function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={Home.navigationOptions}
      />
      <Stack.Screen
        name="DssList"
        component={DssList}
        options={DssList.navigationOptions}
      />
      <Stack.Screen
        name="Dss"
        component={Dss}
        options={Dss.navigationOptions}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={Questions.navigationOptions}
      />
      <Stack.Screen
        name="QuestionsSolved"
        component={QuestionsSolved}
        options={QuestionsSolved.navigationOptions}
      />
      <Stack.Screen
        name="ChecklistList"
        component={ChecklistList}
        options={ChecklistList.navigationOptions}
      />
      <Stack.Screen
        name="Checklist"
        component={Checklist}
        options={Checklist.navigationOptions}
      />
      <Stack.Screen
        name="Informative"
        component={Informative}
        options={Informative.navigationOptions}
      />
      <Stack.Screen
        name="ShowInformative"
        component={ShowInformative}
        options={ShowInformative.navigationOptions}
      />
      <Stack.Screen
        name="Rotogram"
        component={Rotogram}
        options={Rotogram.navigationOptions}
      />
      <Stack.Screen
        name="ShowRotogram"
        component={ShowRotogram}
        options={ShowRotogram.navigationOptions}
      />
      <Stack.Screen
        name="Guide"
        component={Guide}
        options={Guide.navigationOptions}
      />
      <Stack.Screen
        name="ShowGuide"
        component={ShowGuide}
        options={ShowGuide.navigationOptions}
      />
    </Stack.Navigator>
  );
}

function ProfileScreen() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={Profile.navigationOptions}
      />
    </Stack.Navigator>
  );
}

function AuthScreen() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={SignIn.navigationOptions}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const signedIn = useSelector(state => state.auth.signed);
  const states = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Tabs.Navigator screenOptions={defaultBottomTabOptions}>
        {!signedIn ? (
          <>
            <Tabs.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{
                tabBarLabel: 'Início',
                tabBarStyle: {height: 0},
              }}
            />
          </>
        ) : (
          <>
            <Tabs.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Início',
                tabBarActiveTintColor: '#fff',
                tabBarIcon: () => (
                  <Icon name="home" size={20} color="rgba(255, 255, 255, 1)" />
                ),
              }}
            />
            <Tabs.Screen
              name="1"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Perfil',
                tabBarActiveTintColor: '#fff',
                tabBarIcon: () => (
                  <Icon
                    name="account"
                    size={20}
                    color="rgba(255, 255, 255, 1)"
                  />
                ),
              }}
            />
          </>
        )}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
