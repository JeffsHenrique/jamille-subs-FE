import { ChangeEvent, useEffect, useRef, useState } from "react"
import { ReloadMessage, SaveProgress } from "./CustomMessages"
import { Shortcuts } from "./Shortcuts"

type TextFieldProps = {
    fileName: string | null
}

export const TextField = ({ fileName }: TextFieldProps) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [textAreaValue, setTextAreaValue] = useState<string>('')
    const [cursorPositionStart, setCursorPositionStart] = useState<number>(0)
    const [cursorPositionEnd, setCursorPositionEnd] = useState<number>(0)
    const [characterCount, setCharacterCount] = useState<number>(0)
    const [fontSize, setFontSize] = useState<number>(16)
    const [showSaveProgress, setShowSaveProgress] = useState<boolean>(false)
    const [showReloadMessage, setShowReloadMessage] = useState<boolean>(false)
    const [showShortcuts, setShowShortcuts] = useState<boolean>(false)

    const handleTextAreaInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value)
    }

    const saveProductionTempInLocalStorage = () => {
        localStorage.setItem("TextAreaContent", textAreaValue)
        setShowSaveProgress(true)
        setTimeout(() => {
            setShowSaveProgress(false)
        }, 5000)
    }

    const loadTextAreaContentFromLocalStorage = () => {
        const savedContent = localStorage.getItem('TextAreaContent')
        return savedContent !== null ? savedContent : ''
    }

    const saveFontSizeInLocalStorage = (fontSizeToSave: number) => {
        localStorage.setItem("FontSize", fontSizeToSave.toString())
    }

    const loadFontSizeFromLocalStorage = () => {
        const savedFontSize = localStorage.getItem('FontSize')
        return savedFontSize !== null ? savedFontSize : ''
    }

    const addItalicTag = () => {
        const textArea = textAreaRef.current

        if (textArea?.selectionStart !== undefined) {
            const startPos = textArea.selectionStart
            const endPos = textArea.selectionEnd
            const selectedText = textArea.value.substring(startPos, endPos)

            if (selectedText !== '') {
                const selectedTextWithItalicTag = `${textArea.value.substring(0, startPos)}<i>${selectedText}</i>${textAreaValue.substring(endPos)}`
                setTextAreaValue(selectedTextWithItalicTag)
            }
            setCursorPositionStart(startPos)
            setCursorPositionEnd(endPos)
        }
    }

    const downloadProduction = () => {
        const blob = new Blob([textAreaValue], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const newElement = document.createElement("a")

        newElement.href = url
        newElement.download = `${fileName === null ? 'my-transcription.txt' : `${fileName.replace(`${fileName.slice(-4)}`, '_decupagem')}`}`
        document.body.appendChild(newElement)
        newElement.click()
        URL.revokeObjectURL(url)
        document.body.removeChild(newElement)
    }

    const handleBiggerFontSize = () => {
        if (fontSize < 48) {
            setFontSize(prevFontSize => {
                const newFontSize = prevFontSize + 2
                saveFontSizeInLocalStorage(newFontSize)
                return newFontSize
            })
        }
    }

    const handleSmallerFontSize = () => {
        if (fontSize > 8) {
            setFontSize(prevFontSize => {
                const newFontSize = prevFontSize - 2
                saveFontSizeInLocalStorage(newFontSize)
                return newFontSize
            })
        }
    }

    const reloadMessage = () => {
        setShowReloadMessage(true)
        setTimeout(() => {
            setShowReloadMessage(false)
        }, 5000)
    }

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("TextAreaContent", textAreaValue)
        }, 20000)
    }, [textAreaValue])

    useEffect(() => {
        const storedContent = loadTextAreaContentFromLocalStorage()
        setTextAreaValue(storedContent)
    }, [])

    useEffect(() => {
        const handleActions = (event: KeyboardEvent) => {
            if (textAreaValue !== '') {
                if (event.ctrlKey) {
                    switch (event.code) {
                        case 'KeyS':
                            saveProductionTempInLocalStorage()
                            event.preventDefault()
                            break

                        case 'KeyI':
                            addItalicTag()
                            event.preventDefault()
                            break

                        case 'KeyR':
                            reloadMessage()
                            event.stopPropagation()
                            event.preventDefault()
                            break
                    }
                }

                if (event.ctrlKey && event.shiftKey) {
                    switch (event.code) {
                        case 'KeyR':
                            setShowReloadMessage(false)
                            location.reload()
                            event.preventDefault()
                            break
                    }
                }

            }
        }

        window.addEventListener('keydown', handleActions)

        return () => {
            window.removeEventListener('keydown', handleActions)
        }
    }, [textAreaValue])

    useEffect(() => {
        // CHARACTER COUNT
        const characterSelectionCount = () => {
            const textArea = textAreaRef.current
            if (textArea) {
                setCharacterCount(0)
            }
            if (textArea && textArea.selectionStart !== undefined) {
                const startPosition = textArea.selectionStart
                const endPosition = textArea.selectionEnd
                const selectedText = textArea.value.substring(startPosition, endPosition)
                setCharacterCount(selectedText.length)

            } else {
                setCharacterCount(0)
            }
        }

        const textArea = textAreaRef.current
        if (textArea) {
            textArea.addEventListener('select', characterSelectionCount)
            textArea.addEventListener('keyup', characterSelectionCount)
            textArea.addEventListener('click', characterSelectionCount)
        }

        return () => {
            if (textArea) {
                textArea.removeEventListener('select', characterSelectionCount)
                textArea.removeEventListener('keyup', characterSelectionCount)
                textArea.removeEventListener('click', characterSelectionCount)
            }
        }

    }, [textAreaValue])

    useEffect(() => {
        const storagedFontSize = loadFontSizeFromLocalStorage()
        if (storagedFontSize !== '') {
            setFontSize(parseInt(storagedFontSize))
        }
    }, [])

    useEffect(() => {
        const textArea = textAreaRef.current

        textArea?.focus()
        textArea?.setSelectionRange(cursorPositionStart + 3, cursorPositionEnd + 3)
        
        return () => {
            textArea?.focus()
            textArea?.setSelectionRange(cursorPositionStart + 3, cursorPositionEnd + 3)
        }
    }, [cursorPositionStart, cursorPositionEnd])

    return(
        <>
            <div className="mx-2">
                <div className="flex flex-col justify-between mx-2">
                    <div className="flex flex-row justify-between items-center my-2">
                        <p className="text-black dark:text-white">Character Count: <span className="font-bold text-slate-800 dark:text-sky-400"> {characterCount} </span></p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleBiggerFontSize}
                                className="text-black dark:text-white bg-sky-400 dark:bg-sky-700 px-2 rounded-sm border border-solid border-sky-800 dark:border-sky-200">
                                    Font +
                            </button>
                            <button
                                onClick={handleSmallerFontSize}
                                className="text-black dark:text-white bg-sky-400 dark:bg-sky-700 px-2 rounded-sm border border-solid border-sky-800 dark:border-sky-200">
                                    Font -
                            </button>

                            {/* Download button */}

                            <button 
                                className="flex flex-row text-black dark:text-white bg-sky-400 dark:bg-sky-700 px-2 rounded-sm border border-solid border-sky-800 dark:border-sky-200"
                                onClick={() => downloadProduction()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" className="fill-black dark:fill-white" viewBox="0 -960 960 960" width="24"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                .txt
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center max-h-full static">
                        <textarea
                            placeholder="Start the transcription here!"
                            style={{fontSize: `${fontSize}px`}}
                            className={`pl-1 w-[48vw] min-h-[24vh] h-[48vh] max-h-[64vh] resize-y border-[2px] border-sky-800 dark:border-sky-200 rounded bg-slate-200 dark:bg-gray-800 text-black dark:text-white`}
                            ref={textAreaRef}
                            value={textAreaValue}
                            onChange={handleTextAreaInput}
                        ></textarea>
                    </div>
                </div>

                {showShortcuts &&
                    <Shortcuts />
                }

                <div className="mt-2 ml-2 text-black dark:text-white h-10 flex flex-row items-center justify-start">
                    <div>
                        <button onClick={() => setShowShortcuts(!showShortcuts)}>
                            <div className="flex flex-col items-center">
                                <p className="text-sm">{showShortcuts === true ? 'Ocultar' : 'Mostrar'} atalhos</p>
                                {showShortcuts === true ?
                                <svg className="fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg"viewBox="0 -960 960 960" width="24"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                :
                                <svg className="fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                                }
                            </div>
                        </button>
                    </div>
                </div>

                {/* Status - Progress saved */}

                {showSaveProgress &&
                    <div className="absolute right-2 -mt-8"> {/*PRECISO ARRUMAR ISSO DEPOIS*/}
                        <SaveProgress />
                    </div>
                }

                {/* Reload Message */}

                {showReloadMessage &&
                    <div className="absolute right-2 mt-12">
                        <ReloadMessage />
                    </div>
                }
            </div>
        </>
    )
}