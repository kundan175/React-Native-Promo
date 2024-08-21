import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLORS, FONTS} from '../config/Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReferralUserList = () => {
  const listRef = useRef(null);
  const [getUserData, setGetUserData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Getproduct();
    }
  }, [isFocused]);

  const Getproduct = async () => {
    Api.call(`v1/admin/getallusersreferralcode`, 'post', null, true, dispatch)
      .then(res => {
        if (res) {
          console.log('res, res', res);
          setGetUserData(res.data);
        }
      })
      .catch(res => {
        console.log(res);
      });
  };

  const reanderData = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReferralDetails', {
              data: item,
            });
          }}
          style={[
            {
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
              marginHorizontal: 10,
              borderWidth: 1,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: COLORS.black,
              }}>
              Referral Code:
            </Text>
            <Text
              style={{fontSize: 15, fontWeight: '600', color: COLORS.black}}>
              {item?.referralCode}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.black,
                marginTop: wp(1),
              }}>
              Name:
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.black,
                marginTop: wp(1),
              }}>
              {item?.firstName + ' ' + item?.lastName}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.black,
                marginTop: wp(1),
              }}>
              Mobile no. :
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.black,
                marginTop: wp(1),
              }}>
              {item?.userMobile}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.black,
                marginTop: wp(1),
              }}>
              User Use:
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.black,
                marginTop: wp(1),
              }}>
              {item?.referralCount?.length ? item?.referralCount?.length : 0}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
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
            fontFamily: FONTS.medium,
            color: COLORS.black,
          }}>
          User List
        </Text>
        <View />
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
        }}>
        <>
          {getUserData.length === 0 ? null : (
            <FlatList
              data={getUserData}
              ref={listRef}
              keyExtractor={(item, index) => index.toString()}
              renderItem={reanderData}
              ListEmptyComponent={
                <View
                  style={{
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 100,
                    marginBottom: 30,
                  }}>
                  <Text style={{fontWeight: '700', color: COLORS.black}}>
                    No Data
                  </Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  miminv: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: COLORS.primary,
    marginTop: 3,
    alignSelf: 'center',
  },
  modal: {
    justifyContent: 'flex-start',
    // backgroundColor: 'white',
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: Platform.OS === 'ios' ? 14 : 0,

    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    // justifyContent: 'flex-start',

    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  modalView: {
    // margin: 20,
    backgroundColor: '#eeeeee',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  interestListHeaderTxt: {
    fontWeight: '600',
    flex: 1,
  },
  interestListTxt: {
    paddingVertical: 8,
    flex: 1,
  },
  interestIndexTxt: {
    flex: 0.5,
  },
  interestListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flex: 2.5,
  },
});
export default ReferralUserList;
