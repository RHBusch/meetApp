import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumEvents from './NumEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css'


export class App extends Component {
  state = {
    events: [],
    locations: [],
    numberEvents: 32
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) =>
          event.location === location);
      const { numberEvents } = this.state;
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberEvents),
          selectedLocation: location,
        })
      }
    })
  }

  updateNumberOfEvents = (eventCount) => {
    const { selectedLocation } = this.state;
    this.setState({
      numberEvents: eventCount,
    });
    this.updateEvents(selectedLocation, eventCount);
  };

  componentDidMount() { //Loading events when app loads. Using API call to save initial data to state. 
    this.mounted = true; //Updating state only if this.mounted is true. 
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) })
      }
    })
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  //Need to update state in NumEvents. 
  render() {
    return (
      <div className="App">
        <EventList events={this.state.events} numberEvents={this.state.numberEvents} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumEvents numberEvents={this.state.numberEvents} />
      </div>
    );
  }
}

export default App;