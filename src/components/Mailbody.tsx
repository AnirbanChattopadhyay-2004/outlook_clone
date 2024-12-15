import { Mailbodytype, Mailtype } from "@/types/mailtype";
import React from "react";
import { formatTimestamp } from "@/dateconvert/dateformat";
const Mailbody = (props: { mailbody: Mailbodytype, mailheader: Mailtype, handlefavourite:(a:string)=>void ,isLoading:boolean}) => {
  const htmlString = props.mailbody.body;
  if(props.isLoading)
    return <div className="flex flex-1 p-6 rounded-xl bg-white overflow-y-auto justify-center items-center">Loading...</div>;
  return (
    <div className="hidden md:block flex-1 p-6 rounded-xl bg-white overflow-y-auto">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[#E54065] flex items-center justify-center text-white text-lg font-semibold">
          {props.mailheader.from.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            
            <h1 className="text-2xl font-semibold">{props.mailheader.subject}</h1>
            
            <button className="px-3 py-1 text-sm bg-[#E54065] text-white  rounded-full hover:bg-[#ee4066]" onClick={()=>{props.handlefavourite(props.mailheader.id)}}>
              Mark as favorite
            </button>
          </div>
          <div className="text-sm  mt-1">
            {formatTimestamp(props.mailheader.date)}
          </div>
          <div
            className="mt-6 space-y-4  text-[12px]"
            dangerouslySetInnerHTML={{ __html: htmlString }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Mailbody;
