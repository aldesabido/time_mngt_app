import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../../App/Themes'

export default StyleSheet.create({
  navBar:{
    flex : .10,
    flexDirection : 'row',
    alignItems : 'center',
  },
  navBarText:{
    paddingTop: 10,
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  navBarElement:{
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
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
  container: {
    flex: 1,
    backgroundColor: "#FFE5E5",
    paddingTop: 20
  },
  formComp: {
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    width: 200,
    paddingBottom: 30,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFE5E5",
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  button: {
    height: 45,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
  },
  notAButton: {
    height: 45,
    width: 200,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.medium,
    marginVertical: Metrics.baseMargin
  }
})