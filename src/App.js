import React, {useEffect} from 'react';

import Routes from './routes';
import {NativeModules, Platform} from 'react-native';

export default function App() {
  const {AppDelegate} = NativeModules;

  const requestTrackingPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const status = await AppDelegate.requestTrackingPermission();
        if (status === 'authorized') {
          console.log('Permissão de rastreamento concedida.');
        } else {
          console.log('Permissão de rastreamento negada.');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de rastreamento:', error);
      }
    }
  };

  return <Routes />;
}
