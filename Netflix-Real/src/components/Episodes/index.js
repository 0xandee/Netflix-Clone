import React from 'react';
import EpisodeItem from '../EpisodeItem';
import EpisodeSelector from '../EpisodeSelector';
import './Episodes.scss';


const Episodes = () => {
    return (
        <div>
            <EpisodeSelector/>
            <div className="episodesSelector__container">
                <EpisodeItem/><EpisodeItem/><EpisodeItem/>
            </div>
        </div>
    );
};

export default Episodes;