import React from 'react';
import '../Episodes/Episodes.scss';

const EpisodeSelector = () => {
    return (
        <div className="episodesSelector__header">
            <h3 className="episodesSelector__label">Episodes</h3>
            <div className="episodesSelector__dropdown">
                <button className="dropdown-toggle season-toggle">Season 1</button>
            </div>
        </div>
    );
};

export default EpisodeSelector;