import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFlagCheckered,
  faPlay,
  faChampagneGlasses,
} from '@fortawesome/free-solid-svg-icons';
import ProgressCircle from 'react-native-progress-circle';

import {TimerProps} from '../../App';

import Config from '../../src/config.json';

//lo de agregar los lapzos sale al minuto 51

const Timer = ({route}: TimerProps) => {
  const [timeProp] = useState(route.params.interval);
  const [title] = useState(moment.duration(route.params.interval));
  const colorText = route.params.colorText;
  const [duration, setDuration] = useState<moment.Duration | any>(
    moment.duration(timeProp),
  );
  const [showStop, setShowStop] = useState(false);
  const [intervalID, setIntervalId] = useState<NodeJS.Timer>();
  const [initialCountDownSeconds, setInitialCountDownSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [percent, setPercent] = useState(0);

  const countDownSeconds = () => {
    setShowStop(true);
    let count = 0;
    const newIntervalId = setInterval(() => {
      setInitialCountDownSeconds(initialCountDownSeconds - count);
      count = count + 1;
      setPercent(count * 10);
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
    setPaused(false);
    let now = new Date().getTime();
    let idI = setInterval(() => {
      let before = new Date().getTime();
      setDuration(moment.duration(duration - (before - now)).add(1, 'seconds'));
    }, 1000);
    setIntervalId(idI);
  };

  const pauseFunction = () => {
    clearInterval(intervalID);
    setPaused(true);
  };

  //stop verify
  useEffect(() => {
    if (
      moment.duration(duration).seconds() === 0 &&
      moment.duration(duration).minutes() === 0 &&
      moment.duration(duration).hours() === 0
    ) {
      clearInterval(intervalID);
      setFinished(true);
      setPercent(100);
    }

    if (isRunning) {
      setPercent(
        Math.ceil(
          100 -
            (moment.duration(duration).asMilliseconds() * 100) /
              moment.duration(timeProp).asMilliseconds(),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  //10 secons count down
  useEffect(() => {
    if (initialCountDownSeconds === 0) {
      clearInterval(intervalID);
      setIntervalId(undefined);
      setIsRunning(true);
      setPercent(0);
      StartFunction();
    }
    //for the missing dependencies (variables)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCountDownSeconds]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../src/img/3.jpg')}
        style={styles.img}>
        <View
          style={{
            ...styles.mainContainer,
            backgroundColor: Config.transparencyViews.code,
          }}>
          <Text style={{...styles.title, color: colorText}}>
            {title.hours()}:{title.minutes()}:{title.seconds()}
          </Text>
          {showStop ? (
            isRunning ? (
              //temporizador del ejercicio
              <View style={styles.containerRunning}>
                <ProgressCircle
                  percent={percent}
                  radius={140}
                  borderWidth={8}
                  color={colorText}
                  shadowColor="#999"
                  bgColor="black">
                  {!paused ? (
                    finished ? (
                      <View>
                        <FontAwesomeIcon
                          icon={faChampagneGlasses}
                          size={90}
                          style={{color: colorText}}
                        />
                        <Text style={styles.tapToStartText}>You did great</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.tapToStart}
                        onPress={pauseFunction}>
                        <Text style={{...styles.timer, color: colorText}}>
                          {duration.hours()}:{duration.minutes()}:
                          {duration.seconds()}
                        </Text>
                        <Text style={styles.tapToStartText}>Tap to pause</Text>
                      </TouchableOpacity>
                    )
                  ) : (
                    <TouchableOpacity
                      style={styles.tapToStart}
                      onPress={StartFunction}>
                      <Text style={{...styles.timerPaused, color: colorText}}>
                        {duration.minutes()}:{duration.seconds()}
                      </Text>
                      <FontAwesomeIcon
                        icon={faPlay}
                        size={50}
                        style={{color: colorText}}
                      />
                      <Text style={styles.tapToStartText}>Tap to resume</Text>
                    </TouchableOpacity>
                  )}
                </ProgressCircle>
              </View>
            ) : (
              //conteo inicial en segundos stop
              <View style={styles.initialSecondsContainer}>
                <ProgressCircle
                  percent={percent}
                  radius={140}
                  borderWidth={8}
                  color={colorText}
                  shadowColor="#999"
                  bgColor="black">
                  <TouchableOpacity
                    style={styles.tapToStart}
                    onPress={stopFunction}>
                    <Text
                      style={{...styles.countDownSeconds, color: colorText}}>
                      {initialCountDownSeconds}
                    </Text>
                    <Text style={styles.tapToStartText}>Tap to stop</Text>
                  </TouchableOpacity>
                </ProgressCircle>
              </View>
            )
          ) : (
            //icono de inicio
            <TouchableOpacity
              style={styles.tapToStart}
              onPress={countDownSeconds}>
              <FontAwesomeIcon
                icon={faFlagCheckered}
                size={72}
                style={{color: colorText}}
              />
              <Text style={styles.tapToStartText}>Tap to start</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tapToStart: {alignItems: 'center', padding: 5},
  tapToStartText: {fontSize: 20},
  countDownSeconds: {
    fontSize: 50,
    textAlign: 'center',
  },
  timer: {
    fontSize: 70,
    fontWeight: '500',
  },
  timerPaused: {
    fontSize: 20,
    fontWeight: '500',
  },
  containerRunning: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: '5%',
    textAlign: 'center',
  },
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  initialSecondsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Timer;
