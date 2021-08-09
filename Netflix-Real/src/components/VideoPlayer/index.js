import React, { createRef, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import { IconBackArrow, IconFullScreen, IconLayer, IconNext10s, IconPause, IconPlay, IconRewind10s, IconSetting, IconSkip, IconVolume, IconVolumeMute } from "../../assets/Icon";
import Duration from "../../service/function/Duration";
import './style.scss'

const VideoPlayer = () => {
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=oUFJJNQGwhk');
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    var playerRef = useRef(null);



    const handleStop = () => {
        setUrl(null);
        setPlaying(false);
    }
    const handleVolumeChange = e => {
        setVolume(e.target.value)

    }
    const handlePlayedChange = (e) => {
        setPlayed(e.target.value);
    }

    const handlePlayPause = () => {
        setPlaying(!playing)
    }

    const handlePlay = () => {
        setPlaying(true)
    }

    const handlePause = () => {
        setPlaying(false)
    }

    const handleProgress = (state) => {
        setPlayed(state.played);
        setLoaded(state.loaded)
    }

    const handleEnded = () => {

    }

    const handleDuration = (duration) => {
        setDuration(duration);
    }

    const handlePlayedDown = (e) => {

        setPlayed(e.target.value);
    }

    const handlePlayedUp = (e) => {
        playerRef.current.seekTo(parseFloat(e.target.value))
    }

    const handleRewind = () => {

        playerRef.current.seekTo((played * duration) - 10, 'seconds')
    }

    const handleNext = () => {
        playerRef.current.seekTo((played * duration) + 10, 'seconds')
    }
    return (
        <div id={`videoPlayer`}>
            <div className={`video-player`}>
                <ReactPlayer
                    ref={playerRef}

                    width='100%'
                    height='100%'
                    url={url}

                    playing={playing}
                    controls={false}


                    volume={volume}
                    muted={muted}

                    onPlay={handlePlay}
                    onEnded={handleEnded}
                    onPause={handlePause}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
                <Link className={`video-player__top`}>
                    <IconBackArrow className={'video-player__top__icon-back'} />
                    <span>Back to Browse</span>
                </Link>
                <div className={`video-player__bottom`}>
                    <div className={`video-player__bottom__bar-container`}>
                        <input type='range' min={0} max={0.999} step='any'
                            value={played}
                            onMouseDown={handlePlayedDown}
                            onChange={handlePlayedChange}
                            onMouseUp={handlePlayedUp} />
                        <div className={`video-player__bottom__bar-container__bar`}>
                            <Progress multi style={{ backgroundColor: 'gray', height: '0.5vh' }}>
                                <Progress bar className={`video-player__bottom__bar-container__bar--played`}
                                    max={1} value={played} >
                                </Progress>
                                <Progress bar className={`video-player__bottom__bar-container__bar--loaded`}
                                    max={1} value={loaded - played} >
                                </Progress>
                            </Progress>
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


                                <div onClick={handleRewind}>
                                    <IconRewind10s className={'icon--fill'} />
                                </div>
                                <div  onClick={handleNext}>
                                    <IconNext10s className={'icon--fill'} />
                                </div>



                                {volume > 0 ?
                                    <IconVolume className={'icon--color'} />
                                    :
                                    <IconVolumeMute className={'icon--color'} />
                                }


                            </div>
                            <div className="video-player__bottom__bar-container__player-container__right">
                                <IconSkip className={'icon--color'} />
                                <IconLayer className={'icon--fill'} />
                                <IconSetting className={'icon--color'} />
                                <IconFullScreen className={'icon--color'} />
                            </div>

                        </div>


                    </div>
                </div>


            </div>


        </div >
    )
}
export default VideoPlayer;