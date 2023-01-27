import { 
    View, 
    Text, 
    KeyboardAvoidingView, 
    Platform, 
    Keyboard, 
    TouchableWithoutFeedback, 
    TextInput,
    TouchableHighlight
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Container from '../../../Components/Container'
import stylesheet, { colors } from '../../../styles'
import Select from '../../../Components/Select'
import { RegisterFormContext } from '../../../context/RegisterContext'
import { useForm } from '../../../utils/hooks'

export default function Step2({ navigation }) {
    const { data, setData } = useContext(RegisterFormContext)
    
    const [formData, dispatch] = useForm({
        first_name: '',
        last_name: '',
        username: '',
        role: ''
    })
    const { textPrimary, content, input, container, text, button, textDanger } = stylesheet
    const options = ['Patient', 'Doctor', 'Pharmacy', 'Laboratory']
    const [value, setValue] = useState(undefined)
    const [roleError, setRoleError] = useState(null)

    const next = () => {
        if(!value){
            setRoleError(1)
        }else{
            setData({
                ...data,
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                role: formData.role
            })

            navigation.navigate('Step 3')
        }
    }

    useEffect(()=>{
        if(value){
            dispatch({
                role: value
            })
            setRoleError(null)
        }
    }, [value])

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
                        value={ formData.first_name }
                        onChangeText={(val) => dispatch({ first_name: val })}
                        style={ input } />
                    <TextInput
                        placeholder='Last name'
                        value={ formData.last_name }
                        onChangeText={(val) => dispatch({ last_name: val })}
                        style={ input } />
                    <TextInput
                        placeholder='Username'
                        value={ formData.username }
                        onChangeText={(val) => dispatch({ username: val })}
                        style={ input } />
                    <Select options ={ options } value={ value } error={roleError} setValue={ setValue } />
                    <TouchableHighlight onPress={ next } style={[button, {
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