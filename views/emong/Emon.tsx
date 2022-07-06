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
import moment from 'moment';

import {EmonProps} from '../../App';
import TimersComponent from '../timer/TimersComponent';
import RoundButton from '../mainMenu/RoundButton';

const Emon = ({route}: EmonProps) => {
  let colorText = route.params.colorText;
  const initialSecondsIncress = 15;
  const initialSecondsIncess2 = 30;
  const initialSecondsForIncress2 = 180;
  const initialSecondsIncress3 = 60;
  const initialSecondsForIncress3 = 300;
  const [indexTimerSelected, setIndexTimerSelected] = useState(3);
  const laps = [...Array(23).keys()].map(i =>
    i <= 11
      ? {
          timer: (initialSecondsIncress * (i + 1)).toString(),
          label: 'minutes',
          timerString: 'PT' + initialSecondsIncress * (i + 1) + 'S',
        }
      : i > 11 && i <= 15
      ? {
          timer: (
            initialSecondsIncess2 * (i - 11) +
            initialSecondsForIncress2
          ).toString(),
          label: 'minutes',
          timerString:
            'PT' +
            (initialSecondsIncess2 * (i - 11) + initialSecondsForIncress2) +
            'S',
        }
      : {
          timer: (
            initialSecondsIncress3 * (i - 15) +
            initialSecondsForIncress3
          ).toString(),
          label: 'minutes',
          timerString:
            'PT' +
            (initialSecondsIncress3 * (i - 15) + initialSecondsForIncress3) +
            'S',
        },
  );
  const [rounds] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRounds, setModalRounds] = useState(false);

  console.log('laps', laps);
  const [title] = useState(
    moment.duration(laps[indexTimerSelected].timerString),
  );

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={require('../../src/img/3.jpg')}>
      <View
        style={{
          backgroundColor: Config.transparencyViews.code,
          ...styles.mainView,
        }}>
        <Text style={styles.title}>EMON</Text>
        <Text style={styles.subTitle}>
          Every {title.minutes()}:{title.seconds()}{' '}
          {laps[indexTimerSelected].label}
          {' for '}
          {rounds}
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
              {title.minutes()}:{title.seconds()}
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
              {rounds}
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredModalView}>
            <Text style={{...styles.timerSeleccted, color: colorText}}>
              {title.minutes()}:{title.seconds()}
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
                <RoundButton title="OK" color="white" background="#31A9B8" />
              </View>
            </Pressable>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default Emon;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  mainView: {flex: 1, alignItems: 'center'},
  title: {
    fontSize: 60,
    fontWeight: '700',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
    marginTop: '15%',
  },
  subTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  selectTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '57%',
    marginTop: '5%',
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
});
