import React, {useState} from 'react';
import {Text, Pressable, Modal} from 'react-native';
import {View, StyleSheet, ImageBackground} from 'react-native';

import RoundButton from '../mainMenu/RoundButton';

import {AmrapProps} from '../../App';
import TimersComponent from '../timer/TimersComponent';

import Config from '../../src/config.json';

const Amrap = ({route, navigation}: AmrapProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colorText = route.params.colorText;
  const [indexTimerSelected, setIndexTimerSelected] = useState<number>(5);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../src/img/3.jpg')}
        style={styles.img}>
        <View
          style={{
            ...styles.mainContainer,
            backgroundColor: Config.transparencyViews.code,
          }}>
          <Text style={styles.title}>AMRAP</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              As many rounds as posible in:
            </Text>
            <View style={styles.timerContainer}>
              <Pressable
                style={{...styles.minutesContainer, borderColor: colorText}}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Text style={styles.timerText}>
                  {Config.laps[indexTimerSelected].timer}
                </Text>
              </Pressable>
              <Pressable>
                <Text style={styles.timerText}>
                  {' '}
                  {Config.laps[indexTimerSelected].label}
                </Text>
              </Pressable>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}>
              <View style={styles.centeredModalView}>
                <Text style={{...styles.timerSeleccted, color: colorText}}>
                  {Config.laps[indexTimerSelected].timer}
                </Text>
                <View style={styles.modalView}>
                  <TimersComponent
                    setIndexTimerSelected={setIndexTimerSelected}
                    laps={Config.laps}
                  />
                </View>
                <Pressable
                  style={styles.startTimerButtonModal}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.ok}>
                    <RoundButton
                      title="OK"
                      color="white"
                      background="#31A9B8"
                    />
                  </View>
                </Pressable>
              </View>
            </Modal>
          </View>
          <View style={styles.startTimerContainer}>
            <Pressable
              style={styles.startTimerButton}
              onPress={() =>
                navigation.navigate('Timer', {
                  interval: Config.laps[indexTimerSelected].timerString,
                  colorText: colorText,
                  title: 'AMRAP',
                })
              }>
              <RoundButton
                title="Start Timer"
                color="white"
                background={colorText}
              />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  contentContainer: {marginTop: '20%'},
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'black',
  },
  modalView: {
    flex: 1,
    position: 'absolute',
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#31A9B8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 50,
    height: '35%',
    width: '70%',
  },
  timerText: {color: 'white', fontSize: 35, fontWeight: '500', margin: 6},
  timerContainer: {
    marginTop: '3%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '25%',
    flexDirection: 'row',
  },
  contentText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: '12%',
  },
  minutesContainer: {
    borderRadius: 10,
    borderWidth: 3,
  },
  startTimerButton: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  startTimerButtonModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  startTimerContainer: {
    backgroundColor: 'black',
    marginTop: '30%',
    height: '9%',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '700',
    marginTop: '40%',
  },
  timerSeleccted: {
    fontSize: 60,
    fontWeight: '800',
    marginBottom: '85%',
  },
  ok: {width: 180, height: 60},
  img: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Amrap;
