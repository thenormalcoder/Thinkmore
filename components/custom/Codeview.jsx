"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { Button } from '../ui/button';
import axios from 'axios';
import { MessagesContext } from '@/context/MessagesContext';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { countTokens } from './Chatview';
import { UserdetailContext } from '@/context/UserdetailContext';
import Sanpackpreviewclient from './Sanpackpreviewclient';

const Codeview = () => {
  const [dependencies, setdependencies] = useState({
    "postcss": "^8",
    "tailwindcss":  "3.4.1",
    autoprefixer: "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "latest",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
  })

  const [defaultfile, setdefaultfile] = useState({'/public/index.html':{
    code:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  },
'/App.css':{
  code:`@tailwind base;
  @tailwind components;
  @tailwind utilities`
},
'/tailwind.config.js':{
  code:`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
}`
},
'/postcss.config.js':{
  code:`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
  export default config;
`
}

})
const [genaiprompt, setgenaiprompt] = useState(`
Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, 
without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
also you can use date-fns for date format and react-chartjs-2 chart, graph library

Return the response in JSON format with the following schema:
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}

Here’s the reformatted and improved version of your prompt:

Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.jsx": {
    "code": "import React from 'react';\nimport './styles.css';\nexport default function App() {\n  return (\n    <div className='p-4 bg-gray-100 text-center'>\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\n    </div>\n  );\n}"
  }
}
  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required
  
  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
  -Add Emoji icons whenever needed to give good user experinence
  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
   `)
   const {id}=useParams();
  const [files,setfiles]=useState(defaultfile)
  const [activebutton,setactivebutton]=useState('click')
  const {userdetails,setuserdetails}=useContext(UserdetailContext);
  const {messages,setmessages}=useContext(MessagesContext);
  const convex=useConvex();
  const [loading, setloading] = useState(false)
  useEffect(() => {
    id  && GetFiles()
  }, [id])
  // useEffect(() => {
  //  if(id){
  //   console.log("fetched workspace id",id);
  //   GetFiles();
  //  }
  // }, [id])
  
   const Updatetokens=useMutation(api.users.Updatetokens);

  const GetFiles=async()=>{
    setloading(true)
    const result =await convex.query(api.workspace.Getworkspace,{
      workspaceid:id
    })
    const mergedfiles={...defaultfile,...result?.filedata}
    setfiles(mergedfiles);
    console.log("generated code files",mergedfiles);
    // if(result && result.filedata){
    //   const mergerfiles={...defaultfile,...result.filedata};
    //   setfiles(mergerfiles);
    // console.log("generated code files",mergerfiles);
    // }
    // else{
    //   console.log("no file data found from gemini",result);
    // }
    setloading(false)
  }
  
  
  useEffect(() => {
         if(messages?.length>0){
          const role=messages[messages?.length-1].role;
          if(role=='user')
          genaicode();
         }
      }, [messages])
      
  const UpdateFiles=useMutation(api.workspace.UpdateFiles)
  const genaicode=async()=>{
    // const PROMPT=messages[messages?.length-1]?.content+" "+genaiprompt;
   setloading(true)
   const PROMPT=JSON.stringify(messages)+" "+genaiprompt; 
    const result=await axios.post('/api/genai-code',{
      prompt:PROMPT
    });
    console.log(result.data);
    const genair=result.data
    const mergedfiles={defaultfile,...genair?.files}
    setfiles(mergedfiles)
    await UpdateFiles({
      workspaceid:id,
      files:genair?.files
    })
    const token=Number(userdetails?.token)-Number(countTokens(JSON.stringify(genair)));
          console.log(token)
          // updating tokens in database
           await Updatetokens({
            userid:userdetails?._id,
            token:token
           })
           setuserdetails(prev=>({
            ...prev,token:token
          }))
    setloading(false)
  }
  return (
    <div className='relative h-full w-full'>
      <div>
        <div className='flex gap-4 m-2'>
          <Button    onClick={()=>{setactivebutton('click')
          }} 
          className={`cursor-pointer hover:not-hover:* bg-white text-black ${activebutton=='click' &&'text-white bg-blue-500'}`}>Code</Button>
          <Button onClick={()=>{setactivebutton('preview')
          }}  className={`cursor-pointer bg-white text-black ${activebutton=='preview' &&'text-white bg-blue-500 '}`}>Preview</Button>
        </div>
      </div>
     <SandpackProvider className='w-full h-full'  template="react" theme={'dark'} files={files} customSetup={{
      dependencies:{
        ...dependencies
      }
     }}
     options={{
      externalResources:['https://cdn.tailwindcss.com']
     }}>
     <SandpackLayout className='w-full h-full flex bg-blue-500' >
      {activebutton=='click'?<>
     <SandpackFileExplorer  style={{height:'80vh'}} />
      <SandpackCodeEditor style={{height:'80vh'}} />
      </>:
      <>
      {/* <Sanpackpreviewclient/> */}
      <SandpackPreview style={{height:'80vh'}}/>
     </>
}
    </SandpackLayout>
  </SandpackProvider>

  {/* <div className='p-10 bg-gray-800 opacity-0 absolute top-0 rounded-xl w-full h-full flex items-center justify-center left-0 z-10'>
    <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
    <h2 className='text-white'>Generating Your Files....</h2>
  </div> */}
  {loading &&<div className='absolute flex items-center justify-center top-0 p-10 bg-gray-800 opacity-80 rounded-xl w-full h-full '>
  <Loader2Icon className='animate-spin h-10 w-10 text-white'/>
  <h2 className='text-white'>Generating Your Files...</h2>
  </div>
}
    </div>
  )
}

export default Codeview
