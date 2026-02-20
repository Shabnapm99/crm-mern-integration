import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ImCross } from "react-icons/im";

function AddCustomerModal({ onClose, isUpdating, selectedCustomer, setCustomers }) {

    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        if (isUpdating && selectedCustomer) {
            setName(selectedCustomer?.name);
            setEmail(selectedCustomer?.contact_info?.email);
            setMobile(selectedCustomer?.contact_info?.mobile);
            setStatus(selectedCustomer?.status);
        }
    },[isUpdating,selectedCustomer])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("securedToken");
            //To update
            if (isUpdating) {
                let response = await axios.put(`${import.meta.env.VITE_API_URL}/api/customers/${selectedCustomer._id}`,
                    {
                        name, status, contact_info: { mobile, email },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`//since its protected route
                        }
                    });
                if (response.status === 200) {
                    console.log("Customer updated");
                    setCustomers((prev) => prev.map((customer)=>customer._id === selectedCustomer._id ? response.data.updated : customer))
                    onClose();
                }

            }
            //To Add 
            else {
                let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, {
                    name, status, contact_info: { mobile, email },
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`//since its protected route
                        }
                    });
                if (response.status === 201) {
                    console.log(response.data.customer);
                    setCustomers((prev) => [...prev, response.data.customer]);//add new customer to existing array
                    onClose();//to close the modal

                } else {
                    console.log("Couldn't add customer");
                }
            }


        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <div className='h-full w-full fixed bg-[#101622]/80 flex justify-center z-100 inset-y-0.5 '>
            <div className="bg-[#1c222d]  shadow-2xl rounded-2xl w-full max-w-md p-8">
                <div className='bg-[#111622] text-white  p-2 mb-2 w-fit rounded hover:text-[#135bec]'>
                    <ImCross onClick={onClose} />

                </div>
                <div className="text-center mb-8">
                    {/* <h2 class="text-2xl font-bold tracking-tight text-white">CRM Suite</h2> */}
                    <h1 className="text-3xl font-bold text-white">
                        {isUpdating ? <span>Update Customer</span> : <span>Add a customer</span>}</h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Start managing your customers more efficiently today
                    </p>
                </div>
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
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition text-sm"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* mobile */}

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            mobile
                        </label>
                        <input
                            type="text"
                            placeholder="9876543210"
                            value={mobile}
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition text-sm"
                            onChange={(e) => setMobile(e.target.value)}
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
                            className="w-full bg-[#111622] text-white px-4 py-2 border border-slate-500 rounded-xl  focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                            Status
                        </label>
                        <input
                            type="text"
                            placeholder="ACTIVE"
                            value={status}
                            className="w-full bg-[#111622] px-4 py-2 border border-slate-500 text-white rounded-xl focus:ring-2 focus:ring-[#135bec]/50 focus:border-[#135bec] focus:outline-none transition text-sm"
                            onChange={(e) => setStatus(e.target.value)}
                        />

                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#135bec] text-white py-2 rounded-xl font-semibold hover:bg-[#0456fb] transition duration-200 mt-5"
                    >
                        {
                            isUpdating ? <span>Save changes</span> : <span>Add Customer</span>
                        }

                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCustomerModal