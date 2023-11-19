import {createContext, useState} from "react";

export const CommonContext = createContext();

export const CommonContextProvider = ( props ) => {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState("");

    return(
        <CommonContext.Provider
            value={{
                isDeleteModalVisible,setIsDeleteModalVisible,
                selectedPost, setSelectedPost
            }}>

            { props.children }

        </CommonContext.Provider>
    )
}
