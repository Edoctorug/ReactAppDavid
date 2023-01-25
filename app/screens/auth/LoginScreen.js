import { 
    View, 
    Text, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    TouchableHighlight,
    
} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import stylesheet, { colors } from '../../styles.js'
import Container from '../../Components/Container'
import { login } from '../../utils/apiHandlers.js'

export default function LoginScreen({ navigation }) {
    
    const { textPrimary, content, input, container, text, button, textDanger } = stylesheet
    const [data, setData] = useState({email: '', password: ''})
    
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const handleSubmit = async() => {
        Keyboard.dismiss()
        handleValidation()

        if(data.email === '' || data.password === ''){
            console.log('empty cridentials')
            return
        }
        try {
            const login_res = await login(data.email, data.password)
            
            await storeData(login_res)
        } catch (error) {
            console.log('Login error: ',error)
        }

    }

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('auth', JSON.stringify(value))
        } catch (e) {
          console.log(e)
        }
      }

    const handleValidation = () => {
        if(data.password.trim() === '' || data.password.trim().length < 6) {
            setPasswordError('The password is too short')
            
        }
        if(data.email.trim() === '') {
            setEmailError('Please enter a valid email address')
            
        }
    }

    const goToRegister = () => {
        navigation.navigate('Register')
    }

  return (
    <Container>
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={[content, {
            marginTop: -200,
        }]}
    >
        <TouchableWithoutFeedback onPress={()=> { Keyboard.dismiss() }} style={[container,{
            backgroundColor: '#ffeeee'
        }]}>
            <View style={content}>
                <Text style={[textPrimary]}>EDoctorUG</Text>
                <Text style={ text }>Please login.</Text>

                {emailError && <Text style={textDanger}>{ emailError }</Text>}
                <TextInput 
                    placeholder='Email or Username'
                    value={data.email} 
                    onChangeText={(val)=> setData({...data, email: val.trim()})}
                    style={[input, {
                        borderColor: emailError? colors.danger : colors.blue,
                    }]} /> 

                {passwordError && <Text style={textDanger}>{ passwordError }</Text>}
                <TextInput 
                    placeholder='Password' 
                    secureTextEntry value={data.password} 
                    onChangeText={(val)=> setData({...data, password: val.trim()})} 
                    style={[input, {
                        borderColor: passwordError ? colors.danger : colors.blue,
                    }]} /> 
                <TouchableHighlight onPress={handleSubmit} style={button}>
                    <Text style={{color: colors.bgPrimary, fontSize: 24}}>Login</Text>
                </TouchableHighlight>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'center',
                    marginTop: 20,
                }}>
                    <Text>Not yet a member? </Text>
                    <TouchableHighlight onPress={goToRegister}>
                        <Text style={[text, {
                            color: colors.blue
                        }]}>Register</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </Container>
  )
}
