import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/db';
import Users from '@/models/Users';
import bcrypt from 'bcryptjs';


export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const email = searchParams.get('email');

        if (id) {
            const user = await Users.findById(id);
            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            return NextResponse.json({ user }, { status: 200 });
        } else if (email) {
            const user = await Users.findOne({ email });
            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            return NextResponse.json({ user }, { status: 200 });
        }

        // If no specific query parameter is provided, return all users
        const users = await Users.find();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching user(s):", error.message);
        return NextResponse.json({ message: "Failed to fetch user(s)" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, role, password, type } = body;

        await connectToDatabase();

        if (type === 'register') {
            // Registration
            if (!name || !email || !password) {
                return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
            }

            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ message: 'User already exists' }, { status: 400 });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create the user
            const newUser = await Users.create({
                name,
                email,
                role,
                password: hashedPassword,
            });

            console.log('User registered:', newUser);
            return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
        } else if (type === 'login') {
            // Login
            if (!email || !password) {
                return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
            }

            const user = await Users.findOne({ email }).select('+password');
            if (!user) {
                return NextResponse.json({ message: 'Invalid email' }, { status: 401 });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
            }

            console.log('User logged in:', user);
            return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Error in POST route:', error.message);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await connectToDatabase();
        const deletedUser = await Users.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log("User deleted:", deletedUser);
        return NextResponse.json({ message: "User deleted successfully", user: deletedUser }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting user:", error.message);
        return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, ...updateFields } = body;

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        await connectToDatabase();
        const updatedUser = await Users.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log("User updated:", updatedUser);
        return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating user:", error.message);
        return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
    }
}
