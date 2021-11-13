const Duration = (second) => {
// console.log("🚀 ~ file: Duration.js ~ line 2 ~ Duration ~ second", second)
    return (
        <time dateTime={`P${Math.round(second)}S`}>
            {Format(second.seconds)}
        </time>
    )
}

const Format = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())

    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

const pad = (string) => {

    return ('0' + string).slice(-2)
}
export { Duration, Format };