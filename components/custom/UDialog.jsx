import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import { UserdetailContext } from '@/context/UserdetailContext'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import uuid4 from 'uuid4'
const UDialog = ({opend,closed}) => {
const {userdetails,setuserdetails}=useContext(UserdetailContext)  
const CreateUser=useMutation(api.users.CreateUser);
const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer'+tokenResponse?.access_token } },
      );
  
      console.log(userInfo);
      const user=userInfo.data;
      await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuid4()
      })
      if(typeof window!==undefined){
        localStorage.setItem('user',JSON.stringify(user))
      }
      setuserdetails(userInfo?.data);
      closed(false);
    },
    onError: errorResponse => console.log(errorResponse),
  });
  return (
    <Dialog open={opend} onOpenChange={closed}>
 
  <DialogContent className=" border-4 border-white p-8 text-center"  >
    <DialogHeader className="items-center text-center">
      <DialogTitle className="text-2xl font-bold ">Continue with Bolt.New 3.0</DialogTitle>
      <DialogDescription>
        To use you must have log into an existing account or create one
      </DialogDescription>
       <Button className="cursor-pointer bg-blue-500 text-white font-bold hover:bg-white hover:text-black" onClick={googleLogin}>Sign In WITH GOOGLE</Button>
      <DialogDescription className="text-center">
       By using Bolt,you must agree to the colection of usage data for analytics.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default UDialog
