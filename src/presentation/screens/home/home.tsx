import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyPage } from "./mypage";
import { Start } from "./start";

const Tab = createBottomTabNavigator();

export const Home: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarBackground: () => (
          <View
            style={{ width: "100%", height: "100%", backgroundColor: "#222" }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="ホーム"
        component={Start}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size + 4} />
          ),
        }}
      />
      <Tab.Screen
        name="マイページ"
        component={MyPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size + 4} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
