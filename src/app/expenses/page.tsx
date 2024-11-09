import ExpensesTable from '@/components/expenses/ExpanseTable'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

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