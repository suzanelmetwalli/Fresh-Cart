import { createContext, useState } from "react";


export let UserContext = createContext();

export default function UserContextProvider(props){

    const [userToken, setuserToken] = useState(null);
    const [userData, setuserData] = useState(null);
    // const [userId, setUserId] = useState(null);


    return <UserContext.Provider value={{userToken, setuserToken,userData,setuserData}}>
        {props.children}
    </UserContext.Provider>
}

