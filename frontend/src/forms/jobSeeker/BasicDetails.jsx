import axios from 'axios'
import { END_POINTS } from '../../assets/END_POINTS'
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { addUserId } from '../../redux/userInfo';
import { useState } from 'react';
import { Loader } from 'lucide-react';


const BasicDetails = ({ setActiveStep }) => {

    const [isLoading, setIsloading] = useState(false)
    const [userId, setUserId] = useState('1134')

    const dispatch = useDispatch()
    const { user_selection } = useSelector(state => state.userInfo)


    const submitBasicDetails = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        try {
            setIsloading(true);

            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const formData = new FormData(e.target);
            const newUser = Object.fromEntries(formData.entries());

            const { data } = await axios.post(
                `${BASE_URL}/${END_POINTS.SIGNUP}`,
                newUser
            );

            toast.success(data?.message);
            // setUserId(data?.user_id);
            dispatch(addUserId(data?.user_id));
            setActiveStep(prev => prev + 1);

        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setIsloading(false);
        }
    };

    return (
        <form onSubmit={submitBasicDetails}>
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
                        className="inputClass"
                    // disabled={!!user.username}


                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        // value={user.user_email}
                        className="inputClass"
                    // disabled={!!user.user_email}

                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="inputClass"

                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Current Location"
                        className="inputClass"

                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="inputClass"
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        className="inputClass"

                    />
                    <input
                        type="text"
                        name="feature_selection"
                        value={user_selection}
                        className="inputClass"
                        readOnly
                    />
                </div>

            </section>
            <div className="flex justify-center space-x-4">
                <button
                    type='submit'
                    className="w-fit px-6 py-3 rounded-lg font-semibold text-white bg-slate-900 hover:bg-blue-700 transition"
                >
                    {
                        isLoading ? <Loader /> : "Save and Next"
                    }

                </button>
                {
                    userId &&
                    <button
                        type='button'
                        className="w-fit px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                        {
                            isLoading ? <Loader /> : "Edit"
                        }

                    </button>
                }
            </div>
            <Toaster />
        </form>
    )
}

export default BasicDetails
