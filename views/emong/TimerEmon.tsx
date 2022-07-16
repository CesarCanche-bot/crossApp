import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {
  faFlagCheckered,
  faPlay,
  faChampagneGlasses,
} from '@fortawesome/free-solid-svg-icons';
import {TimerEmonProps} from '../../App';
import Config from '../../src/config.json';

const TimerEmon = ({route}: TimerEmonProps) => {
  let timeProp = route.params.interval;
  const [round] = useState(route.params.round);
  const [roundCount, setRoundCount] = useState(1);
  const colorText = route.params.colorText;
  const [duration, setDuration] = useState<moment.Duration | any>(
    moment.duration(timeProp),
  );
  let durationLapsed = moment.duration(timeProp);
  const [durationTotal, setDurationTotal] = useState<moment.Duration | any>(
    moment.duration(timeProp),
  );
  let c = moment.duration(timeProp);

  const [showStop, setShowStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [intervalID, setIntervalId] = useState<NodeJS.Timer>();
  const [initialCountDownSeconds, setInitialCountDownSeconds] = useState(10);
  //const [now, setNow] = useState(0);

  const pauseFunction = () => {
    clearInterval(intervalID);
    setPaused(true);
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

  const StartFunction = (now: number) => {
    console.log('inicio conteo');
    console.log('recibo +', now);
    setPaused(false);
    let idI = setInterval(() => {
      let before = new Date().getTime();
      setDuration(moment.duration(duration - (before - now)).add(1, 'seconds'));
      setDurationTotal(
        moment.duration(durationTotal - (before - now)).add(1, 'seconds'),
      );
      console.log('now', now);
      console.log('before', before);
      console.log(
        'pongo',
        moment
          .duration(duration - (before - now))
          .add(1, 'seconds')
          .seconds(),
      );
    }, 1000);
    setIntervalId(idI);
  };

  const stopFunction = () => {
    setShowStop(false);
    clearInterval(intervalID);
    setIntervalId(undefined);
    setInitialCountDownSeconds(10);
  };

  function addTotalTime() {
    for (let i = 1; i < round; i++) {
      c = moment.duration(c).add(timeProp);
      setDurationTotal(c);
    }
    console.log('durationTotal', durationTotal);
    console.log('c', c);
  }

  useEffect(() => {
    addTotalTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    return new Promise(resolve => {
      durationLapsed = durationLapsed.add(timeProp);
      setDuration(durationLapsed);
      setPercent(100);
      setRoundCount(roundCount + 1);
      console.log('actualiza', duration);
      resolve(true);
    });
  }

  //stop verify
  useEffect(() => {
    console.log('durationnnn', duration.seconds());
    console.log('curren interval id', intervalID);

    async function f1() {
      var x = await reset();
      console.log('xxxxxxxxxx', x);
    }
    if (
      moment.duration(duration).seconds() <= 0 &&
      moment.duration(duration).minutes() <= 0 &&
      moment.duration(duration).hours() <= 0 &&
      finished === false
    ) {
      f1().then(() => {
        console.log('intervalID despues', intervalID);
        StartFunction(new Date().getTime());
      });
    }

    if (
      moment.duration(durationTotal).seconds() <= 0 &&
      moment.duration(durationTotal).minutes() <= 0 &&
      moment.duration(durationTotal).hours() <= 0 &&
      round === roundCount
    ) {
      console.log('entro aca2');
      clearInterval(intervalID);
      setIntervalId(undefined);
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
      StartFunction(new Date().getTime());
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
          style={[
            styles.mainContainer,
            {backgroundColor: Config.transparencyViews.code},
          ]}>
          <Text style={[styles.titleRound, {color: colorText}]}>
            {roundCount}/{round}
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
                      onPress={() => StartFunction(new Date().getTime())}>
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

export default TimerEmon;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  img: {
    flex: 1,
  },
  titleRound: {
    textAlign: 'center',
    fontSize: 50,
    marginTop: '45%',
    marginBottom: '10%',
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
  countDownSeconds: {
    fontSize: 50,
    textAlign: 'center',
  },
  initialSecondsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
