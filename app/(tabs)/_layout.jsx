import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Function defines Layout for each tab: common background-color, borders and then layout for home, add and list screen
export default function TabLayout() {
  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#00513B',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          alignItems: 'center',
          justifyContent: 'center'
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarShowLabel: false,
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}