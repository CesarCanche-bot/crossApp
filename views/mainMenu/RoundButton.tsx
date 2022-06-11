import React from 'react';
import {Text} from 'react-native';
import {View, StyleSheet} from 'react-native';

interface Props {
  title: string;
  color: string;
  background: string;
}

const RoundButton = ({title, color, background}: Props) => {
  return (
    <View style={[styles.buttonContainer, {backgroundColor: background}]}>
      <Text style={[styles.buttonTitle, {color: color}]}>{title}</Text>
    </View>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {fontSize: 25, fontWeight: '500'},
});
