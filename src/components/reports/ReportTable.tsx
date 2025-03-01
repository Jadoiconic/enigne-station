"use client";

import React, { useEffect, useState } from "react";

interface TransactionData {
    date: string;
    station: string;
    amount: number;
    price: number;
}

const ReportTable = () => {
    const [currentUser] = useState<string>("673b333412dcd82679bbe0ca");
    const [incomeData, setIncomeData] = useState<TransactionData[]>([]);
    const [expenseData, setExpenseData] = useState<TransactionData[]>([]);
    const [mergedData, setMergedData] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/incomes?id=${currentUser}`
                );
                const res = await response.json();
                setIncomeData(res.data);
            } catch (error) {
                console.error("Error fetching income data:", error);
            }
        };

        const fetchExpensesData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/expenses?id=${currentUser}`
                );
                const res = await response.json();
                setExpenseData(res.data);
            } catch (error) {
                console.error("Error fetching expenses data:", error);
            }
        };

        fetchIncomeData();
        fetchExpensesData();
    }, [currentUser]);

    useEffect(() => {
        // Combine data by station
        const combinedData: Record<string, any> = {};

        // Process income data
        incomeData.forEach((item) => {
            if (!combinedData[item.station]) {
                combinedData[item.station] = {
                    station: item.station,
                    totalIncomeAmount: 0,
                    totalIncomePrice: 0,
                    totalExpenseAmount: 0,
                    totalExpensePrice: 0,
                };
            }
            combinedData[item.station].totalIncomeAmount += item.amount;
            combinedData[item.station].totalIncomePrice += item.price;
        });

        // Process expense data
        expenseData.forEach((item) => {
            if (!combinedData[item.station]) {
                combinedData[item.station] = {
                    station: item.station,
                    totalIncomeAmount: 0,
                    totalIncomePrice: 0,
                    totalExpenseAmount: 0,
                    totalExpensePrice: 0,
                };
            }
            combinedData[item.station].totalExpenseAmount += item.amount;
            combinedData[item.station].totalExpensePrice += item.price;
        });

        setMergedData(combinedData);
    }, [incomeData, expenseData]);

    return (
        <div className="space-y-4">
            <div className="py-12 bg-white text-black p-8 min-h-[120vh]">
                <h1 className="text-2xl font-bold mb-4">Financial Report</h1>

                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Station</th>
                            <th className="border px-4 py-2">Liters Sold (Income)</th>
                            <th className="border px-4 py-2">Income Earned</th>
                            <th className="border px-4 py-2">Liters Used (Expense)</th>
                            <th className="border px-4 py-2">Expense Amount</th>
                            <th className="border px-4 py-2">Remaining Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(mergedData).length > 0 ? (
                            Object.values(mergedData).map((station: any, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{station.station}</td>
                                    <td className="border px-4 py-2 text-center">{station.totalIncomeAmount}</td>
                                    <td className="border px-4 py-2 text-center">{station.totalIncomePrice}</td>
                                    <td className="border px-4 py-2 text-center">{station.totalExpenseAmount}</td>
                                    <td className="border px-4 py-2 text-center">{station.totalExpensePrice}</td>
                                    <td className="border px-4 py-2 text-center font-bold">
                                        {station.totalIncomeAmount - station.totalExpenseAmount}
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
        </div>
    );
};

export default ReportTable;
