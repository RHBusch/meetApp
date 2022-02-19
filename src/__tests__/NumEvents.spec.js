import React from 'react'
import { shallow } from 'enzyme'
import NumEvents from '../NumEvents'


describe('<NumEvents/> component', () => {
    let NumEventsWrapper;
    beforeAll(() => {
        NumEventsWrapper = shallow(<NumEvents updateNumEvents={() => { }} />)
    })
    test('renders a place to input number of events', () => {
        expect(NumEventsWrapper.find('.numEvents')).toHaveLength(1);
    })
    test('renders the event change in textbox correctly', () => {
        const numEvents = NumEventsWrapper.state('.numEvents');
        expect(NumEventsWrapper.find('.numEvents').prop('value')).toBe(numEvents)
    })
    /*Initial state numEvents is set to 32. A change/click is simulated with the new value
    set to 7 via newEventsNumber. Testing whether that comes back correct and the value of numEvents to be 7*/
    /* test('change state w/input', () => {
         NumEventsWrapper.setState({
             numEvents: 32
         })
         const newEventsNumber = { target: { value: '7' } };
         NumEventsWrapper.find('.numEvents').simulate(
             'change',
             newEventsNumber
         )
         expect(NumEventsWrapper.state('numEvents')).toBe('7');
     })*/
})