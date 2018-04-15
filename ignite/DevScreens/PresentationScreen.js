import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from './DevTheme'
import ButtonBox from './ButtonBox'
import { StackNavigator } from 'react-navigation'
// Screens
import APITestingScreen from './APITestingScreen'
import ComponentExamplesScreen from './ComponentExamplesScreen'
import PluginExamplesScreen from './PluginExamplesScreen'
import ThemeScreen from './ThemeScreen'
import FaqScreen from './FaqScreen'
import Calendar from './Calendar'
import TodoList from './TodoList'

// Styles
import styles from './Styles/PresentationScreenStyles'

class PresentationScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  // openComponents = () => {
  //   this.props.navigation.navigate('ComponentExamplesScreen')
  // }

  // openUsage = () => {
  //   this.props.navigation.navigate('PluginExamplesScreen')
  // }

  // openApi = () => {
  //   this.props.navigation.navigate('APITestingScreen')
  // }

  // openTheme = () => {
  //   this.props.navigation.navigate('ThemeScreen')
  // }

  // openFaq = () => {
  //   this.props.navigation.navigate('FaqScreen')
  // }

  openCalendar = () => {
    this.props.navigation.navigate('Calendar')
  }

  openTodoList = () => {
    this.props.navigation.navigate('TodoList')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.backgroundImage} resizeMode='stretch' />
        <TouchableOpacity onPress={this.props.screenProps.toggle} style={{
          position: 'absolute',
          paddingTop: 30,
          paddingHorizontal: 10,
          zIndex: 10
        }}>
          <Image source={Images.closeButton} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
          </View>

          <Text style={styles.sectionText}>
            Hi there, {this.props.screenProps.username} !
          </Text>
          {/* <View style={styles.buttonsContainer}>
            <ButtonBox onPress={this.openComponents} style={styles.componentButton} image={Images.components} text='Components' />
            <ButtonBox onPress={this.openUsage} style={styles.usageButton} image={Images.usageExamples} text='Plugin Examples' />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={this.openApi} style={styles.apiButton} image={Images.api} text='API Testing' />
            <ButtonBox onPress={this.openTheme} image={Images.theme} text='Theme' />
          </View> */}
          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={this.openCalendar} text='Calendar' />
            <ButtonBox onPress={this.openTodoList} text='TodoList' />
            {/*<ButtonBox onPress={this.openFaq} style={styles.usageButton} image={Images.faq} text='FAQ' />*/}
          </View>
        </ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Made with ❤️ by Infinite Red</Text>
        </View>
      </View>
    )
  }
}

export default StackNavigator({
  PresentationScreen: {screen: PresentationScreen},
  APITestingScreen: {screen: APITestingScreen},
  ComponentExamplesScreen: {screen: ComponentExamplesScreen},
  PluginExamplesScreen: {screen: PluginExamplesScreen},
  ThemeScreen: {screen: ThemeScreen},
  FaqScreen: {screen: FaqScreen},
  Calendar: {screen: Calendar},
  TodoList: {screen: TodoList}
}, {
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  initialRouteName: 'PresentationScreen',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})
