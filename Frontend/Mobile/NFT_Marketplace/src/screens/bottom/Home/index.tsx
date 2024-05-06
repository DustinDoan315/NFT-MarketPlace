/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';

import {styles} from './style';
import {ListAssets, MyWallet} from './HomeViewModal';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        {MyWallet()}
        {ListAssets()}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
