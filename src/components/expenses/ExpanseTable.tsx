"use client"

import React, { use, useEffect, useState } from 'react';

interface ExpensesData {
    date: string;
    station: string;
    amount: number;
    price: number;
}

const ExpensesTable: React.FC = () => {
    const [currentUser] = useState<string>('673b333412dcd82679bbe0ca');

    const [data, setData] = useState<ExpensesData[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStation, setFilterStation] = useState<string>('');
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStation, setNewStation] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<ExpensesData | null>(null);
    const [updatedStation, setUpdatedStation] = useState('');
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');

    const openUpdateModal = (expense: ExpensesData) => {
        setSelectedExpense(expense);
        setUpdatedStation(expense.station);
        setUpdatedAmount(expense.amount.toString());
        setUpdatedPrice(expense.price.toString());
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedExpense(null);
        setUpdatedStation('');
        setUpdatedAmount('');
        setUpdatedPrice('');
    };


    const handleUpdateRecord = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedExpense) return;

        try {
            const response = await fetch(`/api/expenses?id=${selectedExpense._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    station: updatedStation,
                    amount: updatedAmount,
                    price: updatedPrice,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update the record.');
            }

            const result = await response.json();
            console.log('Update Success:', result);

            // Update state with the updated record
            setData(prevData =>
                prevData.map(item =>
                    item._id === selectedExpense._id ? { ...item, station: updatedStation, amount: parseInt(updatedAmount), price: parseInt(updatedPrice) } : item
                )
            );

            // Close modal and reset form fields
            closeUpdateModal();
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };


    

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewStation('');
        setNewAmount('');
        setNewPrice('');
    };

    const handleCreateRecord = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    station: newStation,
                    amount: newAmount,
                    price: newPrice,
                    userId: currentUser,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create the record.');
            }

            const result = await response.json();
            console.log('Create Success:', result);

            // Update state with the newly created record
            setData(prevData => [...prevData, result.data]);

            // Close modal and reset form fields
            closeModal();
        } catch (error) {
            console.error('Error creating record:', error);
        }
    };


    useEffect(() => {
        const fetchExpensesData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/expenses?id=${currentUser}`);
                const res = await response.json();
                setData(res.data);
            } catch (error) {
                console.error('There was a problem with the fetch request:', error);
            }
        };

        fetchExpensesData();
    }
    , [currentUser]);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/expenses?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the record.');
            }

            const result = await response.json();
        
            console.log('Delete Success:', result);
            setData(prevData => prevData.filter(item => item._id !== id));

            // Optionally, refresh data or update state here
        } catch (error) {
            console.error('Error deleting record:', error);
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
                    onClick={openModal}
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
                                        onClick={() => openUpdateModal(item)}
                                        className="px-4 py-1 mx-1 text-white bg-blue-500 rounded"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
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
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Add New Record</h2>
                        <form onSubmit={handleCreateRecord}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Station"
                                    value={newStation}
                                    onChange={(e) => setNewStation(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 mr-2 text-gray-700 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
            )}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Update Record</h2>
                        <form onSubmit={handleUpdateRecord}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Station"
                                    value={updatedStation}
                                    onChange={(e) => setUpdatedStation(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={updatedAmount}
                                    onChange={(e) => setUpdatedAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={updatedPrice}
                                    onChange={(e) => setUpdatedPrice(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeUpdateModal}
                                    className="px-4 py-2 mr-2 text-gray-700 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ExpensesTable;
