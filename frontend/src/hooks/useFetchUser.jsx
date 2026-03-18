import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetchUser = ({ token, END_POINT }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const BASE_URL = import.meta.env.VITE_BASE_URL;


    const fetchData = async () => {
        if (!token) return;

        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(`${BASE_URL}/${END_POINT}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                }
            })
            setData(response?.data)
        } catch (err) {
            console.error(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(token&&END_POINT)
        fetchData()
    }, [token, END_POINT])

    return { data, loading, error }
}

export default useFetchUser