class VideoControlService {
    private videoElement: HTMLVideoElement | null = null

    initialize(videoElement: HTMLVideoElement) {
        this.videoElement = videoElement
    }
}

export default VideoControlService