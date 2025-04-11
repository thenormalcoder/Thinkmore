"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Link } from 'lucide-react'
import Provider from '@/app/Provider'
import { MessagesContext } from '@/context/MessagesContext'
import { Content } from 'next/font/google'
import { UserdetailContext } from '@/context/UserdetailContext'
import UDialog from './UDialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
const Hero = () => {
  const [arrowb, setarrowb] = useState()
  const [generalthemes, setgeneralthemes] = useState([
    "Create Todo app in React",
    "Create budget track app",
    "Create gym management portal dashboard",
    "Create vite app",
    "Create Login signup screen"
  ])
  const {messages,setmessages}=useContext(MessagesContext);
  const {userdetails,setuserdetails}=useContext(UserdetailContext);
  const [opend,setopend]=useState(false);
  const CreateWorkspace=useMutation(api.workspace.CreateWorkspace);
  const router=useRouter();
  const ong=async(input)=>{
    if(!userdetails?.name){
          setopend(true)
      return ;
    }
    if(userdetails?.token<10){
      toast('You dont have enough token to generate')
      return ;
    }
    setmessages({
      role:'user',
      content:input
    })
    console.log(messages);
    const workspaceid=await CreateWorkspace({
      user:userdetails._id,
      messages:[{
        role:'user',
        content:input
      }]
    })
    console.log(workspaceid);
    router.push('/workspace/'+workspaceid);
  }
  return (
   
    <div className='flex items-center text-center flex-col gap-y-4 justify-center'>
      <h2 className='text-4xl font-bold'>What Do you want to build?</h2>
      <p className='text-gray-600 font-semibold'>Prompt,run, 
        <span className='text-white'> edit</span>  and 
        <span className='text-white'> deploy</span> full stack web apps.</p>
      <div className='max-w-xl w-full border-2 border-gray-500 rounded-xl bg-slate-950 p-4'>
      <div className='flex gap-3'>
      <textarea name="" id="" placeholder='write your prompt' className='w-full   h-36   resize-none outline-none ' onChange={(event)=>setarrowb(event.target.value)}/>
        {arrowb && <ArrowRight className='bg-blue-400 text-white w-10 h-8 rounded-3xl  cursor-pointer hover:text-black hover:bg-white' onClick={()=>ong(arrowb)}  />}
      </div>
      <div>
        <Link className='h-5 w-5 cursor-pointer'/>
      </div>
      </div>
      <div className='flex flex-wrap justify-center max-w-2xl gap-2'>
      {generalthemes.map((a,index)=>(
      <h2 key={index} onClick={()=>ong(a)} className='text-sm border-2 border-gray-400 rounded-2xl px-2 py-1 m-2  text-gray-400 hover:text-white cursor-pointer' >{a}</h2>
      ))}
      </div>
      <UDialog opend={opend} closed={(v)=>setopend(false)}/>
    </div>
 
  )
}

export default Hero
