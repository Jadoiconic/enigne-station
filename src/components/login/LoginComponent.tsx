"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import PhoneIcon from "@/constants/PhoneIcon";
import EmailIcon from "@/constants/EmailIcon";
import PasswordIcon from "@/constants/PasswordIcon";
import { login } from "@/features/auth/authSlice";

export const LoginComponent = () => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, type: 'login' }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            dispatch(login({ user: data.user, token: '' }));
            // window.location.href = '/';
            console.log( data);
        } catch (error) {
            console.error('There was a problem with the login request:', error);
        }
    };

    return (
        <section className="rounded-sm border w-full border-stroke h-screen md:py-12 xl:py-12 lg:py-12 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap items-center">
                <div className="hidden w-full xl:block xl:w-1/2">
                    <div className="px-26 py-17.5 text-center">
                        <Link className="mb-5.5 inline-block" href="/">
                            <Image
                                className="hidden dark:block"
                                src={"/images/logo/logo.svg"}
                                alt="Logo"
                                width={176}
                                height={32}
                            />
                        </Link>

                        <p className="2xl:px-20">
                        </p>

                        <span className="mt-15 inline-block">
                            <PhoneIcon />
                        </span>
                    </div>
                </div>

                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            Sign In to Egine Station
                        </h2>

                        
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <EmailIcon />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2.5 block font-medium text-black dark:text-white">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <PasswordIcon />
                                    </span>
                                </div>
                            </div>

                            <div className="mb-5">
                                <button
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    type="submit"
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p>
                                    Don’t have any account?{" "}
                                    <Link href="/auth/signup" className="text-primary">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
