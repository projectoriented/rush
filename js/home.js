'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';

import map from './map';

export default class mainPage extends Component {
    
    linker(comp){
        this.props.navigator.push({
            component:comp
        })
    }

    
    render() {
           
        return (  
            <View style={styles.container}>
            
                <Text style={styles.logoh}>Rush</Text>
                <TouchableHighlight onPress={this.linker.bind(this, map)} underlayColor={'transparent'}>
                    <Image source={require('../images/Exercise-50.png')} style={{width:50, height: 50, marginTop: 200}}/>
                </TouchableHighlight>
            </View>
        );
      }
    }


    const styles = StyleSheet.create({

        
    container: {
        flex: 1,
        height: null,
        width: null,
        alignItems: "center",
        backgroundColor: "rgb(102,205,170)"
      },
    
    logoh: {
        flexDirection: 'row',
        marginTop: 195,
        textAlign: 'center',
        fontSize: 70,
        fontFamily: 'Avenir-Heavy',
        fontStyle: 'italic',
        color: 'black'
        
        
    }
});