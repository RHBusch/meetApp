
Feature: Filter events by city

Scenario: A user has not specified a number so 32 is the default number of events displayed 

Given a user is on the main page

When the user has yet to specify a number of events

Then 32 events will be displayed by default (5 local test)

Scenario: User can change the number of events they want to see

Given user is on the main page and may want to view greater or fewer than events

When the user changes the number of events they want to see

Then the new number of events will be displayed upon querying the data

