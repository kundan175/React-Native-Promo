import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {View, Text, TouchableOpacity, Linking, ScrollView} from 'react-native';
import {COLORS, FONTS} from '../config/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ReferralDetails = ({route}) => {
  const {data} = route.params;
  const navigation = useNavigation();

  console.log('data', data);
  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: wp(2),
          marginHorizontal: wp(2),
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name={'keyboard-backspace'}
            size={25}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 26,
            textAlign: 'center',
            fontFamily: FONTS.bold,
            color: COLORS.black,
          }}>
          User Details
        </Text>
        <View />
      </View>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18}}>Name</Text>
          <Text
            style={{color: COLORS.primary, fontSize: 18, fontWeight: '700'}}>
            {data.firstName + ' ' + data.lastName}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18}}>Mobile no.</Text>
          <Text
            style={{color: COLORS.primary, fontSize: 18, fontWeight: '700'}}>
            {data.userMobile}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18}}>Referral Code</Text>
          <Text
            style={{color: COLORS.primary, fontSize: 18, fontWeight: '700'}}>
            {data?.referralCode}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18}}>Count</Text>
          <Text
            style={{color: COLORS.primary, fontSize: 18, fontWeight: '700'}}>
            {data?.referralCount?.length ? data?.referralCount?.length : 0}
          </Text>
        </View>
      </View>
      {data?.referralCount?.length && (
        <ScrollView style={{marginHorizontal: 20, marginTop: wp(5)}}>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 21,
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom: wp(5),
              }}>
              User List
            </Text>
          </View>
          {data?.referralCount.map(item => (
            <View
              style={{
                backgroundColor: COLORS.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                padding: 5,
                borderRadius: 10,
                overflow: 'hidden',
                paddingLeft: 10,
                paddingBottom: 10,
                marginVertical: 10,
                borderWidth: 1,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={{color: COLORS.black, fontSize: 18}}>Name</Text>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  {item.firstName + ' ' + item.lastName}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Text style={{color: COLORS.black, fontSize: 18}}>
                  Mobile no.
                </Text>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  {item.userMobile}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ReferralDetails;
