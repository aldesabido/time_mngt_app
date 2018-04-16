import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Calendars from './Calendars'
import CalendarsList from './CalendarsList' 

class MenuScreen extends Component {
  constructor(props){
    super(props);
  }
  onCalendarsPress = () => {
    this.props.navigation.navigate('Calendars')
  }

  onCalendarListPress = () => {
    this.props.navigation.navigate('CalendarsList')
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.menu} onPress={this.onCalendarsPress}>
          <Text style={styles.menuText}>Calendars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={this.onCalendarListPress}>
          <Text style={styles.menuText}>Calendar List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1
  },
  menuText: {
    fontSize: 18
  }
});

export default StackNavigator({
  Calendars: {screen: Calendars},
  CalendarsList: {screen: CalendarsList}
})