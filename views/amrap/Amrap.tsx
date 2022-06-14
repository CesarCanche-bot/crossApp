import React, {useState} from 'react';
import {Text, Pressable, Modal} from 'react-native';
import {View, StyleSheet, ScrollView} from 'react-native';

import RoundButton from '../mainMenu/RoundButton';

import {TimerProps} from '../../App';

const Data = {
  timer: '01:05:05.33',
  laps: [
    {timer: 20, label: '20 seconds'},
    {timer: '00:30', label: 'seconds'},
    {timer: '00:45', label: 'seconds'},
    {timer: '1', label: 'minute'},
    {timer: '1:15', label: 'minutes'},
    {timer: '1:30', label: 'minutes'},
    {timer: '1:45', label: 'minutes'},
    {timer: '2', label: 'minutes'},
    {timer: '2:10', label: 'minutes'},
    {timer: '2:30', label: 'minutes'},
    {timer: '00:02:45', label: 'minutes'},
    {timer: '00:03:00', label: 'minutes'},
    {timer: '00:03:30', label: 'minutes'},
    {timer: '00:04:00', label: 'minutes'},
    {timer: '00:04:30', label: 'minutes'},
    {timer: '5', label: 'minutes'},
    {timer: '00:06:00', label: 'minutes'},
    {timer: '00:07:00', label: 'minutes'},
    {timer: '00:08:00', label: 'minutes'},
    {timer: '00:09:00', label: 'minutes'},
    {timer: '00:10:00', label: 'minutes'},
    {timer: '00:11:00', label: 'minutes'},
    {timer: '00:12:00', label: 'minutes'},
    {timer: '00:13:00', label: 'minutes'},
    {timer: '00:14:00', label: 'minutes'},
    {timer: '00:15:00', label: 'minutes'},
    {timer: '00:16:00', label: 'minutes'},
    {timer: '00:17:00', label: 'minutes'},
    {timer: '00:18:00', label: 'minutes'},
    {timer: '00:19:00', label: 'minutes'},
    {timer: '00:20:00', label: 'minutes'},
    {timer: '00:21:00', label: 'minutes'},
    {timer: '00:22:00', label: 'minutes'},
    {timer: '00:23:00', label: 'minutes'},
    {timer: '00:24:00', label: 'minutes'},
    {timer: '00:25:00', label: 'minutes'},
    {timer: '00:26:00', label: 'minutes'},
    {timer: '00:27:00', label: 'minutes'},
    {timer: '00:28:00', label: 'minutes'},
    {timer: '00:29:00', label: 'minutes'},
    {timer: '00:30:00', label: 'minutes'},
    {timer: '00:31:00', label: 'minutes'},
    {timer: '00:32:00', label: 'minutes'},
    {timer: '00:33:00', label: 'minutes'},
    {timer: '00:34:00', label: 'minutes'},
    {timer: '00:35:00', label: 'minutes'},
    {timer: '00:36:00', label: 'minutes'},
    {timer: '00:37:00', label: 'minutes'},
    {timer: '00:38:00', label: 'minutes'},
    {timer: '00:39:00', label: 'minutes'},
    {timer: '00:40:00', label: 'minutes'},
    {timer: '00:41:00', label: 'minutes'},
    {timer: '00:43:00', label: 'minutes'},
    {timer: '00:44:00', label: 'minutes'},
    {timer: '00:45:00', label: 'minutes'},
    {timer: '00:46:00', label: 'minutes'},
    {timer: '00:47:00', label: 'minutes'},
    {timer: '00:48:00', label: 'minutes'},
    {timer: '00:49:00', label: 'minutes'},
    {timer: '00:50:00', label: 'minutes'},
  ],
};

type LapProps = {
  index: Number;
  interval: {timer: number; label: string};
  setIndexTimerSelected: Function;
};

function Lap({index, interval, setIndexTimerSelected}: LapProps) {
  return (
    <Pressable style={styles.lap} onPress={() => setIndexTimerSelected(index)}>
      <Text style={styles.lapText}>{interval.timer}</Text>
      <Text style={styles.lapText}>{interval.label}</Text>
    </Pressable>
  );
}

type LapTableProps = {
  laps: {timer: string; label: string}[];
  setIndexTimerSelected: Function;
};
function LapTable({laps, setIndexTimerSelected}: LapTableProps) {
  return (
    <ScrollView>
      {laps.map((lap, index) => (
        <Lap
          index={index + 1}
          interval={lap}
          key={index}
          setIndexTimerSelected={setIndexTimerSelected}
        />
      ))}
    </ScrollView>
  );
}

const Amrap = ({navigation}: TimerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [indexTimerSelected, setIndexTimerSelected] = useState(15);
  console.log(
    'index selecionado',
    indexTimerSelected + ' ' + Data.laps[indexTimerSelected].timer,
  );
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>AMRAP</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>As many rounds as posible in:</Text>
        <View style={styles.timerContainer}>
          <Pressable
            style={styles.minutesContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.timerText}>
              {Data.laps[indexTimerSelected].timer}
            </Text>
          </Pressable>
          <Pressable>
            <Text style={styles.timerText}>
              {' '}
              {Data.laps[indexTimerSelected].label}
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredModalView}>
            <View style={styles.modalView}>
              <LapTable
                laps={Data.laps}
                setIndexTimerSelected={setIndexTimerSelected}
              />
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.startTimerContainer}>
        <Pressable
          style={styles.startTimerButton}
          onPress={() =>
            navigation.navigate('Timer', {
              interval: Data.laps[indexTimerSelected].timer,
              colorText: '#31A9B8',
              title: 'AMRAP',
            })
          }>
          <RoundButton title="Start Timer" color="black" background="#31A9B8" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {marginTop: '40%', backgroundColor: 'white', height: '100%'},
  contentContainer: {marginTop: '20%'},
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'blue',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '35%',
    width: '70%',
  },
  timerContainer: {
    backgroundColor: 'red',
    marginTop: '3%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '25%',
    flexDirection: 'row',
  },
  minutesContainer: {
    backgroundColor: 'yellow',
  },
  startTimerButton: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  startTimerContainer: {
    backgroundColor: 'black',
    marginTop: '70%',
    height: '9%',
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    marginVertical: 2,
    width: '70%',
  },
  lapText: {fontSize: 20},
  startTimerText: {fontSize: 40},
  timerText: {color: 'black', fontSize: 35, fontWeight: '500'},
  contentText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '700',
  },
});

export default Amrap;
