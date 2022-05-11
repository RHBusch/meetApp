import React, { Component } from 'react';
import { ErrorAlert } from './alert';


class NumEvents extends Component {
    state = {
        newNumEvents: this.props.numberEvents,
        infoText: '',
    };


    handleInputChanged = async (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
            this.setState({
                newNumEvents: '',
                infoText: 'Please enter a number between 1 and 32 :)',
            })
        } else {
            await this.setState({
                newNumEvents: value,
                infoText: '',
            })
        }
        this.props.updateNumberEvents(this.state.newNumEvents)
    }

    render() {
        return (
            <div className="numEventsContainer">
                <div className="NumberOfEvents">
                    <input
                        className="numEvents"
                        type="number"
                        value={this.state.newNumEvents}
                        onChange={this.handleInputChanged} />
                    <ErrorAlert text={this.state.infoText} className="errorAlert" />
                </div>
            </div>
        )
    }
}
export default NumEvents;

//value={numberEvents} onChange={(e) => setNewNumber(e)}>
