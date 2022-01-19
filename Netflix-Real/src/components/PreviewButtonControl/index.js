import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './PreviewButtonControl.scss'
import { favMoviePost } from '../../services/api/user';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { getToken } from '../../services/function';
import { Tooltip } from 'reactstrap';

const PreviewButtonControl = (props) => {
    const { item } = props
    const [iconAddPlaylist, setIconAddPlaylist] = useState(false);
    const [iconLike, setIconLike] = useState(false);
    const [iconDislike, setIconDislike] = useState(false);

    const toggleAddPlaylist = () => setIconAddPlaylist(!iconAddPlaylist);
    const toggleLike = () => setIconLike(!iconLike);
    const toggleDislike = () => setIconDislike(!iconDislike);
    const history = useHistory()
    const addFavoriteClicked = async () => {
        try {
            const response = await favMoviePost(item.id, getToken())
            console.log("🚀 ~ file: index.js ~ line 9 ~ addFavoriteClicked ~ response", response)
            if (response.status == 500) {
                history.push('/maintenance')
            }
        }
        catch {
            history.push('/maintenance')
        }

    }

    const playClicked = () => {
        history.push(`/watch/${item.id}`)
    }
    return (
        <div className="position-relative ">
            <div className="PreviewButton__container PreviewButton__float-left-container px-4 d-flex flex-row  align-items-center">
                <div className="PlayButton__primary-color PlayButton__primary-button d-flex flex-row justify-content-center align-items-center" onClick={playClicked} >
                    <div className="PlayIcon_icon-container px-2">
                        <div id="PlayIcon" className="PlayIcon_icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                            </svg>
                        </div>

                    </div>
                    <span className="PlayButton__primary-text PlayButton__primary-text-transform plr-2 ">Play</span>
                </div>
                <div id="AddIcon" style={{ margin: '0 15px' }}>
                    <button className="PlayButton__secondary-color PlayButton__secondary-button" onClick={addFavoriteClicked}>
                        <div className="PlayIcon_icon-container">
                            <div  className="AddIcon_icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <Tooltip placement="top" isOpen={iconAddPlaylist} target="AddIcon" toggle={toggleAddPlaylist}>
                                Add to Playlist
                            </Tooltip>
                        </div>
                    </button>
                </div>
                <div id="likeIcon" style={{ margin: '0 15px' }}>
                    <button className="PlayButton__secondary-color PlayButton__secondary-button">
                        <div className="PlayIcon_icon-container">
                            <div  className="AddIcon_icon">
                                <svg viewBox="0 0 24 24"><path d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                        <Tooltip placement="top" isOpen={iconLike} target="likeIcon" toggle={toggleLike}>
                                Like
                            </Tooltip>
                    </button>
                </div>
                <div id="dislikeIcon" style={{ margin: '0 15px' }}>
                    <button className="PlayButton__secondary-color PlayButton__secondary-button">
                        <div className="PlayIcon_icon-container">
                            <div className="AddIcon_icon">
                                <svg viewBox="0 0 24 24"><path d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z" fill="currentColor"></path></svg>
                            </div>
                        </div>
                        <Tooltip placement="top" isOpen={iconDislike} target="dislikeIcon" toggle={toggleDislike}>
                                Dislike
                            </Tooltip>
                    </button>
                </div>
            </div>
            {/* <div className="PreviewButton__container PreviewButton__float-right-container px-3">
                <MuteButton/>
            </div> */}
        </div>
    )
};

export default PreviewButtonControl;