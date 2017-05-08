'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StatusBar,
    Navigator,
} from 'react-native';

import mainPage from './js/home'

export default class rushproject extends Component {
    
renderScene(route, navigator){ 
    return <route.component navigator={navigator} props={route.passProps} />
}

    render() {
        return (
        <Navigator
            initialRoute={{component: mainPage}}
            renderScene={this.renderScene}/>
    );
  }
}

AppRegistry.registerComponent('rushproject', () => rushproject);



