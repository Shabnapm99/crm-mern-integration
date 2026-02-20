import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthUser, setIsLoggedin } from '../features/userSlice.js'

function Navbar() {

    let isLoggedin = useSelector((state) => state.user.isLoggedin);
    let user = useSelector((state) => state.user.authUser)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return (
        <nav className="w-full bg-[#111622] backdrop-blur-md shadow-sm fixed top-0 z-50 border-b border-slate-400">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <h1 className="text-xl font-bold text-[#135bec]">
                    CRM
                </h1>

                {/* Links */}
                <div className="space-x-6 text-white font-medium flex justify-center items-center text-sm md:text-base">
                    <Link to="/" className="hover:text-[#135bec]">Home</Link>
                    {
                        !isLoggedin ? <><Link to="/login" className="hover:text-[#135bec] ">Login</Link>
                            <Link
                                to="/sign-up"
                                className="bg-[#135bec] text-white px-4 py-2 rounded-lg hover:bg-[#02359b] transition"
                            >
                                Sign Up
                            </Link></>
                            : <div className='flex justify-center items-center gap-2'>
                                <Link to="/customers" className="hover:text-[#135bec]">Customers</Link>
                                <div
                                    className="text-[#135bec] hover:text-white cursor-pointer hidden md:block"
                                >
                                    Hi, {user?.name}
                                </div>
                                <div className='hover:text-[#135bec] cursor-pointer' onClick={() => {

                                    localStorage.removeItem("securedToken");
                                    dispatch(setIsLoggedin(false));
                                    dispatch(setAuthUser(null));
                                    navigate('/login')
                                }}>
                                    Logout
                                </div>
                            </div>

                    }

                </div>

            </div>
        </nav>
    )
}

export default Navbar