import React from 'react'
import Navbar from '../shared/Navbar'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default CommonLayout