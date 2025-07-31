"use client"

import axios from "axios"
import { set } from "mongoose"
import Link from "next/link"
import Reat, { use, useEffect, useState } from "react"


export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.error(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }   
    },[token])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            
            <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    Your email has been successfully verified! 
                    
                    <Link href="/login"  className="text-green-500">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2  className="text-2xl bg-red-500 text-white p-4 rounded">Error</h2>
                    
                </div>
            )}
        </div>
    )
}