import React, { Component } from 'react';
import { ErrorAlert } from './alert';


class NumEvents extends Component {
    state = {
        numEvents: 32,
        infoText: '',
    };


    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
            this.setState({
                numEvents: '',
                infoText: 'Please enter a number between 1 and 32 :)',
            })
        } else {
            this.setState({
                numEvents: value,
                infoText: '',
            })
        }
        this.props.updateNumberEvents(event.target.value)
    }
    render() {
        return (
            <div className="numEventsContainer">
                <div className="NumberOfEvents">
                    <input
                        className="numEvents"
                        type="number"
                        value={this.state.numEvents}
                        onChange={this.handleInputChanged} />
                    <ErrorAlert text={this.state.infoText} className="errorAlert" />
                </div>
            </div>
        )
    }
}
export default NumEvents;

//value={numberEvents} onChange={(e) => setNewNumber(e)}>
