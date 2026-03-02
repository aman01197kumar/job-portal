import axios from 'axios'
import React, { useEffect, useState } from 'react'

const FetchUser = ({ token, END_POINT }) => {
    const [data, setData] = useState(null)

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (token) {
            const response = axios.get(`${BASE_URL}/${END_POINT}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
            setData(response?.data)
        }

    }, [])
    return data
}

export default FetchUser
