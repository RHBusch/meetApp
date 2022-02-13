import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data'
import { extractLocations } from '../api'

describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} />)
    })
    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1)
    })
    test('render list of city suggestions', () => {

        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1)
    })
    test('renders text correctly', () => {

        const query = CitySearchWrapper.state('query');
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    })
    test('change state upon text input change', () => {

        CitySearchWrapper.setState({
            query: 'Munich'
        })
        const eventObject = { target: { value: 'Berlin' } }
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        expect(CitySearchWrapper.state('query')).toBe('Berlin')
    })
    test('render list of suggested cities correctly', () => {
        const locations = extractLocations(mockData);

        CitySearchWrapper.setState({ suggestions: locations })
        const suggestions = CitySearchWrapper.state('suggestions');
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i])
        }
    })

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

    test('selecting a suggestion should change query state', () => {
        CitySearchWrapper.setState({
            query: 'Berlin'
        })
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state("query")).toBe(suggestions[0])
    })
})

