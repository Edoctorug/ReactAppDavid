import { View, Text, TouchableOpacity } from 'react-native'
import { useContext } from 'react'
import Container from '../../../Components/Container'
import stylesheet, { colors } from '../../../styles'
import { RegisterFormContext } from '../../../context/RegisterContext' 

export default function Step3() {
    const { button,  } = stylesheet
    const {data} = useContext(RegisterFormContext)
    const handleRegister = () => {
        console.log(data)
    }
    return (
        <Container>
            <TouchableOpacity onPress={ handleRegister } style={[button, {
                padding: 3
            }]}>
                <Text style={{ color: colors.bgPrimary, fontSize: 18 }}>Next</Text>
            </TouchableOpacity>
        </Container>
    )
}