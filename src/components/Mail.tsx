"use client"
import { formatTimestamp } from '@/dateconvert/dateformat'
import { Mailtype } from '@/types/mailtype'
import React from 'react'
const Avatar: React.FC<{ letter: string }> = ({ letter }) => (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E54065] text-white font-bold text-lg">
      {letter}
    </div>
  )
  
const Mail = (props:{mailobj:Mailtype,handlemail:(a:string,b:string)=>void,label:string,isActive:boolean,isFavorite:boolean}) => {
  return (
    <div key={props.mailobj.id} onClick={()=>{props.handlemail(props.mailobj.id,props.label)}} className={`flex p-4 border rounded-lg cursor-pointer w-[95%] border-[#CFD2DC]  hover:bg-[#fffdfd] transition-colors ${props.isActive && "border-[#E54065]"} ${props.isFavorite ? "bg-[#F2F2F2]":"bg-white"}`}>
            <Avatar letter={props.mailobj.from.name.charAt(0).toUpperCase()} />
            <div className="ml-4 flex-grow text-[#636363]">
              <div className="text-sm">From: <b>{props.mailobj.from.name} &lt;{props.mailobj.from.email}&gt;</b></div>
              <div className="text-sm">Subject: <b>{props.mailobj.subject}</b></div>
              <p className="text-sm  mt-1">{props.mailobj.short_description}</p>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span>{formatTimestamp(props.mailobj.date)}</span>
                {props.isFavorite && <span className="text-[#E54065] font-medium">Favorite</span>}
              </div>
            </div>
          </div>
  )
}

export default Mail