export const TextField = () => {
    return(
        <>
            <div className="bg-red-500 mr-2">
                <div className="flex flex-col justify-between">
                    <div>
                        <p>Character Count: <span> </span></p>
                    </div>
                    <div className="flex flex-col items-center max-h-full static">
                        <textarea
                            placeholder="Start the transcription here!"
                            className="pl-1 w-[48vw] h-[48vh] resize-x border-[2px] border-sky-200 rounded bg-[#1a1a1a] text-[#fafafa]"
                        ></textarea>
                    </div>
                </div>
                {/* Download button */}
                {/* Status - Progress saved */}
            </div>
        </>
    )
}