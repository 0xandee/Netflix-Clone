import React from 'react';
import './PreviewPlayer.scss';
import DetailInfo from '../DetailInfo';
import About from '../About';
import MoreLikeThis from '../MoreLikeThis';
import Episodes from '../Episodes';

import PreviewButtonControl from '../PreviewButtonControl';

const PreviewPlayer = (props) => {
    return (
        <div className="position-relative float-start w-75 pt-4">
            <div className="mask-image position-relative">
                <img alt="playerArt" src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcEQYLhsZG5h3WqMz5n8oiGrD9E9R7n4qqeJJnUB1akqyvUoyfhiVDq783_EqyMSzwkOQUrxYvJ6zXIcOgG0Eni7B5yS.jpg?r=720" />
                <PreviewButtonControl onCloseButton = {props.onCloseButton}></PreviewButtonControl>
            </div>
            <DetailInfo/>
            <Episodes/>
            {/* <MoreLikeThis/> */}
            
            {/* <About/> */}

        </div>
    );
};

export default PreviewPlayer;