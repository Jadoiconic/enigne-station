import IncomeTable from '@/components/icome/IncomeTable'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'
import ExpensesTable from '@/components/expenses/ExpanseTable'
import ReportTable from '@/components/reports/ReportTable'

const Reports = () => {
    return (
        <DefaultLayout>
            <section>
                <ReportTable />
            </section>
        </DefaultLayout>
    )
}

export default Reports