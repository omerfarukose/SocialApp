import {createContext, useEffect, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ( props ) => {

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [userFollower, setUserFollower] = useState("");
    const [userFollowing, setUserFollowing] = useState("");
    const [userPosts, setUserPosts] = useState("");
    const [userLikes, setUserLikes] = useState("");

    return(
        <UserContext.Provider
            value={{
                username,setUsername,
                userId, setUserId,
                userPosts, setUserPosts,
                userLikes, setUserLikes,
                userAvatar, setUserAvatar,
            }}>

            { props.children }

        </UserContext.Provider>
    )
}
