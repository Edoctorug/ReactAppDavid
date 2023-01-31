import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DashboardScreen from '../screens/DashboardScreen'

export default function AuthStack() {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerTransparent: true, header: null}} >
        <Stack.Screen name='Home' component={ DashboardScreen } options={{ header: ()=>null}}/>
    </Stack.Navigator>
  )
}