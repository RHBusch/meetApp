import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumEvents from './NumEvents';
import EventGenre from './EventGenre'
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
    selectedLocation: "all",
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
        } //using events on page
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

  updateNumberEvents = async (eventCount) => {
    let { currentLocation } = this.state;
    await this.setState({
      numberEvents: eventCount
    });
    this.updateEvents(currentLocation);
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
  //Using wrappers helps clear the way for styling in the css file. 
  render() {
    const { events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />
    return (
      <div className="App">
        {!navigator.onLine && <WarningAlert text={
          "The app is offline. Loading events will be unavailable until you reconnect. "} />}
        <Container fluid className="mainAppContainer">
          <Row>
            <Col className="titleWrapper">
              <h1> MeetApp </h1>
            </Col>
          </Row>
          <Row>
            <Col className="inputWrapper">
              <h2> Step One: Enter City</h2>
              <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
              <h2> Step Two: Enter Number Of Events </h2>
              <NumEvents numberEvents={this.state.numberEvents} updateNumberEvents={this.updateNumberEvents} updateEvents={this.updateEvents} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="dataWrapper">
                <h4>Events in each city:</h4>
                <div className="data-vis-wrapper">
                  <EventGenre className="pie-chart" events={events} />
                  <ResponsiveContainer height={400}>
                    <ScatterChart
                      margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                      }}>
                      <CartesianGrid />
                      <XAxis type="category" dataKey="city" name="city" allowDecimals={false} />
                      <YAxis type="number" dataKey="number" name="Number Of Events" allowDecimals={false} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter data={this.getData()} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="eventsWrapper">
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