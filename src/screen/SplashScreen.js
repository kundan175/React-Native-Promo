import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {COLORS, FONTS} from '../config/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let dimensions = Dimensions.get('window');

let imageWidth = dimensions.width;
let imageHeight = dimensions.height;
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      loginCheck();
    }, 2000);
  }, []);

  const loginCheck = () => {
    AsyncStorage.getItem('token').then(value => {
      navigation.navigate(value ? 'MyTabs' : 'Login');
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <MaterialCommunityIcons
          name={'account-cowboy-hat'}
          size={250}
          color={COLORS.white}
        />
        <Text
          style={{
            color: COLORS.white,
            fontSize: 25,
            fontFamily: FONTS.medium,
            fontWeight: 700,
          }}>
          BondsPay Promo
        </Text>
      </View>
      {/* <Image
        source={require('../assets/images/Animation.gif')}
        style={{
          width: imageWidth,
          height: imageHeight,
          zIndex: 300,
          resizeMode: 'cover',
        }}
      /> */}
    </View>
  );
};

export default SplashScreen;
