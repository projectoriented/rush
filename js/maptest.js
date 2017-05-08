import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Image,
    TouchableHighlight,
} from 'react-native';
import MapView from 'react-native-maps';
import signup from './signup';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 40.748817;
const LONGITUDE = -73.985428;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
        };
        
        this.onButtonPress = this.onButtonPress.bind(this)
    }
    
    watchID: ?number = null
    
    onButtonPress(){
        console.log('pressed');
    }
    
    linker(comp){
        this.props.navigator.push({
        component:comp
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={ true } />
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}
                >
                <MapView.Marker 
                    coordinate={this.state.coordinate}
                    //image= {require('./images/001-smiling.png')}
                >
                <MapView.Callout>
                    <View>
                        <Text>Title of the location</Text>
                        <Text>Insert icons here</Text>            
                    </View>
                </MapView.Callout>

                </MapView.Marker>
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this)} >
                            <Image source={require('./images/001-target.png')}
                                style={{height:40,width:40}}/>
                                </TouchableOpacity>
                            <Text>              </Text>
                        <TouchableOpacity onPress={this.onButtonPress.bind(this)} >    
                            <Image source={require('./images/user.png')} 
                                style={{height:37,width:37}}/>
                                </TouchableOpacity>
                    </View>                
            </View>
            );
        }
    }
//<TouchableHighlight onPress={this.linker.bind(this, signup)} underlayColor={'transparent'} activeOpacity={0.2}>
                    
map.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    opacity: 0.65,
  },
});

module.exports = map;
