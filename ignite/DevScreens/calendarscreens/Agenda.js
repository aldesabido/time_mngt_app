import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Calendars from './Calendars';
import { Images } from '../DevTheme';
import styles from './AgendaStyles'

//imports by Dan huehue
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';

export default class AgendaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      name: 'Activity Name',
      startTime: '',
      endTime: '',
      date: '',
      //Modal things switchers
      isMainModalVisible : false,
      isActivityModalVisible : false,
    }
  }

  toggleMainModal = () =>{
    this.setState({ isMainModalVisible: ! this.state.isMainModalVisible });
  }


  render() {
    var {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.goBack()} 
            style={styles.button}>
              <Text style={styles.buttonText}>back to Calendar</Text>
        </TouchableOpacity>
        <Text style={{alignItems: 'center'}}>
          Week's Agenda
        </Text>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={params.passprop}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          hideKnob = {true}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#666'},
          //    '2017-05-09': {textColor: '#666'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={this.toggleMainModal}
        />
        {
          /*
          *
          * Form Component what will show up on action button click start here
          * Basically Modal things start here
          */
        }
        <Modal isVisible={this.state.isMainModalVisible}>
          <View style={styles.formContainer}>
          {//HEADERRRRRR
          }
          <Text>Add an Activity</Text>
          {//Name field
          }
            <TouchableOpacity
                onPress={() => this.setState({isActivityModalVisible : !this.state.isActivityModalVisible})} 
                style={styles.notAButton}>
                  <Text style={styles.buttonText}>{this.state.name}</Text>
            </TouchableOpacity>
            <View style={styles.activityContainer}>
              <Modal 
                isVisible={this.state.isActivityModalVisible}
                style={styles.formContainerActivity}>
                  <View style={styles.miniFormContainerActivity}>
                    <TouchableOpacity 
                        disabled = {true} 
                        style={styles.notAButton}>
                          <Text style={styles.buttonText}>Choose an activity</Text>
                    </TouchableOpacity>
                    <Picker
                      selectedValue={this.state.name}
                      style={{ height: 200, width: 200}}
                      onValueChange={(itemValue, itemIndex) => this.setState({name: itemValue})}>
                      <Picker.Item label=" " value="blank" />
                      {/*
                      * TODO : get activities from aSyncStorage
                      */}
                      <Picker.Item label="Java" value="Java" />
                      <Picker.Item label="label1" value="label1" />
                      <Picker.Item label="label2" value="label2" />
                      <Picker.Item label="label3" value="label3" />
                      <Picker.Item label="label4" value="label4" />
                      <Picker.Item label="label5" value="label5" />
                      <Picker.Item label="label6" value="label6" />
                      <Picker.Item label="label7" value="label7" />
                    </Picker>
                    <TouchableOpacity 
                        onPress={() => this.setState({isActivityModalVisible : !this.state.isActivityModalVisible})} 
                        style={styles.button}>
                          <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
          {//Date fields
          }
            <Text>Input Date:</Text>
            <DatePicker
              style={styles.formComp}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2018-04-01"
              maxDate="2048-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <Text>Input Start Time:</Text>
            <DatePicker
              style={styles.formComp}
              mode="time"
              placeholder="select start time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={this.state.startTime}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(time) => {this.setState({startTime: time})}}
            />
            <Text>Input End Time:</Text>
            <DatePicker
              style={styles.formComp}
              mode="time"
              placeholder="select end time"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              date={this.state.endTime}
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(time) => {this.setState({endTime: time})}}
            />
          {//SUBMIT and CANCEL button
          }
          <TouchableOpacity
                onPress={this.toggleMainModal} 
                style={styles.button}>
                  <Text style={styles.buttonText}> S U B M I T </Text>
          </TouchableOpacity>


          <TouchableOpacity
                onPress={this.toggleMainModal}
                style={styles.Button}>
                  <Text style={styles.buttonTextDest}> C A N C E L </Text>
          </TouchableOpacity>

          </View>
          
        </Modal>
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 100; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

