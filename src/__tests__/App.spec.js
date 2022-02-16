import React from 'react';
import { shallow, mount } from 'enzyme'; // shallow is for unit testing, mount is for integration testing. 
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumEvents from '../NumEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';
import { getCalendarEvents } from '../../auth-server/handler';

describe('App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);//Checking whether the state of events isn't undefined.
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);//Comparing the state of App's events with EventList's props.
        AppWrapper.unmount()//Clean up the DOM here to not impact other tests. 
    })
    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations'); //Setting appLocationsState to the value of locations within the App component (prop)
        expect(AppLocationsState).not.toEqual(undefined);//Confirming state of locations isn't undefined. 
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();//Cleaning up DOM
    })
    test('get list of events to match the city selected by user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });//CitySearch state includes all locations
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length))//Hold the index of the selected suggestion from the suggestions array.
        const selectedCity = suggestions[selectedIndex]; //Index is used to return suggestion. 
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);//Using 'instance' to simulate handleItemClicked. Await is called because it’s expected that it will have async code that involves fetching the full list of events before filtering them down to the list of events that match the selected city.
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity)//List of events is filtered against selected location/city. 
        expect(AppWrapper.state('events')).toEqual(eventsToShow);//Comparing list of events to the selected location. 
        AppWrapper.unmount()
    })
    test('get list of all events if a user selects "see all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
        /* ^^^ The test simulates a click on the last list item (which will always be “See all cities”),
         then checks if the events state of the App component equals the list of all events. */
    })
})









describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />)
    })

    //These tests check to make sure the relevant components are included with the app. 

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    })
    test('render NumEvents', () => {
        expect(AppWrapper.find(NumEvents)).toHaveLength(1);
    })

});

