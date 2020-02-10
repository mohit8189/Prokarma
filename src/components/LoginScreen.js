import React from 'react';
import { Alert, Text, View, Button } from 'react-native'
import styles from '../styles/styles';
import { TextInput } from 'react-native-gesture-handler';
import { loginButtonTitle, userNameHint, passwordHint, checkboxTitle, privateKey,USER_PASSWORD, USER_EMAIL } from '../constants/constants';
import CheckBox from 'react-native-check-box';
import { emailValidator, schema } from '../util/Validator';
import AsyncStorage from '@react-native-community/async-storage';
var CryptoJS = require("crypto-js");



export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userName: '', password: '', isChecked: false };
    }

    componentDidMount() {

        AsyncStorage.multiGet([USER_PASSWORD, USER_EMAIL, 'isChecked']).
            then((values) => {
                let passwordCiphertext = values[0][1]
                let emailCiphertext = values[1][1]
                let checked = values[2][1] === 'true' ? true : false


                if (checked) {

                    let passwordBytes = CryptoJS.AES.decrypt(passwordCiphertext.toString(), privateKey);
                    let passwordText = passwordBytes.toString(CryptoJS.enc.Utf8);

                    let userNameBytes = CryptoJS.AES.decrypt(emailCiphertext.toString(), privateKey);
                    let userNameText = userNameBytes.toString(CryptoJS.enc.Utf8);

                    this.setState({
                        userName: userNameText,
                        password: passwordText,
                        isChecked: checked
                    })
                }
            })

    }


    storeData = async (values) => {
        try {
            await AsyncStorage.multiSet(values)
        } catch (e) {
            console.log("error while saving data", JSON.stringify(e))
        }
    }


    clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            console.log("error while clear data", JSON.stringify(e))
        }
    }


    onSubmit = () => {
        if (!emailValidator.validate(this.state.userName)) {
            alert('Invalid email');
            return;
        }
        if (!schema.validate(this.state.password)) {
            alert('Invalid password');
            return;
        }
        if (this.state.isChecked) {
            let passwordCipher = CryptoJS.AES.encrypt(this.state.password, privateKey);
            let emailCipher = CryptoJS.AES.encrypt(this.state.userName, privateKey)

            this.storeData([[USER_PASSWORD, passwordCipher.toString()], [USER_EMAIL,
                emailCipher.toString()], ["isChecked", `${this.state.isChecked}`]])
        }

        this.props.navigation.navigate('FindCity')

    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formFieldStyle}>
                    <TextInput
                        value={this.state.userName}
                        style={styles.inputField}
                        placeholder={userNameHint}
                        onChangeText={(text) => this.setState({ userName: text })}
                    />

                    <TextInput
                        value={this.state.password}
                        style={styles.inputField}
                        placeholder={passwordHint}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <CheckBox
                        style={{ marginTop: 15 }}
                        onClick={() => {
                            this.setState({
                                isChecked: !this.state.isChecked
                            }, () => {
                                if (!this.state.isChecked) {
                                    this.clearAll()
                                }
                            })
                        }}
                        isChecked={this.state.isChecked}
                        rightText={checkboxTitle}
                    />
                </View>

                <Button style={styles.buttonStyle} onPress={this.onSubmit} title={loginButtonTitle}></Button>
            </View>
        );
    }


}


