// ProfilePage.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import DropdownButton from '../components/DropdownButton';
import { MuiTelInput } from 'mui-tel-input';

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("John Doe");
  const [email, setEmail] = useState('user-email')
  const [contactDetails, setContactDetails] = useState({
    phone: "",
    college_name: '',
    course: '',
    skills: ['Java', 'Reactjs', 'Javascript', 'HTML and CSS', 'Nodejs', 'MongoDB'],

  });
  const [value, setValue] = React.useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg ">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt="User"
              className="w-32 h-32 rounded-full object-cover bg-red-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-8 h-8 bg-blue-500 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{userName}</h1>
            <h2 className=" font-semibold text-gray-500">{email}</h2>
            <p>User profile</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Contact Information</h2>

          <div>

            <label className="block text-sm font-medium text-gray-700 my-3">Contact Number</label>
            <form className="flex flex-col sm:flex-row md:space-x-4 w-full">

              <div className="flex-1 md:w-4/5">
                <MuiTelInput className='w-full' value={value} onChange={handleChange} />
              </div>

              <button
                type="submit"
                className="flex-shrink-0 w-1/2 my-3 p-3 md:w-1/5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Send verification code
              </button>
            </form>


          </div>


          <label htmlFor='skill_dropdown' className="mt-3 block mb-2 text-sm font-medium text-gray-700 dark:text-white">Add your skills</label>
          <DropdownButton />

          <div className="relative mt-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              htmlFor="large_size"
            >
              Upload Resume
            </label>


            <input
              className="absolute inset-0 opacity-0 cursor-pointer"
              id="large_size"
              type="file"
            />


            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 cursor-pointer">
              <span>Choose a file</span>
              <span className="text-sm text-gray-400 text-center">No file chosen</span>
            </div>
          </div>


          

            <button
              type="button"
              className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>

      

      </div>
    </>
  );
};

export default UserProfile;
