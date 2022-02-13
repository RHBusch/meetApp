import React, { Component } from "react"

class Event extends Component {

    state = { collapsed: true }

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        const { event } = this.props;
        const { collapsed } = this.state
        return (
            <div className='event'>
                <h1 className="summary">{event.summary} </h1>
                <p className="timeDate">
                    {event.start.DateTime}
                    {event.start.timeZone}
                </p>
                <p className='location'>{event.location}</p>


                <button
                    className={`${collapsed ? "show" : "hide"}Details`}
                    onClick={this.handleClick}> {collapsed ? "Show Details" : "Hide Details"} </button>

                {!collapsed && <div className="eventDescription">
                    <a href={event.htmllink} className="calLink">
                        Details via Google Cal.
                    </a>
                    <h3 className="aboutHeader">
                        About Event:
                    </h3>
                    <p>
                        {event.description}
                    </p>
                </div>}
            </div>
        )
    }
}
export default Event;
