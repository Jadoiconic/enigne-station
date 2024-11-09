"use client"

import React, { useState } from 'react';

interface ExpensesData {
    id: number;
    date: string;
    station: string;
    liters: number;
    income: number;
}

const ExpensesTable: React.FC = () => {
    const [data, setData] = useState<ExpensesData[]>([
        { id: 1, date: '2024-08-20', station: 'Station 1', liters: 500, income: 1000 },
        { id: 2, date: '2024-08-21', station: 'Station 2', liters: 600, income: 1200 },
        { id: 3, date: '2024-08-22', station: 'Station 3', liters: 450, income: 900 },
    ]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStation, setFilterStation] = useState<string>('');
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    const handleDelete = (id: number) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleModify = (id: number) => {
        const date = prompt("Enter new date (YYYY-MM-DD):");
        const station = prompt("Enter new station name:");
        const liters = prompt("Enter new number of liters:");
        const income = prompt("Enter new income:");

        if (date && station && liters && income) {
            setData(data.map(item =>
                item.id === id
                    ? { ...item, date, station, liters: Number(liters), income: Number(income) }
                    : item
            ));
        }
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
            (!filterStartDate || item.date >= filterStartDate) &&
            (!filterEndDate || item.date <= filterEndDate)
        )
        .filter(item =>
            item.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.date.includes(searchTerm) ||
            item.liters.toString().includes(searchTerm) ||
            item.income.toString().includes(searchTerm)
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
                        <th className="border px-4 py-2">ID</th>
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
                                <td className="border px-4 py-2 text-center">{item.id}</td>
                                <td className="border px-4 py-2 text-center">{item.date}</td>
                                <td className="border px-4 py-2 text-center">{item.station}</td>
                                <td className="border px-4 py-2 text-center">{item.liters}</td>
                                <td className="border px-4 py-2 text-center">{item.income}</td>
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
