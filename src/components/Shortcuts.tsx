export const Shortcuts = () => {
    return (
        <div className="flex flex-col md:flex-row w-[48vw] bg-slate-100 dark:bg-gray-700 rounded border-[2px] border-gray-800 dark:border-sky-200 p-2 m-2">
            <div className="w-[8vw] flex flex-row items-center">
                <div className="flex flex-col items-center">
                    <p className="text-black dark:text-white">ATALHOS</p>
                    <p className="text-4xl">🐄</p>
                </div>
                <hr className="h-[20vh] border-l-2 border-gray-800 dark:border-sky-200 mx-2" />
            </div>

            <div
                className="h-[20vh] resize-y overflow-y-auto overflow-x-hidden rounded border-[2px] border-gray-800 dark:border-sky-200"
            >
                <table className="bg-slate-400 dark:bg-slate-900 w-[36vw]">
                    <tr className="bg-sky-400 dark:bg-sky-700 border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <th className="w-[12vw] border border-gray-800 dark:border-sky-200">ATALHO</th>
                        <th className="border border-gray-800 dark:border-sky-200">Descrição</th>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL Espaço</td>
                        <td className="border border-gray-800 dark:border-sky-200">Play/Pause</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL ,</td>
                        <td className="border border-gray-800 dark:border-sky-200">Retrocede x segundos do vídeo</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL .</td>
                        <td className="border border-gray-800 dark:border-sky-200">Avança x segundos do vídeo</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL ↑</td>
                        <td className="border border-gray-800 dark:border-sky-200">Aumenta a velocidade do vídeo</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL ↓</td>
                        <td className="border border-gray-800 dark:border-sky-200">Diminui a velocidade do vídeo</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL 0</td>
                        <td className="border border-gray-800 dark:border-sky-200">Volta a velocidade de reprodução do vídeo para 1.0</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL SHIFT +</td>
                        <td className="border border-gray-800 dark:border-sky-200">Aumenta o volume do vídeo</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL SHIFT -</td>
                        <td className="border border-gray-800 dark:border-sky-200">Diminui o volume do vídeo</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL S</td>
                        <td className="border border-gray-800 dark:border-sky-200">Salva a produção</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">CTRL E</td>
                        <td className="border border-gray-800 dark:border-sky-200">{`Adiciona <i>tag de itálico</i> no texto selecionado`}</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">ALT ↑</td>
                        <td className="border border-gray-800 dark:border-sky-200">Aumenta a quantidade possível de segundos para avançar/retroceder</td>
                    </tr>
                    <tr className="border-gray-800 dark:border-sky-200 text-black dark:text-white">
                        <td className="border border-gray-800 dark:border-sky-200">ALT ↓</td>
                        <td className="border border-gray-800 dark:border-sky-200">Diminui a quantidade possível de segundos para avançar/retroceder</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}