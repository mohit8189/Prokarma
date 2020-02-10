import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from '../components/LoginScreen'
import FindCity from '../components/FindCity'
import LocateCity from '../components/LocateCity'

const AppNavigator = createStackNavigator(
    {
        Login : LoginScreen,
        FindCity: FindCity,
        LocateCity: LocateCity
    },
    {
        initialRouteName: "Login"
    }
)


export const AppContainer = createAppContainer(AppNavigator)