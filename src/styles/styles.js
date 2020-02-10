import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formFieldStyle: {
        justifyContent: 'center',
        marginTop: '25%',
        marginLeft: '10%',
        marginRight: '10%',
    },

    textStyle: {
        fontSize: 20
    },

    inputField: {
        borderColor: 'grey',
        marginTop: 10,
        borderWidth: 1,
        height: 50, fontSize: 15, width: '100%'
    },

    pickerTextStyle: {
        borderColor: 'grey',
        borderWidth: 1,
        height: 50, fontSize: 15, width: '90%'
    },
    buttonStyle: { height: 50, width: 150 },

    horizontal: {  
        flexDirection: 'row',  
        justifyContent: 'space-around',  
        padding: 10  
    }  ,
    row:{
        flexDirection:'row',
        marginTop:20
    }
})

export default styles;