import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput } from 'react-native'
import LoginButton from '../../ignite/DevScreens/LoginButton.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
    }
  }

  onChangeText(value){
    this.setState({
          username:value
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
          <View style={styles.section} >
            <Text style={styles.sectionTitleLogin}> Welcome! </Text>
            <Text style={styles.sectionLogin}>User</Text>
            <TextInput 
              placeholder='username'
              style={styles.textInput}
              value={this.state.username}
              onChangeText={(value) => this.onChangeText(value)}
              placeholderTextColor='rgba(255,255,255,0.2)'
            />
            <Text style={styles.sectionLogin}>Password</Text>
            <TextInput 
              placeholder='password'
              style={styles.textInput}
              placeholderTextColor='rgba(255,255,255,0.2)'
            />
          </View>
          <LoginButton username={this.state.username} />
        </ScrollView>
      </View>
    )
  }
}
