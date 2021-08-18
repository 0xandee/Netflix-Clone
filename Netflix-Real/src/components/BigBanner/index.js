import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './BigBanner.scss';
import '../PreviewButtonControl/PreviewButtonControl.scss';
import '../PreviewInfo/PreviewInfo.scss';
import PlayButton from "../PlayButton";
import DropdownSelector from "../DropdownSelector";

const BigBanner = (props) => {
    
    return (
        <div className="billboard">
            <div className="hero-image-wrapper">
                <img className="hero static-image image-layer" src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSZMTWqxXA_2n9U7oZdDZ0OfaQEXw9VUuxLP8jy_XGvMgw_iQfWQ_kSluVbIbipIEm_Zq6-F10WO2ItUfThS6mGAYRvx.jpg?r=5ca" alt="aaa" />
                <div class="trailer-vignette vignette-layer"></div>
                <div className="hero-vignette vignette-layer"></div>
            </div>
            <div className="info meta-layer">
                <DropdownSelector dropdownTitle="GENRES"/>
                <div className="logo-and-text meta-layer mt-4">
                    <div className="billboard-title">
                        <img className="title-logo" src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABU9xoLxW1h9_3_xksgZXQ0afmEbLKMfP_D2f7BXciH2tpj0vFyEmDli5nKqtQYMDPMxRffV9LJoeneEluBE35pB69Gb_B2mJX2eGpzG4iCtOHYKK0loMG82TapBVIzjSClDAZKkJqzAIjxn2zWhLCtHXi8FynvObiZF5QbstSxfJIg.png?r=e76" title="" alt="aaaa" />
                    </div>
                    <div className="info-wrapper">
                        <div className="synopsis no-supplemental"> Two strangers meet on a train and form a bond that evolves over the years. After a separation, they reconnect and reflect on their love for each other. </div>
                    </div>
                    <div className="billboard-links button-layer forward-leaning">
                        <div className="PreviewButton__container">
                            <PlayButton />
                        </div>
                        <div className="PreviewButton__container mx-4" >
                            <button className="PlayButton__secondary-color PlayButton__primary-button"  onClick={props.handleMoreInfo}>
                                <div className="PlayIcon_icon-container px-2">
                                    <div id="PlayIcon" className="PlayIcon_icon">
                                        <svg viewBox="0 0 24 24"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                                <span className="PlayButton__primary-text PlayButton__primary-text-transform plr-2">More Info</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigBanner;