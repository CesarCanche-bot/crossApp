import React, {useMemo} from 'react';
import {Animated, View, StyleSheet} from 'react-native';

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

type TimersComponentProps = {
  setIndexTimerSelected: Function;
  laps: {timer: string; timerString: string; label: string}[];
};

function TimersComponent({setIndexTimerSelected, laps}: TimersComponentProps) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const listComponent = useMemo(() => {
    return (
      <Animated.FlatList
        initialScrollIndex={0}
        initialNumToRender={10}
        contentContainerStyle={styles.flatList}
        data={laps}
        keyExtractor={item => item.timerString}
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
          const inputRange = [(index - 15) * 30, index * 30, (index + 20) * 30];
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
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return listComponent;
}

export default TimersComponent;

const styles = StyleSheet.create({
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
  timerText: {color: 'white', fontSize: 35, fontWeight: '500', margin: 6},
  contentText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: '12%',
  },
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerFlatList: {
    height: 220,
  },
});
