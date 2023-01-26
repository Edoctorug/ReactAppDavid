import { View, Text, Pressable, StyleSheet, Modal, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../styles'

export default function Select({ options, value, setValue }) {
    if(!options){
        return null
    }
    const [open, setOpen] = useState(false)
    
    const handleSelect = (val) => {
        setValue(val)
        setOpen(false)
    }
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={open}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setOpen(!open);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headerText}>Select a Role</Text>
                            <Pressable
                                style={styles.modalCloseBtn}
                                onPress={() => setOpen(!open)}
                            >
                                <AntDesign name="close" size={24} color={colors.danger} />
                            </Pressable>
                        </View>
                        <View style={styles.modalContent}>
                            { options && options.map((opt, key) => (
                                <Pressable
                                    key={key}
                                    style={[styles.button, styles.option]}
                                    onPress={ () => { handleSelect(opt) } }>
                                    <Text style={styles.optionText}>{ opt }</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable 
                style={styles.button}
                onPress={() => setOpen(true)}
            >
                <Text style={styles.buttonText}>{value ? value : 'Select Role'}</Text>
                <Feather name="chevron-down" size={30} color="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 9,
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '200'
    },
    modalCloseBtn: {
        borderColor: colors.danger,
        borderWidth: 1,
        borderRadius: 5,
        padding: 2
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        padding: 20
    },
    modalView: {
        backgroundColor: 'white',
        // opacity: .6,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        minHeight: Dimensions.get('window').height/2,
        width: '90%'
    },
    modalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 2,
        width: '100%'
    },
    headerText: {
        fontSize: 24,
        fontWeight: '300',
    },
    modalContent: {
        padding: 10,
        width: '100%'
    },
    option: {
        margin: 5
    },
    optionText: {
        fontSize: 18,
        fontWeight: '200'
    }
})