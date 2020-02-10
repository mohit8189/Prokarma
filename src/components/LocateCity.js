import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import styles from '../styles/styles';
import { axios } from '../util/Networking';


class LocateCity extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            wetherStateName: '',
            windDirection: '',
            minTemp: '',
            maxTemp: '',
            humidity: '',
            animating: false
        }
    }

    componentDidMount() {
        const woeid = this.props.navigation.getParam('woeid', null);
        //alert(woeid)
        if (woeid != null) {
            this.setState({
                animating: true
            })

            axios.get(`/location/${woeid}`)
                .then((response) => {

                    this.setState({
                        wetherStateName: response.data.consolidated_weather[0].weather_state_name,
                        windDirection: response.data.consolidated_weather[0].wind_direction_compass,
                        minTemp: response.data.consolidated_weather[0].min_temp,
                        maxTemp: response.data.consolidated_weather[0].max_temp,
                        humidity: response.data.consolidated_weather[0].humidity,
                        animating: false
                    })
                })
                .catch((error) => {
                    this.setState({
                        animating: false
                    })
                    console.log(error)
                })
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formFieldStyle}>

                    <Text style={styles.textStyle}>{this.state.wetherStateName}</Text>

                    <View style={styles.row}>
                        <Text>Wind Direction</Text>
                        <Text style={[styles.textStyle, { marginLeft: 20 }]}>{this.state.windDirection}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Temp Min</Text>
                        <Text style={[styles.textStyle, { marginLeft: 20 }]}>{`${this.state.minTemp}`.substring(0,6)}</Text>
                        <Text style={{ marginLeft: 20 }}>Max</Text>
                        <Text style={[styles.textStyle, { marginLeft: 20 }]}>{`${this.state.maxTemp}`.substring(0,6)}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Humidity</Text>
                        <Text style={[styles.textStyle, { marginLeft: 20 }]}>{this.state.humidity}</Text>
                    </View>

                </View>

                <View style={[styles.container, styles.horizontal]} >
                    <ActivityIndicator animating={`${this.state.animating}`} size="large" color="#ff0000" />
                </View>

            </View>


        );
    }

}

export default LocateCity;