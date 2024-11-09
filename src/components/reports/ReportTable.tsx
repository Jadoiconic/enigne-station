"use client"

import React, { useState } from 'react'


interface IncomeData {
    id: number;
    date: string;
    station: string;
    liters: number;
    income: number;
}
interface ExpansesData {
    id: number;
    date: string;
    station: string;
    liters: number;
    income: number;
}


const ReportTable = () => {
    const [icome, setIcome] = useState<ExpansesData[] | IncomeData[]>([
        { id: 1, date: '2024-08-20', station: 'Station 1', liters: 500, income: 1000 },
        { id: 2, date: '2024-08-21', station: 'Station 2', liters: 600, income: 1200 },
        { id: 3, date: '2024-08-22', station: 'Station 3', liters: 450, income: 900 },
    ]);
    const [expenses, setExpenses] = useState<ExpansesData[] | IncomeData[]>([
        { id: 1, date: '2024-08-20', station: 'Station 1', liters: 500, income: 1000 },
        { id: 2, date: '2024-08-21', station: 'Station 2', liters: 600, income: 1200 },
        { id: 3, date: '2024-08-22', station: 'Station 3', liters: 450, income: 900 },
    ]);

    return (
        <div className='space-y-4'>
            <div className="py-12 bg-white text-black p-8 min-h-[120vh]">
                <h1 className="text-2xl font-bold mb-4">Icome Table</h1>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Station</th>
                            <th className="border px-4 py-2">Liters</th>
                            <th className="border px-4 py-2">Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {icome.length > 0 ? (
                            icome.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2 text-center">{item.id}</td>
                                    <td className="border px-4 py-2 text-center">{item.date}</td>
                                    <td className="border px-4 py-2 text-center">{item.station}</td>
                                    <td className="border px-4 py-2 text-center">{item.liters}</td>
                                    <td className="border px-4 py-2 text-center">{item.income}</td>

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
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">Station</th>
                            <th className="border px-4 py-2">Liters</th>
                            <th className="border px-4 py-2">Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? (
                            expenses.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2 text-center">{item.id}</td>
                                    <td className="border px-4 py-2 text-center">{item.date}</td>
                                    <td className="border px-4 py-2 text-center">{item.station}</td>
                                    <td className="border px-4 py-2 text-center">{item.liters}</td>
                                    <td className="border px-4 py-2 text-center">{item.income}</td>

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