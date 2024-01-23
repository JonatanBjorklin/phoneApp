import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../components/home';
import News from '../components/news';
import Weather from '../components/weather';
import newsDetails from '../components/newsDetails';
import newsPage from '../components/newsPage';

const components = {
    Home: {
        screen: Home
    },
    News: {
        screen: News
    },
    Weather: {
        screen: Weather
    },
    newsDetails: {
        screen: newsDetails
    },
    newsPage: {
        screen: newsPage
    }

}

const HomeStack = createStackNavigator(components);

export default createAppContainer(HomeStack);