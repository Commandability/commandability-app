import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import IncidentPage from './components/pages/IncidentPage';
import ReportPage from './components/pages/ReportPage';


const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root'>
                <Scene key='login' component={LoginPage} title='Please Login' initial ></Scene>
                <Scene key='main' component={MainPage} title='Main Page'></Scene>
                <Scene key='incident' component={IncidentPage} title='Incident Page'></Scene>
                <Scene key='report' component={ReportPage} title='Report Page'></Scene>
            </Scene>
        </Router>
    );
}

export default RouterComponent;