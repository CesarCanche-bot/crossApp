import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
  Modal,
} from 'react-native';

import Config from '../../src/config.json';
import {ForTimeProps} from '../../App';
import RoundButton from '../mainMenu/RoundButton';
import TimersComponent from '../timer/TimersComponent';

const ForTime = ({route, navigation}: ForTimeProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  let colorText = route.params.colorText;
  const [indexTimerSelected, setIndexTimerSelected] = useState<number>(1);
  const initialMinute = 4;
  const laps = [...Array(97).keys()].map(i =>
    i === 0
      ? {timer: 'No time cap', label: '', timerString: 'PT1000M'}
      : {
          timer: (initialMinute + i).toString(),
          label: 'minutes',
          timerString: 'PT' + (initialMinute + i) + 'M',
        },
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
        <View style={styles.groupTitle}>
          <Text style={styles.title}>For Time</Text>
          <Text style={styles.subtitle}>As fast as posible for time</Text>
        </View>
        <View style={styles.timeCap}>
          <Text style={styles.timeCapText}>Time Cap:</Text>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                ...styles.timeCapPressable,
                ...styles.timeCapText,
                borderColor: colorText,
              }}>
              {indexTimerSelected === 0
                ? 'none'
                : laps[indexTimerSelected].timer}
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredModalView}>
            <Text style={{...styles.timerSeleccted, color: colorText}}>
              {laps[indexTimerSelected].timer}
            </Text>
            <View style={styles.modalView}>
              <TimersComponent
                setIndexTimerSelected={setIndexTimerSelected}
                laps={laps}
              />
            </View>
            <Pressable
              style={styles.startTimerButtonModal}
              onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.ok}>
                <RoundButton title="OK" color="white" background="#31A9B8" />
              </View>
            </Pressable>
          </View>
        </Modal>
        <View style={styles.startTimerContainer}>
          <Pressable
            style={styles.startTimerButton}
            onPress={() =>
              navigation.navigate('TimerForTime', {
                interval: laps[indexTimerSelected].timerString,
                colorText: colorText,
                title: 'For Time',
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
  );
};

export default ForTime;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  mainView: {flex: 1, alignItems: 'center'},
  groupTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },
  title: {fontSize: 60, fontWeight: '700', color: '#fff', marginBottom: '35%'},
  subtitle: {
    fontSize: 31,
    fontWeight: '700',
    color: '#fff',
  },
  timeCap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '57%',
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
  startTimerButton: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '0%',
  },
  startTimerContainer: {
    height: '9%',
    width: '70%',
    marginTop: '60%',
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
  startTimerButtonModal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  ok: {width: 180, height: 60},
});
