"use client"
import { UserdetailContext } from '@/context/UserdetailContext'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import Link from 'next/link';

const Workspacehistory = () => {
    const {userdetails,setuserdetails}=useContext(UserdetailContext);
    const convex=useConvex();
    const [workspacelist, setworkspacelist] = useState()
    const {toggleSidebar}=useSidebar()
useEffect(() => {
userdetails && Getallworkspace();
}, [userdetails])


    const Getallworkspace=async()=>{
        const result=await convex.query(api.workspace.Getworkspacehistory,{
            userid:userdetails?._id
        });
        setworkspacelist(result);
        console.log(result)
    }
  return (
    <div>
      <h2 className='font-bold text-white'>Your chats</h2>
      <div>
        {workspacelist && workspacelist?.map((workspace,index)=>(
            <Link href={'/workspace/'+workspace?._id} key={index} >
            <h2 onClick={toggleSidebar} className='text-sm text-gray-500 mt-3 font-semibold border-2 border-white px-2 py-1 rounded-md hover:text-white  cursor-pointer'>{workspace?.message[0].content}</h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Workspacehistory
