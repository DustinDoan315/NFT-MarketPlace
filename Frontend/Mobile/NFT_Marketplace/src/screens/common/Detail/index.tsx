import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {root} from '../../../navigation/NavigationRef';

const DetailScreen = () => {
  const handleNavigate = () => {
    root.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>

      <Pressable onPress={handleNavigate}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
  },
});
