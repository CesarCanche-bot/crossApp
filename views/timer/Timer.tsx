import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import moment from 'moment';

import {TimerProps} from '../../App';

/* const Data = {
  timer: 12313,
  laps: [123, 1231, 123132, 2343],
}; */

const Timer = ({route}: TimerProps) => {
  const interval = route.params.interval;
  const duration = moment.duration(interval);
  const centiSeconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.timer}>
        {duration.minutes()}:{duration.seconds()}:{centiSeconds}
      </Text>
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
  timer: {
    color: 'white',
    fontSize: 40,
    fontWeight: '500',
    backgroundColor: 'red',
  },
});

export default Timer;
