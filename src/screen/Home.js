import React from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../config/Constants';

const Home = () => {
  const navigation = useNavigation();

  const DATA = [
    {
      id: 0,
      title: 'Users List',
      about: 'Get all referral code users',
      image: 'format-list-bulleted',
      onPress: 'ReferralUserList',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.onPress);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: wp(3),
          marginTop: wp(4),
          marginBottom: wp(2),
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name={item.image}
            size={25}
            color={COLORS.primary}
          />
          <View style={{marginLeft: wp(2)}}>
            <Text
              style={{
                fontWeight: '500',

                fontSize: 13,
                color: 'black',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 11,
                color: 'gray',
              }}>
              {item.about}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name={'arrow-right'}
          size={20}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          marginTop: wp(3),
          marginLeft: wp(5),
          marginRight: wp(5),
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'black',
            }}>
            Home
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            marginTop: wp(5),
            marginBottom: wp(5),
            borderWidth: 2,
            borderColor: 'lightgray',
          }}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.push('Login');
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(3),
              marginTop: wp(4),
              marginBottom: wp(2),
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'account-remove'}
                size={20}
                color={COLORS.primary}
              />
              <View style={{marginLeft: wp(2)}}>
                <Text
                  style={{
                    fontWeight: '500',

                    fontSize: 13,
                    color: 'black',
                  }}>
                  Logout
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 11,
                    color: 'gray',
                  }}>
                  Logout
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name={'arrow-right'}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;
