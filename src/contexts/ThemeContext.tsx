import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = 'CurrentTheme'

type ThemeContext = {
    theme: string
    setTheme: (newTheme: string) => void
}
export const ThemeContext = createContext<ThemeContext | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false)
    const [theme, setTheme] = useState(
        typeof window !== 'undefined'
        ? localStorage.getItem(STORAGE_KEY) || 'light'
        : '[]'
    )

    useEffect(() => {
        setIsMounted(true)

        theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')

        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    if (!isMounted) {
        return null
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}> {children} </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)