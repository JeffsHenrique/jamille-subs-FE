export const VideoPlayer = () => {

    // https://www.youtube.com/embed/qXvIIdUVaqE
    const mockVideo = 'https://www.youtube.com/embed/qXvIIdUVaqE'

    return(
        <>
        <div className="flex justify-start items-center size-6/12 ml-2">
            <div className="p-2 max-w-lg">
                <div className="flex flex-col gap-4">
                <iframe
                    src={mockVideo}
                    className="w-[48vw] h-[64vh] bg-[#0c0c0c] rounded border-[2px] border-[#0c0c0c]"
                    title="MISSÕES IMPROVÁVEIS #11"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                    {!mockVideo &&
                    <>
                        <input type="file" accept="video/*" />
                    </>
                    }

                <div className="flex flex-row gap-10 w-[48vw] bg-[#0c0c0c] rounded border-[2px] border-sky-200">
                    <div className="">
                        <h3>Video time = 00:00,000</h3>
                        <h3>Total time = --:--,---</h3>
                        {/* Criar volume up e volume down */}
                    </div>
                    {mockVideo &&
                    <>
                        <div className="">
                            <div>Playback Rate: 1.0x</div>
                            <div>Video jump: 3</div>
                        </div>
                    </>
                    }
                </div>
                </div>
            </div>

        </div>
        </>
    )
}