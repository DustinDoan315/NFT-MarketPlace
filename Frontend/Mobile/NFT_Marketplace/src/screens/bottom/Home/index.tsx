import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {commonRoot} from '@navigation/NavigationRef';
import router from '@navigation/router';

const HomeScreen = () => {
  const handleNavigate = () => {
    commonRoot.navigate(router.DETAIL_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleNavigate}>
        <Text style={{color: 'white', fontWeight: '700'}}>
          Go to Detail screen
        </Text>
      </Pressable>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
