"use client"

import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { formatTime } from "@/helpers/formatTime"

export const VideoPlayer = () => {
    const [videoSrc, setVideoSrc] = useState<string>()
    const [currentVideoTime, setCurrentVideoTime] = useState<string>('')
    const [totalVideoTime, setTotalVideoTime] = useState<string>('')

    const videoRef = useRef<HTMLVideoElement>(null)

    let [initialJump, setInitialJump] = useState<number>(3)
    let [playbackRate, setPlaybackRate] = useState<number>(1)

    // function to upload a video
    const handleVideoInput = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = event.target.files?.[0] || null

        if (selectedVideo) {
            const videoURL = URL.createObjectURL(selectedVideo)
            setVideoSrc(videoURL)
        } else return
    }

    useEffect(() => {
        const handleActions = (event: KeyboardEvent) => {
            const videoElement = videoRef.current

            if (videoElement) {

                // CTRL KEY &&
                if (event.ctrlKey) {
                    switch (event.key) {
                    case ' ':
                        videoElement.paused ? videoElement.play() : videoElement?.pause()
                        break

                    case ',':
                        videoElement.currentTime -= initialJump
                        break

                    case '.':
                        videoElement.currentTime += initialJump
                        break

                    case "ArrowUp":
                        setPlaybackRate(videoElement.playbackRate += 0.1)
                        break

                    case "ArrowDown":
                        setPlaybackRate(videoElement.playbackRate -= 0.1)
                        break

                    case "0":
                        setPlaybackRate(videoElement.playbackRate = 1.0)
                        break

                    default:
                        break
                    }
                }

                if (event.altKey) {
                    switch (event.key) {
                        case "ArrowUp":
                            setInitialJump(initialJump += 1)
                            break

                        case "ArrowDown":
                            if (initialJump > 1) {
                                setInitialJump(initialJump -= 1)
                            }
                            break
                    }
                }
            }
    }

        window.addEventListener('keydown', handleActions)
        
        return () => {
            window.removeEventListener('keydown', handleActions)
        }
    }, [])

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
                                        <p className="text-black dark:text-white">Playback Rate: {playbackRate.toFixed(1)}x</p>
                                        <p className="text-black dark:text-white">Video jump: {initialJump}</p>
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