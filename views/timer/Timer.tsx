import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import RoundButton from '../mainMenu/RoundButton';

import moment from 'moment';

import {TimerProps} from '../../App';
import {Pressable} from 'react-native';
import {useState} from 'react';

const Timer = ({route}: TimerProps) => {
  const [interval, setInterval] = useState(route.params.interval);
  const colorText = route.params.colorText;
  const [duration, setDuration] = useState(moment.duration(interval));
  const centiSeconds = Math.floor(duration.milliseconds() / 10);

  const StartFunction = () => {
    console.log('estart apretado');
    const start = new Date().getTime;
    setInterval(start);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={{...styles.timer, color: colorText}}>
        {duration.minutes()}:{duration.seconds()}.{centiSeconds}
      </Text>
      <Pressable style={styles.startStyle} onPress={() => StartFunction()}>
        <RoundButton title="start" color="white" background={colorText} />
      </Pressable>
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
  timer: {
    fontSize: 40,
    fontWeight: '500',
    backgroundColor: 'white',
  },
});

export default Timer;
