'use client'

import Navbar from "@/components/Navbar"
import { useSession, signOut } from "next-auth/react"

const dashboard = () => {
    const {data: session} = useSession()
    return(
        <section>
            <Navbar />
        <div>
            <h1>Dashboard</h1>
            <p>Hi {session?.user?.email}</p>
            <button onClick={() => signOut()}>
                Sign out
            </button>
        </div>
        </section>
        
    )
}

export default dashboard;
