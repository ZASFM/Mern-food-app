import {createContext,useContext,useReducer} from 'react';

const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer=(state,action)=>{
   switch(action.type){
      case 'ADD':
         return [...state,{
            id:action.id,
            name:action.name,
            qty:action.qty,
            size:action.size,
            price:action.price,
            img:action.img
         }]
      case 'REMOVE':
         let newCart=[...state];
         newCart.splice(action.index,1);
         return newCart;
      case 'UPDATE':
         let arr=[...state];
         arr.find((item,index)=>{
            if(item.id===action.id){
               arr[index]={...item,qty:parseInt(action.qty)+item.qty,price:action.price+item.price}
            }
            return arr;
         })
         return arr;
      default:
         return state; 
   }
}

export const CartProvider=({children})=>{
   const [state,dispatch]=useReducer(reducer,[]);
   return (
      <CartDispatchContext.Provider value={dispatch}>
         <CartStateContext.Provider value={state}>
            {children}
         </CartStateContext.Provider>
      </CartDispatchContext.Provider>
   )
}

export const useCart=()=>useContext(CartStateContext);
export const useDispatch=()=>useContext(CartDispatchContext);
