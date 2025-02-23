"use client"

import React, { use, useEffect, useState } from 'react';

interface ExpensesData {
    id: number;
    date: string;
    station: string;
    liters: number;
    income: number;
}

const ExpensesTable: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<string>('673b333412dcd82679bbe0ca');

    const [data, setData] = useState<ExpensesData[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStation, setFilterStation] = useState<string>('');
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    useEffect(() => {
        const fetchExpensesData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/expenses?id=${currentUser}`);
                const res = await response.json();
                console.log('Expenses data:', res.data);
                setData(res.data);
            } catch (error) {
                console.error('There was a problem with the fetch request:', error);
            }
        };

        fetchExpensesData();
    }
    , [currentUser]);

    const handleDelete = (id: number) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleModify = (id: string) => {
       
    };

    const handleAddNewRecord = () => {
        const date = prompt("Enter date (YYYY-MM-DD):");
        const station = prompt("Enter station name:");
        const liters = prompt("Enter number of liters:");
        const income = prompt("Enter income:");

        if (date && station && liters && income) {
            const newRecord = {
                id: data.length + 1,
                date,
                station,
                liters: Number(liters),
                income: Number(income)
            };
            setData([...data, newRecord]);
        }
    };

    const filteredData = data
        .filter(item =>
            (!filterStation || item.station.toLowerCase().includes(filterStation.toLowerCase())) &&
            (!filterStartDate || item.createdAt >= filterStartDate) &&
            (!filterEndDate || item.createdAt <= filterEndDate)
        )
        .filter(item =>
            item.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.createdAt.includes(searchTerm) ||
            item.amount.toString().includes(searchTerm) ||
            item.price.toString().includes(searchTerm)
        );

    return (
        <div className="py-4">
            <h1 className="text-2xl font-bold mb-4">Expenses Table</h1>

            <div className='md:flex justify-between items-center'>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Filter by Station..."
                        value={filterStation}
                        onChange={(e) => setFilterStation(e.target.value)}
                        className="px-4 py-2 border rounded mr-2"
                    />
                    <input
                        type="date"
                        placeholder="Start Date..."
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                        className="px-4 py-2 border rounded mr-2"
                    />
                    <input
                        type="date"
                        placeholder="End Date..."
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        className="px-4 py-2 border rounded"
                    />
                </div>

                <button
                    onClick={handleAddNewRecord}
                    className="px-4 py-2 mb-4 text-white bg-blue-600 rounded"
                >
                    Add New Record
                </button>
            </div>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Station</th>
                        <th className="border px-4 py-2">Liters</th>
                        <th className="border px-4 py-2">Income</th>
                        <th className="border px-4 py-2">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2 text-center">{new Date(item.createdAt).toISOString().split('T')[0]}</td>
                                <td className="border px-4 py-2 text-center">{item.station}</td>
                                <td className="border px-4 py-2 text-center">{item.amount}</td>
                                <td className="border px-4 py-2 text-center">{item.price}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleModify(item.id)}
                                        className="px-4 py-1 mx-1 text-white bg-blue-500 rounded"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="px-4 py-1 mx-1 text-white bg-red rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="border px-4 py-2 text-center">
                                No data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ExpensesTable;
