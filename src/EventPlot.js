/*import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EventPlot = ({ locations, events }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = () => {
            const data = locations.map((location) => {
                const number = events.filter((event) => event.location === location).length
                let city;
                if (location.includes('NSW')) {
                    city = location.split('NSW').shift();
                } else if (location.includes(', ')) {
                    city = location.split(', ').shift();
                } else if (location.includes('- ')) {
                    city = location.split('- ').shift();
                }
                return { city, number };
            })
            return data;
        };
        setData(() => getData());
    }, [locations, events]);

    return (
        <div className="dataWrapper">
            <h4>Events in each city:</h4>
            <div className="data-vis-wrapper">
                <ResponsiveContainer height={400}>
                    <ScatterChart
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 0,
                        }}>
                        <CartesianGrid />
                        <XAxis
                            type="category"
                            dataKey="city"
                            name="city"
                            minTickGap="2"
                            tickMargin="10"
                            allowDecimals={false} />
                        <YAxis
                            type="number"
                            dataKey="number"
                            name="Number Of Events"
                            allowDecimals={false}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={data} fill="#8884d8" />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}

export default EventPlot

*/