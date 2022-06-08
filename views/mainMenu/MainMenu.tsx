import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AmrapProps} from '../../App';

const MainMenu = ({navigation}: AmrapProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlerB1 = () => {
    navigation.navigate('Amrap');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.title}>WOD timer</Text>
          <View style={styles.buttonMainMenuContainer}>
            <Pressable
              style={{...styles.buttonsMenu, ...styles.buttonsMenuColor1}}
              onPress={() => handlerB1()}>
              <Text>AMRAP</Text>
            </Pressable>
          </View>
          <View style={{...styles.buttonsMenu, ...styles.buttonsMenuColor2}}>
            <Pressable>
              <Text>FOR TIME</Text>
            </Pressable>
          </View>
          <View style={{...styles.buttonsMenu, ...styles.buttonsMenuColor3}}>
            <Pressable>
              <Text>EMONG</Text>
            </Pressable>
          </View>
          <View style={{...styles.buttonsMenu, ...styles.buttonsMenuColor4}}>
            <Pressable>
              <Text>TABATA</Text>
            </Pressable>
          </View>
          <View style={{...styles.buttonsMenu, ...styles.buttonsMenuColor5}}>
            <Pressable>
              <Text>MIX</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {height: '100%'},
  title: {
    fontFamily: 'Cochin',
    fontSize: 35,
    fontWeight: '600',
    marginTop: '30%',
    textAlign: 'center',
  },
  buttonMainMenuContainer: {
    marginTop: '30%',
  },
  buttonsMenu: {
    marginBottom: '10%',
    marginHorizontal: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  buttonsMenuColor1: {
    backgroundColor: '#31A9B8',
  },
  buttonsMenuColor2: {
    backgroundColor: '#063852',
  },
  buttonsMenuColor3: {
    backgroundColor: '#F0810F',
  },
  buttonsMenuColor4: {
    backgroundColor: '#9BC01C',
  },
  buttonsMenuColor5: {
    backgroundColor: '#EC96A4',
  },
});

export default MainMenu;
