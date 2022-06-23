import React from 'react';
import {
  ImageBackground,
  View,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {MainMenuProps} from '../../App';

const MainMenu = ({navigation}: MainMenuProps) => {
  const handlerB1 = () => {
    navigation.push('Amrap', {colorText: '#31A9B8'});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={require('../../src/img/1.jpg')}
        style={styles.img}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text style={styles.title}>WOD</Text>
            <Text style={styles.titleTimer}>TIMER</Text>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {height: '100%'},
  title: {
    fontFamily: 'Cochin',
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    marginTop: '50%',
    textAlign: 'center',
  },
  titleTimer: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    color: 'white',
    marginBottom: '5%',
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
  img: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MainMenu;
