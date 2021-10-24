import React from 'react';
import '../PreviewInfo/PreviewInfo.scss';

const DetailInfoMetadata = (props) => {
    const { item } = props;
    const releaseYear = item.m_name.slice(item.m_name.length - 5, item.m_name.length - 1)
    return (
        <div>
            <div className="preview-detail-metadata">
                <h2 className="episodes__label">{item.m_name}</h2>
                <span className="match-score">98% Match</span>
                <span className="year ml-2">{releaseYear}</span>
                <span className="maturiry-rating ml-2">
                    <span className="maturity-number">13+</span>
                </span>
                <span className="duration ml-2">1h 56m</span>
                <span className="player-feature-badge ml-2">HD</span>
            </div>
            <div className="supplemental-message">
                <span>#4 in Movies Today</span>
            </div>
            <div className="preview-message">
                <p>{item.description}</p>
            </div>
        </div>
    );
};

export default DetailInfoMetadata;