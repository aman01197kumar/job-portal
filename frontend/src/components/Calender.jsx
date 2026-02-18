import React from 'react'

const DatePicker = () => {
    return (
        <div id="date-range-picker" date-rangepicker="" className="flex items-center">
            <DatePicker label="Basic date picker" />

            <span className="mx-4 text-body">to</span>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                        />
                    </svg>
                </div>

                <input
                    id="datepicker-range-start"
                    name="start"
                    type="date"
                    placeholder="End Date"
                    className="w-full p-3 pl-10 rounded-xl border border-gray-200 outline-none 
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
            </div>
        </div>

    )
}

export default DatePicker
