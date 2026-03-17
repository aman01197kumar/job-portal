import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FetchUser = ({ token, END_POINT }) => {
    const [data, setData] = useState(null)

    console.log(token, END_POINT)
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const fetchData = async () => {
        if (token) {
            try {
                const response = await axios.get(`${BASE_URL}/${END_POINT}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })
                setData(response?.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [token, END_POINT])

    return data
}

export default FetchUser
