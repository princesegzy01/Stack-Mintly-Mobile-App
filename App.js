/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    Icon,
    // AppRegistry,
    Image, // we want to use an image
    PanResponder, // we want to bring in the PanResponder system
    Animated // we wil be using animated value,
  } from 'react-native';
//   import Camera from 'react-native-camera';
  import { RNCamera, FaceDetector } from 'react-native-camera';


export default class App extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        pan: new Animated.ValueXY(),
        scale: new Animated.Value(1),
        locationX : 0,
        locationY : 0,
        width : 50,
        height : 126,

      };
    }

    

    takePicture() {

        console.log("Alaye : ", this.state.locationY)

        const options = {};
        //options.location = ...
        // this.camera.capture({metadata: options})
        //   .then((data) => console.log(data))
        //   .catch(err => console.error(err));
        
        this.camera.
        this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.log("Err : ", err))
    }

    takePicture2 = async () => {
        try {
          const imageData = await this.camera.takePictureAsync();
          console.log('Path to image: ' + imageData.uri);
        
          // fname = new Date().toDateString()
          fname = Math.round(+new Date()/1000);

          const data = new FormData();
          data.append('locationX', this.state.locationX); // you can append anyone.
          data.append('locationY', this.state.locationY); // you can append anyone.
          data.append('width', this.state.width); // you can append anyone.
          data.append('height', this.state.height); // you can append anyone.
          data.append('photo', {
            uri: imageData.uri,
            type: 'image/jpeg', // or photo.type
            name: fname + '.jpg'
          });

          fetch("http://192.168.4.112:5000/stackmint", {
            method: 'POST',
            body: data
          }).then(res => {
            console.log(res)

            if(res.status == 200){
                Alert.alert(
                    'Success',
                    'Operations Successfull',
                    [
                    //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    //   {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
          });


        } catch (err) {
           console.log('err: ', err);
        }
      };

  
    componentWillMount() {
      this._panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
  
        onPanResponderGrant: (e, gestureState) => {
          // Set the initial value to the current state
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
          Animated.spring(
            this.state.scale,
            { toValue: 1.1, friction: 3 }
          ).start();
        },
  
        // When we drag/pan the object, set the delate to the states pan position
        onPanResponderMove: Animated.event([
          null, {dx: this.state.pan.x, dy: this.state.pan.y},
        ]),
  
        onPanResponderRelease: (e, {vx, vy}) => {
          // Flatten the offset to avoid erratic behavior
          this.state.pan.flattenOffset();

          this.setState({"locationX":this.state.pan.x._value})
          this.setState({"locationY":this.state.pan.y._value})
          
          console.log(this.state.locationY, " -- ", this.state.locationX , " -- ", this.state.height , " -- ", this.state.width)


          Animated.spring(
            this.state.scale,
            { toValue: 1, friction: 3 }
          ).start();
        }
      });
    }
  
    render() {
      // Destructure the value of pan from the state
      let { pan, scale } = this.state;
  
      // Calculate the x and y transform from the pan value
      let [translateX, translateY] = [pan.x, pan.y];
        

      
      let rotate = '0deg';
  
      // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
      let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
  
      return (

         <View style={styles.container}>
            <RNCamera
            ref={(cam) => {
                this.camera = cam;
            }} style={styles.preview}>
                <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
                    {/* <Image source={require('./assets/panresponder.png')} /> */}
                    {/* <div style={imageStyle}></div> */}
                    
                    {/* <Text style={styles.imageStylex}>segun</Text> */}
                    <Text style={styles.imageStylex}></Text>

                </Animated.View>

                <Text style={styles.capture} onPress={this.takePicture2.bind(this)}>[CAPTURE]</Text>
            </RNCamera>
        </View>
      );
    }
  
  }
  

  
  const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
    // },
    imageStylex : {
        width : 50,
        height : 126,
        // color : 'red',
        backgroundColor : 'red',
        opacity: 0.25,
    },

    container: {
        flex: 1,
        flexDirection: 'row',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },

    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
      },


  });
  
//   AppRegistry.registerComponent('panresponder_demo', () => panresponder_demo);
  