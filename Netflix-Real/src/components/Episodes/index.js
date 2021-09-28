import React from 'react';
import EpisodeItem from '../EpisodeItem';
import DropdownSelector from '../DropdownSelector';
import './Episodes.scss';


const Episodes = () => {
    return (
        <div className="px-4">
            <div className="episodesSelector__header">
                <h3 className="episodesSelector__label">Episodes</h3>
                <DropdownSelector dropdownTitle={'Season 1'}/>
            </div>
            <div className="episodesSelector__container">
                <EpisodeItem/><EpisodeItem/><EpisodeItem/><EpisodeItem/><EpisodeItem/><EpisodeItem/>
            </div>
        </div>
    );
};

export default Episodes;