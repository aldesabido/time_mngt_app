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
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import Reactotron, { asyncStorage } from 'reactotron-react-native'

//another one
import uuid from 'uuid';
/*
* the key for the localStorage is
*       "AgendaScrTestnewStorageTest_001_withIDs" 
*   change it here with [Change all Occurrences] if you want to change
*/

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
      
      allItems : {},

      name: 'Activity Name',
      startTime: '',
      endTime: '',
      date: '',
      selected: params.passprop,
      tasks: [],  //will contain the activities (for the dropdown)

      //Modal things switchers
      isMainModalVisible : false,
      isActivityModalVisible : false,
      isEditModalVisible : false,
    }
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentWillMount(){
    Tasks.all(tasks => this.setState(
      { 
        tasks: tasks || [] ,
      }
    ));
  
    let newItems = {};

   AsyncStorage.getItem("AgendaScrTestnewStorageTest_001_withIDs")
    .then((things) => {
      if(things){
        Reactotron.log("things found!");
        newItems = JSON.parse(things);
        this.setState({ allItems : newItems });
      }
      else{
        Storage.save(newItems);
        this.forceUpdate();
      }
    })
    .catch((reason) => {
      Reactotron.log("Something happened :(",true);
      throw reason;
    })
    Reactotron.log("ComponentWillMount|| mounted!");
  }

  handleEdit = (item) => {
    this.setState({ 
      name : item.name,
      date : item.date,
      startTime : item.startTime,
      endTime : item.endTime,
    });
    Reactotron.log("Item details:\n"
    + "\nName: " + item.name 
    + "\nDate: " + item.date
    + "\nstartTime: " + item.startTime
    + "\nendTime: " + item.endTime)
    this.setState({ 
      isEditModalVisible: ! this.state.isEditModalVisible 
    });
    
  }

  toggleMainModal = () =>{
    Reactotron.log("State Items: " + JSON.stringify(this.state.items));
    this.setState({ date : this.state.selected});
    this.setState({ isMainModalVisible: ! this.state.isMainModalVisible });
  }

  onDayPress(day){
    this.setState({
      selected: day.dateString,
      items : {}
    });
    //this.props.navigation.navigate('Agenda', {passprop: day.dateString})
    this.forceUpdate();
  }

  submitHandler(){
    let hasName = this.state.name.trim().length > 0;
    let hasDate = this.state.date != '';
    let hasStart = this.state.startTime != '';
    let hasEnd = this.state.endTime != '';

    if(hasName && hasDate && hasStart && hasEnd){
      Reactotron.log("Ready for submission\n"
      + "\nName: " + this.state.name
      + "\nDate: " + this.state.date
      + "\nStart Time: " + this.state.startTime
      + "\nEnd Time:" + this.state.endTime);

/*
      const strTime = this.state.date;          //gets the date
      if (!this.state.items[strTime]){          //if the date is not already a key in the array
        this.state.items[strTime] = [];         //initializes the key 
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
      newItems[strTime].sort(function( event1 , event2 ){
        Reactotron.log("sort: event1startTime:" + event1.startTime + "- event2.startTime:" + event2.startTime);
        return Date.parse('1970/01/01 ' + event1.startTime) - Date.parse('1970/01/01 ' + event2.startTime);
      });     //sorts the temp array
      this.setState({
        items: newItems
      });
      Storage.save(newItems);
*/

      const strTime = this.state.date;          //gets the date
      if (!this.state.allItems[strTime]){          //if the date is not already a key in the array
        this.state.allItems[strTime] = [];         //initializes the key 
      }
      this.state.allItems[strTime].push({       //pushes the values into the array
        height: 125,
        id: uuid.v4(),
        name: this.state.name,
        date : this.state.date,
        startTime : this.state.startTime,
        endTime : this.state.endTime,
      });
      const newItems = {};                      //initializes a new 

        Object.keys(this.state.allItems).forEach(key => {newItems[key] = this.state.allItems[key];}); 
        if(newItems[strTime].length > 1){
          newItems[strTime].sort(function( event1 , event2 ){
            Reactotron.log("sort: event1startTime:" + event1.startTime + "- event2.startTime:" + event2.startTime);
            return Date.parse('1970/01/01 ' + event1.startTime) - Date.parse('1970/01/01 ' + event2.startTime);
          });     //sorts the temp array
        }
      
      this.setState({
        allItems: newItems
      });
      Storage.save(newItems);
    }
    this.forceUpdate();
    this.toggleMainModal();
  }

  taskList() {
    return this.state.tasks.map((tasks,index) => {
      return (
        <Picker.Item key={index} label={tasks.text} value={tasks.text} />
      )
    })
  }

  render() {
    var {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('Calendar', {passprop: params.passprop})}} 
            style={styles.button}>
              <Text style={styles.buttonText}>back to Calendar</Text>
        </TouchableOpacity>
        <Text style={{alignItems: 'center'}}>
          Week's Agenda
        </Text>
        <Agenda
          items={this.state.items}
          onDayPress={this.onDayPress.bind(this)}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.state.selected}
          //selected={params.passprop}
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
              minDate={this.state.startTime}
              maxDate="23:59"
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
      //this.forceUpdate();
      //for (let i = 0; i < 1; i++) {                 //loads for the days before/after the day (day is 0) (before is negative) (after is positive)
        const time = day.timestamp + 0 * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.allItems[strTime]) {        //if no events in this day based on item
          this.state.items[strTime] = [];           //empty string so that the Agenda component will not think that it's still loading
        }else{                                      //if the day has events
          let array = [];
          //array[strTime] = this.state.allItems[strTime].slice(0);               //stores to temp array
          array[strTime] = this.state.allItems[strTime].slice(0);               //stores to temp array
          Reactotron.log("loadItems || unsorted array: \n" + JSON.stringify(array[strTime]));
          array[strTime]
            .sort(function( event1 , event2 ){
              Reactotron.log("sort: event1startTime:" + event1.startTime + "- event2.startTime:" + event2.startTime);
              return Date.parse('1970/01/01 ' + event1.startTime) - Date.parse('1970/01/01 ' + event2.startTime);
            });     //sorts the temp array

          Reactotron.log("loadItems || sorted array: \n" + JSON.stringify(array[strTime]));
          this.state.items[strTime] = array[strTime];                  //gives the sorted array to this.state.items[strTime]
          //this.state.items[strTime] = this.state.allItems[strTime];  //original code (only line in this block)
        }
        Reactotron.log(`Load Items for ${strTime}`);
      //}

      AsyncStorage.getItem("AgendaScrTestnewStorageTest_001_withIDs")         //gets data from asyncstorage
      .then((things) => {
        newItems = JSON.parse(things);
      
        //idk what this does
        Object.keys(this.state.items).forEach(key => {
          newItems[key] = this.state.items[key];
        });

        this.setState({
          allItems: newItems
        });

        Storage.save(newItems);
      });

    }, 1000);
    console.log("Items Loaded");
  }
  
  renderItem(item) {
    //could make a 24-hour to 12-hour converter
      return (
        <TouchableOpacity onPress={this.handleEdit.bind(this,item)} >
          <View style={[styles.item, {height: item.height}]}>
            <Text style={[styles.buttonText, {textAlign : 'left'}]}>{item.name}</Text>
            <Text>{item.startTime}--{item.endTime}</Text>
            <Text>date: {item.date} </Text>
            <Text>id: {item.id} </Text>
          </View>
        </TouchableOpacity>
      )
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
    Reactotron.log("in Storage.save saving: " + JSON.stringify(things));
    AsyncStorage.setItem("AgendaScrTestnewStorageTest_001_withIDs",JSON.stringify(things));
  }
}