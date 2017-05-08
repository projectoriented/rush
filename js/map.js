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
//const LATITUDE = 40.748817;
//const LONGITUDE = -73.985428;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
            lastPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            potbelly: {
                latitude: 40.749110,
                longitude: -73.984689,
            },
        };
        
        //this.onButtonPress = this.onButtonPress.bind(this)
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

componentDidMount() {
      // Get the current position from the build in geolocation chip, and store in state
      navigator.geolocation.getCurrentPosition((position) => {
         // Parse the position variables to floats
         var lat = parseFloat(position.coords.latitude)
         var long = parseFloat(position.coords.longitude)

         // Create object with the current position
         var initialRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         }

         // Set the current position and the marker in sate
         this.setState({initialPosition: initialRegion})
         this.setState({markerPosition: initialRegion})
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

      // Create a event watcher for changes in position from the geolocation chip
      this.watchID = navigator.geolocation.watchPosition((position) => {
         // Parse the position variables to floats
         var lat = parseFloat(position.coords.latitude)
         var long = parseFloat(position.coords.longitude)

         // Create object with the current position
         var lastRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
         }

         // Set the current position and the marker in sate
         this.setState({initialPosition: lastRegion})
         this.setState({markerPosition: lastRegion})
      })
   }

   // Will stop watching for changes in position when the component is unmounted
   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
   }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={ true } />
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    region={this.state.initialPosition}
                >
                <MapView.Marker 
                    coordinate={this.state.potbelly}>
                        <MapView.Callout>
                            <View>
                                <Text>Potbelly Sandwich Shop</Text>
                                <Text>Insert icons here</Text>            
                            </View>
                        </MapView.Callout>
                </MapView.Marker>
                <MapView.Marker coordinate={this.state.markerPosition}>
                  <View style={styles.radius}>
                     <View style={styles.marker} />
                  </View>
                </MapView.Marker>
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.markerPosition} >
                            <Image source={require('../images/001-target.png')}
                                style={{height:40,width:40}}/>
                                </TouchableOpacity>
                            <Text>              </Text>
                        <TouchableOpacity onPress={this.onButtonPress.bind(this)} >    
                            <Image source={require('../images/user.png')} 
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
    radius: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker: {
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
});

module.exports = map;
