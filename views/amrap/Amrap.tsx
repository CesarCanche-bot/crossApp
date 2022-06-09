import React, {useState} from 'react';
import {Text, Pressable, Modal} from 'react-native';
import {View, StyleSheet} from 'react-native';

import {TimerProps} from '../../App';

const DataTimerPicker = [
  '00:20',
  '00:30',
  '00:45',
  '01:00',
  '01:15',
  '01:30',
  '01:45',
  '02:00',
];

const Amrap = ({navigation}: TimerProps) => {
  const [minutes] = useState(0.2);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>AMRAP</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>As many rounds as posible in:</Text>
        <Text style={styles.timerContainer}>
          <Pressable
            style={styles.minutesContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.timerText}>{minutes}</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.timerText}>minutes</Text>
          </Pressable>
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredModalView}>
            <View style={styles.modalView}>
              <Text>modal</Text>
              <Pressable>
                <Text>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.startTimerContainer}>
        <Pressable
          style={styles.startTimerButton}
          onPress={() => navigation.push('Timer')}>
          <Text style={styles.startTimerText}>START TIMER</Text>
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
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timerContainer: {
    backgroundColor: 'red',
    marginTop: '3%',
    alignItems: 'center',
    textAlign: 'center',
  },
  minutesContainer: {
    backgroundColor: 'yellow',
  },
  startTimerButton: {
    backgroundColor: '#31A9B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  startTimerContainer: {
    backgroundColor: 'black',
    marginTop: '70%',
    height: '9%',
  },
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
