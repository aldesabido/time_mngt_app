import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import AgendaScreen from './Agenda';
import { Images } from '../DevTheme';

export default class CalendarsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
    this.onDayPress = this.onDayPress.bind(this);
  }
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.goBack()} 
            style={{
              //position: 'absolute',
              paddingTop: 30,
              paddingHorizontal: 5,
              zIndex: 1
            }}>
              <Image source={Images.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>Showing Agenda for: {this.state.selected}</Text>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
        />
        <AgendaScreen passprop={this.state.selected} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});
