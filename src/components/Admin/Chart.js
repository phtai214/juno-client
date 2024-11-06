import "../../style/components/admin/Chart.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: '1/2024',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '2/2024',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '3/2024',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '4/2024',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '5/2024',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '6/2024',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function Chart() {
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [filterDuration, setFilterDuration] = useState('6m');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/order`);
                const formattedData = response.data.map((item) => {
                    const createDate = new Date(item.createdAt);
                    const monthYear = createDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
                    return {
                        month: monthYear,
                        revenue: item.total_amount,
                        order: response.data.length
                    };
                });
                setData(formattedData);
                setFilteredData(getFilteredData(formattedData, filterDuration));
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        }
        fetchData();
    }, [filterDuration]);

    function getFilteredData(data, duration) {
        const today = new Date();
        const durationMap = {
            '3m': 3 * 30, // 3 months
            '6m': 6 * 30, // 6 months
            '1y': 12 * 30, // 1 year
        };
        const days = durationMap[duration] || durationMap['3m'];
        const startDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

        return data.filter((item) => {
            return new Date(item.createdAt) >= startDate && new Date(item.createdAt) <= today;
        });
    }

    return (
        <div className="chart-container">
            <h2 className="chart-title">Weekly Recap</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={700}
                    height={500}
                    data={filteredData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="order" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
