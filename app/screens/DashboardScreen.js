import { Text, Pressable, View, Image } from 'react-native'

import Container from '../Components/Container'
import { pickImageAsync, uploadImage } from '../utils/helpers'
import styles, { colors } from '../styles'
import { useState } from 'react'
import { post, setConfig } from '../utils/apiHandlers'

export default function DashboardScreen() {
  const { button } = styles  
  const [image, setImage] = useState(null)
  const [pickError, setPickError] = useState(null)

  const handleUpload = () => {
    const formData = uploadImage(image)
    console.log(formData)
    // try {
    //   const res = await post('upload', formData, null, 'multipart/form-data')
    //   console.log(res.data)
    // } catch (error) {
    //   console.log(error.response.data)
    // }
  }
  
  return (
    <Container>
      <View style={{ padding: 20, width: '100%', flex: 1 }}>
        {!image && <Pressable
          style={[button, {
              backgroundColor: colors.bgGreen,
              marginVertical: 10
          }]}
          onPress={()=>pickImageAsync(setImage, setPickError)}
          >
              <Text style={{
                  color: colors.bgPrimary,
                  fontSize: 18
              }}>Select Lisense.</Text>
          </Pressable>}
          {
            image && <Image source={{uri: image.uri}} style={{
              width: 110,
              height: 120
            }}/>
          }
          <Pressable
          style={[button, {
              backgroundColor: colors.bgGreen,
              marginVertical: 10
          }]}
          onPress={ handleUpload }
          >
              <Text style={{
                  color: colors.bgPrimary,
                  fontSize: 18
              }}>Upload</Text>
          </Pressable>
        </View>
    </Container>
  )
}