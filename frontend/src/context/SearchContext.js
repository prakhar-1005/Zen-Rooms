import { useReducer } from "react";
import { createContext } from "react";


// initial state 
const INITIAL_STATE={
    city: undefined,
    dates:[],
    options:{
        adults:undefined,
        children:undefined,
        room:undefined
    }
};


// creating a context
export const SearchContext = createContext(INITIAL_STATE)


const SearchReducer =(state,action)=>{
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
    
        case "RESET_SEARCH":
            return INITIAL_STATE;

        default:
            return state;
    }
}

export const SearchContextProvider=({children})=>{
    
    const [state,dispatch] = useReducer(SearchReducer,INITIAL_STATE)

    return (
        <SearchContext.Provider value={{city:state.city, dates: state.dates, options:state.options, dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}