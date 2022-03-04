import React, { createContext, useContext } from 'react';

const ProcedureContext = createContext({});

export const ProcedureProvider = ({ children }) => {
    return (
        <ProcedureContext.Provider value={''}>
            {children}
        </ProcedureContext.Provider>
    );
}

export const useProcedures =() => {
    
    const context = useContext(ProcedureContext);
    return context;
}