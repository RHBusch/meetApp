import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumOfEvents.feature');

defineFeature(feature, test => {
    test('A user has not specified a number so 32 is the default number of events displayed', ({ given, when, then }) => {
        let AppWrapper;
        given('a user is on the main page', () => {
            AppWrapper = mount(<App />)
        });
        when('the user has yet to specify a number of events', () => {
            AppWrapper.update();
        });

        then('32 events will be displayed by default (5 local test)', () => {
            expect(AppWrapper.find('.event')).toHaveLength(5)
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper;
        given('user is on the main page and may want to view greater or fewer than events', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
        });

        when('the user changes the number of events they want to see', () => {
            AppWrapper = mount(<App />);
            AppWrapper.find('.numEvents').simulate('change', { target: { value: 2 } })
        });

        then('the new number of events will be displayed upon querying the data', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(2)
        });
    });
});