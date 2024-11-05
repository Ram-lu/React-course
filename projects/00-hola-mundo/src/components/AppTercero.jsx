import React from "react"

import "../styles/App.css"
import { TwFollowCard } from "./TwFolloCard"

export const App = () =>  (
    <>
        <TwFollowCard userName={"elonmusk"} name={"Elon Musk"} />
        <TwFollowCard userName={"realDonaldTrump"} name={"Donald Trump"} />
        <TwFollowCard userName={"chuponcitoTV"} name={"Chuponsito Oficial"} />

    </>
) 