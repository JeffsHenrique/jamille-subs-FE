export const SaveProgress = () => {
    return (
        <div className="flex px-2 w-fit border-2 border-solid border-black dark:border-slate-300 rounded-3xl bg-green-500 dark:bg-green-800 text-black dark:text-white animate-pulse">
            <p>Sua produção foi salva com sucesso! 🐄</p>
        </div>
    )
}

export const ReloadMessage = () => {
    return (
        <div className="flex px-2 w-fit border-2 border-solid border-black dark:border-slate-300 rounded-3xl bg-orange-500 dark:bg-orange-700 text-black dark:text-white">
            <p>Para recarregar a página, pressione CTRL SHIFT R! 🐄</p>
        </div>
    )
}