import { useState } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableHighlight, Platform, Keyboard } from 'react-native'
import Container from '../../../Components/Container'
import stylesheet, { colors } from '../../../styles'

export default function RegisterScreen({ navigation }) {
    const { textPrimary, content, input, container, text, button, textDanger } = stylesheet
    const [data, setData] = useState({email: '', password1: '', password2: ''})

    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const next = () => {
        navigation.navigate('Step 2')
    }


    return (
        <Container>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[content, {
                    marginTop: -100,
                }]}
            >
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} style={[container, {
                    backgroundColor: '#ffeeee'
                }]}>
                    <View style={[content]}>
                        <Text style={textPrimary}>EDoctorUG,</Text>
                        <Text style={text}>Please create your account.</Text>

                        {emailError && <Text style={textDanger}>{emailError}</Text>}
                        <TextInput
                            placeholder='Email Address'
                            value={data.email}
                            onChangeText={(val) => setData({ ...data, email: val.trim() })}
                            style={[input, {
                                borderColor: emailError ? colors.danger : colors.blue,
                            }]} />

                        {passwordError && <Text style={textDanger}>{passwordError}</Text>}
                        <TextInput
                            placeholder='Password'
                            secureTextEntry value={data.password1}
                            onChangeText={(val) => setData({ ...data, password1: val.trim() })}
                            style={[input, {
                                borderColor: passwordError ? colors.danger : colors.blue,
                            }]} />
                        <TextInput
                            placeholder='Confirm Password'
                            secureTextEntry value={data.password2}
                            onChangeText={(val) => setData({ ...data, password2: val.trim() })}
                            style={[input, {
                                borderColor: passwordError ? colors.danger : colors.blue,
                            }]} />
                        <TouchableHighlight onPress={next} style={[button, {
                            maxWidth: 100,
                            alignSelf: 'flex-end',
                            padding: 3
                        }]}>
                            <Text style={{ color: colors.bgPrimary, fontSize: 18 }}>Next</Text>
                        </TouchableHighlight>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Container>
    )
}