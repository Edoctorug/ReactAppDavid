import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles, { colors } from '../styles'

import Container from '../Components/Container'
import { StateContext } from '../context/GeneralContext'

export default function DashboardScreen() {
  const { deleteAuth } = useContext(StateContext)
  const handleLogout = async() => {
    await deleteAuth()
  }
  return (
    <Container>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={ handleLogout }>
          <Text style={{
            color: colors.bgPrimary,
            fontSize: 18
          }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}