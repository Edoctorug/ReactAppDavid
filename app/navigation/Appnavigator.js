import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import AuthStack from './AuthStack'

const Appnavigator = () => {
  return (
    <NavigationContainer>
        <AuthStack />
    </NavigationContainer>
  )
}

export default Appnavigator


