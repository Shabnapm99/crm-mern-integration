import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen bg-[#101622] ">

            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-[#1c222d] rounded-2xl shadow-xl max-w-xl w-full p-10 text-center">

                    <h2 className="text-3xl font-bold text-white mb-4">
                        Welcome to CRM system 👋
                    </h2>

                    <p className="text-slate-400 mb-8">
                        Manage customers, track interactions, and grow relationships—all in one place.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            to="/login"
                            className="bg-[#135bec] text-white px-6 py-3 rounded-lg hover:bg-[#02359b] transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/sign-up"
                            className="border border-[#135bec] text-[#135bec] px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
                        >
                            Sign Up
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home