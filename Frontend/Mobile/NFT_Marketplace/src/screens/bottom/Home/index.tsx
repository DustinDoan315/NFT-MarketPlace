/* eslint-disable react-native/no-inline-styles */
import {ScrollView} from 'react-native';
import React from 'react';

import {styles} from './style';
import {ListAssets, MyWallet} from './HomeViewModal';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={styles.container}>
        {MyWallet()}
        {ListAssets()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
