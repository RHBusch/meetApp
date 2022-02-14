import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event'
import { mockData } from '../mock-data'

describe('<Event/> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />)
    })
    //Finding an element with a className of 'event'
    test('renders an event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1)
    })
    //Finding an element with a className of 'summary'
    test('renders an event summary - title really', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1)
    })
    //Finding an element with a className of 'timeDate'
    test('renders start time/date and timezone', () => {
        expect(EventWrapper.find('.timeDate')).toHaveLength(1)
    })
    //Finding an element with a className of 'location'
    test('renders location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1)
    })
    //Finding an element with a className of 'showDetails'
    test('renders a button to show details', () => {
        expect(EventWrapper.find('.showDetails')).toHaveLength(1)
    })
    /* In this test, the initial state of the EventWrapper is collapsed, a click is 
    simulated and the EventWrapper should no longer be collapsed. This is controlled by 
    altering the state.*/
    test('open event when show details button is clicked', () => {
        EventWrapper.setState({
            collapsed: true
        })
        EventWrapper.find('.showDetails').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    })
    test('close details when button is clicked', () => {
        EventWrapper.setState({
            collapsed: false
        })
        EventWrapper.find('.hideDetails').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    })

    /*In this test, the EventWrapper is not collapsed and therefore further event
    details should be displayed. Find an element with the className 'eventDescription' */
    test('show event details when details are displayed', () => {
        EventWrapper.setState({
            collapsed: false
        })
        expect(EventWrapper.find('.eventDescription')).toHaveLength(1)
    })

    /*In this test, the EventWrapper is not collapsed and therefore further event
  details should be displayed. Find an element with the className 'aboutHeader' */

    test('show "about event" header', () => {
        EventWrapper.setState({
            collapsed: false
        })
        expect(EventWrapper.find('.aboutHeader')).toHaveLength(1)
    })

    /*In this test, the EventWrapper is not collapsed and therefore further event
     details should be displayed. Find an element with the className 'calLink' */

    test('show calendar link when details are expanded', () => {
        EventWrapper.setState({
            collapsed: false
        })
        expect(EventWrapper.find('.calLink')).toHaveLength(1)
    })
})