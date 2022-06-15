import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import RoundButton from '../mainMenu/RoundButton';

import moment from 'moment';

import {TimerProps} from '../../App';
import {Pressable} from 'react-native';
import {useState} from 'react';

//lo de agregar los lapzos sale al minuto 51

const Timer = ({route}: TimerProps) => {
  const [time] = useState(new Date().getTime()); //useState(route.params.interval);
  const colorText = route.params.colorText;
  const [duration, setDuration] = useState(moment.duration(time));
  const [showStop, setShowStop] = useState(false);
  const [intervalID, setIntervalId] = useState<NodeJS.Timer>();

  function StartFunction() {
    setShowStop(true);
    const newIntervalId = setInterval(() => {
      console.log('se ecjecuta lo del tiempo');
      setDuration(moment.duration(new Date().getTime()));
    }, 1000);
    setIntervalId(newIntervalId);
  }

  const PauseFunction = () => {
    setShowStop(false);
    clearInterval(intervalID);
    setIntervalId(0);
    console.log('se detiene');
    //setIsRunnig(false);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={{...styles.timer, color: colorText}}>
        {duration.minutes()}:{duration.seconds()}
      </Text>
      {!showStop ? (
        <Pressable style={styles.startStyle} onPress={() => StartFunction()}>
          <RoundButton title="start" color="white" background={colorText} />
        </Pressable>
      ) : (
        <Pressable style={styles.pauseStyle} onPress={() => PauseFunction()}>
          <RoundButton title="pause" color="white" background="red" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 100,
  },
  startStyle: {width: 60, height: 60},
  pauseStyle: {width: 70, height: 70},
  timer: {
    fontSize: 40,
    fontWeight: '500',
    backgroundColor: 'white',
  },
});

export default Timer;