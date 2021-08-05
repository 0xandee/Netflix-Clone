import React from 'react';
import '../scss/Episodes.scss';

import EpisodeItem from './EpisodeItem';
import EpisodeSelector from './EpisodeSelector';

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