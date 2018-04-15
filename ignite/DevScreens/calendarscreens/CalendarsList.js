import React, {Component} from 'react';

import {CalendarList} from 'react-native-calendars';

export default class CalendarsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CalendarList pastScrollRange={24} futureScrollRange={24} />
    );
  }
}
