import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import MainMenu from './views/mainMenu/MainMenu';
import Amrap from './views/amrap/Amrap';
import Timer from './views/timer/Timer';
import ForTime from './views/forTime/ForTime';
import TimerForTime from './views/timer/TimerForTime';
import Emon from './views/emong/Emon';
import TimerEmon from './views/emong/TimerEmon';

type RootStackParamList = {
  Home: undefined;
  Amrap: {colorText: string};
  Timer: {interval: string; colorText: string; title: string};
  ForTime: {colorText: string};
  Emon: {colorText: string};
  TimerForTime: {interval: string; colorText: string; title: string};
  TimerEmon: {
    interval: string;
    round: number;
    colorText: string;
    title: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type MainMenuProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;
export type AmrapProps = NativeStackScreenProps<RootStackParamList, 'Amrap'>;
export type EmonProps = NativeStackScreenProps<RootStackParamList, 'Emon'>;
export type ForTimeProps = NativeStackScreenProps<
  RootStackParamList,
  'ForTime'
>;
export type TimerForTimeProps = NativeStackScreenProps<
  RootStackParamList,
  'TimerForTime'
>;
export type TimerEmonProps = NativeStackScreenProps<
  RootStackParamList,
  'TimerEmon'
>;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MainMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Amrap"
          component={Amrap}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Timer"
          component={Timer}
          options={({route}) => ({
            title: route.params.title,
            headerTransparent: true,
            headerTintColor: '#fff',
          })}
        />
        <Stack.Screen
          name="ForTime"
          component={ForTime}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Emon"
          component={Emon}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="TimerForTime"
          component={TimerForTime}
          options={({route}) => ({
            title: route.params.title,
            headerTransparent: true,
            headerTintColor: '#fff',
          })}
        />
        <Stack.Screen
          name="TimerEmon"
          component={TimerEmon}
          options={({route}) => ({
            title: route.params.title,
            headerTransparent: true,
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
