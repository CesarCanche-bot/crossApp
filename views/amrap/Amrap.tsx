import React, {useState} from 'react';
import {Text, Pressable} from 'react-native';
import {View, StyleSheet} from 'react-native';

const Amrap = () => {
  const [minutes] = useState(0.2);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>AMRAP</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>As many rounds as posible in:</Text>
        <Text style={styles.timerContainer}>
          <Pressable style={styles.minutesContainer}>
            <Text style={styles.timerText}>{minutes}</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.timerText}>minutes</Text>
          </Pressable>
        </Text>
      </View>
      <View style={styles.startTimerContainer}>
        <Pressable style={styles.startTimerButton}>
          <Text style={styles.startTimerText}>START TIMER</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {marginTop: '40%', backgroundColor: 'white', height: '100%'},
  contentContainer: {marginTop: '20%'},
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
