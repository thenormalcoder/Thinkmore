
import React, { useContext, useEffect } from 'react'


import Image from 'next/image';
import { Button } from '../ui/button';
import { UserdetailContext } from '@/context/UserdetailContext';
import { ActionContext } from '@/context/actionContext';
const Header = () => {
  const {userdetails,setuserdetails}=useContext(UserdetailContext);
  const {action,setaction}=useContext(ActionContext);
  const onactionbtn=(action)=>{
    setaction({
      actiontype:action,
      timestamp:Date.now()
    })
  }
  // useEffect(() => {
  //   const user=JSON.parse(localStorage.getItem('user'));
  //   if(!user){
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000); // reloads after 2 seconds
      
  //   }
  // }, [])

  useEffect(() => {
   if(userdetails){
    alert("You have logged in succesfully now do refresh the page once before use")
   }
  }, [])
  
  
  return (
    <div className='p-4 flex justify-between items-center'>
      
     <Image src="/logo.png" alt="Logo" width={70} height={60} className='rounded-full cursor-pointer'/>
     {!userdetails?<div className='flex gap-5'>
      <Button className="cursor-pointer bg-blue-500 text-white font-bold hover:bg-white hover:text-black">Sign In</Button>
      <Button className="cursor-pointer bg-blue-500 text-white font-bold hover:bg-white hover:text-black">Get Started</Button>
     </div>:<div className='flex gap-5'>
      <Button onClick={()=>onactionbtn('export')} className="cursor-pointer bg-blue-500 text-white font-bold hover:bg-white hover:text-black">Export</Button>
      <Button onClick={()=>onactionbtn('deploy')} className="cursor-pointer bg-blue-500 text-white font-bold hover:bg-white hover:text-black">Deploy</Button>
     </div>
}
    </div>
  )
}

export default Header
