import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumEvents from './NumEvents';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <EventList />
        <CitySearch />
        <NumEvents />

      </div>
    );
  }
}

export default App;