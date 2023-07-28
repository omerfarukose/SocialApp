import {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ( props ) => {

    const [username, setUsername] = useState("")

    return(
        <UserContext.Provider
            value={{
                username,setUsername,
            }}>

            { props.children }

        </UserContext.Provider>
    )
}
