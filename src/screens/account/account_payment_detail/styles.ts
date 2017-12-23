import {Platform, Dimensions, StyleSheet, ViewStyle, ImageStyle, TextStyle, TextInput} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525',
    } as ViewStyle,

    listView : {
    	flex : 1,
    } as ViewStyle,

    listviewSeparator : {
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor : 'rgba(151, 151, 151, 1.0)',
    } as ViewStyle,  
})