import React from 'react'
import NextButton from '../../components/NextButton'

const BasicDetails = ({ setActiveStep }) => {

    const submitBasicDetails = (e) => {
        e.preventDefault()
        setActiveStep(prev=>prev+1)
    }
    return (
        <>
            <section className="m-8">
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                    Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        // value={user.username}
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    // disabled={!!user.username}

                    // onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        // value={user.user_email}
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    // disabled={!!user.user_email}
                    // onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    // onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Current Location"
                        className="w-full p-3 rounded-xl border border-gray-200 outline-none
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    // onChange={handleChange}
                    />
                </div>

            </section>
            <NextButton/>
        </>
    )
}

export default BasicDetails
