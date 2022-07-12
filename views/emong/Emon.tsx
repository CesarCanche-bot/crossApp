import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import Config from '../../src/config.json';

import {EmonProps} from '../../App';
import RoundButton from '../mainMenu/RoundButton';
import TimersComponent from '../timer/TimersComponent';
import RoundsSelector from './RoundsSelector';

const Emon = ({route, navigation}: EmonProps) => {
  let colorText = route.params.colorText;
  const [indexTimerSelected, setIndexTimerSelected] = useState(3);
  const laps = [...Array(23).keys()].map(i => Config.laps[i]);
  const rounds = [...Array(12).keys()];

  const [round, setRound] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRounds, setModalRounds] = useState(false);

  return (
    <View style={styles.main}>
      <ImageBackground
        style={styles.mainContainer}
        source={require('../../src/img/3.jpg')}>
        <View
          style={{
            backgroundColor: Config.transparencyViews.code,
            ...styles.main,
          }}>
          <Text style={styles.title}>EMON</Text>
          <Text style={styles.subTitle}>
            Every {laps[indexTimerSelected].timer}
            {' minutes'}
            {' for '}
            {rounds[round] + 1}
          </Text>
          <View style={styles.selectTimes}>
            <Text style={styles.timeCapText}>Every</Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={{
                  ...styles.timeCapPressable,
                  ...styles.timeCapText,
                  borderColor: colorText,
                }}>
                {laps[indexTimerSelected].timer}
              </Text>
            </Pressable>
          </View>
          <View style={styles.selectTimes}>
            <Text style={styles.timeCapText}>For</Text>
            <Pressable onPress={() => setModalRounds(!modalRounds)}>
              <Text
                style={{
                  ...styles.timeCapPressable,
                  ...styles.timeCapText,
                  borderColor: colorText,
                }}>
                {rounds[round] + 1}X
              </Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.centeredModalView}>
              <Text style={{...styles.timerSeleccted, color: colorText}}>
                {Config.laps[indexTimerSelected].timer}
              </Text>
              <View style={styles.modalView}>
                <TimersComponent
                  setIndexTimerSelected={setIndexTimerSelected}
                  laps={laps}
                />
              </View>
              <Pressable
                style={styles.selectTimerButtonModal}
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.ok}>
                  <RoundButton
                    title="OK"
                    color="white"
                    background={Config.colorsMenuOptions.Emong}
                  />
                </View>
              </Pressable>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            visible={modalRounds}
            onRequestClose={() => setModalRounds(!modalRounds)}>
            <View style={styles.centeredModalView}>
              <Text style={{...styles.timerSeleccted, color: colorText}}>
                {rounds[round] + 1}
                {' X'}
              </Text>
              <View style={styles.modalView}>
                <RoundsSelector setRound={setRound} rounds={rounds} />
              </View>
              <Pressable
                style={styles.selectTimerButtonModal}
                onPress={() => setModalRounds(!modalRounds)}>
                <View style={styles.ok}>
                  <RoundButton
                    title="ok"
                    color="white"
                    background={Config.colorsMenuOptions.Emong}
                  />
                </View>
              </Pressable>
            </View>
          </Modal>
          <View style={styles.startTimerContainer}>
            <Pressable
              style={styles.startTimerButton}
              onPress={() =>
                navigation.navigate('TimerEmon', {
                  interval: laps[indexTimerSelected].timer,
                  colorText: colorText,
                  title: 'EMON',
                })
              }>
              <RoundButton
                title="START TIMER"
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

export default Emon;

const styles = StyleSheet.create({
  main: {flex: 1},
  mainContainer: {flex: 1, justifyContent: 'center'},
  mainView: {flex: 1, alignItems: 'center'},
  title: {
    fontSize: 60,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '10%',
    marginTop: '15%',
  },
  subTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  selectTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '57%',
    marginTop: '5%',
    alignSelf: 'center',
  },
  timeCapText: {
    fontSize: 35,
    fontWeight: '600',
    color: 'white',
    padding: 10,
  },
  timeCapPressable: {
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    textAlign: 'center',
  },
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'black',
  },
  timerSeleccted: {
    fontSize: 60,
    fontWeight: '800',
    marginBottom: '85%',
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
  selectTimerButtonModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  ok: {width: 180, height: 60},
  startTimerContainer: {
    marginTop: '30%',
    height: '9%',
  },
  startTimerButton: {
    height: '90%',
    justifyContent: 'center',
    marginHorizontal: '20%',
  },
});
