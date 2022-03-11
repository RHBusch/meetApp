import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumEvents from './NumEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { Container, Row, Col } from "react-bootstrap";
import { WarningAlert } from './alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export class App extends Component {
  state = {
    events: [],
    locations: [],
    numberEvents: 32,
    selectedLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });//Adding code for welcome screen
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberEvents), locations: extractLocations(events) })
        }
      })
    }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  //Using bootstrap below to make this a responsive design. 
  //Using the WarningAlert below (navigator API) when the app is offline. This is a best practice I should include in other PWAs.  
  render() {
    // const { events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />

    return (
      <div className="App">
        {!navigator.onLine && <WarningAlert text={
          "The app is offline. Loading events will be unavailable until you reconnect. "} />}
        <Container fluid className="mainAppContainer">
          <Row>
            <Col className="align-items-center">
              <h1> MeetApp </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2> Search for a city!</h2>
              <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
              <h2> How many events do you want to see? </h2>
              <NumEvents numberEvents={this.state.numberEvents} updateNumberEvents={this.updateNumberEvents} />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Events in each city:</h4>
              <div className="data-vis-wrapper">
                <ResponsiveContainer height={400}>
                  <EventGenre className="pie-chart" events={this.state.events} />
                  <ScatterChart
                    margin={{
                      top: 20, right: 20, bottom: 20, left: 20,
                    }}>
                    <CartesianGrid />
                    <XAxis type="category" dataKey="city" name="city" allowDecimals={false} />
                    <YAxis type="number" dataKey="number" name="Number Of Events" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={this.getData()} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <EventList events={this.state.events} />
            </Col>
          </Row>
        </Container>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;