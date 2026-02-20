import React, { useState } from 'react'
import AddCustomerModal from '../components/AddCustomerModal';
import { useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function CustomersPage() {
    const [showAddModal, setShowModal] = useState(false);
    let [customers, setCustomers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    // To get all users when loading the page
    useEffect(() => {
        let getCustomers = async () => {
            try {
                const token = localStorage.getItem("securedToken");
                let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });//since customers is a protected route that can only accessible for logged in user we have to pass the token which we stored in local storage wheile logging in  while sending the request
                if (response.status === 200) {
                    setCustomers(response.data.customers)
                }

            } catch (error) {
                console.log(error.message)
            }
        }
        getCustomers();
        console.log(customers)

    }, [])

    //delete function
    async function deleteCustomer(id,e) {
       
        const token = localStorage.getItem("securedToken")
        try {
            let response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                console.log("user deleted successfully");
                setCustomers((prev) => prev.filter((customer) => customer._id !== id))//to immediately reflect the delete in froontend.
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    // update function

    async function editCustomer(id) {
        let getCustomers = async () => {
            try {
                const token = localStorage.getItem("securedToken");
                let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setSelectedCustomer(response.data.customer)
                }

            } catch (error) {
                console.log(error.message)
            }
        }
        getCustomers();
        setIsUpdating(true);
        setShowModal(true);
    }
    return (
        <div className="min-h-screen bg-[#101622] flex flex-col relative">

            <div className=" mb-8 p-10 w-full">
                {/* <h2 class="text-2xl font-bold tracking-tight text-white">CRM Suite</h2> */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
                    <div>
                        <h1 className=" basis-3/4 text-3xl font-bold text-white">Customer Directory</h1>
                        <p className="text-slate-400 mt-2 text-sm md:text-base">
                            Efficiently manage and track your client accounts and interactions.
                        </p>
                    </div>
                    {/* Button */}
                    <button
                        type="button"
                        className="basis-1/4 bg-[#135bec] text-white py-2 px-3 rounded-xl font-semibold hover:bg-[#02359b] transition duration-200"
                        onClick={() => setShowModal(true)}
                    >
                        Add new customer
                    </button>
                </div>

            </div>
            {/* Customer data table */}
            <div className=' rounded-2xl shadow-xl w-[90%] border border-slate-700 overflow-x-auto mx-auto'>

                <table className='bg-[#1c222d] w-full rounded-2xl'>
                    <thead className='text-slate-400 border-b border-slate-700'>
                        <tr className='text-base md:text-lg'>
                            <th className='px-6 py-4 text-left'>Name</th>
                            <th className='px-6 py-4 text-left'>email</th>
                            <th className='px-6 py-4 text-left'>status</th>
                            <th className='px-6 py-4 text-left'>Mobile</th>
                            <th className='px-6 py-4 text-left'>actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-700'>
                        {
                            customers.map((customer) => {
                                return (
                                    <tr className='text-left text-sm md:text-base' key={customer?._id}>
                                        <td className='text-white px-6 py-4 '>{customer?.name}</td>
                                        <td className='text-[#135bec] px-6 py-4 '>{customer?.contact_info.email}</td>
                                        <td className=' px-6 py-4 text-xs md:text-sm font-medium  '>
                                            <div className='border-2 border-green-700/80 bg-green-700/10 text-green-700 px-2 py-0.5 rounded-2xl text-center'>{customer?.status}</div>
                                        </td>
                                        <td className='text-slate-400 px-6 py-4 '>{customer?.contact_info.mobile}</td>
                                        <td className=' px-6 py-4 flex gap-6 text-base md:text-lg'>
                                            <FaEdit className='text-slate-400 cursor-pointer'
                                                onClick={() => editCustomer(customer._id)} />

                                            <MdDelete className='text-red-400 cursor-pointer'
                                                onClick={() => deleteCustomer(customer._id)} />
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
            </div>

            {showAddModal && <AddCustomerModal onClose={() => setShowModal(false)} isUpdating={isUpdating} selectedCustomer={selectedCustomer} setCustomers={setCustomers}/>}
        </div>


    )
}

export default CustomersPage