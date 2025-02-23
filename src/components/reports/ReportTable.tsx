"use client"

import React, { useEffect, useState } from 'react'


interface IncomeData {
    date: string;
    station: string;
    amount: number;
    price: number;
}
interface ExpensesData {
    date: string;
    station: string;
    amount: number;
    price: number;
}


const ReportTable = () => {
    const [currentUser] = useState<string>('673b333412dcd82679bbe0ca');

    const [data, setData] = useState<IncomeData[]>([]);
    const [dataExpense, setDataExpense] = useState<ExpensesData[]>([]);

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/incomes?id=${currentUser}`);
                const res = await response.json();
                setData(res.data);
            } catch (error) {
                console.error('There was a problem with the fetch request:', error);
            }
        };

        const fetchExpensesData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/expenses?id=${currentUser}`);
                const res = await response.json();
                setDataExpense(res.data);
            } catch (error) {
                console.error('There was a problem with the fetch request:', error);
            }
        };

        fetchExpensesData();
        fetchIncomeData();

    }
        , [currentUser]);

    return (
        <div className='space-y-4'>
            <div className="py-12 bg-white text-black p-8 min-h-[120vh]">
                <h1 className="text-2xl font-bold mb-4">Icome Table</h1>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Station</th>
                            <th className="border px-4 py-2">Liters</th>
                            <th className="border px-4 py-2">Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item._id}>
                                    <td className="border px-4 py-2 text-center">{new Date(item.createdAt).toISOString().split('T')[0]}</td>
                                    <td className="border px-4 py-2 text-center">{item.station}</td>
                                    <td className="border px-4 py-2 text-center">{item.amount}</td>
                                    <td className="border px-4 py-2 text-center">{item.price}</td>

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

            <div className="py-12 bg-white text-black p-8 min-h-[120vh]">
                <h1 className="text-2xl font-bold mb-4">Expenses Table</h1>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Station</th>
                            <th className="border px-4 py-2">Liters</th>
                            <th className="border px-4 py-2">Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataExpense.length > 0 ? (
                            dataExpense.map((item) => (
                                <tr key={item._id}>
                                    <td className="border px-4 py-2 text-center">{new Date(item.createdAt).toISOString().split('T')[0]}</td>
                                    <td className="border px-4 py-2 text-center">{item.station}</td>
                                    <td className="border px-4 py-2 text-center">{item.amount}</td>
                                    <td className="border px-4 py-2 text-center">{item.price}</td>

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
        </div>
    )
}

export default ReportTable