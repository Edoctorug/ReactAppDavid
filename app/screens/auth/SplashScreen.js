import { TouchableHighlight, Text, View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native'
import styleSheet, { colors } from '../../styles'
import Container from '../../Components/Container'

export default function SplashScreen({ navigation }) {

    const { button, text, textPrimary, content } = styleSheet
    const animation = useRef(null);

    const goToRegister = () => {
        navigation.navigate('Register')
    }
  return (
    <Container>
      <View style={[content, {
        alignItems: 'center',
        flex: 1,
        // justifyContent: 'space-between',
        paddingTop: 30,
        paddingBottom: 50
      }]}>
      <Text style={[textPrimary, {
        width: '100%',
        textAlign: 'center'
      }]}>Edoctorug.</Text>

      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: '70%',
            height: '90%',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../../assets/lottie-files/92309-online-doctor.json')}
        />
      </View>
      
      <TouchableHighlight style={[button, {
        maxWidth: 300,
        marginTop: 30,
        paddingVertical: 2
      }]} onPress={goToRegister}>
        <Text style={[text, {
          color: colors.bgPrimary,
        }]}>Get Started</Text>
      </TouchableHighlight>
      </View>
    </Container>
  )
}