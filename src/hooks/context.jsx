import React, { createContext, useContext, useState } from "react";

export function createId() {
    return Math.random()
}

const Context = createContext(!undefined)

export function ContextWrap({children}) {
    const [logged, setLogged] = useState(false)

    return (
        <Context.Provider value = {[logged, setLogged]}>
            {children}
        </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}