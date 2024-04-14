import { ChangeEvent, useEffect, useRef, useState } from "react"
import { SaveProgress } from "./SaveProgress"

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
        newElement.download = `${fileName === null ? 'my-transcription.txt' : fileName}`
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

                        case 'KeyE':
                            addItalicTag()
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

                {/* Status - Progress saved */}

                {showSaveProgress &&
                    <div className="m-2 flex justify-end">
                        <SaveProgress />
                    </div>
                }
            </div>
        </>
    )
}