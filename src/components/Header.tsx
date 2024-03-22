import { ThemeSwitch } from "./ThemeSwitch"

export const Header = () => {

    return(
        <>
            <header className="bg-slate-200 text-black shadow-lg dark:bg-gray-800 dark:text-white py-2">
                <div className="container mx-auto flex justify-between items-center px-0">
                    <div className="mr-5 text-2xl"><a href="" className="hover:text-slate-600 dark:hover:text-gray-400">🐄JamilleSubs</a></div>
                    <nav>
                        <ul className="flex items-center space-x-4">
                            <li><a href="" className="text-slate-300 dark:text-gray-500 pointer-events-none">Menu Inicial</a></li>
                            <li><a href="" className="hover:text-slate-600 dark:hover:text-gray-300">Transcrição</a></li>
                            <li><a href="" className="text-slate-300 dark:text-gray-500 pointer-events-none">Sincronia</a></li>
                            <li><a href="" className="text-slate-300 dark:text-gray-500 pointer-events-none">Usuário</a></li>
                            <li><ThemeSwitch /></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}