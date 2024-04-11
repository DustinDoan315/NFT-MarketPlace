import router from './router';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {bottom} from '../screens/bottom';

const Tab = createBottomTabNavigator();

type TabRoute = {
  title: string;
  icon: any;
  component: React.ComponentType<any>;
};

const TabButton: React.FC<
  | {
      item: TabRoute;
      onPress: () => void;
      accessibilityState: any;
    }
  | any
> = ({item, onPress, accessibilityState}) => {
  const focused = accessibilityState?.selected;
  const customerStyle = useSelector((state: any) => state.user?.customerStyle);
  return (
    <Pressable
      testID={'bottomBarContainer'}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          source={
            focused
              ? customerStyle
                ? item?.iconActiveNT
                : item?.iconActiveTR
              : item?.iconInActive
          }
        />
      </View>

      <View testID={`bottomBar_${item?.title}`}>
        <Text>123</Text>
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
          paddingVertical: 10,
        },
      }}>
      <Tab.Screen
        name={router.HOME_SCREEN}
        component={bottom[router.HOME_SCREEN]}
        options={{
          tabBarShowLabel: false,
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
    paddingVertical: 5,
    marginTop: 15,
  },
});

export default BottomContainer;
