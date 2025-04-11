import { chatSession } from "@/configs/GEMINICode";
import { NextResponse } from "next/server";

export async function POST(req){
   

    try{
        const {prompt}=await req.json();
        if(!prompt){
            return NextResponse.json({error:"prompt is missing"},{status:400})
        }
        const result =await chatSession.sendMessage(prompt);
        const AIresp=result.response.text();

        return NextResponse.json({result:AIresp})
    }catch(e){
         console.log("api error:"+e);
        return NextResponse.json({error:e})
    }
}