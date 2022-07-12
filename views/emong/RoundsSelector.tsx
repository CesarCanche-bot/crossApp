import React, {useMemo} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

type RoundsSelectorProps = {
  setRound: Function;
  rounds: number[];
};

type RoundProps = {
  round: number;
  opacity: Animated.AnimatedInterpolation;
  scale: Animated.AnimatedInterpolation;
};

function Round({round, opacity, scale}: RoundProps) {
  return (
    <View style={styles.round}>
      <Animated.Text
        style={[styles.roundText, {opacity, transform: [{scale}]}]}>
        {round + 1}X
      </Animated.Text>
    </View>
  );
}

function RoundsSelector({setRound, rounds}: RoundsSelectorProps) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const listComponent = useMemo(() => {
    return (
      <Animated.FlatList
        initialScrollIndex={0}
        initialNumToRender={10}
        contentContainerStyle={styles.flatList}
        data={rounds}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={30}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollEnd={ev => {
          setRound(Math.round(ev.nativeEvent.contentOffset.y / 30));
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
            <Round round={item} key={item} opacity={opacity} scale={scale} />
          );
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return listComponent;
}

export default RoundsSelector;

const styles = StyleSheet.create({
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerFlatList: {
    height: 220,
  },
  round: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
    width: '70%',
    height: 30,
  },
  roundText: {fontSize: 20},
});
