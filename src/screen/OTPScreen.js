import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpInputs from 'react-native-otp-inputs';
import imagePath from '../assets/imagePath';
import NativeButton from '../components/NativeButton';
import {COLORS, FONTS} from '../config/Constants';
import Api from '../config/Api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OTPScreen = ({route}) => {
  const navigation = useNavigation();
  const [otp, setOTP] = useState('');
  const {number} = route.params;
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!otp) {
    } else if (otp.length !== 6) {
    } else {
      Api.call(
        `auth/verifyotp`,
        'post',
        JSON.stringify({
          mobile: number,
          otp: otp,
        }),
        false,
        dispatch,
      )
        .then(res => {
          if (res) {
            console.log(res);
            AsyncStorage.setItem('token', res.jwt);
            navigation.reset({
              index: 0,
              routes: [{name: 'MyTabs'}],
            });
            console.log(res);
          }
        })
        .catch(res => {
          console.log(res);
          dispatch(customAlertfuction({title: 'Please enter OTP'}));
        });
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView>
        <View style={{marginTop: wp(8), marginLeft: wp(5), marginRight: wp(5)}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={imagePath.BackIcon} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 26,
                textAlign: 'center',
                fontFamily: FONTS.medium,
                color: COLORS.black,
              }}>
              OTP Verification
            </Text>
            <View />
          </View>
          <View style={{alignSelf: 'center', marginTop: wp(7)}}>
            <MaterialCommunityIcons
              name={'lock-check'}
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
              Verify
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FONTS.medium,
                color: COLORS.gray,
                marginTop: wp(4),
                textAlign: 'center',
              }}>
              Please enter the 6 digit one time code sent to your mobile number!{' '}
            </Text>
          </View>
          <View style={{}}>
            <OtpInputs
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              cursorColor={COLORS.primary}
              inputContainerStyles={{
                backgroundColor: '#F2F2F2',
                margin: wp(2),
                borderRadius: 5,
                alignSelf: 'center',
                alignItems: 'center',
                width: wp(10),
                height: wp(12),
                borderColor: COLORS.gray,
                borderWidth: 1,
              }}
              inputStyles={{
                textAlign: 'center',
                color: COLORS.black,
                fontFamily: FONTS.medium,
                top: Platform.OS == 'ios' ? 1 : 7,
                padding: Platform.OS == 'ios' ? 15 : 0,
              }}
              handleChange={code => setOTP(code)}
              numberOfInputs={6}
            />
          </View>
        </View>
        <NativeButton
          title={'Log in'}
          onPress={() => {
            onSubmit();
            // navigation.navigate('MyTabs');
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 15},
  codeFieldRoot: {
    marginTop: 30,
    marginHorizontal: 10,
    color: COLORS.primary,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.darkGray,
  },
  cell: {
    width: 55,
    lineHeight: 35,
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    color: 'white',
    height: 40,
  },
});

export default OTPScreen;
