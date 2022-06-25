import React from 'react';
import {Text, StyleSheet, ImageBackground, View, Pressable} from 'react-native';

import Config from '../../src/config.json';

const TimersComponent = ({}) => {
  return (
    <ImageBackground
      style={styles.mainContainer}
      source={require('../../src/img/3.jpg')}>
      <View
        style={{
          backgroundColor: Config.transparencyViews.code,
          ...styles.mainView,
        }}>
        <View style={styles.groupTitle}>
          <Text style={styles.title}>For Time</Text>
          <Text style={styles.subtitle}>As fast as posible for time</Text>
        </View>
        <View style={styles.timeCap}>
          <Text style={styles.timeCapText}>Time Cap</Text>
          <Pressable>
            <Text style={[styles.timeCapPressable, styles.timeCapText]}>5</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TimersComponent;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  mainView: {flex: 1, alignItems: 'center'},
  groupTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
    marginTop: '45%',
  },
  title: {fontSize: 60, fontWeight: '700', color: '#fff', marginBottom: '4%'},
  subtitle: {
    fontSize: 31,
    fontWeight: '700',
    color: '#fff',
  },
  timeCap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  timeCapText: {
    fontSize: 35,
    fontWeight: '600',
    color: 'white',
    padding: 10,
  },
  timeCapPressable: {
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    textAlign: 'center',
    borderColor: 'white',
  },
});
