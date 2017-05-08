'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    StyleSheet,
} from 'react-native';

export default class signup extends Component {
    render () {
        return(
        <Text style={styles.container}>signup page</Text>
        );
    }
}

const styles = StyleSheet.create ({
    
    container:{
        flex:1,
    },
    
});