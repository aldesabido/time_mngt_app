import { StyleSheet } from 'react-native'

import {
    Platform
  } from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default StyleSheet.create({
    navBar:{
      height : 55,
      paddingLeft : 10,
      paddingRight: 15,
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent: 'space-between',
    },
    header:{
      marginLeft : 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
      padding: viewPadding,
      paddingTop: 20
    },
    list: {
      width: "100%"
    },
    listItem: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 18
    },
    hr: {
      height: 1,
      backgroundColor: "gray"
    },
    listItemCont: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    textInput: {
      height: 40,
      paddingRight: 10,
      paddingLeft: 10,
      borderColor: "gray",
      borderWidth: isAndroid ? 0 : 1,
      width: "100%"
    }
})
