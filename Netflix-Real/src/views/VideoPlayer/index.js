import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import { Link, useHistory, useParams } from "react-router-dom";
import { Progress, Tooltip, Row, Col, UncontrolledTooltip } from "reactstrap";
import screenfull from "screenfull";
import { IconBackArrow, IconFullScreen, IconLayer, IconNext10s, IconPause, IconPauseCircle, IconPlay, IconPlayCircle, IconRewind10s, IconSetting, IconSkip, IconVolume, IconVolumeMute } from "../../assets/Icon";
import { Duration, Format } from "../../services/function/Duration";
import './style.scss'
import * as Icon from 'react-feather';
import { useLayoutEffect } from "react";
import { addWatchingList, getWatchingList, updateTimeWatched } from "../../services/api/movie";
import { getToken } from "../../services/function";

let count = 0;
let seconds = 0;
//https://www.example.com/url_to_video.mp4
///https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164
// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
//https://drive.google.com/uc?export=download&id=1Cvk2XhYdSKAST4ecGQ6s1ra4MilvXuLC
const VideoPlayer = ({ socket, roomnum, videoURL, handleOpenMovieRecommend }) => {
    const history = useHistory(); // Navigate back to the previous state
    const { idMovie } = useParams()
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [focusing, setFocusing] = useState(false);
    const [muted, setMuted] = useState(true);
    const [seeking, setSeeking] = useState(false);
    // const [url, setUrl] = useState('https://drive.google.com/uc?export=download&id=1Cvk2XhYdSKAST4ecGQ6s1ra4MilvXuLC');
    // const [url, setUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    const [url, setUrl] = useState(videoURL);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlRef = useRef(null);
    const volumeRef = useRef(true);
    const playedRef = useRef(null);
    const playingRef = useRef(null);
    const titlePlayedRef = useRef(null);
    const [iconRewind, setIconRewind] = useState(false);
    const [iconNext, setIconNext] = useState(false);
    const [isHost, setIsHost] = useState(false);
    let valueHover = 0;

    const toggleRewind = () => setIconRewind(!iconRewind);
    const toggleNext = () => setIconNext(!iconNext);
    const handleStop = () => {
        setUrl(null);
        playingRef.current = false
        setPlaying(false);
    }


    const handleVideoOnReady = useCallback(() => {


        console.log('loading')

    }, [])


    const handleVolumeChange = () => {
        let target = volumeRef.current

        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

        setVolume(volumeRef.current.value)
    }

    const handleVolumeMute = () => {
        volumeRef.current = !muted
        setMuted(!muted)
    }

    const handleVolumeUp = () => { }

    const handlePlayedChange = (e) => {
        playedRef.current = e.target.value
        setPlayed(e.target.value);
    }

    const handlePlayPause = useCallback(() => {

        if (isHost) {
            controlRef.current.style.opacity = '1'
            playingRef.current = !playing
            setPlaying(!playing)
        }
    }, [playing, isHost])

    const handleVideoPlay = () => {
        playingRef.current = true
        setPlaying(true)
    }

    const handleVideoPause = () => {
        playingRef.current = false
        setPlaying(false)
    }

    const handleVideoProgress = (state) => {

        console.log("🚀 ~ file: index.js ~ line 110 ~ handleVideoProgress ~ seconds", seconds)
        if (playing) seconds += 1;
        if (count > 3 && !seeking) {
            controlRef.current.style.opacity = '0'
            count = 0;
        }
        else if (controlRef.current.style.opacity == '1' && playing) {
            count += 1;

            setMuted(false)
        }
        if (playing && !muted) { setMuted(false) }
        if (state.played >= 0.9) {
            handleOpenMovieRecommend(true)
            setPlaying(false)
            playingRef.current = false
        }
        if (!seeking && state.played != 0) {

            playedRef.current = state.played
            setPlayed(state.played);
            setLoaded(state.loaded)
        }

    }

    const handleVideoEnded = () => {

    }

    const handleVideoDuration = useCallback((duration) => {
        if (typeof (url) != 'undefined') {
            setDuration(duration);
        }
    }, [url])

    const handlePlayedDown = () => {
        setSeeking(true)
    }

    const handlePlayedUp = (e) => {
        playerRef.current.seekTo(parseFloat(e.target.value))
        setSeeking(false)
    }

    const handleRewind = useCallback(() => {
        // playedRef.current = played + (10 / duration)
        playerRef.current.seekTo((played * duration) - 10, 'seconds')

    }, [played, duration]
    )
    const handleNext = useCallback(() => {
        playedRef.current = played + (10 / duration)
        playerRef.current.seekTo((played * duration) + 10, 'seconds')
    }, [played, duration]
    )

    const handleClickFullscreen = () => {
        screenfull.toggle(playerContainerRef.current)
    }

    const handleMouseMove = useCallback(() => {
        // console.log('move')
        if (isHost)
            controlRef.current.style.opacity = '1'
        else controlRef.current.style.opacity = '0'
    }, [isHost])

    const handleMouseEnter = () => {
        setFocusing(true)
    }

    const handleMouseLeave = () => {
        setFocusing(false)
    }

    const calcSliderPos = (e) => {
        return (e.nativeEvent.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'), 10);
    }

    //attach to slider and fire on mousemove
    const handlePlayedMouseMove = (e) => {
        valueHover = calcSliderPos(e).toFixed(4);

        titlePlayedRef.current.textContent = Format((valueHover * duration).toFixed(0));
        titlePlayedRef.current.style.left = e.nativeEvent.offsetX + 'px';
    }

    const handleKeyDown = useCallback((e) => {
        if (focusing) {
            if (e.key === 'ArrowDown') {
                if (volume <= 0.1) {
                    setVolume(0)
                }

                else
                    setVolume(parseFloat(volume) - 0.1);
                handleVolumeChange()
            }
            else if (e.key === 'ArrowUp') {

                if (volume >= 0.9) {
                    setVolume(1);
                }
                else {
                    setVolume(parseFloat(volume) + 0.1);
                }
                handleVolumeChange()
            }
            else if (e.key === 'ArrowLeft') {
                setSeeking(true);
                if (played < (10 / duration)) {
                    playedRef.current = 0
                    setPlayed(0)
                }
                else {
                    playedRef.current = played - (10 / duration)
                    setPlayed(played - (10 / duration))
                }
            }
            else if (e.key === 'ArrowRight') {
                setSeeking(true);
                if (played + (10 / duration) > 1) {
                    playedRef.current = 1
                    setPlayed(1)
                }
                else {
                    playedRef.current = played + (10 / duration)
                    setPlayed(played + (10 / duration))
                }
            }
            else if (e.keyCode === 32) {

                handlePlayPause();
            }
        }
    }, [setVolume, volume, handlePlayPause, played, duration, focusing])

    const handleKeyUp = useCallback((e) => {
        if (focusing) {
            if (e.key === 'ArrowLeft') {
                playerRef.current.seekTo(played, 'fraction')
                setSeeking(false)
            }
            else if (e.key === 'ArrowRight') {
                playerRef.current.seekTo(played, 'fraction')
                setSeeking(false)
            }
        }
    }, [played, focusing])



    useEffect(() => {
        if (isHost) {
            document.addEventListener("keydown", handleKeyDown)
            document.addEventListener("keyup", handleKeyUp)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp]);

    useEffect(async () => { 
        if (socket == undefined) {
            try {

                const response = await getWatchingList(getToken())
                console.log("🚀 ~ file: index.js ~ line 39 ~ useEffect ~ response", response)

                if (response.status === 200) {
                    const data = await response.data
                    console.log("🚀 ~ file: index.js ~ line 141 ~ useEffect ~ data", data)
                    if (data.length) {
                        const current_movie = data.find(item => item.id == idMovie.toString())
                        console.log("🚀 ~ file: index.js ~ line 269 ~ useEffect ~ data", data.find(item => item.id == idMovie.toString()))
                        if (current_movie != undefined) {
                            playedRef.current = current_movie.current_duration
                            setPlayed(current_movie.current_duration);
                            playerRef.current.seekTo(current_movie.current_duration)
                        }

                    }
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }

            }
            catch (error) {
                console.log("🚀 ~ file: index.js ~ line 291 ~ useEffect ~ error", error)

                //  history.push('/maintenance')
            }
        }
    }, [])

    useEffect(() => {
        return () => {
            if (socket == undefined) {
                if (playedRef.current != null && playedRef.current < 0.9) {
                    addWatchingList(idMovie.toString(), playedRef.current, getToken())
                    updateTimeWatched(idMovie.toString(), Math.round((seconds / duration) * 5), getToken())
                }
            }
        }
    }, [duration])

    useLayoutEffect(() => {

        if (socket != undefined) {
            console.log('get host data')
            const data = {
                room: roomnum,
                currTime: playedRef.current,
                state: playingRef.current,
                muted: muted,
                caller: socket.id
            }
            console.log("🚀 ~ file: index.js ~ line 253 ~ socket.on ~ data", data)
            socket.emit('get host data', data);
        }
        else {
            setUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
            setIsHost(true)
        }
    }, [seeking, playing, muted])
    // })
    useEffect(() => {
        if (socket != undefined) {
            socket.on("getURLMovie", (data) => {
                console.log("🚀 ~ file: index.js ~ line 246 ~ socket.on ~ data", data)
                handleOpenMovieRecommend(false)
                setUrl(data.movieURL)
                playedRef.current = 0
                setPlayed(0);
                playingRef.current = false
                setPlaying(false);
                console.log("🚀 ~ file: index.js ~ line 340 ~ socket.on ~ playerRef.current", playerRef.current.getDuration())

                if (playerRef.current.getDuration() != null)
                    playerRef.current.seekTo(0)
            })
        }
    }, [url, socket])

    useLayoutEffect(() => {
        if (socket != undefined) {
            socket.on('isHost', function (data) {
                console.log("🚀 ~ file: index.js ~ line 271 ~ data", data)
                setIsHost(data.isHost)
                if (!data.isHost) {
                    controlRef.current.style.opacity = '0'
                }
            })
        }
    }, [socket])

    useEffect(() => {
        if (socket != undefined) {
            socket.on("getData", () => {
                console.log("New member get into the room")
                const data = {
                    room: roomnum,
                    currTime: playedRef.current,
                    state: playingRef.current,
                    muted: false,
                    caller: socket.id
                }
                console.log("🚀 ~ file: index.js ~ line 253 ~ socket.on ~ data", data)
                socket.emit('get host data', data);
            })

            socket.on('isHost', function (data) {
                console.log("🚀 ~ file: index.js ~ line 271 ~ data", data)
                setIsHost(data.isHost)
                if (!data.isHost) {
                    controlRef.current.style.opacity = '0'
                }
            })
        }


    }, [socket])


    // Uses the host data to compare
    useEffect(() => {
        if (socket != undefined) {
            setMuted(true)
            socket.on('compareHost', function (data) {
                console.log("compareHost");
                console.log("🚀 ~ file: index.js ~ line 259 ~ data", data)
                // // The host data
                var hostTime = data.currTime
                var hostState = data.state

                var host = data.host == socket.id

                if (data.currVideo != url) {
                    setUrl(data.currVideo)
                }
                if (playedRef.current != hostTime || playingRef.current != hostState) {
                    if (!host) {
                        handleOpenMovieRecommend(false)
                        volumeRef.current = data.muted

                        playedRef.current = hostTime
                        setPlayed(hostTime);
                        playingRef.current = hostState
                        setPlaying(hostState);
                        playerRef.current.seekTo(hostTime)
                    }
                }
            });
        }
    }, [socket])


    return (
        <div id={`videoPlayer`} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ position: 'absolute', width: '100%', height: '100%' }}>
            {!isHost &&
                <div className='position-absolute'
                    style={{ bottom: '4vh', left: '2vw', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6 }}>
                    <div onClick={handleVolumeMute}>
                        {volume > 0 && !muted ?
                            <IconVolume className={'icon--color'} />
                            :
                            <IconVolumeMute className={'icon--color'} />
                        }
                    </div>
                </div>}
            <div ref={playerContainerRef} className={`video-player`} >
                <div className={'video-container'} onClick={handlePlayPause}>
                    <ReactPlayer
                        ref={playerRef}
                        className={`video-container`}
                        width='100%'
                        height='100%'
                        url={url}
                        onReady={handleVideoOnReady}
                        playing={playingRef.current}
                        controls={false}
                        volume={volume}
                        muted={muted}
                        onPlay={handleVideoPlay}
                        onEnded={handleVideoEnded}
                        onPause={handleVideoPause}
                        onProgress={handleVideoProgress}
                        onSeek={(value) => {
                            console.log('onSeek')
                            console.log("🚀 ~ file: index.js ~ line 395 ~ value", value)
                        }
                        }
                        onError={(err) =>
                            console.log("🚀 ~ file: index.js ~ line 407 ~ err", err)
                        }
                        onDuration={handleVideoDuration}
                    />
                </div>
                <div className={`video-player__icon-container`} onClick={handlePlayPause}>
                    {!playing ?
                        <IconPlayCircle className={`video-player__icon-container__icon `} />
                        :
                        <IconPauseCircle className={`video-player__icon-container__icon pause`} />
                    }
                </div>
                <div ref={controlRef} style={{
                    transition: 'all 0.5s'
                }}>
                    <div className={`video-player__top`} style={{ justifyContent: "space-between" }}>
                        <div className={`video-player__top__icon-container`} style={{ zIndex: '5', }} onClick={() => history.push('/home')}>
                            <IconBackArrow className={'video-player__top__icon-back'} />
                            <span>Back to Browse</span>
                        </div>
                    </div>
                    <div className={`video-player__bottom w-100`}>
                        <div className={`video-player__bottom__bar-container h-100 w-100`}>
                            <div className={'d-flex w-100 justify-content-space_between align-items-center'}>
                                <div className={`video-player__bottom__bar-container__bar`}>
                                    <input type='range' min={0} max={1} step='any' id='playedInput'
                                        value={played}
                                        onMouseMove={handlePlayedMouseMove}
                                        onMouseDown={handlePlayedDown}
                                        onChange={handlePlayedChange}
                                        onMouseUp={handlePlayedUp} />
                                    <span className={`tool-tip`} ref={titlePlayedRef}  >

                                    </span>
                                    <div className={`video-player__bottom__bar-container__bar--played`}>
                                        <progress min={0}
                                            max={1} value={played} >
                                        </progress>
                                    </div>
                                    <div className={`video-player__bottom__bar-container__bar--loaded`}>
                                        <progress min={0}
                                            max={1} value={loaded} >
                                        </progress>
                                    </div>


                                </div>
                                <p className={`video-player__bottom__bar-container__remain-time`}>
                                    <Duration seconds={duration * (1 - played)} />
                                </p>
                            </div>


                            <Row className={'video-player__bottom__bar-container__player-container w-100'}>
                                <Col lg='3' md='6' sm='8' xs='10' className={`video-player__bottom__bar-container__player-container__left`} >
                                    <div onClick={handlePlayPause}>
                                        {!playing ? <IconPlay className={'icon--color'} />
                                            :
                                            <IconPause className={'icon--color'} />
                                        }
                                    </div>

                                    <div id='iconRewind'
                                        onClick={handleRewind}
                                        onMouseDown={handlePlayedDown}
                                        onMouseUp={() => { setSeeking(false) }}
                                    >
                                        <IconRewind10s className={'icon--fill'} />
                                        <Tooltip placement="top" isOpen={iconRewind} target="iconRewind" toggle={toggleRewind}>
                                            10s
                                        </Tooltip>
                                    </div>
                                    <div id='iconNext' onClick={handleNext}>
                                        <IconNext10s className={'icon--fill'} />
                                        <Tooltip placement="top" isOpen={iconNext} target="iconNext" toggle={toggleNext}>
                                            10s
                                        </Tooltip>
                                    </div>


                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div onClick={handleVolumeMute}>
                                            {volume > 0 && !muted ?
                                                <IconVolume className={'icon--color'} />
                                                :
                                                <IconVolumeMute className={'icon--color'} />
                                            }
                                        </div>
                                        <input type='range' min={0} max={1} step='any' ref={volumeRef}
                                            value={volume} className={`volume ${!muted && 'open'}`}
                                            onChange={handleVolumeChange}
                                            onMouseUp={handleVolumeUp} />
                                    </div>

                                </Col>
                                <Col xs='1' className="d-flex justify-content-end" >
                                    <div onClick={handleClickFullscreen} >
                                        <IconFullScreen className={'icon--color'} />
                                    </div>
                                   
                                </Col>

                            </Row>


                        </div>
                    </div>
                </div>

            </div>


        </div >
    )
}
export default VideoPlayer;