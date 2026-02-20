import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {setIsLoggedin,setAuthUser} from '../features/userSlice.js'
import { useDispatch } from 'react-redux';

function LoginPage() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    async function handleLogin() {
        try {
            let response = await axios.post('http://localhost:4000/api/login', { email, password });
            if (response.status === 200) {
                console.log("Logged in successfully!! token: ", response.data.token)
                // console.log(response.data)
                localStorage.setItem("securedToken", response.data.token);
                dispatch(setIsLoggedin(true));
                dispatch(setAuthUser(response.data.user))
                navigate('/customers')
            }

        } catch (error) {
            console.log(error.message)
        }
        
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#101622] px-4">

            <div className="bg-[#1c222d]  shadow-2xl rounded-2xl w-full max-w-md p-8">

                {/* Logo / Title */}
                <div className="text-center mb-8">
                    {/* <h2 class="text-2xl font-bold tracking-tight text-white">CRM Suite</h2> */}
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Sign in to your account to manage your customers
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            className="w-full bg-[#111622] px-4 py-2 border border-slate-500 text-white rounded-xl focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* error paragraph */}
                        {showError && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            Invalid email format
                        </p>}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-slate-600">
                            <input type="checkbox" className="rounded" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-[#135bec] hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        className="w-full bg-[#135bec] text-white py-2 rounded-xl font-semibold hover:bg-[#02359b] transition duration-200"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t"></div>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-1 border-t"></div>
                </div>


                {/* Signup */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <span className="text-[#135bec] font-medium hover:underline cursor-pointer" onClick={() => navigate('/sign-up')}>
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    )
}

export default LoginPage