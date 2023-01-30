import { StyleSheet } from "react-native"

export const colors = {
    bgPrimary: '#7a92bf',
    bgGreen: '#04783e',
    danger: '#f20202',
    blue: '#1a3ad9',
    card: '#9ebde6'
}

export default StyleSheet.create({
    button: {
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        width: '100%',
        borderRadius: 10
    },

    card: {
        backgroundColor: colors.card,
        padding: 10,
        borderRadius: 10,
    },

    container: {
        flex: 1,
        backgroundColor: colors.bgPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    content: {
        width: '100%',
        paddingHorizontal: 20,
    },

    textDanger: {
        color: colors.danger,
        fontSize: 14,
        fontWeight: '100',
        width: '100%',
    },

    input: {
        borderColor: colors.blue,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        with: '100%',
        marginBottom: 20,
        fontSize: 20,
        fontWeight: '200',
    },

    text: {
        fontSize: 20,
        fontWeight: '200',
        marginVertical: 5,
        padding: 5,
    },

    textPrimary: {
        color: colors.blue,
        fontWeight: 'bold',
        fontSize: 32,
        marginHorizontal: 'auto',
        marginTop: 20,
        width: '100%',
        textAlign: 'center'
    }



})