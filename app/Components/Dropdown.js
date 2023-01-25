/*
    This is a custom select used as just the html select element.
    When pressed, a popup appears and a users is required to select a value to close it or manually close
*/

import { View, Text, Pressable, Alert } from 'react-native'
import Ionicons from '@expo/vector-icons/Entypo';
import React from 'react'
import stylesheet, { colors } from '../styles'

export default function Dropdown({value, onChange, placeholder}) {
    const { text } = stylesheet
    return (
        <Pressable onPress={()=>{ Alert.alert('Hello') }} style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: colors.blue,
            padding: 10,
            borderRadius: 10,
        }}>
            {/* If the no value is selected display a placeholder provided or just Select */}
            { !value && <Text style={{
                fontSize: 20,
                color: '#606161',
                fontWeight: '200'
            }}>{ placeholder ? 'Dropdown' : 'Select' }</Text>}
            {/* If a value is selected, then show the selected value */}
            <Ionicons name="chevron-thin-down" size={20} color={colors.blue} />
        </Pressable>
  )
}