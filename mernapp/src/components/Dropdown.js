import {cloneElement} from "react"

const Dropdown=({open, menu})=>{
   return (
      <>
            {menu.map((item,index)=>(
               <li key={index} className="menu-item">
                  {cloneElement(item,{
                     onClick:()=>{
                        item.props.onClick();
                     }
                  })}
               </li>
            ))}
      </>
   )
}

export default Dropdown