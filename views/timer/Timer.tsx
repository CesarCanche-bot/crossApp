import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons';

import {TimerProps} from '../../App';

//lo de agregar los lapzos sale al minuto 51

const Timer = ({route}: TimerProps) => {
  const [timeProp] = useState(route.params.interval);
  console.log('tiempo inicial en props', timeProp);
  const colorText = route.params.colorText;
  const [duration, setDuration] = useState<moment.Duration | any>(
    moment.duration('00:10:30'),
  );
  console.log('duration', duration);
  const [showStop, setShowStop] = useState(false);
  const [intervalID, setIntervalId] = useState<NodeJS.Timer>();
  const [initialCountDownSeconds, setInitialCountDownSeconds] = useState(2);
  const [isRunning, setIsRunning] = useState(false);

  const countDownSeconds = () => {
    setShowStop(true);
    let count = 0;
    const newIntervalId = setInterval(() => {
      setInitialCountDownSeconds(initialCountDownSeconds - count);
      count = count + 1;
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const stopFunction = () => {
    setShowStop(false);
    clearInterval(intervalID);
    setIntervalId(undefined);
    setInitialCountDownSeconds(10);
  };

  const StartFunction = () => {
    let now = new Date().getTime();
    let idI = setInterval(() => {
      let before = new Date().getTime();
      setDuration(moment.duration(duration - (before - now)).add(1, 'seconds'));
      console.log('tiempo pasado', duration);
    }, 1000);
  };

  useEffect(() => {
    console.log('effect', initialCountDownSeconds);
    if (initialCountDownSeconds === 0) {
      clearInterval(intervalID);
      setIntervalId(undefined);
      setIsRunning(true);
      StartFunction();
    }
    //for the missing dependencies (variables)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCountDownSeconds]);

  return (
    <View style={styles.mainContainer}>
      {showStop ? (
        isRunning ? (
          //temporizador del ejercicio
          <TouchableOpacity style={styles.tapToStart}>
            <Text style={{...styles.timer, color: colorText}}>
              {duration.minutes()}:{duration.seconds()}
            </Text>
            <Text style={styles.tapToStartText}>Tap to pause</Text>
          </TouchableOpacity>
        ) : (
          //conteo inicial en segundos stop
          <TouchableOpacity style={styles.tapToStart} onPress={stopFunction}>
            <Text style={{...styles.countDownSeconds, color: colorText}}>
              {initialCountDownSeconds}
            </Text>
            <Text style={styles.tapToStartText}>Tap to stop</Text>
          </TouchableOpacity>
        )
      ) : (
        //icono de inicio
        <TouchableOpacity style={styles.tapToStart} onPress={countDownSeconds}>
          <FontAwesomeIcon
            icon={faFlagCheckered}
            size={72}
            style={{color: colorText}}
          />
          <Text style={styles.tapToStartText}>Tap to start</Text>
        </TouchableOpacity>
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
  tapToStart: {alignItems: 'center', padding: 5},
  tapToStartText: {fontSize: 20},
  countDownSeconds: {
    fontSize: 50,
    textAlign: 'center',
  },
  timer: {
    fontSize: 40,
    fontWeight: '500',
  },
});

export default Timer;
