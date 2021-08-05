import React from 'react';
import '../scss/Episodes.scss';

import DetailInfoTags from './DetailInfoTags';

const About = () => {
    return (
        <div>
            <div className="episodesSelector__header">
                <h3 className="episodesSelector__label">About Mat Biec</h3>
            </div>
            <div className="section__container">
                <DetailInfoTags/>
            </div>
            <br/>
        </div>
    );
};

export default About;