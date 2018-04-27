import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../../App/Themes'

import {
    Platform
  } from "react-native";

const isAndroid = Platform.OS == "android";
const viewPadding = 10;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
    navBar:{
      height : 55,
      paddingLeft : 10,
      paddingRight: 15,
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent: 'space-between',
    },
    navBarHeader:{
      paddingTop: 30,
      paddingHorizontal: 5,
      zIndex: 10,
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
    },
    formContainerActivity:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    miniFormContainerActivity:{
      width: 200,
      height: 300,
      backgroundColor: "#FFE5E5",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: 45,
      width: 150,
      borderRadius: 5,
      borderWidth: 2,
      marginHorizontal: Metrics.section,
      marginVertical: Metrics.baseMargin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: Fonts.size.medium,
      marginVertical: Metrics.baseMargin
    },
    buttonTextDest: {
      color: 'red',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: Fonts.size.medium,
      marginVertical: Metrics.baseMargin
    },
})
