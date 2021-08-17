import React from 'react';
import '../PreviewInfo/PreviewInfo.scss';

const DetailInfoMetadata = () => {
    return (
        <div>
            <div className="preview-detail-metadata">
                <span className="match-score">98% Match</span>
                <span className="year ml-2">2019</span>
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
                <p>Through heartbreak and betrayal, Ngan's unrequited love for his childhood best friend Hà La endures for a generation in this sweeping romance.</p>
            </div>
        </div>
    );
};

export default DetailInfoMetadata;