import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!name.trim()) {
            setShowError(true);
            setErrorMessage('Please provide a valid name');
            return;
        } else
            if (!role.trim() || role.toUpperCase() !== "ADMIN" && role.toUpperCase() !== "AGENT") {
                setShowError(true);
                setErrorMessage('Please provide admin or agent');
                return;
            } else
                if (!email.trim()) {
                    setShowError(true);
                    setErrorMessage('Please provide a valid email');
                    return;
                } else
                    if (emailRegex.test(email) === false) {
                        setShowError(true);
                        setErrorMessage("Please provide proper email");
                        return
                    }
                    else {
                        try {
                            let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, { name, email, password, role:role.toUpperCase(),username});

                            if (response.status === 201) {
                                console.log("user created successfully")
                                navigate('/login')
                            } else {
                                setShowError(true);
                                setErrorMessage(response.data.message);
                            }


                        } catch (error) {

                            console.log("Error happened while posting the data", error.message)
                        }

                    }
        setShowError(false);
        setName('');
        setEmail('');
        setRole('');
        setUsername('');
        setPassword('');
    }

    return (
        <div className="flex flex-col lg:flex-row lg:gap-5 items-center justify-center min-h-screen bg-[#101622] px-4">
            {/* Logo / Title */}
            <div className="text-center mb-8">
                {/* <h2 class="text-2xl font-bold tracking-tight text-white">CRM Suite</h2> */}
                <h1 className="text-3xl font-bold text-white">Create your account</h1>
                <p className="text-slate-400 mt-2 text-sm">
                    Start managing your customers more efficiently today
                </p>
            </div>

            <div className="bg-[#1c222d]  shadow-2xl rounded-2xl w-full max-w-md p-8">



                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/*Name*/}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Role */}

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            Role
                        </label>
                        <input
                            type="text"
                            placeholder="ADMIN,AGENT"
                            value={role}
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition"
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    {/* Username */}

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>


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
                            {errorMessage}
                        </p>}
                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#135bec] text-white py-2 rounded-xl font-semibold hover:bg-[#0456fb] transition duration-200"

                    >
                        Sign Up
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
                    already have an account?{" "}
                    <span className="text-[#135bec] font-medium hover:underline cursor-pointer" onClick={() => navigate('/login')}>
                        Sign In
                    </span>
                </p>

            </div>
        </div>
    )
}

export default SignUpPage