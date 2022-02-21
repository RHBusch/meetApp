import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/showHideEventsDetails.feature')

defineFeature(feature, test => {

    test('When the user has not clicked on an event, each event element should be collapsed.', ({ given, when, then }) => {
        let AppWrapper;
        given('the main page is open', () => {
            AppWrapper = mount(<App />)
        });

        when('the user has not clicked on an event', () => {

        });

        then('all event elements are collapsed by default', () => {
            expect(AppWrapper.find('.eventDescription')).toHaveLength(0)
        });
    });

    test('When the user clicks on a collapsed event element, the element should expand.', ({ given, when, then }) => {
        let AppWrapper;
        given('an event element is minimized', () => {
            AppWrapper = mount(<App />)
        });

        when('the user selects an event', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.eventDescription')).toHaveLength(0)
            AppWrapper.find('.showDetails').at(0).simulate('click')
        });

        then('the event element should expand to show additional details', () => {
            expect(AppWrapper.find('.eventDescription')).toHaveLength(1)
        });
    });

    test('When the user clicks on an expanded event element, the element should collapse.', ({ given, when, then }) => {
        let AppWrapper;
        given('an event element is maximized/expanded', async () => {
            AppWrapper = await mount(<App />)
            AppWrapper.update();
            AppWrapper.find('.showDetails').at(0).simulate('click')
            expect(AppWrapper.find('.eventDescription')).toHaveLength(1)
        });

        when('a user wishes to select another event', () => {
            AppWrapper.update();
            AppWrapper.find('.hideDetails').at(0).simulate('click')
        });

        then('they can minimize the current event element to select another', () => {
            expect(AppWrapper.find('.eventDescription')).toHaveLength(0)
        });
    });

})//Closing bracket for defineFeature