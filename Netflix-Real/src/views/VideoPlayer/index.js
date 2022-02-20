import React, { useCallback, useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player";
import { useHistory, useParams } from "react-router-dom";
import { Tooltip, Row, Col } from "reactstrap";
import screenfull from "screenfull";
import { IconBackArrow, IconFullScreen, IconNext10s, IconPause, IconPauseCircle, IconPlay, IconPlayCircle, IconRewind10s, IconVolume, IconVolumeMute } from "../../assets/Icon";
import { Duration, Format } from "../../services/function/Duration";
import './style.scss'
import { useLayoutEffect } from "react";
import { addWatchingList, getWatchingList, updateTimeWatched } from "../../services/api/movie";
import { getToken } from "../../services/function";

// variable to hile player
let count = 0;
// variable to count real user's time watched in seconds
let seconds = 0;
// example link video
//https://www.example.com/url_to_video.mp4
///https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164
// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
//https://drive.google.com/uc?export=download&id=1Cvk2XhYdSKAST4ecGQ6s1ra4MilvXuLC
const VideoPlayer = ({ socket, roomnum, videoURL, handleOpenMovieRecommend }) => {
    //init varable
    const history = useHistory();
    const { idMovie } = useParams()
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [focusing, setFocusing] = useState(false);
    const [muted, setMuted] = useState(true);
    const [seeking, setSeeking] = useState(false);
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

    // toggle of tooltip rewind and next
    const toggleRewind = () => setIconRewind(!iconRewind);
    const toggleNext = () => setIconNext(!iconNext);

    //handle func of change input of volume
    const handleVolumeChange = () => {
        let target = volumeRef.current

        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

        setVolume(volumeRef.current.value)
    }

    //handle func of mute volume
    const handleVolumeMute = () => {
        volumeRef.current = !muted
        setMuted(!muted)
    }

    const handleVolumeUp = () => { }

    // handle func of update played time 
    const handlePlayedChange = (e) => {
        playedRef.current = e.target.value
        setPlayed(e.target.value);
    }

    // handle func of play/pause video
    const handlePlayPause = useCallback(() => {
        if (isHost) {
            controlRef.current.style.opacity = '1'
            playingRef.current = !playing
            setPlaying(!playing)
        }
    }, [playing, isHost])

    // set video playing
    const handleVideoPlay = () => {
        playingRef.current = true
        setPlaying(true)
    }

    // set video pause
    const handleVideoPause = () => {
        playingRef.current = false
        setPlaying(false)
    }

    // handle func of video process
    const handleVideoProgress = (state) => {
        // if playing crease seconds( real user's time watched)
        if (playing) seconds += 1;

        // if video play more then 3 second without any user'action player will disappear
        if (count > 3 && !seeking) {
            controlRef.current.style.opacity = '0'
            count = 0;
        }
        else if (controlRef.current.style.opacity == '1' && playing) {
            count += 1;
            setMuted(false)
        }

        if (playing && !muted) { setMuted(false) }

        // if video play 9/10 and socket is connect open recommended section (group stream only)
        if (state.played >= 0.9 && socket !== undefined) {
            handleOpenMovieRecommend(true)
            setPlaying(false)
            playingRef.current = false
        }
        // if user isn't seeking and state played > 0 update tiem watched variable
        if (!seeking && state.played !== 0) {
            playedRef.current = state.played
            setPlayed(state.played);
            setLoaded(state.loaded)
        }
    }

    // handle when video end
    const handleVideoEnded = () => {

    }

    // update duration of video url into variable
    const handleVideoDuration = useCallback((duration) => {
        if (typeof (url) != 'undefined') {
            setDuration(duration);
        }
    }, [url])

    // if user mouse down set is seeking
    const handlePlayedDown = () => {
        setSeeking(true)
    }
    // seek video
    const handlePlayedUp = (e) => {
        playerRef.current.seekTo(parseFloat(e.target.value))
        setSeeking(false)
    }
    // rewind video 10s
    const handleRewind = useCallback(() => {
        playerRef.current.seekTo((played * duration) - 10, 'seconds')

    }, [played, duration])

    // nest video 10s
    const handleNext = useCallback(() => {
        playedRef.current = played + (10 / duration)
        playerRef.current.seekTo((played * duration) + 10, 'seconds')
    }, [played, duration]
    )

    // set full screen
    const handleClickFullscreen = () => {
        screenfull.toggle(playerContainerRef.current)
    }

    // catch when user's mouse move
    const handleMouseMove = useCallback(() => {

        if (isHost)
            controlRef.current.style.opacity = '1'
        else controlRef.current.style.opacity = '0'
    }, [isHost])

    // set focus while user'mouse is in screen
    const handleMouseEnter = () => {
        setFocusing(true)
    }

    const handleMouseLeave = () => {
        setFocusing(false)
    }

    // calculate position of cursor
    const calcSliderPos = (e) => {
        return (e.nativeEvent.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'), 10);
    }

    //attach to slider and fire on mousemove
    const handlePlayedMouseMove = (e) => {
        valueHover = calcSliderPos(e).toFixed(4);

        // show tolltip 
        titlePlayedRef.current.textContent = Format((valueHover * duration).toFixed(0));
        titlePlayedRef.current.style.left = e.nativeEvent.offsetX + 'px';
    }

    // handle func of keydown
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

    // handle func of keyup
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

    //add event keyboard listener
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

    // get data to seek into last user time watch (if have)
    useEffect(() => {
        async function fetchData() {
            // You can await here
            if (socket == undefined) {
                try {
                    const response = await getWatchingList(getToken())
                    if (response.status === 200) {
                        const data = await response.data
                        if (data.length) {
                            const current_movie = data.find(item => item.id == idMovie.toString())
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
                    //  history.push('/maintenance')
                }
            }
        }
        fetchData();
    }, [])

    // request update current time watched and real time watched while unmounted 
    useEffect(() => {
        return async () => {
            if (socket === undefined) {
                if (playedRef.current != null && playedRef.current < 0.9) {
                    await addWatchingList(idMovie.toString(), playedRef.current, getToken())
                    await updateTimeWatched(idMovie.toString(), Math.round((seconds / duration) * 5), getToken())
                }
            }
        }
    }, [duration])

    // catch event seeking, change playing to update via socket
    useLayoutEffect(() => {
        if (socket !== undefined) {
            const data = {
                room: roomnum,
                currTime: playedRef.current,
                state: playingRef.current,
                muted: muted,
                caller: socket.id
            }
            socket.emit('get host data', data);
        }
        // if socket isn't connect
        else {
            setUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
            setIsHost(true)
        }
    }, [seeking, playing, muted])

    // set URl video when host choosed movie
    useEffect(() => {
        if (socket !== undefined) {
            socket.on("getURLMovie", (data) => {
                // turn off recommend section
                handleOpenMovieRecommend(false)
                setUrl(data.movieURL)
                playedRef.current = 0
                setPlayed(0);
                playingRef.current = false
                setPlaying(false);

                if (playerRef.current.getDuration() != null)
                    playerRef.current.seekTo(0)
            })
        }
    }, [url, socket])

    // check user is host or not (Group streaming only) while socket is connect
    useLayoutEffect(() => {
        if (socket !== undefined) {
            socket.on('isHost', function (data) {
                setIsHost(data.isHost)
                // if user isn't host hide player
                if (!data.isHost) {
                    controlRef.current.style.opacity = '0'
                }
            })
        }
    }, [socket])

    // update current host time to server while new member get into the room
    useEffect(() => {
        if (socket !== undefined) {
            socket.on("getData", () => {
                const data = {
                    room: roomnum,
                    currTime: playedRef.current,
                    state: playingRef.current,
                    muted: false,
                    caller: socket.id
                }
                socket.emit('get host data', data);
            })

            socket.on('isHost', function (data) {
                setIsHost(data.isHost)
                if (!data.isHost) {
                    controlRef.current.style.opacity = '0'
                }
            })
        }


    }, [socket])


    // Uses the host data to compare
    useEffect(() => {
        if (socket !== undefined) {
            setMuted(true)
            socket.on('compareHost', function (data) {
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
                        if (playerRef.current.getDuration() != null)
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
                        playing={playingRef.current}
                        controls={false}
                        volume={volume}
                        muted={muted}
                        onPlay={handleVideoPlay}
                        onEnded={handleVideoEnded}
                        onPause={handleVideoPause}
                        onProgress={handleVideoProgress}
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