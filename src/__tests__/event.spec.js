/*
- An event component exists (passed)
- Component displays basic details --- [Summmary, 





    Date/timezone (+ correct),start time (+correct), Location (+ correct), 
    Event name (correct), show details button ]
- Event details are hidden by default
- Event details are displayed onClick
-
*/

import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event'
import { mockData } from '../mock-data'

describe('<Event/> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />)
    })

    test('renders an event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1)
    })

    test('renders an event summary - title really', () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1)
    })

    test('renders start time/date and timezone', () => {
        expect(EventWrapper.find('.timeDate')).toHaveLength(1)
    })

    test('renders location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1)
    })

    test('renders a button to show details', () => {
        expect(EventWrapper.find('.showDetails')).toHaveLength(1)
    })

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
    test('show event link when details are displayed', () => {
        EventWrapper.setState({
            collapsed: false
        })
        expect(EventWrapper.find('.eventDescription')).toHaveLength(1)
    })
    test('show "about event" header', () => {
        EventWrapper.setState({
            collapsed: false
        })
        expect(EventWrapper.find('.aboutHeader')).toHaveLength(1)
    })
    test('show calendar link when details are expanded', () => {
        EventWrapper.setState({
            collapsed: false
        })
        expect(EventWrapper.find('.calLink')).toHaveLength(1)
    })
})