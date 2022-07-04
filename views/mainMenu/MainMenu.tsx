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

import Config from '../../src/config.json';

const MainMenu = ({navigation}: MainMenuProps) => {
  const handlerB1 = () => {
    navigation.push('Amrap', {colorText: Config.colorsMenuOptions.Amrap});
  };

  const handlerForTme = () => {
    navigation.push('ForTime', {colorText: Config.colorsMenuOptions.ForTime});
  };

  const handleEmong = () => {
    navigation.push('Emong', {colorText: Config.colorsMenuOptions.Emong});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        source={require('../../src/img/3.jpg')}
        style={styles.img}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{backgroundColor: Config.transparencyViews.code}}>
          <View>
            <Text style={styles.title}>WOD</Text>
            <Text style={styles.titleTimer}>TIMER</Text>
            <View style={styles.buttonMainMenuContainer}>
              <Pressable
                style={{
                  ...styles.buttonsMenu,
                  backgroundColor: Config.colorsMenuOptions.Amrap,
                }}
                onPress={() => handlerB1()}>
                <Text style={styles.option}>AMRAP</Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={{
                  ...styles.buttonsMenu,
                  backgroundColor: Config.colorsMenuOptions.ForTime,
                }}
                onPress={() => handlerForTme()}>
                <Text style={styles.option}>FOR TIME</Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={{
                  ...styles.buttonsMenu,
                  backgroundColor: Config.colorsMenuOptions.Emong,
                }}
                onPress={() => handleEmong()}>
                <Text style={styles.option}>EMONG</Text>
              </Pressable>
            </View>
            <View
              style={{
                ...styles.buttonsMenu,
                backgroundColor: Config.colorsMenuOptions.Tabata,
              }}>
              <Pressable>
                <Text style={styles.option}>TABATA</Text>
              </Pressable>
            </View>
            <View
              style={{
                ...styles.buttonsMenu,
                backgroundColor: Config.colorsMenuOptions.Mix,
              }}>
              <Pressable>
                <Text style={styles.option}>MIX</Text>
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
  option: {fontSize: 25, fontWeight: '700'},
  buttonsMenu: {
    marginBottom: '5%',
    marginHorizontal: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MainMenu;
