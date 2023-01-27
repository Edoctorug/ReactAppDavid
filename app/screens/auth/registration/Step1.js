import { useState, useContext } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableHighlight, Platform, Keyboard } from 'react-native'
import Container from '../../../Components/Container'
import { RegisterFormContext } from '../../../context/RegisterContext'
import stylesheet, { colors } from '../../../styles'
import { validatedPassword, validateEmail } from '../../../utils/helpers'
import { useForm } from '../../../utils/hooks'

export default function RegisterScreen({ navigation }) {
    const { data, setData } = useContext(RegisterFormContext)
    const { textPrimary, content, input, container, text, button, textDanger } = stylesheet
    const [formData, dispatch] = useForm({email: '', password1: '', password2: ''})

    const [errors, setErrors] = useState({})

    const next = () => {
        const emailValidation = validateEmail(formData.email)
        const passwordValidation = validatedPassword(formData.password1, formData.password2)
        if(emailValidation.email && passwordValidation.password){
            setData({
                ...data, 
                email: emailValidation.email, 
                password: passwordValidation.password
            })
            navigation.navigate('Step 2')
        }
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

                        <TextInput
                            placeholder='Email Address'
                            value={formData.email}
                            onChangeText={(val) => {dispatch({email: val})}}
                            style={[input, {
                            }]} />

                        <TextInput
                            placeholder='Password'
                            secureTextEntry value={formData.password1}
                            onChangeText={(val) => dispatch({password1: val})}
                            style={[input, {
                            }]} />
                        <TextInput
                            placeholder='Confirm Password'
                            secureTextEntry value={formData.password2}
                            onChangeText={(val) => dispatch({password2: val})}
                            style={[input, {
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