"use client";

import React from 'react';
import {useRouter} from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserProfile() {
    const router = useRouter();
    const params = useParams();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col items-center justify-center py-10">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-4xl font-bold text-white">
                        {params.id?.toString().charAt(0).toUpperCase() || "U"}
                    </span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Profile</h1>
                <p className="text-lg text-gray-600 mb-6">Welcome, <span className="font-semibold text-orange-500">{params.id}</span>!</p>
                <div className="w-full flex flex-col gap-2 mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">User ID:</span>
                        <span className="font-mono text-gray-800">{params.id}</span>
                    </div>
                    {/* Add more profile fields here if needed */}
                </div>
                <button
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-2 rounded-lg shadow hover:from-orange-600 hover:to-yellow-500 transition-colors"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}