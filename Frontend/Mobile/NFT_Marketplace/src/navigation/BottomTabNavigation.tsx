import router from './router';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {bottom} from '../screens/bottom';

const Tab = createBottomTabNavigator();

type TabRoute = {
  title: string;
  icon: any;
  component: React.ComponentType<any>;
};

const TabButton: React.FC<
  | {
      name: string;
      onPress: () => void;
      accessibilityState: any;
    }
  | any
> = ({name, onPress, accessibilityState}) => {
  const focused = accessibilityState?.selected;
  return (
    <Pressable
      testID={'bottomBarContainer'}
      onPress={onPress}
      style={styles.container}>
      <View>
        <Text
          style={{
            color: focused ? 'red' : 'black',
          }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};
const NullComponent = () => null;

const BottomContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={router.HOME_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
        },
      }}>
      <Tab.Screen
        name={router.HOME_SCREEN}
        component={bottom[router.HOME_SCREEN]}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => (
            <TabButton {...props} name={router.HOME_SCREEN} />
          ),
          headerLeft: NullComponent,
        }}
      />

      <Tab.Screen
        name={router.PROFILE_SCREEN}
        component={bottom[router.PROFILE_SCREEN]}
        options={{
          tabBarShowLabel: false,
          tabBarButton: props => (
            <TabButton {...props} name={router.PROFILE_SCREEN} />
          ),
          headerLeft: NullComponent,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomContainer;
