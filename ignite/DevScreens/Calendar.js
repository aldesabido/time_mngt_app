// An All Components Screen is a great way to dev and quick-test components
import React from 'react'
import { Platform, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { Images } from './DevTheme'
import styles from './Styles/ComponentExamplesScreenStyles'

// Examples Render Engine
import ExamplesRegistry from '../../App/Services/ExamplesRegistry'

class Calendar extends React.Component {
  
  render () {
    return (
      <View style={[styles.container, styles.mainContainer]}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 5,
          zIndex: 10
        }}>
          <Image source={Images.backButton} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <Text> HELLO THERE! </Text>
        </ScrollView>
      </View>
    )
  }
}

export default Calendar
