import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import MainMenu from './views/mainMenu/MainMenu';
import Amrap from './views/amrap/Amrap';

type RootStackParamList = {
  Home: undefined;
  Amrap: undefined;
};

export type AmrapProps = NativeStackScreenProps<RootStackParamList, 'Amrap'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
