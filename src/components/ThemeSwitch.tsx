import { useTheme } from "@/contexts/ThemeContext"


export const ThemeSwitch = () => {
    const themeCtx = useTheme()

    const handleThemeToggle = () => {
        if (themeCtx) {
            themeCtx.setTheme(themeCtx.theme === 'dark' ? 'light' : 'dark')
        }
    }

    return (
        <label className="relative inline-block text-17px w-16 h-[34px]">
            {themeCtx?.theme === 'light' &&
                <span className="sun">
                    <svg className="absolute top-[6px] left-9 z-[1] h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg>
                </span>
            }

            {themeCtx?.theme === 'dark' &&
                <span className="moon">
                    <svg className="fill-[#73c0fc] absolute top-[5px] left-[5px] z-[1] w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg>
                </span>
            }

            <input
                type="checkbox"
                className="opacity-0 w-0 h-0 dark:translate-x-[30px]"
                onClick={handleThemeToggle}
            /> 
                <span className="absolute cursor-pointer top-0 right-0 left-0 bottom-0 bg-[#49abf7] transition duration-300 rounded-[30px] dark:bg-[#285594]">
                    <svg className="absolute h-[30px] w-[30px] rounded-[20px] left-[2px] bottom-[2px] z-[2] duration-300 dark:translate-x-[30px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#e8e8e8" d="M256 23.05C127.5 23.05 23.05 127.5 23.05 256S127.5 488.9 256 488.9 488.9 384.5 488.9 256 384.5 23.05 256 23.05z"/></svg>
                </span>
        </label>
    )
}