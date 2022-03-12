import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map(genre => {
            const valueEvents = events.filter(event => {
                return event.summary.includes(genre);
            }).length;
            return { name: genre, value: valueEvents };
        });

        return data.filter(genre => { return genre.value > 0 })
    }

    useEffect(() => { setData(() => getData()); }, [events]);
    const [data, setData] = useState([]);

    const colors = ['red', 'orange', 'purple', 'green', 'blue'];

    console.log(getData());
    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;