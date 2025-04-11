"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { UserdetailContext } from '@/context/UserdetailContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

const PricingModel = () => {

    const {userdetails,setuserdetails}=useContext(UserdetailContext)
    const Updatetokens=useMutation(api.users.Updatetokens)
    const [selectedoption,setselectedoption]=useState()
    const onsucccesspayment=async(pricing)=>{
        const token=userdetails?.token+Number(selectedoption?.value);
        console.log(token)

        await Updatetokens({
            token:token,
            userid:userdetails?._id
        })
    }
   const [pricingoptions, setpricingoptions] = useState([
        {
          name:'Basic',
          tokens:'50K',
          value:50000,
          desc:'Ideal for hobbyists and casual users for light, exploratory daily tasks',
          price:4.99
        },
        {
          name:'Starter',
          tokens:'120K',
          value:120000,
          desc:'Designed for professionals who need to use Bolt a few times per week.',
          price:9.99
        },
        {
          name:'Pro',
          tokens:'2.5M',
          value:2500000,
          desc:'Designed for professionals who need to use Bolt a few times per week.',
          price:19.99
        },
        {
          name:'Unlimted',
          tokens:'Unmited',
          value:999999999,
          desc:'Designed for professionals who need to use Bolt a few times per week.',
          price:49.99
        }
      ]
    )
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7'>
      {pricingoptions.map((pricing,index)=>(
        <div key={index} className='border p-7 rounded-xl flex flex-col gap-4'>
            <h2 className='font-bold text-2xl'>{pricing.name}</h2>
            <h2 className='font-medium text-lg'>{pricing.tokens} Tokens</h2>
            <p className='text-gray-400'>{pricing.desc}</p>
            <h2 className='font-bold text-4xl text-center mt-6'>${pricing.price}</h2>
            <Button className="text-center px-8 py-3">Upgrade to {pricing.name}</Button>
            <PayPalButtons  onClick={()=>{setselectedoption(pricing);console.log(pricing.value)}} disabled={!userdetails} style={{ layout: "horizontal" }} onApprove={()=>((onsucccesspayment()))} onCancel={()=>console.log("Payment Canceled")} createOrder={(data,actions)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                            amount:{
                                value:pricing.price,
                                currency_code:'USD'
                            }

                        }
                    ]
                })
            }}/>
            </div>

      ))}
    </div>
  )
}

export default PricingModel
