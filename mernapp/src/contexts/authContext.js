import {useReducer,createContext,useContext,useEffect} from 'react';

const INITIAL_STATE={
   user:undefined,
   loading:false,
   error:null,
}

const authReducer=(state,action)=>{
   switch(action.type){
      case 'LOGIN_STARTED':
         return {
            user:null,
            loading:true,
            error:null,
         }
      case 'LOGIN_SUCCESSFUL':
         return {
            user:action.payload,
            loading:false,
            error:null,
         }
      case 'LOGIN_FAILED':
         return {
            user:null,
            loading:false,
            error:action.payload,
         }
      case 'LOGOUT':
         return {
            user:null,
            loading:false,
            error:null,
         }
      default:
         return state;
   }
}

const AuthContext=createContext(INITIAL_STATE);
const AuthProvider=({children})=>{
   const [state,dispatch]=useReducer(authReducer,INITIAL_STATE);

   useEffect(()=>{
      localStorage.setItem('user',JSON.stringify({token:state.token,user:state.user}));
   },
   [state.user,state.token])

   return (
      <AuthContext.Provider
         value={{
            user:state.user,
            error:state.error,
            loading:state.loading,
            dispatch
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

const useAuthProvider=()=>{
   return useContext(AuthContext)
}

export {
   useAuthProvider,
   AuthContext,
   AuthProvider
}