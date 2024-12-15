"use client"
import Page1 from "@/components/Page1";
import Page2 from "@/components/Page2";
import { useState } from "react";

export default function Home() {
  const [page,setPage] = useState<boolean>(true);
  return (

    <main className="w-full p-5 ">
      <section className="min-h-[84vh]  ">
        
      {
        page ? <Page1/>:<Page2/>}
      </section>
      <div className="flex justify-center items-center gap-10 bottom-0 left-0 relative w-full top-5 p-3">
        <button className={`cursor-pointer p-2  rounded-xl px-5 ${page ? "bg-[#E54065]":"bg-[#CFD2DC]"} text-white `} onClick={()=>{setPage(true)}} >1</button>
        <button className={`cursor-pointer p-2  rounded-xl px-5 ${!page ? "bg-[#E54065]":"bg-[#CFD2DC]"} text-white`} onClick={()=>{setPage(false)}}>2</button>
      </div>
    </main>
  );
}
