# meetapp

## Objective

To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

Key Features

1. Filter events by city.
2. Show/hide event details.
3. Specify number of events.
4. Use the app when offline.
5. Add an app shortcut to the home screen.
6. View a chart showing the number of upcoming events by city.

## Features and User Stories 

### Feature 1 - Filter Events by City: 

User Story: As a user I should be able to filter events in my app by different cities so that I can see relevant events in my city or a city I’m visiting. 

Scenario(s)
  1. When a user hasn’t searched for a city, show upcoming events from all cities. 
    * Given user hasn’t searched for any particular city and is on the main page
    * When user opens the app 
    * Then use should see all upcoming events 

  2. User should see a list of suggestions when they search for a city.
    * Given the main page is open and a user is beginning to search for a city
    * When user begins typing in the city textbox 
    * Then the user should see a list of cities that match what they’ve entered

  3. User can select a city from the suggested list. 
    * Given the user was typing St. Petersburg in the textbox
    * When the user selects St. Petersburg 
    * Then all evens in St. Petersburg should display

### Feature 2 - Show/hide an event’s details:

User Story: As a user I should be able to show or hide an event based on my interest.

Scenario(s)
  1. An event element is collapsed by default. 
    * Given a user has not selected an event after selecting a city
    * When reviewing the events in a specific city 
    * Then all event elements are collapsed by default 

  2. User can expand an event to see its details. 
    * Given an event’s details are minimized
    * When a user selects an event
    * Then the event’s details expand

  3. User can collapse an event to hide its details. 
    * Given a user has maximized an event 
    * When a user is looking to view another event 
    * Then they can collapse an event to hide its details 


### Feature 3 - Specify Number of Events:

User Story: As a user I should be able to specify the number of events I can view via my app.

Scenario(s)
  1. When a user hasn’t specified a number, 32 is the default. 
    * Given a user has not selected a specific number of events to display
    * When they open the app to the main page and select a city
    * Then 32 events will be displayed by default

  2. User can change the number of events they want to see. 
    * Given a user may want to view greater or fewer than 32 events
    * When the user changes the number of events they’d like to see
    * Then the new number of events will be displayed upon querying the data

### Feature 4 - Use the app when offline:

User Story: As a user I should be able to use the app offline when internet isn’t accessible. 

Scenario(s)

  1. Show cached data when there’s no internet connection. 
    * Given the user is offline (not connected to the internet) 
    * When searching for events
    * Then cached event data will still be available on display

  2. Show error when user changes the settings (city, time range)
    * Given the user is offline
    * When the user changes the information on display
    * Then an error message is triggered


### Feature 5 - Data Visualization

User Story: As a user I should be able to view the number of events across each city in my app to better understand what cities best to visit. 

Scenario(s)

  1. Show a chart with the number of upcoming events in each city.  
    * Given the user is on the main page 
    * When scrolling and viewing the screen 
    * Then a chart will highlight the number of upcoming events by city 

### Atatus Browser Monitor 
    * Review load speeeds
    * Review errors
    * Use reports to boost performance

### Lighthouse Assessment
    * Fast and reliable
    * Installable
    * PWA optipmized
