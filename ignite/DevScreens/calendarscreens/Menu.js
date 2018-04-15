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
import HorizontalCalendarsList from './HorizontalCalendarList'
import Agenda from './Agenda'

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

  onHorizontalCalendarListPress = () => {
    this.props.navigation.navigate('HorizontalCalendarList')
  }

  onAgendaPress = () => {
    this.props.navigation.navigate('Agenda')
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
        <TouchableOpacity style={styles.menu} onPress={this.onHorizontalCalendarListPress}>
          <Text style={styles.menuText}>Horizontal Calendar List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu} onPress={this.onAgendaPress}>
          <Text style={styles.menuText}>Agenda</Text>
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
  Menu: {screen: MenuScreen},
  Calendars: {screen: Calendars},
  CalendarsList: {screen: CalendarsList},
  HorizontalCalendarsList: {screen: HorizontalCalendarsList},
  Agenda: {screen: Agenda}
})