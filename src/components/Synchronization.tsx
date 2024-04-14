import { syncSegmentsApi } from "@/__fakeApi__/syncSegmentsApi"
import { SyncMock } from "@/types/Mock"
import { useCallback, useEffect, useState } from "react"

import { formatTimeComplete } from "@/helpers/formatTime"

export const Synchronization = () => {
    const [segments, setSegments] = useState<SyncMock[]>([])

    const getSegments = useCallback(async () => {
        try {
            const data = await syncSegmentsApi.getSegments()
            setSegments(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        getSegments()
    }, [getSegments])

    return (
        <div className="mx-4">
            <div className="px-4 mb-2 flex flex-row items-center gap-5 w-[48vw] text-black dark:text-white bg-slate-200 dark:bg-gray-800 rounded border-[1px] border-gray-800 dark:border-sky-200">
                <div className="flex justify-center items-center w-[1vw]">
                    <p>#</p>
                </div>

                <hr className="h-[28px] border-[1px] border-slate-300 dark:border-slate-600" />

                <div className="flex justify-center items-center w-[6vw]">
                    <p>Início</p>
                </div>

                <hr className="h-[28px] border-[1px] border-slate-300 dark:border-slate-600" />

                <div className="flex justify-center items-center w-[6vw]">
                    <p>Fim</p>
                </div>

                <hr className="h-[28px] border-[1px] border-slate-300 dark:border-slate-600" />

                <div className="flex justify-center items-center w-[6vw]">
                    <p>Duração</p>
                </div>

                <hr className="h-[28px] border-[1px] border-slate-300 dark:border-slate-600" />

                <div className="py-2 flex justify-center items-center w-[22vw]">
                    <p>Texto</p>
                </div>
            </div>

            <div className="p-2 h-[70vh] flex flex-col gap-5 overflow-y-auto overflow-x-hidden border-sky-800 dark:border-sky-200 rounded border-[1px] bg-slate-200 dark:bg-gray-800 text-black dark:text-white">
                {segments.map((segment) => {
                    return (
                        <>
                            {(segment.id === 1) ?
                                <div className="px-2 flex flex-row items-center gap-5 w-[46vw] text-black dark:text-white bg-green-300 dark:bg-green-700 rounded border-[1px] border-gray-800 dark:border-sky-200">
                                    <div className="flex justify-center items-center w-[2vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {segment.id} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.start)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-green-500 dark:bg-green-800 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end - segment.start)} </p>
                                    </div>

                                    <div className="py-2 flex justify-center items-center w-[24vw]">
                                        <textarea className="px-2 w-full resize-none rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white" value={segment.text}></textarea>
                                    </div>
                                </div>

                                : (segment.id === 2) ?

                                <div className="px-2 flex flex-row items-center gap-5 w-[46vw] text-black dark:text-white bg-red-300 dark:bg-red-700 rounded border-[1px] border-gray-800 dark:border-sky-200">
                                    <div className="flex justify-center items-center w-[2vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {segment.id} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.start)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-red-500 dark:bg-red-800 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end - segment.start)} </p>
                                    </div>

                                    <div className="py-2 flex justify-center items-center w-[24vw]">
                                        <textarea className="px-2 w-full resize-none rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white" value={segment.text}></textarea>
                                    </div>
                                </div>

                                : (segment.id === 3) ?

                                <div className="px-2 flex flex-row items-center gap-5 w-[46vw] text-black dark:text-white bg-yellow-300 dark:bg-yellow-700 rounded border-[1px] border-gray-800 dark:border-sky-200">
                                    <div className="flex justify-center items-center w-[2vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {segment.id} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.start)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-yellow-500 dark:bg-yellow-800 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end - segment.start)} </p>
                                    </div>

                                    <div className="py-2 flex justify-center items-center w-[24vw]">
                                        <textarea className="px-2 w-full resize-none rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-300 dark:bg-gray-700 text-black dark:text-white" value={segment.text}></textarea>
                                    </div>
                                </div>

                                :

                                <div className="px-2 flex flex-row items-center gap-5 w-[46vw] text-black dark:text-white bg-slate-100 dark:bg-gray-700 rounded border-[1px] border-gray-800 dark:border-sky-200">
                                    <div className="flex justify-center items-center w-[2vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-200 dark:bg-gray-800 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {segment.id} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-200 dark:bg-gray-800 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.start)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-200 dark:bg-gray-800 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end)} </p>
                                    </div>

                                    <div className="flex justify-center items-center w-[8vw] rounded border-[1px] border-sky-800 dark:border-sky-200 bg-green-400 dark:bg-green-600 text-black dark:text-white">
                                        <p className="text-black dark:text-white"> {formatTimeComplete(segment.end - segment.start)} </p>
                                    </div>

                                    <div className="py-2 flex justify-center items-center w-[24vw]">
                                        <textarea className="px-2 w-full resize-none rounded border-[1px] border-sky-800 dark:border-sky-200 bg-slate-200 dark:bg-gray-800 text-black dark:text-white" value={segment.text}></textarea>
                                    </div>
                                </div>
                            }
                        </>
                    )
                })}
            </div>
        </div>
    )
}