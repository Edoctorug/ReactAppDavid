import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/auth/SplashScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RStep1 from '../screens/auth/registration/Step1'
import RStep2 from '../screens/auth/registration/Step2'

export default function AuthStack() {
    const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerTransparent: true}}>
      <Stack.Screen name='Welcome' component={ SplashScreen } options={{ header: ()=>null}}/>
      <Stack.Screen name='Login' component={ LoginScreen }/>
      <Stack.Screen name='Register' component={ RStep1 } options={
        {
          headerTitle: 'Step 1'
        }
      } />
      <Stack.Screen name='Step 2' component={ RStep2 } />
    </Stack.Navigator>
  )
}