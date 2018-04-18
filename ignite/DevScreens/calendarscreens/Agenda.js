import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Picker,
  AsyncStorage
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import Calendars from './Calendars';
import { Images } from '../DevTheme';
import styles from './AgendaStyles'

import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
//another one
import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
.configure()
.use(asyncStorage())
.connect();
export default class AgendaScreen extends React.Component {
  constructor(props) {
    super(props);
    var {params} = this.props.navigation.state;
    this.state = {
      items: {},

      name: 'Activity Name',
      startTime: '',
      endTime: '',
      date: '',

      itemsDay : {},

      selected: params.passprop,
      tasks: [],  //will contain the activities

      //Modal things switchers
      isMainModalVisible : false,
      isActivityModalVisible : false,
    }
    this.onDayPress = this.onDayPress.bind(this);
  }

  toggleMainModal = () =>{
    this.setState({ date : this.state.selected});
    this.setState({ isMainModalVisible: ! this.state.isMainModalVisible });
  }

  componentWillMount(){
    Tasks.all(tasks => this.setState(
      { 
        tasks: tasks || [] ,
      }
    ));
    console.log("mounted!");
  }

  componentDidMount(){
    const data = Storage.get();
  }

  onDayPress(day){
    this.setState({
      selected: day.dateString,
      items : {}
    });
    //this.props.navigation.navigate('Agenda', {passprop: day.dateString})
    this.forceUpdate();
  }

  taskList() {
    return this.state.tasks.map((tasks,index) => {
      return (
        <Picker.Item key={index} label={tasks.text} value={tasks.text} />
      )
    })
  }

  submitHandler(){
    let hasName = this.state.name.trim().length > 0;
    let hasDate = this.state.date != '';
    let hasStart = this.state.startTime != '';
    let hasEnd = this.state.endTime != '';

    if(hasName && hasDate && hasStart && hasEnd){
      console.log("Ready for submission");
      console.log("Name: " + this.state.name);
      console.log("Date: " + this.state.date);
      console.log("Start Time: " + this.state.startTime);
      console.log("End Time:" + this.state.endTime);
      
      const strTime = this.state.date;
      if (!this.state.items[strTime]){
        this.state.items[strTime] = [];
        console.log(this.state.items[strTime]);
      }
      this.state.items[strTime].push({
        height: 125,
        name: this.state.name,
        date : this.state.date,
        startTime : this.state.startTime,
        endTime : this.state.endTime,
      });
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
      Storage.save(newItems);
    }
    this.forceUpdate();
    this.toggleMainModal();
  }

  render() {
    var {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Calendar', {passprop: params.passprop})} 
            style={styles.button}>
              <Text style={styles.buttonText}>back to Calendar</Text>
        </TouchableOpacity>
        <Text style={{alignItems: 'center'}}>
          Week's Agenda
        </Text>
        <Agenda
          items={this.state.items}
          onDayPress={this.onDayPress}
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
                      {this.taskList()}
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
              onDateChange={(time) => {this.setState({startTime: time , endTime:time})}}
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
                  onPress={this.submitHandler.bind(this)}
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
      for (let i = -15; i < 1; i++) {
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
        console.log(`Load Items for ${strTime}`);
      }
      //console.log(this.state.items);
      
      this.state.items['2018-04-17'].push({
        height: 125,
        name: "Hello There!",
        date : "2018-04-17",
        startTime : "12:00",
        endTime : "13:00",
      });

      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
    console.log("Items Loaded");
    }
  

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>name: {item.name} height: {item.height} </Text>
        <Text>startTime: {item.startTime}</Text>
        <Text>endTime: {item.endTime} </Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text style={{textAlign: 'center'}}>This is empty date!</Text>
        <TouchableOpacity
          onPress={this.toggleMainModal}>
            <Text style={styles.buttonText}>Make some activities</Text>
        </TouchableOpacity>
      </View>
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

//will handle opertaions with the tasks in the dropdown
let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

let Storage = {
  save(things){
    AsyncStorage.setItem("AgendaEvents_001",JSON.stringify(things));
  },
  get(){
    AsyncStorage.getItem("AgendaEvents_001", (events) => {
      console.log(JSON.parse(events));
      return JSON.parse(events);
    });
  },
}

/*
// Saves to storage as a JSON-string
AsyncStorage.setItem('key', JSON.stringify(false))

// Retrieves from storage as boolean
AsyncStorage.getItem('key', (value) => {
    JSON.parse(value) // boolean false
})

*/