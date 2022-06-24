import React, { createContext, useContext, useState } from "react";

export function createId() {
    return Math.random()
}

const Context = createContext(!undefined)

const sampleData = [
    {id: 1, artista: "KL Jay"},
    {id: 2, artista: "Vintage Culture"},
    {id: 3, artista: "ANNA"},
    {id: 3, artista: "Gui Boratto"}
]

export function ContextWrap({children}) {
    const [data, setData] = useState(sampleData)

    return (
        <Context.Provider value = {[data, setData]}>
            {children}
        </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}