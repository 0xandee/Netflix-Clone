import React from 'react';
import DetailInfoTags from '../DetailInfoTags';
import '../Episodes/Episodes.scss';



const About = () => {
    return (
        <div className="px-3">
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