const Duration = (second) => {
console.log("🚀 ~ file: Duration.js ~ line 2 ~ Duration ~ second", second)
    return (
        <time dateTime={`P${Math.round(second)}S`}>
            {Format(second.seconds)}
        </time>
    )
}

const Format = (seconds) => {
    console.log("🚀 ~ file: Duration.js ~ line 10 ~ Format ~ seconds", seconds)

    const date = new Date(seconds * 1000)
    console.log("🚀 ~ file: Duration.js ~ line 13 ~ Format ~ date", date)
    const hh = date.getUTCHours()
    console.log("🚀 ~ file: Duration.js ~ line 15 ~ Format ~ hh", hh)
    const mm = date.getUTCMinutes()
    console.log("🚀 ~ file: Duration.js ~ line 17 ~ Format ~ mm", mm)
    const ss = pad(date.getUTCSeconds())
    console.log("🚀 ~ file: Duration.js ~ line 19 ~ Format ~ ss", ss)

    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
}

const pad = (string) => {

    return ('0' + string).slice(-2)
}
export { Duration, Format };