import { View, Text, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useState } from 'react'
import Container from '../../../Components/Container'
import stylesheet from '../../../styles'
import Select from '../../../Components/Select'

export default function Step2() {
    const { textPrimary, content, input, container, text, button, textDanger } = stylesheet
    const options = ['Patient', 'Doctor', 'Pharmacy', 'Laboratory']
    const [value, setValue] = useState(undefined)
    return (
        <Container>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[content, {
                marginTop: -100,
            }]}
        >
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }} style={[container, {
                    backgroundColor: '#ffeeee'
                }]}
            >
                <View style={[content]}>
                    <Text style={[textPrimary]}>EDoctorug</Text>
                    <Text style={[text, {
                        textAlign: 'center'
                    }]}>Please provide your personal infomation</Text>
                    <TextInput
                        placeholder='First name'
                        onChangeText={(val) => {}}
                        style={[input, {
                            // borderColor: emailError ? colors.danger : colors.blue,
                        }]} />
                    <TextInput
                        placeholder='Last name'
                        onChangeText={(val) => {}}
                        style={[input, {
                            // borderColor: emailError ? colors.danger : colors.blue,
                        }]} />
                    <TextInput
                        placeholder='Username'
                        onChangeText={(val) => {}}
                        style={[input, {
                            // borderColor: emailError ? colors.danger : colors.blue,
                        }]} />
                    <Select options ={ options } value={ value } setValue={ setValue } />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </Container>
    )
}