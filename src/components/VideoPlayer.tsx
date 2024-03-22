"use client"

import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { formatTime } from "@/helpers/formatTime"
import { TextField } from "./TextField"

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

    const handleVideoPlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }

    // Hook for getting CURRENT and TOTAL Video Time
    useEffect(() => {
        const videoElement = videoRef.current

        if (!videoElement) return

        let animationFrameId: number

        const getVideoTime = () => {
            // Current Time
            const currentTime = videoElement.currentTime
            const formattedCurrentTime = formatTime(currentTime)
            setCurrentVideoTime(formattedCurrentTime)
            animationFrameId = requestAnimationFrame(getVideoTime)

            // Total Time
            const totalTime = videoElement.duration
            const formattedTotalTime = formatTime(totalTime)
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
            <div className="flex justify-start items-center size-6/12 mt-4 ml-2">
                <div className="p-2 max-w-lg">
                    <div className="flex flex-col gap-4">
                        {!videoSrc &&
                        <>
                            <iframe className="w-[38vw] h-[48vh] border border-solid border-gray-800 dark:border-slate-200 rounded bg-gradient-to-t from-slate-500 dark:bg-gradient-to-b dark:from-gray-800" />
                            <input className="text-black dark:text-white" type="file" accept="video/*" onChange={handleVideoInput} />
                        </>
                        }

                        {videoSrc && (
                            <>
                                <div className="flex justify-center items-center w-[50vw]">
                                    {/* NEED TO SOLVE 9:16 FORMAT VIDEOS */}
                                    <div className="max-w-[48vw] border border-solid border-slate-200 rounded">
                                        <video ref={videoRef} controls>
                                            <source src={videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-[48vw] bg-slate-100 dark:bg-gray-700 rounded border-[2px] border-gray-800 dark:border-sky-200 p-2 m-2">
                                    {/* create volume up and volume down */}
                                    <div className="">
                                        <p className="text-black dark:text-white">Video time = <span className="font-bold text-green-700 dark:text-green-500">{currentVideoTime}</span></p>
                                        <p className="text-black dark:text-white">Total time = {totalVideoTime}</p>
                                    </div>
                                    {/* implement dinamically playback rate and video jump */}
                                    <div className="">
                                        <p className="text-black dark:text-white">Playback Rate: 1.0x</p>
                                        <p className="text-black dark:text-white">Video jump: 3</p>
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