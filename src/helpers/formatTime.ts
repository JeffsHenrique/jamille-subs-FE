export const formatTimeComplete = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const milliseconds = Math.floor((time - Math.floor(time)) * 1000)

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`
}

export const formatTimeWithoutMilliseconds = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}