import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TimerForTimeProps} from '../../App';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFlagCheckered,
  faPlay,
  faChampagneGlasses,
} from '@fortawesome/free-solid-svg-icons';

import SwipeButton from 'rn-swipe-button';

import Config from '../../src/config.json';

const TimerForTime = ({route}: TimerForTimeProps) => {
  const [timeProp] = useState(route.params.interval);
  const colorText = route.params.colorText;
  const [title] = useState(moment.duration(route.params.interval));
  const [showStop, setShowStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [intervalID, setIntervalId] = useState<NodeJS.Timer>();
  const [duration, setDuration] = useState<moment.Duration | any>(
    moment.duration(0),
  );
  const [initialCountDownSeconds, setInitialCountDownSeconds] = useState(10);
  const [timeLapsed, setTimeLapsed] = useState<number>(0);
  const {width, height} = Dimensions.get('window');
  const [workoutFinished, setWorkoutFinished] = useState(false);

  const StartFunction = () => {
    setPaused(false);
    let now = new Date().getTime();
    let idI = setInterval(() => {
      let before = new Date().getTime();
      setDuration(moment.duration(before - now + timeLapsed));
    }, 1000);
    setIntervalId(idI);
  };

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

  const pauseFunction = () => {
    clearInterval(intervalID);
    setPaused(true);
    setTimeLapsed(duration);
  };

  //stop verify
  useEffect(() => {
    if (
      (moment.duration(duration).seconds() ===
        moment.duration(timeProp).seconds() &&
        moment.duration(duration).minutes() ===
          moment.duration(timeProp).minutes() &&
        moment.duration(duration).hours() ===
          moment.duration(timeProp).hours()) ||
      workoutFinished
    ) {
      clearInterval(intervalID);
      setFinished(true);
      setPercent(100);
    }

    if (isRunning) {
      if (route.params.interval === 'PT1000M') {
        setPercent(Math.ceil((moment.duration(duration).seconds() * 100) / 60));
      } else {
        setPercent(
          Math.ceil(
            (moment.duration(duration).asMilliseconds() * 100) /
              moment.duration(timeProp).asMilliseconds(),
          ),
        );
      }
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

  function titleRender() {
    if (route.params.interval === 'PT1000M') {
      return (
        <Text style={{...styles.title, color: colorText}}>No time cap</Text>
      );
    } else {
      return (
        <Text style={{...styles.title, color: colorText}}>
          {title.minutes()}:{title.seconds()}
        </Text>
      );
    }
  }
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
          {titleRender()}
          {showStop ? (
            isRunning && !workoutFinished ? (
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

                {!workoutFinished ? (
                  <SwipeButton
                    title="SWIPE TO FINISH"
                    containerStyles={styles.swipeContainer}
                    railBorderColor="white"
                    railBackgroundColor="white"
                    railFillBackgroundColor={colorText}
                    railFillBorderColor="green"
                    titleStyles={styles.titleSwipe}
                    thumbIconBackgroundColor={colorText}
                    onSwipeSuccess={() => {
                      setWorkoutFinished(true);
                    }}
                    onSwipeFail={() => {
                      console.log('fallo');
                    }}
                    thumbIconBorderColor={colorText}
                    height={height * 0.05}
                    width={width * 0.45}
                  />
                ) : (
                  <></>
                )}
              </View>
            ) : //conteo inicial en segundos stop
            workoutFinished ? (
              <View style={styles.initialSecondsContainer}>
                <FontAwesomeIcon
                  icon={faChampagneGlasses}
                  size={90}
                  style={{color: colorText}}
                />
                <Text style={styles.tapToStartText}>You did great</Text>
                <Text style={styles.tapToStartText}>
                  {moment.duration(duration).hours() != 0
                    ? moment.duration(duration).hours() + ':'
                    : ''}
                  {moment.duration(duration).minutes() + ':'}
                  {moment.duration(duration).seconds()}
                </Text>
              </View>
            ) : (
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

export default TimerForTime;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center'},
  img: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: '5%',
    textAlign: 'center',
  },
  containerRunning: {
    alignItems: 'center',
  },
  tapToStartText: {fontSize: 20},
  tapToStart: {alignItems: 'center', padding: 5},
  timer: {
    fontSize: 70,
    fontWeight: '500',
  },
  timerPaused: {
    fontSize: 20,
    fontWeight: '500',
  },
  initialSecondsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countDownSeconds: {
    fontSize: 50,
    textAlign: 'center',
  },
  swipeContainer: {
    borderRadius: 15,
    marginTop: '8%',
  },
  titleSwipe: {
    fontSize: 15,
  },
});
