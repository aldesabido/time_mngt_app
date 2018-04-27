import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import AgendaScreen from './Agenda';
import { Images } from '../DevTheme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateActions from '../../../App/Redux/DateRedux';

class CalendarsScreen extends React.Component {
  constructor(props) {
    super(props);
    var { params } = this.props.navigation.state
/*     this.state = {
      selected: params.passprop
    }; */
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentWillMount(){
    this.props.setDate('');
  }
  
  onDayPress(day){
    this.setState({
      selected: day.dateString
    });
    this.props.setDate(day.dateString);
    //this.props.navigation.navigate('Agenda', {passprop: day.dateString});
    this.props.navigation.navigate('Agenda');
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Text style={styles.text}>Please tap a date</Text>
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.props.selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
        />
      </View>
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
    backgroundColor: '#FFE5E5'
  }
});

const mapStateToProps = state => ({
  selectedDate: state.date,
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(DateActions,dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(CalendarsScreen);
