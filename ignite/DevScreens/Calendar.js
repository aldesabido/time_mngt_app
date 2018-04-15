import { StackNavigator } from 'react-navigation';
import {registerScreens} from './calendarscreens';
import Menu from './calendarscreens/Menu';
import React from 'react';

// eslint-disable-next-line no-console
// console.ignoredYellowBox = ['Remote debugger'];

/*
import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';
*/

class Calendar extends React.Component {

  render () {
    return (
      <Menu />
    )
  }
}

export default Calendar

