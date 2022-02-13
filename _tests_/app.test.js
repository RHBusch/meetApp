import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';





describe('<App /> component', () => {
    test('render list of events', () => {
        const AppWrapper = shallow(<App />);
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    })

});

/* ^^^ This will fail initially because no EventList exists.
I call the shallow() function using App as its parameter, 
then set it to the constant AppWrapper. This allows me to 
call the shallow-rendered App component within the test itself.
The expect() function runs a search (find()) for EventList components 
within AppWrapper, then compares the result 
(i.e., how many EventList components exist within AppWrapper) with the expected result,
 which, in this case, is 1.
 */