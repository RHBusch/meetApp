import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideEventsDetails.feature')

defineFeature(feature, test => {

    test('When the user has not clicked on an event, each event element should be collapsed.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('the user has not clicked on an event', () => {

        });

        then('all event elements are collapsed by default', () => {

        });
    });

    test('When the user clicks on a collapsed event element, the element should expand.', ({ given, when, then }) => {
        given('an event element is minimized', () => {

        });

        when('the user selects an event', () => {

        });

        then('the event element should expand to show additional details', () => {

        });
    });

    test('When the user clicks on an expanded event element, the element should collapse.', ({ given, when, then }) => {
        given('an event element is maximized/expanded', () => {

        });

        when('a user wishes to select another event', () => {

        });

        then('they can minimize the current event element to select another', () => {

        });
    });

})//Closing bracket for defineFeature