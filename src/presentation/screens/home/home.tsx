import React from "react";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import Icon from "react-native-vector-icons/FontAwesome6";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyPage } from "./mypage";
import { Start } from "./start";

const Tab = createBottomTabNavigator();

export const Home: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Start"
        component={Start}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="house" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} solid />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
