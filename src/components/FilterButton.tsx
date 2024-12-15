import React from 'react'
interface Proptype{
    label:string,
    selected:boolean,
    onclick:(a:string)=>void
}
const FilterButton = (props:Proptype) => {
  return (
    <button className={`px-3 py-1 text-sm rounded-2xl h-[50%] font-medium transition-colors text-[#636363] ${props.selected && "bg-[#E1E4EA]" }`} onClick={()=>{props.onclick(props.label)}}>{props.label}</button>
  )
}

export default FilterButton