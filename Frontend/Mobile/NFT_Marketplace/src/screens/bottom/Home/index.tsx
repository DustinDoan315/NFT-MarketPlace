import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonRoot} from '../../../navigation/NavigationRef';
import router from '../../../navigation/router';
import HomeViewModal from './HomeViewModal';

const HomeScreen = () => {
  const handleNavigate = () => {
    commonRoot.navigate(router.DETAIL_SCREEN);
  };

  return (
    <View style={styles.container}>
      <HomeViewModal />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});
