import React, { useRef, useState } from "react";
import './BigBanner.scss';

const BigBanner = () => {
    return (
        <div className="billboard">
            <div className="hero-image-wrapper">
                <img className="hero static-image image-layer" src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSZMTWqxXA_2n9U7oZdDZ0OfaQEXw9VUuxLP8jy_XGvMgw_iQfWQ_kSluVbIbipIEm_Zq6-F10WO2ItUfThS6mGAYRvx.jpg?r=5ca" alt="aaa"/>
                <div class="trailer-vignette vignette-layer"></div>
                <div className="hero-vignette vignette-layer"></div>
            </div>
            <div className="info meta-layer">
                <div className="logo-and-text meta-layer mt-5">
                    <div className="billboard-title">
                        <img className="title-logo" src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABU9xoLxW1h9_3_xksgZXQ0afmEbLKMfP_D2f7BXciH2tpj0vFyEmDli5nKqtQYMDPMxRffV9LJoeneEluBE35pB69Gb_B2mJX2eGpzG4iCtOHYKK0loMG82TapBVIzjSClDAZKkJqzAIjxn2zWhLCtHXi8FynvObiZF5QbstSxfJIg.png?r=e76" title="" alt="aaaa"/>
                    </div>
                    <div className="info-wrapper">
                        <div className="synopsis no-supplemental"> Two strangers meet on a train and form a bond that evolves over the years. After a separation, they reconnect and reflect on their love for each other. </div>
                    </div>
                    <div className="billboard-links button-layer forward-leaning">
                        <div className="PreviewButton__container">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigBanner;