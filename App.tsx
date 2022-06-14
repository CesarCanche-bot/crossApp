import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import MainMenu from './views/mainMenu/MainMenu';
import Amrap from './views/amrap/Amrap';
import Timer from './views/timer/Timer';

type RootStackParamList = {
  Home: undefined;
  Amrap: undefined;
  Timer: {interval: number; colorText: string; title: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type MainMenuProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TimerProps = NativeStackScreenProps<RootStackParamList, 'Timer'>;

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
          options={{title: '', headerTransparent: true}}
        />
        <Stack.Screen
          name="Timer"
          component={Timer}
          options={({route}) => ({
            title: route.params.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
