
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button,
  TextInput,
  Keyboard,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Icon,
} from "react-native";
import { Images } from '../DevTheme'

import Reactotron, { asyncStorage } from 'reactotron-react-native'

// Styles
import styles from './TodoListStyles'

import Modal from 'react-native-modal';
//yep, you read that right modal once again

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default class TodoList extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      tasks: [],
      prevText: "",
      text: "",
      isEditModalVisible : false,
    }
  }

  changeTextHandler = text => {
    this.setState({ text: text });
  }

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  }

  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };
  
  updateTask = (i,item) => {
    this.setState({
      isEditModalVisible : true,
      prevText : item.text,
      text : item.text,
      index : i,
    });
  };


  handleSubmitEdit = () => {
    var tempArr = this.state.tasks.slice();
    Reactotron.log("tempArr: \n" + tempArr);
    
    Reactotron.log("tempArr: \n" + tempArr);
    Reactotron.log("tempArr: \n" + tempArr);

    for(item in tempArr){
      if(tempArr[item].text == this.state.prevText){
        tempArr[item].text = this.state.text;
        break;
      }
    }

    this.setState(
      prevState => {  //TODO: HOW?!
        return { tasks: tempArr };
      },
      () => Tasks.save(this.state.tasks)
    );
    this.setState({isEditModalVisible : false});
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (

      <View
        style={[styles.container, { paddingBottom: this.state.viewPadding }]}>
        <StatusBar
          barStyle="dark-content" />

        <View style={styles.navBar}>
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
          <Text style={styles.navBarHeader}>
            List of Activities
          </Text>
        </View>

        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={this.updateTask.bind(this,index,item)}>
                <View style={styles.listItemCont}>
                  <Text style={styles.listItem}>
                    {item.text}
                  </Text>
                  <Button title="X" onPress={() => this.deleteTask(index)} />
                </View>
                <View style={styles.hr} />
            </TouchableOpacity>
          }
        />

        <Modal 
          isVisible={this.state.isEditModalVisible}
          style={styles.formContainerActivity}>
          <View style={styles.miniFormContainerActivity}>
            <Text style={[styles.navBarHeader,{paddingBottom : 30}]}>
              Edit "{this.state.prevText}"
            </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={this.changeTextHandler}
              value={this.state.text}
              placeholder="Edit"
            />
            <TouchableOpacity
              onPress={this.handleSubmitEdit}
              style={styles.button}>
              <Text style={styles.buttonText}> S U B M I T </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>this.setState({isEditModalVisible : false})}
              style={styles.button}>
              <Text style={styles.buttonTextDest}> C A N C E L </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

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

AppRegistry.registerComponent("TodoList", () => TodoList);