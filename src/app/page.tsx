"use client"

import { Header } from "@/components/Header"
import { VideoPlayer } from "@/components/VideoPlayer"
import { TextField } from "@/components/TextField"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Footer } from "@/components/Footer"

const Page = () => {
  return (
    <ThemeProvider>
      <div className="w-full h-[calc(100vh-8vh)] bg-slate-300 dark:bg-gray-950">
        <Header />

        <div className="flex flex-row mt-2 gap-8">
          <VideoPlayer />
          <TextField />
        </div>

      </div>

        <footer>
          <Footer />
        </footer>
    </ThemeProvider>
  )
}

export default Page