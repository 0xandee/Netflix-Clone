import React from 'react';
import './PreviewPlayer.scss';
import PreviewButtonControl from '../PreviewButtonControl';

const PreviewPlayer = () => {
    return (
        <div className="position-relative">
            <div className="mask-image">
                <img alt="playerArt" src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcEQYLhsZG5h3WqMz5n8oiGrD9E9R7n4qqeJJnUB1akqyvUoyfhiVDq783_EqyMSzwkOQUrxYvJ6zXIcOgG0Eni7B5yS.jpg?r=720" />
            </div>
            <PreviewButtonControl></PreviewButtonControl>
        </div>
    );
};

export default PreviewPlayer;