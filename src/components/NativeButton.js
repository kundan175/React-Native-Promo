import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../config/Constants';

const NativeButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  image,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: COLORS.primary,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            ...styles.title,
            ...textStyle,
            color: COLORS.white,
            fontSize: 16,
            fontFamily: FONTS.medium,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default NativeButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#512DA8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: wp(85),
    height: hp(8),
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginBottom: wp(0.2),
  },
});
