import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

import { StateContext } from '../context/GeneralContext'
import { useContext } from 'react'
import Container from '../Components/Container'

const Appnavigator = () => {
  const { auth, loading } = useContext(StateContext)
  if(loading) {
    return <Container />
  }
  return (
    <NavigationContainer>
      { auth ? <AppStack/> : <AuthStack /> }
    </NavigationContainer>
  )
}

export default Appnavigator


