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


/*
*   → Edit on TodoList
*   → automatic update on an event update

*   → Redux
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
      startTime: '08:00',
      endTime: '',
      date: '',
      selected: params.passprop,
      id : '',

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

  handleEditClick = (item) => {
    this.setState({ 
      id : item.id,
      name : item.name,
      date : item.date,
      startTime : item.startTime,
      endTime : item.endTime,
    });
    Reactotron.log("Item details:\n"
    + "\ID: " + item.id 
    + "\nName: " + item.name 
    + "\nDate: " + item.date
    + "\nstartTime: " + item.startTime
    + "\nendTime: " + item.endTime)
    this.setState({ 
      isEditModalVisible: ! this.state.isEditModalVisible 
    });
  }

  handleEditSubmit = () => {
    let hasName = this.state.name.trim().length > 0;
    let hasDate = this.state.date != '';
    let hasStart = this.state.startTime != '';
    let hasEnd = this.state.endTime != '';

    if(hasName && hasDate && hasStart && hasEnd){
      Reactotron.log("Submission valid; Ready for submission\n"
      + "\ID: " + this.state.id
      + "\nName: " + this.state.name
      + "\nDate: " + this.state.date
      + "\nStart Time: " + this.state.startTime
      + "\nEnd Time:" + this.state.endTime);
      let isFreeTime = this.checkFreeTime(this.state.date,this.state.startTime,this.state.endTime,this.state.id);
      if(isFreeTime){
        const strTime = this.state.date;            //gets the date
        if (!this.state.allItems[strTime]){          //if the date is not already a key in the array
          this.state.allItems[strTime] = [];         //initializes the key 
          this.state.items[strTime] = [];
        }

        //looks at all the events for all the days
        targetDateReference = this.state.allItems;
        newSpecItems = this.state.items;

        for ( date in targetDateReference ){
          Reactotron.log("TargetDateReference[date]: " + JSON.stringify(targetDateReference[date]));
          for( event in targetDateReference[date]){
            if(targetDateReference[date][event].id == this.state.id){
              Reactotron.log("Found!\nNew Values:\n"
              + "\ID: " + this.state.id
              + "\nName: " + this.state.name
              + "\nDate: " + this.state.date
              + "\nStart Time: " + this.state.startTime
              + "\nEnd Time:" + this.state.endTime);
              targetDateReference[date][event].name = this.state.name;
              targetDateReference[date][event].date = this.state.date;
              targetDateReference[date][event].startTime = this.state.startTime;
              targetDateReference[date][event].endTime = this.state.endTime;
              break;
            }
          }
        }

        if(!newSpecItems['1970-01-01']){
          newSpecItems['1970-01-01'] = [];
        }
        newSpecItems['1970-01-01'].push({
          height : 125,
          id: 123,
          name: 'lmao',
          date: '1970-01-01',
          startTime: '00:00',
          endTime: '01:00',
        });

        Reactotron.log("TargetDateReference: " + JSON.stringify(targetDateReference));
        const newItems = {};                      //initializes a new 
        const newDispItems = {};
        //sorting for the all-containing array
        Object.keys(targetDateReference).forEach(key => {newItems[key] = targetDateReference[key];}); 
        if(newItems[strTime].length > 1){
          newItems[strTime].sort(function( event1 , event2 ){
            Reactotron.log("sort: event1startTime:" + event1.startTime + "- event2.startTime:" + event2.startTime);
            return Date.parse('1970/01/01 ' + event1.startTime) - Date.parse('1970/01/01 ' + event2.startTime);
          });     //sorts the temp array
        }

        //sorting for the daily container array
        Object.keys(newSpecItems).forEach(key => {newDispItems[key] = newSpecItems[key];}); 
        if(newDispItems[strTime].length > 1){
          newDispItems[strTime].sort(function( event1 , event2 ){
            Reactotron.log("sort: event1startTime:" + event1.startTime + "- event2.startTime:" + event2.startTime);
            return Date.parse('1970/01/01 ' + event1.startTime) - Date.parse('1970/01/01 ' + event2.startTime);
          });     //sorts the temp array
        }

        this.setState({
          allItems: newItems,
          isEditModalVisible : !this.state.isEditModalVisible,
          selected : this.state.date,
          items : newDispItems,
        },()=> {this.forceUpdate()});
        Storage.save(newItems);
      }else{
        alert("You have a conflict of schedule!\nPlease check your schedule and try again.");
        this.setState({
          isEditModalVisible : !this.state.isEditModalVisible,
        });
      }
      this.forceUpdate();
    }
  } 
  
  handleDelete = () => {
      const strTime = this.state.date;            //gets the date
      if (!this.state.allItems[strTime]){          //if the date is not already a key in the array
        this.state.allItems[strTime] = [];         //initializes the key 
      }

      //looks at all the events for all the days
      targetDateReference = this.state.allItems;
      for ( date in targetDateReference ){
        Reactotron.log("TargetDateReference[date]: " + JSON.stringify(targetDateReference[date]));
        for( event in targetDateReference[date]){
          if(targetDateReference[date][event].id == this.state.id){
            Reactotron.log("Found!\nNew Values:\n"
            + "\ID: " + this.state.id
            + "\nName: " + this.state.name
            + "\nDate: " + this.state.date
            + "\nStart Time: " + this.state.startTime
            + "\nEnd Time:" + this.state.endTime);
            //DELET DELET DELET
            targetDateReference[date].splice([event],1);
            break;
          }
        }
      }
      Reactotron.log("TargetDateReference: " + JSON.stringify(targetDateReference));
      const newItems = {};                     

      Object.keys(targetDateReference).forEach(key => {newItems[key] = targetDateReference[key];}); 
      if(newItems[strTime].length > 1){
        newItems[strTime].sort(function( event1 , event2 ){
          Reactotron.log("sort: event1startTime:" + event1.startTime + "- event2.startTime:" + event2.startTime);
          return Date.parse('1970/01/01 ' + event1.startTime) - Date.parse('1970/01/01 ' + event2.startTime);
        });     //sorts the temp array
      }
      
      this.setState({
        allItems: newItems,
        isEditModalVisible : !this.state.isEditModalVisible,
        selected : this.state.selected,
      },()=> {this.forceUpdate()});
      Storage.save(newItems);
      this.forceUpdate();
  }

  toggleMainModal = () =>{
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

  checkFreeTime(date,start,end,id){    //will return true if free time
    const strTime = date;              //gets the date
    if (!this.state.allItems[strTime]){          //if the date is not already a key in the array
      this.state.allItems[strTime] = [];         //initializes the key 
      return true;
    }

    //looks at all the events for all the days
    targetDateReference = this.state.allItems;
    for ( event in targetDateReference[date] ){
      let startHasConflict = (
        (targetDateReference[date][event].startTime <= start && targetDateReference[date][event].endTime >= start)    //if start directly coincides with another event
        && targetDateReference[date][event].id != id                                                                //useful when updating an event
        && (targetDateReference[date][event].startTime >= start && targetDateReference[date][event].endTime >= start) //when the start of event overlaps over other events
      )
      let endHasConflict = (
        (targetDateReference[date][event].startTime <= end && targetDateReference[date][event].endTime >= end)        //if end directly coincides with another event
        && targetDateReference[date][event].id != id                                                                //useful when updating an event
        && (targetDateReference[data][event].strTime <= end && targetDateReference[date][event].endTime <= end)       //when the end of event overlaps other events
      )
      if( startHasConflict || endHasConflict ){
        return false;
      }
    }
    return true;
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
      //check for conflicts in schedule
      candidateID = uuid.v4();
      let isFreeTime = this.checkFreeTime(this.state.date,this.state.startTime,this.state.endTime,candidateID);
      if(isFreeTime){
        const strTime = this.state.date;          //gets the date
        if (!this.state.allItems[strTime]){          //if the date is not already a key in the array
          this.state.allItems[strTime] = [];         //initializes the key 
        }
        this.state.allItems[strTime].push({       //pushes the values into the array
          height: 125,
          id: candidateID,
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
      }else{
        alert("You have a conflict of schedule!\nPlease check your schedule and try again.");
        this.toggleMainModal();
      }
    }else{
      this.toggleMainModal();
      alert("Input error!\nEntry not recorded!");
    }
    this.toggleMainModal();
    this.forceUpdate();
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
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={this.toggleMainModal}
        />
        {
          /*
          * ADDING MODAL
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
              onDateChange={(time) => {
                const newDate = new Date('1970/01/01 ' + time);
                Reactotron.log("newDate: (no added hours)\n" + newDate);
                Reactotron.log("newDate: (hours)\n" + newDate.getHours());
                hours = newDate.getHours();
                newDate.setHours(hours + 1 + 8);      // + 1 because 1 hour; + 8 because we're at GMT + 8
                Reactotron.log("newDate: (with added hours)\n" + newDate);
                Reactotron.log("NewDate: (toISOString)\n" 
                + newDate.toISOString().split('T')[1].split('.')[0].slice(0,5));
                this.setState({
                  startTime: time, 
                  endTime: (newDate.toISOString().split('T')[1].split('.')[0].slice(0,5)),
                })
              }}
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
        {
          /*
          * EDITING MODAL
          * Form Component what will show up on an element click start here
          * Basically another set of modal things start here
          */
        }
        <Modal isVisible={this.state.isEditModalVisible}>
          <View style={styles.formContainer}>
          {//HEADERRRRRR
          }
          <Text>Edit an Activity</Text>
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
              onDateChange={(time) => {
                const newDate = new Date('1970/01/01 ' + time);
                Reactotron.log("newDate: (no added hours)\n" + newDate);
                Reactotron.log("newDate: (hours)\n" + newDate.getHours());
                hours = newDate.getHours();
                newDate.setHours(hours + 1 + 8);      // + 1 because 1 hour; + 8 because we're at GMT + 8
                Reactotron.log("newDate: (with added hours)\n" + newDate);
                Reactotron.log("NewDate: (toISOString)\n" 
                + newDate.toISOString().split('T')[1].split('.')[0].slice(0,5));
                this.setState({
                  startTime: time, 
                  endTime: (newDate.toISOString().split('T')[1].split('.')[0].slice(0,5)),
                })
              }}
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
          {//SUBMIT, CANCEL, and DELETE button
          }
            <TouchableOpacity
                  onPress={this.handleEditSubmit.bind(this)}
                  style={styles.button}>
                    <Text style={styles.buttonText}> S U B M I T </Text>
            </TouchableOpacity>

            <TouchableOpacity
                  onPress={() => this.setState({isEditModalVisible : !this.state.isEditModalVisible})}
                  style={styles.Button}>
                    <Text style={styles.buttonTextDest}> C A N C E L </Text>
            </TouchableOpacity>

            <TouchableOpacity
                  onPress={this.handleDelete.bind(this)}
                  style={[styles.Button, {paddingTop: 30}]}>
                    <Text style={styles.buttonTextDest}> D E L E T E </Text>
            </TouchableOpacity>

          </View>
          
        </Modal>
      </View>
    );
  }

  loadItems(day) {
    setTimeout(() => {
      //this.forceUpdate();
      //for (let i = 0; i < 1; i++) {               //loads for the days before/after the day (day is 0) (before is negative) (after is positive)
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

      //this is here so the first-time-initialized date in the array will be saved in the local storage
      AsyncStorage.getItem("AgendaScrTestnewStorageTest_001_withIDs")         //gets data from asyncstorage
      .then((things) => {
        newItems = JSON.parse(things);
      
        //maps each entry in 
        Object.keys(this.state.items).forEach(key => {
          newItems[key] = this.state.items[key];
        });

        this.setState({
          allItems: newItems,
          id : '',
        });

        Storage.save(newItems);
      });

    }, 1000);
    console.log("Items Loaded");
  }
  
  renderItem(item) {
    //could make a 24-hour to 12-hour converter
      return (
        <TouchableOpacity onPress={this.handleEditClick.bind(this,item)} >
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