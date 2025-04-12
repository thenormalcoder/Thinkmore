// import { Genaicode } from "@/configs/GEMINICode";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     const {prompt}=await req.json();
//     try{
//       const result=await Genaicode.sendMessage(prompt);
//       const resp=result.response.text();
//       return NextResponse.json(JSON.parse(resp));
//     }catch(e)
//     {
//         return NextResponse.json({e});
//     }
// }
import { Genaicode } from "@/configs/GEMINICode";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await Genaicode.sendMessage(prompt);
    const resp = result.response.text(); // ✅ Await this!
    return NextResponse.json({ response: resp }); // ✅ Return clean JSON
  } catch (e) {
    console.error("Gemini API Error:", e); // Optional: Log on server
    return NextResponse.json({ error: e.message || "Something went wrong" }, { status: 500 });
  }
}
