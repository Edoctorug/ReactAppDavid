import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';

import Container from '../../../Components/Container'
import stylesheet, { colors } from '../../../styles'
import { RegisterFormContext } from '../../../context/RegisterContext' 
import { pickImageAsync, register, uploadImage } from '../../../utils/helpers';

export default function Step3() {
    // Import styles 
    const { button, content, text, card } = stylesheet

    // Use data from the registration context
    const { data, setData } = useContext(RegisterFormContext)

    // Set the role fields the need a lisence
    const linsensables = ['Doctor', 'Pharmacy']

    // Show the upload lisence button if the role selected is lisensable
    const uploadLisence = linsensables.includes(data.role)

    // The lisence image instance
    const [lisence, setLisence] = useState(null)
    const [lisenceError, setLisenceError] = useState(null)

    useEffect(() => {
        if(lisence){
            setLisenceError(null)
            setData({...data, lisence: {
                name: lisence.fileName || 'image.JPG',
                type: lisence.type,
                uri: lisence.uri
              }})
        }
    }, [lisence])
    

    /**
     * Handle user registration
     */
    const handleRegister = async() => {
        const formData = new FormData

        // Construct a FormData instance using the data we have in global registration data
        for (const field in data) {
            formData.append(field, data[field])
        }
        
        try {
            const res = await register(formData)
            console.log(res)
        } catch (error) {
            console.log('HHH', error)
        }
    }
    return (
        <Container>
            <View style={[content, {
                flex: 1
            }]}>
                <EvilIcons name="user" size={200} color={colors.blue} style={
                    {
                        alignSelf: 'center',
                    }
                } />
                {data.first_name && <Text style={[text, {
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: '400'
                }]}>{ data.first_name } { data.last_name }</Text>}
                <View style={[card, {
                    padding: 20,
                    marginTop: data.first_name ? 0 : 10,
                }]}>
                    <View style={{flexDirection: 'row', opacity: .6, backgroundColor: colors.bgPrimary, borderRadius: 10, paddingHorizontal:2, marginBottom: 4}}>
                        <Text style={[text, { fontWeight: '400'}]}>User name: </Text>
                        <Text style={text}>{ data.username }</Text>
                    </View>
                    <View style={{flexDirection: 'row', opacity: .6, backgroundColor: colors.bgPrimary, borderRadius: 10, paddingHorizontal:2, marginBottom: 4}}>
                        <Text style={[text, { fontWeight: '400'}]}>Email: </Text>
                        <Text style={text}>{data.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row', opacity: .6, backgroundColor: colors.bgPrimary, borderRadius: 10, paddingHorizontal:2, marginBottom: 4}}>
                        <Text style={[text, { fontWeight: '400'}]}>Role: </Text>
                        <Text style={text}>{data.role}</Text>
                    </View>
                    { uploadLisence && 
                        <View style={{marginTop: 4}}>
                            {lisenceError && <Text>{ lisenceError }</Text>}
                            <Pressable
                            style={[button, {
                                backgroundColor: colors.bgGreen,
                                marginTop: 0
                            }]}
                            onPress={()=>pickImageAsync(setLisence, setLisenceError)}
                            >
                                <Text style={{
                                    color: colors.bgPrimary,
                                    fontSize: 18
                                }}>{ lisence ? lisence.field ? lisence.field : 'File...' : 'Select Lisence.'}</Text>
                            </Pressable>
                        </View>
                    }
                </View>
                <TouchableOpacity onPress={ handleRegister } style={[button, {
                    padding: 3
                }]}>
                    <Text style={{ color: colors.bgPrimary, fontSize: 24 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}