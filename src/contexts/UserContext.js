import {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ( props ) => {

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    return(
        <UserContext.Provider
            value={{
                username,setUsername,
                userId, setUserId
            }}>

            { props.children }

        </UserContext.Provider>
    )
}
