import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import router from './router';
import {common} from '@screens/common';

const CommonStack = createNativeStackNavigator();

const CommonContainer = () => {
  return (
    <CommonStack.Navigator screenOptions={{headerShown: false}}>
      <CommonStack.Screen
        name={router.DETAIL_SCREEN}
        component={common[router.DETAIL_SCREEN]}
      />
    </CommonStack.Navigator>
  );
};

export default CommonContainer;
