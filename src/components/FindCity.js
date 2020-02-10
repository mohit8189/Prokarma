import React, { useState } from 'react';
import styles from '../styles/styles';
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { axios } from '../util/Networking';


const FindCity = (props) => {

    const [searchText, setSearchText] = useState('')
    const [animating, setAnimation] = useState(false)


    function onSearch() {
        if (searchText !== '') {
            setAnimation(true)
            axios.get(`/location/search/?query=${searchText}`)
                .then((response) => {
                    setAnimation(false)
                    props.navigation.navigate('LocateCity', {
                        woeid: response.data[0].woeid
                    })
                })
                .catch((error) => {
                    setAnimation(false)
                    console.log(error)
                })

        } else {
            alert("Select location to search")
        }
    }

    return <View style={styles.container}>

        <View style={styles.formFieldStyle}>

            <TextInput style={[styles.inputField, { marginBottom: 20 }]}
                editable={false}
                value={searchText}
            />


            <Button onPress={onSearch} style={[styles.buttonStyle]} title='Search'></Button>

            <View style={{marginTop:20}}>
                <Text onPress={() => { setSearchText("Philadelphia") }} style={styles.pickerTextStyle}>Philadelphia</Text>
                <Text onPress={() => { setSearchText("New Delhi") }} style={styles.pickerTextStyle}>New Delhi</Text>
                <Text onPress={() => { setSearchText("Adelaide") }} style={styles.pickerTextStyle}>Adelaide</Text>
            </View>

        </View>

        <View style={[styles.container, styles.horizontal]} >
            <ActivityIndicator animating={animating} size="large" color="#ff0000" />
        </View>
    </View>

}

export default FindCity;