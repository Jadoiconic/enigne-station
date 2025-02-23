

import Income from "@/models/Income";
import connectToDatabase from "../../../../lib/db";



export async function GET(req: Request) {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    try {

        const incomes = await Income.find({ owner: id });

        if (!incomes) {
            return new Response(JSON.stringify({ message: 'incomes not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: incomes }), { status: 200 });
    } catch (error) {
        console.error('Error fetching expense:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server Error' }), { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { station, amount, price, userId } = body;

        if (!station || !amount || !price || !userId) {
            return new Response(JSON.stringify({ message: 'All fields are required' }), {
                status: 400,
            });
        }

        await connectToDatabase();

        const data = await Income.create({
            station,
            amount,
            price,
            owner: userId,
        });

        return new Response(JSON.stringify({ success: true, data }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error creating expense:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Server Error' }),
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(req: Request) {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const body = await req.json();
        const { station, amount, price } = body;

        if (!station && !amount && !price) {
            return new Response(JSON.stringify({ message: 'No fields to update' }), { status: 400 });
        }

        const updatedExpense = await Income.findByIdAndUpdate(
            id,
            { station, amount, price },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return new Response(JSON.stringify({ message: 'Expense not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: updatedExpense }), { status: 200 });
    } catch (error) {
        console.error('Error updating expense:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server Error' }), { status: 500 });
    }
}


export async function DELETE(req: Request) {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return new Response(JSON.stringify({ message: 'Expense not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: deletedIncome }), { status: 200 });
    } catch (error) {
        console.error('Error deleting expense:', error);
        return new Response(JSON.stringify({ success: false, message: 'Server Error' }), { status: 500 });
    }
}