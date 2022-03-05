import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumEvents from './NumEvents';
import { getEvents, extractLocations } from './api';
import { Container, Row, Col } from "react-bootstrap";
import { WarningAlert } from './alert';

export class App extends Component {
  state = {
    events: [],
    locations: [],
    numberEvents: 32,
    selectedLocation: 'all'
  }

  componentDidMount() { //Loading events when app loads. Using API call to save initial data to state. 
    this.mounted = true; //Updating state only if this.mounted is true. 
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberEvents), locations: extractLocations(events) })
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      let locationEvents = location === "all"
        ? events :
        events.filter((event) => event.location === location)
      const { numberEvents } = this.state
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, numberEvents),
          currentLocation: location,
        })
      }
    })
  }

  updateNumberEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberEvents: eventCount,
    });
    this.updateEvents(currentLocation, eventCount);
  };


  //Using bootstrap below to make this a responsive design. 
  render() {
    return (
      <div className="App">
        {!navigator.onLine && <WarningAlert text={
          "The app is offline. Loading events will be unavailable until you reconnect. "} />}
        <Container>
          <Col>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
            <NumEvents numberEvents={this.state.numberEvents} updateNumberEvents={this.updateNumberEvents} />
            <EventList events={this.state.events} />
          </Col>
        </Container>
      </div>
    );
  }
}

export default App;