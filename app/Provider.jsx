"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from '@/components/custom/Header'
import Hero from '@/components/custom/Hero'
import { MessagesContext } from '@/context/MessagesContext'
import { UserdetailContext } from '@/context/UserdetailContext'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/custom/AppSidebar'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ActionContext } from '@/context/ActionContext'
import { useRouter } from 'next/navigation'
const Provider = ({children}) => {
  const [messages, setmessages] = useState()
  const [userdetails,setuserdetails]=useState();
  const convex=useConvex();
  const [action,setaction]=useState();
  const router=useRouter();
  const Isauthenticated=async()=>{
    if(typeof window!==undefined){
      const user=JSON.parse(localStorage.getItem('user'));
      if(!user){
        router.push('/')
        return ;
      }
      const result=await convex.query(api.users.GetUser,{email:user?.email})
      setuserdetails(result);
      console.log(result)
    }
  }
  useEffect(() => {
    Isauthenticated();
  }, [])
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleGoogleLoginSuccess = (response) => {
    // Handle the login success response
    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle the login failure error
    console.log(error);
  };

  // console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL || window.location.origin; // In production, `NEXT_PUBLIC_APP_URL` should be set in `.env.production`

  return (
    <div>
      <GoogleOAuthProvider redirectUri="https://thinkmorecreatewebsiteonprompt.vercel.app" clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        redirectUri={redirectUri}  // This will automatically use the current URL
      />
      <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENTID}}>
      <UserdetailContext.Provider value={{userdetails,setuserdetails}}>
       <MessagesContext.Provider value={{messages, setmessages}}>
        <ActionContext.Provider value={{action,setaction}}>
        <NextThemesProvider 
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
            <Header/>
        <SidebarProvider defaultOpen={false}>
        <AppSidebar/> 
        {children}
        </SidebarProvider>
        </NextThemesProvider>
        </ActionContext.Provider>
        </MessagesContext.Provider>
        </UserdetailContext.Provider>
        </PayPalScriptProvider>
        </GoogleOAuthProvider>
    </div>
  )
}

export default Provider