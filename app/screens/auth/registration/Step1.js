import { useState, useContext } from 'react'
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput, TouchableOpacity, TouchableHighlight, Platform, Keyboard } from 'react-native'
import Container from '../../../Components/Container'
import { RegisterFormContext } from '../../../context/RegisterContext'
import stylesheet, { colors } from '../../../styles'
import { validatedPassword, validateEmail } from '../../../utils/helpers'
import { useForm } from '../../../utils/hooks'

export default function RegisterScreen({ navigation }) {
    const { data, setData } = useContext(RegisterFormContext)
    const { textPrimary, content, input, container, text, button, textDanger } = stylesheet
    const [formData, dispatch] = useForm({email: '', password1: '', password2: ''})

    const [errors, setErrors] = useState({email: null, password: null})

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
        }else{
            passwordValidation.error 
            ? setErrors({...errors, password: passwordValidation.error}) 
            : setErrors({...errors, password: null})

            emailValidation.error 
            ? setErrors({...errors, email: emailValidation.error}) 
            : setErrors({...errors, email: null})

        }
    }

    const goToLogin = () => {
        navigation.navigate('Login')
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

                        {errors.email && <Text style={textDanger}>{ errors.email }</Text>}
                        <TextInput
                            placeholder='Email Address'
                            value={formData.email}
                            onChangeText={(val) => {dispatch({email: val})}}
                            style={[input, {
                            }]} />

                        {errors.password && <Text style={textDanger}>{ errors.password }</Text>}
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
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'center',
                    marginTop: 20,
                }}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={[text, {
                            color: colors.blue
                        }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Container>
    )
}