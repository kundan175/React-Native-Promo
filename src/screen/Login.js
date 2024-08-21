import React, {useState} from 'react';
import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import NativeButton from '../components/NativeButton';
import {COLORS, FONTS} from '../config/Constants';
import imagePath from '../assets/imagePath';
import Api from '../config/Api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogin = () => {
    const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;

    if (regex.test(number)) {
      Api.call(
        `auth/login`,
        'post',
        JSON.stringify({
          mobile: number,
        }),
        false,
        dispatch,
      ).then(res => {
        if (res) {
          navigation.navigate('OTPScreen', {number: number});
          console.log(res);
        }
      });
    } else {
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView>
        <View style={{marginTop: wp(8)}}>
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              fontFamily: FONTS.medium,
              color: COLORS.black,
            }}>
            Welcome back!
          </Text>
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              fontFamily: FONTS.medium,
              color: COLORS.black,
            }}>
            Login to continue!
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <MaterialCommunityIcons
            name={'account-cowboy-hat'}
            size={250}
            color={COLORS.primary}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 19,
              fontFamily: FONTS.medium,
              color: COLORS.black,
              marginTop: wp(5),
            }}>
            Enter your mobile number
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.medium,
              color: COLORS.gray,
              marginTop: wp(4),
            }}>
            We’ll need to confirm it by sending a text.
          </Text>
        </View>
        <View>
          <View
            style={{
              width: wp(85),
              marginTop: wp(10),
              alignSelf: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                top: -9,
                left: 15,
                zIndex: 50,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: 13,
                  fontFamily: FONTS.regular,
                }}>
                Mobile Number
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 10,
                alignItems: 'flex-start',
                borderColor: COLORS.lightGray,
                backgroundColor: '#F9FAFC',
              }}>
              <View
                style={{
                  marginTop: 12,
                  marginLeft: 5,
                  marginRight: 10,
                }}></View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: FONTS.regular,
                    top: wp(0.5),
                    color: COLORS.lightGray,
                  }}>
                  {'+91 '}
                </Text>
                <TextInput
                  style={{height: 50, color: '#000', width: wp(200)}}
                  autoCapitalize="none"
                  value={number}
                  onChangeText={value => setNumber(value)}
                  placeholder="Number"
                  placeholderTextColor="gray"
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </View>
          </View>
        </View>
        <NativeButton title={'Send OTP'} onPress={() => onLogin()} />
      </ScrollView>
    </View>
  );
};

export default Login;
