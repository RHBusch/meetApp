import React, { Component } from 'react';

class NumEvents extends Component {
    state = {
        numEvents: '32'
    }
    handleInput = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
            this.setState({
                numEvents: ''
            })
        } else {
            this.setState({
                numEvents: value,
            })
        } this.props.updateNumEvents(event.target.value)
    }


    render() {
        const { numberEvents, setNewNumber } = this.props;
        return (
            <div className="numEventsContainer">
                <input
                    className="numEvents"
                    type="number"
                    name="number"
                    value={numberEvents} onChange={(e) => setNewNumber(e)}>

                </input>

            </div>
        )
    }
}
export default NumEvents;