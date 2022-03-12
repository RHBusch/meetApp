import { setCustomData } from 'atatus-spa';
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


    /*const EventGenre = ({ events }) => {
        const [data, setData] = useState([]);
        useEffect(() => {
            const getData = () => {
                const genres = ['React', 'JavaScript', 'Node.js', 'jQuery', 'AngularJS'];
                const data = genres.map((genre) => {
                    const value = events.filter(({ summary }) =>
                        summary.split('').includes(genre)).length;
                    return { name: genre, value };
                })
                return data;
            }
            setData(() => getData());
        }, [events])
    
        const colors = ['#A3C4BC', '#BFD7B5', '#E7EFC5', '#F2DDA4', '#F4B393'];*/

    /*const EventGenre = ({ events }) => {
        const data = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
        ];*/
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
                    label={({ name, value }) => `${name}: ${(value)}`}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;