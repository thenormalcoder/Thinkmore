"use client"
import PricingModel from '@/components/custom/PricingModel'
import { UserdetailContext } from '@/context/UserdetailContext'
import React, { useContext } from 'react'
const page = () => {
    const {userdetails,setuserdetails}=useContext(UserdetailContext)
  return (
    <div className='mt-20 flex flex-col items-center mx-auto w-full p-10 md:px-32 lg:px-48'>
        <h2 className='font-bold text-5xl'>Pricing</h2>
        <p className='text-gray-400 max-w-xl text-center mt-4'>Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments</p> 
      <div className='p-5 border rounded-xl w-full flex justify-between mt-6 items-center'><h2><span className='text-lg'>{userdetails?.token}</span>Token Left</h2>
      <div >
        <h2 className='font-medium'>Need more Tokens?</h2>
        <p>Upgrade your plan below</p>
      </div>
      </div>
      <PricingModel/>
    </div>
  )
}

export default page
