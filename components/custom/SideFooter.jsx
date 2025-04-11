"use client"
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const SideFooter = () => {
    const router=useRouter();
    const options=[
        {
            name:'Settings',
            icon:Settings
        },
        {
            name:'Help Center',
            icon:HelpCircle
        },
        {
            name:'My Subscription',
            icon:Wallet,
            path:'/pricing'
        },
        {
            name:'Sign Out',
            icon:LogOut
        }
    ]
    const optionclick=(options)=>{
       router.push(options.path)
    }
  return (
    <div className='p-3 '>
      {options.map((options,index)=>(
        <Button variant="ghost"  className=" cursor-pointer flex w-full  my-3"  key={index} onClick={()=>optionclick(options)} >
            <options.icon/>
            {options.name}
        </Button>
      ))}
      
    </div>
  )
}

export default SideFooter
