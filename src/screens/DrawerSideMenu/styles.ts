/**
 * Created by Denis Smirnov on 25/04/2017.
 */

import {Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#252525',
    },
    controlText: {
        color: 'white',
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#252525',
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: 50,
        marginBottom: 10
    },
    listItemTitle: {
        fontSize: 16,
        flexShrink: 1,
        color: '#fff',
        alignSelf : 'center',
		fontFamily: 'Sofia Pro'
    } as TextStyle,
    listItemImage: {
        width: 30,
        height: 25,
        resizeMode: 'contain',
        borderRadius: 1,
        marginRight: 20,
        alignSelf : 'center',
    } as ImageStyle,

    content: {
        backgroundColor: '#252525',
    },

    header: {
        height: 180,
        flex: 1,
        padding: 16,
        backgroundColor: '#252525',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerInfo: {
        height: 56
    },
    headerIcon: {
        width: 70,
        height: 70,
        marginBottom: 10,
    },
    headerTitle: {
        color: '#f8981d',
        fontSize: 19,
        marginTop: 5,
        fontFamily: 'Sofia Pro'
    } as TextStyle,
})