import ExpensesTable from '@/components/expenses/ExpanseTable'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title:
        "Expenses | Engine Station",
    description: "This is Engine Station Dashboard",
}; 
const Expenses = () => {
    return (
        <DefaultLayout>
            <section>
                <ExpensesTable />
            </section>
        </DefaultLayout>
    )
}

export default Expenses