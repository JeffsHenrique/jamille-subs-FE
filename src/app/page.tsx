"use client"

import { Header } from "@/components/Header"
import { VideoPlayer } from "@/components/VideoPlayer"
import { TextField } from "@/components/TextField"

const Page = () => {
  return (
    <>
      <Header />

      <div className="flex flex-row mt-2 gap-8">
        <VideoPlayer />
        <TextField />
      </div>
    </>
  )
}

export default Page