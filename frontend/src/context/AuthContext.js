import { useReducer,createContext,useEffect } from "react";

// initial state 
const INITIAL_STATE={
    user:JSON.parse(localStorage.getItem("user")) || null,
    loading:false,
    error:null 
};


// creating a context
export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer =(state,action)=>{
    switch (action.type) {
        
        case "LOGIN_START":
            return {
                user:null,
                loading: true,
                error:null  
            }
        
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading:false,
                error:null
            }
        
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading:false,
                error:action.payload
            }

        case "LOGOUT":
            return {
                user: null,
                loading:false,
                error:null
            }   

        default:
            return state;

    }
}

export const AuthContextProvider=({children})=>{
    
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE)

    //storing the user in the localStorage so that it does not logout when page is refreshed 
    useEffect(()=>{
        //localstorage can only store strings so we convert the user to string
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])


    return (
        <AuthContext.Provider value={{ user:state.user, loading:state.loading,error:state.error ,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}