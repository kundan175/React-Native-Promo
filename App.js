import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/components/NavigationService';
import Login from './src/screen/Login';
import OTPScreen from './src/screen/OTPScreen';
import Home from './src/screen/Home';
import SplashScreen from './src/screen/SplashScreen';
import ReferralUserList from './src/screen/ReferralUserList';
import ReferralDetails from './src/screen/ReferralDetails';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={'SplashScreen'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="MyTabs" component={Home} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen
              name="ReferralUserList"
              component={ReferralUserList}
            />
            <Stack.Screen name="ReferralDetails" component={ReferralDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
};

export default App;
