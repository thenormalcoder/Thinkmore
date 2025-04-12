"use client"
import { MessagesContext } from '@/context/MessagesContext';
import { UserdetailContext } from '@/context/UserdetailContext';
import { api } from '@/convex/_generated/api';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import next from 'next';
import Image from 'next/image';

import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSidebar } from '../ui/sidebar';
import { toast } from 'sonner';

// export const countTokens=(inputText)=>{
//   return inputText.trim().split(/\s+/).filter
//   (word=>word).length;
// };
export const countTokens = (inputText) => {
    //  console.log("inputtext  "+inputText);
     console.log(inputText.trim().length / 4)
  return Math.ceil(inputText.trim().length / 4);
};
// utils/gemini.js
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// export const countTokens = async (inputText, modelName =  "gemini-2.5-pro-exp-03-25") => {
//   console.log("inputtext  "+inputText);
//   try {
//     const model = genAI.getGenerativeModel({ model: modelName });
//     const result = await model.countTokens({ text: inputText });
//     return result.totalTokens;
//   } catch (error) {
//     console.error("Error counting Gemini tokens:", error);
//     return null;
//   }
// };




const Chatview = () => {
    const {id}=useParams();
    const convex=useConvex();
    const {toggleSidebar}=useSidebar();
     const {messages,setmessages}=useContext(MessagesContext);
     const [arrowb, setarrowb] = useState();
     const {userdetails,setuserdetails}=useContext(UserdetailContext);
     const [loading,setloading]=useState(false)
     const Updatemessages=useMutation(api.workspace.UpdateMessages);
     const Updatetokens=useMutation(api.users.Updatetokens);
    useEffect(()=>{
        id && Getworkspace();
    },[id]) 
    
    const Getworkspace=async()=>{
        const result=await convex.query(api.workspace.Getworkspace,{
            workspaceid:id
        })
        console.log("result from the workspace",result);
        setmessages(result?.message)
    }
   
    
    const [defautprompt, setdefautprompt] = useState(`You are a AI Assistant and experience in React Development.
  GUIDELINES:
  - Tell user what your are building
  - response less than 15 lines. 
  - Skip code examples and commentary`)
    const GetAIresp=async()=>{
      
        setloading(true)
        try {
          const PROMPT=JSON.stringify(messages)+defautprompt;
      console.log("sending request with:",PROMPT);
      const result=await axios.post("/api/ai-chat",{
        prompt:PROMPT,
      })
      console.log("get ai resp: ",result);
      const nextmess={
        role:"aires",
        content:result.data.result,
      }
      setmessages(prev=>[...prev,nextmess])
      console.log("generated message:", result?.data?.result);

      

      await Updatemessages({
        messages:[...messages,nextmess],
        workspaceid:id
      })
      console.log("ttoken"+userdetails?.token);
      console.log("tokencurr"+countTokens(JSON.stringify(nextmess)));
      const token=Number(userdetails?.token)-Number(countTokens(JSON.stringify(nextmess)));
      console.log(token)

      setuserdetails(prev=>({
        ...prev,token:token
      }))
      // updating tokens in database
       await Updatetokens({
        userid:userdetails?._id,
        token:token
       })
       setloading(false);
     
        } catch (e) {
          setloading(false);
        }
      
    
    }
  //   useEffect(() => {
  //     if(messages?.length>0){
  //      const role=messages[messages?.length-1].role;
  //      if(role=="user")
  //        GetAIresp()
  //     }
  //  }, [messages])
  useEffect(() => {
    if (
      messages?.length > 0 &&
      messages[messages.length - 1].role === "user" &&
      !loading
    ) {
      GetAIresp();
    }
  }, [messages]);
  

    const ong=(input)=>{
      if(userdetails?.token<10){
        toast('You dont have enough token to generate')
        return ;
      }
      setmessages(prev=>[...prev,{
        role:'user',
        content:input
      }])
      setarrowb("");
      console.log()
    }
  return (
    <div className='relative h-[85vh] flex flex-col'>
     <div  className='flex-1 overflow-y-scroll scroll-none scrollbar-hide'>
        {Array.isArray(messages) ? messages?.map((msg,index)=>(
            <div key={index} className='py-4 px-7 rounded-xl bg-neutral-600 flex items-center gap-4 mb-3 leading-7'>
                {msg?.role=='user' && <Image src={userdetails?.picture} alt='usericon' width={35} height={35} className="rounded-full" />
                }
                <h2 className='flex flex-col overflow-x-auto px-2 ' ><ReactMarkdown >{msg.content}</ReactMarkdown></h2>
            </div>
        )):null}
      {loading && <div className='py-4 px-5 rounded-xl bg-neutral-600 flex items-center gap-4 mb-3'>
         <Loader2Icon className='animate-spin'/>
         <h2>Waiting for the response...</h2>
      </div>
}
</div>
<div className='flex gap-2 items-end'>
 {userdetails && <Image alt="user-logo" src={userdetails?.picture} width={30} height={40} className='rounded-xl cursor-pointer' onClick={toggleSidebar}/>}
   <div className='max-w-xl w-full border-2 border-gray-500 rounded-xl bg-slate-950 p-4 mt-4'>
      <div className='flex gap-3'>
      <textarea name="" id="" placeholder='write your prompt' value={arrowb} className='w-full   h-36   resize-none outline-none ' onChange={(event)=>setarrowb(event.target.value)}/>
        {arrowb && <ArrowRight className='bg-blue-400 text-white w-10 h-8 rounded-3xl  cursor-pointer hover:text-black hover:bg-white' onClick={()=>ong(arrowb)}  />}
      </div>
      <div>
        <Link className='h-5 w-5 cursor-pointer'/>
      </div>
      </div>
      </div>
      </div>
  )
}

export default Chatview
