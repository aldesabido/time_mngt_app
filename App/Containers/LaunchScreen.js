import React, { Component } from 'react'
import { 
  ScrollView, 
  Text, 
  Image, 
  View, 
  TextInput,
  Keyboard,
  Platform,
} from 'react-native'
import LoginButton from '../../ignite/DevScreens/LoginButton.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

const isAndroid = Platform.OS == "android";

const viewPadding = 10;

export default class LaunchScreen extends Component {
  constructor(){
    super();
    this.state = {
      //TODO: CHANGE THIS BACK
      username: 'Test',
      password: '',
    }
  }

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );
    
  }

  onChangeName(value){
    this.setState({
          username:value
    });
  }

  onChangePassword(value){
    this.setState({
          password:value
    });
  }
  
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
          </View>
          <Text style={styles.sectionTitleLogin}> Welcome! </Text>
          <View style={styles.section} >
            <Text style={styles.sectionLogin}>User</Text>
            <TextInput 
              placeholder='username'
              style={styles.textInput}
              value={this.state.username}
              onChangeText={(value) => this.onChangeName(value)}
              //placeholderTextColor='rgba(255,255,255,0.2)'
            />
            <Text style={styles.sectionLogin}>Password</Text>
            <TextInput 
              placeholder='password'
              style={styles.textInput}
              secureTextEntry = {true}
              onChangeText={(value) => this.onChangePassword(value)}
              //placeholderTextColor='rgba(255,255,255,0.2)'
            />
          </View>
          <LoginButton username={this.state.username} />
        </ScrollView>
      </View>
    )
  }
}
