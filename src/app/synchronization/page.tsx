"use client"

import { useState } from "react"

import { Header } from "@/components/Header"
import { VideoPlayer } from "@/components/VideoPlayer"
import { Synchronization } from "@/components/Synchronization"
import { Footer } from "@/components/Footer"

import { ThemeProvider } from "@/contexts/ThemeContext"

const SyncPage = () => {
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFileName = (fileName: string) => {
        setFileName(fileName.replace('.mp4', '.txt'))
    }

    return (
        <ThemeProvider>
            <div className="w-full h-[calc(100vh-8vh)] bg-slate-300 dark:bg-gray-950">
                <p className="bg-red-500 flex justify-center text-black dark:text-white">Em construção...</p>
                <Header />

                <div className="flex flex-row mt-2 gap-8">
                    <VideoPlayer onFileSelect={handleFileName} />
                    <Synchronization />
                </div>

            </div>

            <footer>
                <Footer />
            </footer>
        </ThemeProvider>
    )
}

export default SyncPage