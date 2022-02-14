import React from 'react'
import { shallow } from 'enzyme'
import NumEvents from '../NumEvents'
import { mockData } from '../mock-data'


describe('<NumEvents/> component', () => {
    let NumEventsWrapper;
    beforeAll(() => {
        NumEventsWrapper = shallow(<NumEvents updateNumEvents={() => { }} />)
    })
    test('renders a place to input number of events', () => {
        expect(NumEventsWrapper.find('.numEvents')).toHaveLength(1);
    })
    test('renders the event change in textbox correctly', () => {
        const numEvents = NumEventsWrapper.state('numEvents');
        expect(NumEventsWrapper.find('.numEvents').prop('value')).toBe(numEvents)
    })
    test('change state w/input', () => {
        NumEventsWrapper.setState({
            numEvents: 32
        })
        const newEventsNumber = { target: { value: '7' } };
        NumEventsWrapper.find('.numEvents').simulate(
            'change',
            newEventsNumber
        )
        expect(NumEventsWrapper.state('numEvents')).toBe('7');
    })
})