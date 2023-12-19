"use client";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "../../declares/interfaces";

interface ContextProps {
    user: User | undefined; // Cho phép giá trị user là undefined
    setUser: Dispatch<SetStateAction<User | undefined>>; // Cho phép setUser có thể là undefined
}

const GlobalContext = createContext<ContextProps>({
    user: {} as User,
    setUser: (): User | any => {},
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>();

    return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
