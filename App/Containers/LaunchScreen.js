import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput } from 'react-native'
import LoginButton from '../../ignite/DevScreens/LoginButton.js'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />

        
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionTitleLogin}> Welcome! </Text>
            <Text style={styles.sectionLogin}>User</Text>
            <TextInput 
              placeholder='username'
              style={styles.input}
              placeholderTextColor='rgba(255,255,255,0.2)'
            />
            <Text style={styles.sectionLogin}>Password</Text>
            <TextInput 
              placeholder='password'
              style={styles.input}
              placeholderTextColor='rgba(255,255,255,0.2)'
            />
          </View>

          <LoginButton />
        </ScrollView>
      </View>
    )
  }
}
