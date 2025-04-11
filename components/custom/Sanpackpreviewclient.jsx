import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef } from 'react'

const Sanpackpreviewclient = () => {
    // const previewRef=useRef();
    // const {sandpack}=useSandpack();
   
  //   if (!context) {
  //     return <div>Loading preview...</div>;
  // }
    // // const {action,setaction}=useContext(ActionContext);
    // useEffect(() => {
    //   GetsandpackClient();
    // }, [sandpack])
    
    // const GetsandpackClient=async()=>{
    //     const client = previewRef.current?.getClient();
    //     if(client){
    //         console.log("sandpackclient",client)
    //         const result=await client.getCodeSandboxURL();
    //         console.log("Result",result);
    //         // if(action?.actiontype=='deploy'){
    //         //   window.open('https://'+result?.sandboxId+'.csb.app/')
    //         // }
    //         // else if(action?.actiontype=='export'){
    //         //   window?.open(result?.editorUrl)
    //         // }
    //     }
    // }
  return (
   <></>
      //  <SandpackPreview ref={previewRef}   
      //  style={{height:'80vh',width:'80vw'}}  showNavigator={true}/>
    
  )
}

export default Sanpackpreviewclient;
