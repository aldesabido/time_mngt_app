import { StackNavigator } from 'react-navigation';

import Menu from './Menu';
import Calendars from './Calendars';
import Agenda from './Agenda';
import CalendarsList from './CalendarsList';
import HorizontalCalendarList from './HorizontalCalendarList';

export function registerScreens() {
  StackNavigator({
    Menu: { screen: Menu },
    Calendars: { screen: Calendars},
    Agenda: { screen: Agenda },
    CalendarsList: { screen: CalendarsList},
    HorizontalCalendarList: { screen: HorizontalCalendarList },
  })
}