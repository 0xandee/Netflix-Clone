import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Progress, Tooltip } from "reactstrap";
import screenfull from "screenfull";
import { IconBackArrow, IconFullScreen, IconLayer, IconNext10s, IconPause, IconPauseCircle, IconPlay, IconPlayCircle, IconRewind10s, IconSetting, IconSkip, IconVolume, IconVolumeMute } from "../../assets/Icon";
import Duration from "../../service/function/Duration";
import './style.scss'
let count = 0;
//https://www.example.com/url_to_video.mp4
///https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164
const VideoPlayer = () => {
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [url, setUrl] = useState('https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164');
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlRef = useRef(null);
    const volumeRef = useRef(null);
    const playedRef = useRef(null);
    const [iconRewind, setIconRewind] = useState(false);
    const [iconNext, setIconNext] = useState(false);

    const toggleRewind = () => setIconRewind(!iconRewind);
    const toggleNext = () => setIconNext(!iconNext);

    const handleStop = () => {
        setUrl(null);
        setPlaying(false);
    }

    const handleVolumeChange = () => {
        let target = volumeRef.current

        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

        setVolume(volumeRef.current.value)
    }

    const handleVolumeMute = () => {
        setMuted(!muted)
    }

    const handleVolumeUp = () => { }

    const handlePlayedChange = (e) => {
        setPlayed(e.target.value);
    }

    const handlePlayPause = useCallback(() => {
        controlRef.current.style.opacity = '1'
        setPlaying(!playing)
    }, [playing])

    const handleVideoPlay = () => {
        setPlaying(true)
    }

    const handleVideoPause = () => {
        setPlaying(false)
    }

    const handleVideoProgress = (state) => {   
        if (count > 3 && !seeking) {

            controlRef.current.style.opacity = '0'
            count = 0;
        }
        else if (controlRef.current.style.opacity == '1' && playing) {
            count += 1;
        }
        if (!seeking) {
            setPlayed(state.played);
            setLoaded(state.loaded)
        }


    }

    const handleVideoEnded = () => {

    }

    const handleVideoDuration = (duration) => {
        setDuration(duration);
    }

    const handlePlayedDown = () => {
    }

    const handlePlayedUp = (e) => {
        playerRef.current.seekTo(parseFloat(e.target.value))
    }

    const handleRewind = useCallback(() => {
        playerRef.current.seekTo((played * duration) - 10, 'seconds')
    }, [played, duration]
    )
    const handleNext = useCallback(() => {
        playerRef.current.seekTo((played * duration) + 10, 'seconds')
    }, [played, duration]
    )

    const handleClickFullscreen = () => {
        screenfull.toggle(playerContainerRef.current)
    }

    const handleMouseMove = () => {
        // console.log('move')
        controlRef.current.style.opacity = '1'
    }
    const handleKeyDown = useCallback((e) => {

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
            if (played < (10 / duration))
                setPlayed(0)
            else
                setPlayed(played - (10 / duration))
        }
        else if (e.key === 'ArrowRight') {
            setSeeking(true);
            if (played + (10 / duration) > 1)
                setPlayed(1)
            else
                setPlayed(played + (10 / duration))
        }
        else if (e.keyCode === 32) {

            handlePlayPause();
        }
    }, [setVolume, volume, handlePlayPause, played, duration])

    const handleKeyUp = useCallback((e) => {
        if (e.key === 'ArrowLeft') {
            playerRef.current.seekTo(played, 'fraction')
            setSeeking(false)
        }
        else if (e.key === 'ArrowRight') {
            playerRef.current.seekTo(played, 'fraction')
            setSeeking(false)
        }
    }, [played])
    useEffect(() => {

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp]);
    return (
        <div id={`videoPlayer`} onMouseMove={handleMouseMove}  >
            <div ref={playerContainerRef} className={`video-player`} >
                <div className={'video-container'} onClick={handlePlayPause}>
                    <ReactPlayer
                        ref={playerRef}
                        className={`video-container`}
                        width='100%'
                        height='100%'
                        url={url}

                        playing={playing}
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
                        <IconPlayCircle className={`video-player__icon-container__icon`} />
                        :
                        <IconPauseCircle className={`video-player__icon-container__icon`} />
                    }


                </div>
                <div ref={controlRef} style ={{transition: 'all 0.5s'}}>

                    <Link className={`video-player__top`}>
                        <IconBackArrow className={'video-player__top__icon-back'} />
                        <span>Back to Browse</span>
                    </Link>
                    <div className={`video-player__bottom`}>
                        <div className={`video-player__bottom__bar-container`}>
                            <div className={`video-player__bottom__bar-container__bar`}>
                                <input type='range' min={0} max={1} step='any' ref={playedRef}
                                    value={played}
                                    onMouseDown={handlePlayedDown}
                                    onChange={handlePlayedChange}
                                    onMouseUp={handlePlayedUp} />
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
                            <div className={'video-player__bottom__bar-container__player-container'}>
                                <div className={`video-player__bottom__bar-container__player-container__left`} >
                                    <div onClick={handlePlayPause}>
                                        {!playing ? <IconPlay className={'icon--color'} />
                                            :
                                            <IconPause className={'icon--color'} />
                                        }
                                    </div>


                                    <div id= 'iconRewind' onClick={handleRewind}>
                                        <IconRewind10s  className={'icon--fill'} />
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
                                        {volume > 0 && !muted ?
                                            <div onClick={handleVolumeMute}>
                                                <IconVolume className={'icon--color'} />
                                            </div>
                                            :
                                            <div>
                                                <div onClick={handleVolumeMute}>
                                                    <IconVolumeMute className={'icon--color'} />
                                                </div>
                                            </div>
                                        }
                                        <input type='range' min={0} max={1} step='any' ref={volumeRef}
                                            value={volume} className={`volume ${!muted && 'open'}`}
                                            onChange={handleVolumeChange}
                                            onMouseUp={handleVolumeUp} />
                                    </div>


                                </div>
                                <div className="video-player__bottom__bar-container__player-container__right">
                                    <IconSkip className={'icon--color'} />
                                    <IconLayer className={'icon--fill'} />
                                    <IconSetting className={'icon--color'} />
                                    <div onClick={handleClickFullscreen} >
                                        <IconFullScreen className={'icon--color'} />
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                </div>

            </div>


        </div >
    )
}
export default VideoPlayer;