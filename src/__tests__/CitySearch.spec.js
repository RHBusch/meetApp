import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data'
import { extractLocations } from '../api'

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    //Establishing the wrapper for all tests. 
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => { }} />)
    })
    //Finding an element with the className 'city'
    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1)
    })
    //Finding an element with the className 'suggestions'
    test('render list of city suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1)
    })
    //Finding an element with the className 'city'
    test('renders text correctly', () => {
        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    })

    /*This test first establishes the state of the wrapper with the value of query
    set to Munich. The eventObject has a target value of Berlin. Once a change or a click
    is simulated, the value of query should be changed to Berlin.  */
    test('change state upon text input change', () => {
        CitySearchWrapper.setState({
            query: 'Munich'
        })
        const eventObject = { target: { value: 'Berlin' } }
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin')
    })

    /*This test first declares the locations variable = to the mockData file. Then, the state
    of the wrapper is set so that suggesstions are equal to all locations. A for each loop
    is declared so that all suggestions are displayed until the text of the suggestions input matches. */
    test('render list of suggested cities correctly', () => {
        const locations = extractLocations(mockData);

        CitySearchWrapper.setState({ suggestions: locations })
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i])
        }
    })
    /*This test sets that value of query and suggestions to empty. Then once the value of the 
    city input is changed to Berlin, the target value of the suggestion itself should change to Berlin.
    Query is set as a variable along with filteredLocations. toUpperCase is used to identify
    a matching input for the suggestion list and query. Suggestions are to equal the final value 
    of filteredLocations.*/
    test('suggestion list match the query upon change', () => {
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        CitySearchWrapper.find(".city").simulate("change", {
            target: { value: "Berlin" },
        })
        const query = CitySearchWrapper.state("query");
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        })
        expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations)
    })
    //This test simulates a click to make sure the suggestion and the query share the same value
    test('selecting a suggestion should change query state', () => {
        CitySearchWrapper.setState({
            query: 'Berlin'
        })
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state("query")).toBe(suggestions[0])
    })
})

