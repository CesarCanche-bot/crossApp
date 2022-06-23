import React, {useState} from 'react';
import {Text, Pressable, Modal} from 'react-native';
import {View, StyleSheet, Animated} from 'react-native';

import RoundButton from '../mainMenu/RoundButton';

import {AmrapProps} from '../../App';

const Data = {
  laps: [
    {timer: '00:20', timerString: 'PT20S', label: 'seconds'},
    {timer: '00:30', timerString: 'PT30S', label: 'seconds'},
    {timer: '00:45', timerString: 'PT45S', label: 'seconds'},
    {timer: '1', timerString: 'PT1M', label: 'minute'},
    {timer: '1:15', timerString: 'PT1M15S', label: 'minutes'},
    {timer: '1:30', timerString: 'PT1M30S', label: 'minutes'},
    {timer: '1:45', timerString: 'PT1M45S', label: 'minutes'},
    {timer: '2', timerString: 'PT2M', label: 'minutes'},
    {timer: '2:10', timerString: 'PT2M10S', label: 'minutes'},
    {timer: '2:30', timerString: 'PT2M30S', label: 'minutes'},
    {timer: '11', timerString: 'PT1eM', label: 'minute'},
    {timer: '11:15', timerString: 'PeT1M15S', label: 'minutes'},
    {timer: '11:30', timerString: 'PTe1M30S', label: 'minutes'},
    {timer: '11:45', timerString: 'PT1eM45S', label: 'minutes'},
    {timer: '22', timerString: 'PT2eM', label: 'minutes'},
    {timer: '22:10', timerString: 'PeT2M10S', label: 'minutes'},
    {timer: '22:30', timerString: 'PTe2M30S', label: 'minutes'},
  ],
};

type LapProps = {
  interval: {timer: string; label: string};
  opacity: Animated.AnimatedInterpolation;
  scale: Animated.AnimatedInterpolation;
};

function Lap({interval, opacity, scale}: LapProps) {
  return (
    <View style={styles.lap}>
      <Animated.Text style={[styles.lapText, {opacity, transform: [{scale}]}]}>
        {interval.timer}
      </Animated.Text>
      <Animated.Text style={[styles.lapText, {opacity, transform: [{scale}]}]}>
        {interval.label}
      </Animated.Text>
    </View>
  );
}

const Amrap = ({route, navigation}: AmrapProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colorText = route.params.colorText;
  const [indexTimerSelected, setIndexTimerSelected] = useState(5);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>AMRAP</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>As many rounds as posible in:</Text>
        <View style={styles.timerContainer}>
          <Pressable
            style={styles.minutesContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.timerText}>
              {Data.laps[indexTimerSelected].timer}
            </Text>
          </Pressable>
          <Pressable>
            <Text style={styles.timerText}>
              {' '}
              {Data.laps[indexTimerSelected].label}
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredModalView}>
            <Text style={{...styles.timerSeleccted, color: colorText}}>
              {Data.laps[indexTimerSelected].timer}
            </Text>
            <View style={styles.modalView}>
              <Animated.FlatList
                contentContainerStyle={styles.flatList}
                data={Data.laps}
                keyExtractor={item => item.timerString}
                // bounces={false}
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={30}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollY}}}],
                  {useNativeDriver: true},
                )}
                onMomentumScrollEnd={ev => {
                  setIndexTimerSelected(
                    Math.round(ev.nativeEvent.contentOffset.y / 30),
                  );
                }}
                ListFooterComponent={<View style={styles.footerFlatList} />}
                renderItem={({item, index}) => {
                  const inputRange = [
                    (index - 10) * 30,
                    index * 30,
                    (index + 1) * 30,
                  ];
                  const opacity = scrollY.interpolate({
                    inputRange,
                    outputRange: [0.4, 1.2, 0.4],
                  });

                  const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [0.2, 1.2, 0.2],
                  });
                  return (
                    <Lap
                      interval={item}
                      key={item.timerString}
                      opacity={opacity}
                      scale={scale}
                    />
                  );
                }}
              />
            </View>
            <Pressable
              style={styles.startTimerButton}
              onPress={() => setModalVisible(false)}>
              <View style={styles.ok}>
                <RoundButton title="OK" color="black" background="#31A9B8" />
              </View>
            </Pressable>
          </View>
        </Modal>
      </View>
      <View style={styles.startTimerContainer}>
        <Pressable
          style={styles.startTimerButton}
          onPress={() =>
            navigation.navigate('Timer', {
              interval: Data.laps[indexTimerSelected].timerString,
              colorText: '#31A9B8',
              title: 'AMRAP',
            })
          }>
          <RoundButton title="Start Timer" color="black" background="#31A9B8" />
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
    marginTop: 0,
    backgroundColor: 'black',
  },
  modalView: {
    flex: 1,
    position: 'absolute',
    margin: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#31A9B8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 50,
    height: '35%',
    width: '70%',
  },
  timerContainer: {
    backgroundColor: 'red',
    marginTop: '3%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '25%',
    flexDirection: 'row',
  },
  minutesContainer: {
    backgroundColor: 'yellow',
  },
  startTimerButton: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  startTimerContainer: {
    backgroundColor: 'black',
    marginTop: '70%',
    height: '9%',
  },
  lap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    width: '70%',
    height: 30,
  },
  lapText: {fontSize: 20},
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
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerFlatList: {
    height: 220,
  },
  timerSeleccted: {fontSize: 60, marginBottom: '100%', fontWeight: '800'},
  ok: {},
});

export default Amrap;
