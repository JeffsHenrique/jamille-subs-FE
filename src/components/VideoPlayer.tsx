"use client"

import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { formatTimeWithoutMilliseconds } from "@/helpers/formatTime"

export const VideoPlayer = () => {
    const [videoSrc, setVideoSrc] = useState<string>()
    const [currentVideoTime, setCurrentVideoTime] = useState<string>('')
    const [totalVideoTime, setTotalVideoTime] = useState<string>('')
    const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)
    const [source, setSource] = useState<MediaElementAudioSourceNode | null>(null)
    const [gainNode, setGainNode] = useState<GainNode | null>(null)
    
    const videoRef = useRef<HTMLVideoElement>(null)
    
    let [initialGain, setInitialGain] = useState<number>(1)
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

    const handleVolumeUpButton = () => {
        initialGain < 4 ? setInitialGain(initialGain += 1) : null
    }

    const handleVolumeDownButton = () => {
        initialGain > 1 ? setInitialGain(initialGain -= 1) : null
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
                // CTRL + SHIFT
                if (event.ctrlKey && event.shiftKey) {
                    switch (event.key) {
                        case '+':
                            if (initialGain < 4) {
                                setInitialGain(initialGain += 1)
                            }
                            break
                        case '-':
                            if (initialGain > 1) {
                                setInitialGain(initialGain -= 1)
                            }
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
    }, [audioCtx, handleVolumeDownButton, handleVolumeUpButton])

    // Hook for getting CURRENT and TOTAL Video Time
    useEffect(() => {
        const videoElement = videoRef.current

        if (!videoElement) return

        let animationFrameId: number

        const getVideoTime = () => {
            // Current Time
            const currentTime = videoElement.currentTime
            const formattedCurrentTime = formatTimeWithoutMilliseconds(currentTime)
            setCurrentVideoTime(formattedCurrentTime)
            animationFrameId = requestAnimationFrame(getVideoTime)

            // Total Time
            const totalTime = videoElement.duration
            const formattedTotalTime = formatTimeWithoutMilliseconds(totalTime)
            setTotalVideoTime(formattedTotalTime)
        }

        videoElement.addEventListener('timeupdate', getVideoTime)
        animationFrameId = requestAnimationFrame(getVideoTime)
        
        return () => {
            videoElement.removeEventListener('timeupdate', getVideoTime)
            cancelAnimationFrame(animationFrameId)
        }
    }, [videoSrc])

    useEffect(() => {
        const videoElement = videoRef.current
        if (!audioCtx && videoElement) {
            const ctx = new AudioContext()
            if (videoElement) {
                const src = ctx.createMediaElementSource(videoElement)
                const gain = ctx.createGain()

                src.connect(gain)
                gain.connect(ctx.destination)

                setAudioCtx(ctx)
                setSource(src)
                setGainNode(gain)
            }
        }

    }, [audioCtx, videoSrc])

    useEffect(() => {
        if (gainNode && source) {
            gainNode.gain.value = initialGain
        }

    }, [initialGain, setInitialGain])

    return(
        <>
            <div className="flex justify-start items-center size-6/12 mt-4 ml-2">
                <div className="py-2 max-w-lg">
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
                                    <div className="max-w-[44vw] border border-solid border-slate-200 rounded">
                                        <video ref={videoRef} controls >
                                            <source src={videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-[48vw] bg-slate-100 dark:bg-gray-700 rounded border-[2px] border-gray-800 dark:border-sky-200 p-2 m-2">
                                    <div className="min-w-[150px]">
                                        <p className="text-black dark:text-white">Video time = <span className="font-bold text-green-700 dark:text-green-500">{currentVideoTime}</span></p>
                                        <p className="text-black dark:text-white">Total time = {totalVideoTime}</p>
                                    </div>
                                    {/* IMPLEMENT BOOST VOLUME */}

                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="text-black dark:text-white">Aumentar Volume: {initialGain}00%</p>
                                            {(initialGain >= 2) &&
                                                <svg className="fill-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>
                                            
                                            }
                                        </div>
                                        <div className="bg-slate-400 dark:bg-slate-500 hover:bg-slate-500 hover:dark:bg-slate-600 transition-colors duration-300 rounded">
                                            <div className="flex flex-row items-center gap-2 px-1">
                                                <svg className="fill-black dark:fill-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="32"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>

                                                <button onClick={handleVolumeDownButton} className="px-2 text-black dark:text-white bg-sky-300 dark:bg-sky-500 rounded-full"> - </button>

                                                {initialGain === 1 &&
                                                    <div className="flex items-center justify-between w-48 h-3 bg-slate-100 dark:bg-slate-200 rounded-full"></div>
                                                }

                                                {initialGain === 2 &&
                                                    <div className="flex items-center justify-between w-48 h-3 bg-gradient-to-r from-sky-300 from-35% via-slate-100 via-0% to-slate-100 to-100% dark:bg-gradient-to-r dark:from-sky-500 dark:from-35% dark:via-slate-200 dark:via-0% dark:to-slate-200 dark:to-100% rounded-full"></div>
                                                }

                                                {initialGain === 3 &&
                                                    <div className="flex items-center justify-between w-48 h-3 bg-gradient-to-r from-yellow-400 from-70% via-slate-100 via-0% to-slate-100 to-100% dark:bg-gradient-to-r dark:from-yellow-600 dark:from-70% dark:via-slate-200 dark:via-0% dark:to-slate-200 dark:to-100% rounded-full"></div>
                                                }

                                                {initialGain === 4 &&
                                                    <div className="flex items-center justify-between w-48 h-3 bg-red-400 dark:bg-red-600 rounded-full"></div>
                                                }

                                                <button onClick={handleVolumeUpButton} className="px-2 text-black dark:text-white bg-sky-300 dark:bg-sky-500 rounded-full"> + </button>
                                            </div>
                                        </div>
                                    </div>

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