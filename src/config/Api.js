import AsyncStorage from '@react-native-async-storage/async-storage';
import {customAlertfuction} from '../store/counterSlice';
import {Mainurl} from './config';

export default Api = {
  call: async function (
    url,
    method = 'POST',
    bodyData = null,
    hastoken = true,
    dispatch,
  ) {
    var header = {};
    var fullUrl = Mainurl + url;
    var storedUserToken = await AsyncStorage.getItem('token');
    if (storedUserToken) {
      global.token = storedUserToken;
    }

    if (bodyData instanceof FormData) {
      if (hastoken) {
        header = {
          Authorization: 'Bearer' + ' ' + global.token,
        };
      } else {
        header = {
          Accept: 'application/json',
        };
      }
    } else {
      if (hastoken) {
        header = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + global.token,
        };
      } else {
        header = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
      }
    }

    console.log('url===>', fullUrl);
    console.log('body===>', bodyData);
    console.log('token===>', 'Bearer' + ' ' + global.token);

    return await fetch(fullUrl, {
      method: method,
      body: bodyData,
      headers: header,
    })
      .then(response => {
        console.log('response.status', response.status);
        if (response.status == 201 || response.status == 200) {
          return response.json();
        } else if (response.status == 400) {
          response.json().then(responseResult => {
            console.log('responseResult', responseResult);
            if (responseResult.status == 'SUCCESS') {
              return response.json();
            } else {
              let title = responseResult.error;
              dispatch(
                customAlertfuction({
                  title: Object.values(title)[0],
                }),
              );
            }
          });
        } else {
          dispatch(customAlertfuction({title: 'Try '}));
        }
      })
      .catch(err => {
        console.log('error ====', err.message);
      });
  },
};
