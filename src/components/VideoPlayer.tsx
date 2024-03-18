"use client"

import React, { ChangeEvent, useEffect, useRef, useState } from "react"

export const VideoPlayer = () => {
    const [videoSrc, setVideoSrc] = useState<string>()
    const [currentVideoTime, setCurrentVideoTime] = useState<string>('')
    const [totalVideoTime, setTotalVideoTime] = useState<string>('')

    const videoRef = useRef<HTMLVideoElement>(null)

    // function to upload a video
    const handleVideoInput = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = event.target.files?.[0] || null

        if (selectedVideo) {
            const videoURL = URL.createObjectURL(selectedVideo)
            setVideoSrc(videoURL)
        } else return
    }

    // Hook for getting CURRENT and TOTAL Video Time
    useEffect(() => {
        const videoElement = videoRef.current

        if (!videoElement) return

        let animationFrameId: number

        const getVideoTime = () => {
            // Current Time
            const currentTime = videoElement.currentTime
            const CurrentMinutes = Math.floor(currentTime / 60)
            const CurrentSeconds = Math.floor(currentTime % 60)
            const CurrentMilliseconds = Math.floor((currentTime - Math.floor(currentTime)) * 1000)
            const formattedCurrentTime = `${String(CurrentMinutes).padStart(2, '0')}:${String(CurrentSeconds).padStart(2, '0')},${String(CurrentMilliseconds).padStart(3, '0')}`
            setCurrentVideoTime(formattedCurrentTime)
            animationFrameId = requestAnimationFrame(getVideoTime)

            // Total Time
            const totalTime = videoElement.duration
            const totalMinutes = Math.floor(totalTime / 60)
            const totalSeconds = Math.floor(totalTime % 60)
            const totalMilliseconds = Math.floor((totalTime - Math.floor(totalTime)) * 1000)
            const formattedTotalTime = `${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')},${String(totalMilliseconds).padStart(3, '0')}`
            setTotalVideoTime(formattedTotalTime)
        }

        videoElement.addEventListener('timeupdate', getVideoTime)
        animationFrameId = requestAnimationFrame(getVideoTime)
        
        return () => {
            videoElement.removeEventListener('timeupdate', getVideoTime)
            cancelAnimationFrame(animationFrameId)
        }
    }, [videoSrc])

    return(
        <>
            <div className="flex justify-start items-center size-6/12 ml-2">
                <div className="p-2 max-w-lg">
                    <div className="flex flex-col gap-4">
                        {!videoSrc &&
                        <>
                            <iframe width={480} height={320} className="border border-solid border-slate-200 rounded bg-gradient-to-b from-gray-800" />
                            <input type="file" accept="video/*" onChange={handleVideoInput} />
                        </>
                        }

                        {videoSrc && (
                            <>
                                <div className="flex justify-center items-center w-[50vw]">
                                    {/* NEED TO SOLVE 9:16 FORMAT VIDEOS */}
                                    <div className="max-w-[48vw]">
                                        <video ref={videoRef} controls>
                                            <source src={videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-[48vw] bg-[#0c0c0c] rounded border-[2px] border-sky-200 p-2 m-2">
                                    {/* create volume up and volume down */}
                                    <div className="">
                                        <h3>Video time = <span className="font-bold text-green-500">{currentVideoTime}</span></h3>
                                        <h3>Total time = {totalVideoTime}</h3>
                                    </div>
                                    {/* implement dinamically playback rate and video jump */}
                                    <div className="">
                                        <div>Playback Rate: 1.0x</div>
                                        <div>Video jump: 3</div>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}