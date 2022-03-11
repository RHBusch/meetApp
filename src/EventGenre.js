import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';


const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = () => {
            const genres = ['React', 'JavaScript', 'Node.js', 'jQuery', 'AngularJS']
            const data = genres.map((genre) => {
                const value = events.filter(({ summary }) =>
                    summary.split('').includes(genre)).length;
                return { name: genre, value };
            })
            return data;
        }
        setData(() => getData());
    }, [events]
    )


    const colors = ['#0000FF', '#FFA500', '#FFC0CB', '#00FF00', '#FFFF00'];



    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    // faill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} name={entry.name} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}
export default EventGenre;