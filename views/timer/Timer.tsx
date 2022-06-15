import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import RoundButton from '../mainMenu/RoundButton';

import moment from 'moment';

import {TimerProps} from '../../App';
import {Pressable} from 'react-native';
import {useState} from 'react';

//lo de agregar los lapzos sale al minuto 51

const Timer = ({route}: TimerProps) => {
  const [timer] = useState(new Date().getTime()); //useState(route.params.interval);
  const colorText = route.params.colorText;
  const [duration, setDuration] = useState(moment.duration(timer));
  const [showStop, setShowStop] = useState(false);
  const [isRunning, setIsRunnig] = useState(false);

  function StartFunction() {
    setShowStop(true);
    setIsRunnig(true);
  }

  useInterval(
    () => {
      console.log('se ecjecuta lo del timepo');
      setDuration(moment.duration(new Date().getTime()));
    },
    isRunning ? 1000 : undefined,
  );

  const PauseFunction = () => {
    setShowStop(false);
    console.log('se detiene');
    setIsRunnig(false);
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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== undefined) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
