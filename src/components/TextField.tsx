import { ChangeEvent, useEffect, useRef, useState } from "react"

export const TextField = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [textAreaValue, setTextAreaValue] = useState<string>('')
    const [characterCount, setCharacterCount] = useState<number>(0)
    
    const handleTextAreaInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value)
    }
    
    const saveProductionTempInLocalStorage = () => {
        localStorage.setItem("TextAreaContent", textAreaValue)
    }

    const loadTextAreaContentFromLocalStorage = () => {
        const savedContent = localStorage.getItem('TextAreaContent')
        return savedContent !== null ? savedContent : ''
    }

    const addItalicTag = (textAreaValue: string, selectionStart: number, selectionEnd: number) => {
        const selectedText = textAreaValue.substring(selectionStart, selectionEnd)

        const newTextWithItalicTag = textAreaValue.substring(0, selectionStart) + '<i>' + selectedText + '</i>' + textAreaValue.substring(selectionEnd)

        return newTextWithItalicTag
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
                            const currentPosition = textAreaRef.current?.selectionStart || 0
                            const endPosition = textAreaRef.current?.selectionEnd || 0
                            if (currentPosition !== undefined && endPosition !== undefined) {
                                const newtext = addItalicTag(textAreaValue, currentPosition, endPosition)
                                setTextAreaValue(newtext)
                            }
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

    return(
        <>
            <div className="mx-2">
                <div className="flex flex-col justify-between mx-2">
                    <div className="flex flex-row justify-between items-center my-2">
                        <p className="text-black dark:text-white">Character Count: <span className="font-bold text-slate-800 dark:text-sky-400"> {characterCount} </span></p>
                        <div className="flex justify-end gap-2">
                            <button className="text-black dark:text-white bg-sky-400 dark:bg-sky-700 px-2 rounded-sm border border-solid border-sky-800 dark:border-sky-200">Font +</button>
                            <button className="text-black dark:text-white bg-sky-400 dark:bg-sky-700 px-2 rounded-sm border border-solid border-sky-800 dark:border-sky-200">Font -</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center max-h-full static">
                        <textarea
                            placeholder="Start the transcription here!"
                            className="pl-1 w-[48vw] h-[48vh] resize-none border-[2px] border-sky-800 dark:border-sky-200 rounded bg-slate-200 dark:bg-gray-800 text-black dark:text-white"
                            ref={textAreaRef}
                            value={textAreaValue}
                            onChange={handleTextAreaInput}
                        ></textarea>
                    </div>
                </div>
                {/* Download button */}
                {/* Status - Progress saved */}
            </div>
        </>
    )
}