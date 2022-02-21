Feature: Show/hide and event's details

  Scenario: When the user has not clicked on an event, each event element should be collapsed.
    Given the main page is open 

    When the user has not clicked on an event

    Then all event elements are collapsed by default

  Scenario: When the user clicks on a collapsed event element, the element should expand.
    Given an event element is minimized

    When the user selects an event

    Then the event element should expand to show additional details

  Scenario: When the user clicks on an expanded event element, the element should collapse.
    Given an event element is maximized/expanded 

    When a user wishes to select another event

    Then they can minimize the current event element to select another