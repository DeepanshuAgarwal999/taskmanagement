import React from 'react'

const Navbar = () => {
    return (
        <div className='py-4 px-10 bg-muted w-full border-b z-50 flex justify-between'>
            <p className='text-2xl font-semibold'>
                 Task <span className='text-red-500 bold'>App</span>
            </p>
            <p className='text-pretty'>
               Built with &#10084; for our Teachers
            </p>
        </div>
    )
}

export default Navbar