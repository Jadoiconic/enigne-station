import IncomeTable from '@/components/icome/IncomeTable';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Income | Engine  Station",
    description:
        "This is Engine Station Income page",
};

const icome = () => {
    return (
        <DefaultLayout>
            <section>
                <IncomeTable />
            </section>
        </DefaultLayout>
    )
}

export default icome