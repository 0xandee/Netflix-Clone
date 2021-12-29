import React, { useEffect } from 'react';
import '../PreviewInfo/PreviewInfo.scss';

const DetailInfo = (props) => {
    const { item } = props;

    return (
        <div className="px-4 pb-4">
            <div className="preview-detail-metadata">
                <h2 className="episodes__label">{item.m_name}</h2>
                <span className="match-score">98% Match</span>
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
            <div>
                <div className="preview-tags">
                    <span className="preview-tags-item">
                        <span className="preview-tags-label">Cast: </span>
                        {item.actor}
                    </span>
                </div>
                <div className="preview-tags">
                    <span className="preview-tags-item">
                        <span className="preview-tags-label">Director: </span>
                        {item.director}
                    </span>
                </div>
                <div className="preview-tags d-flex flex-row">
                    <span className="preview-tags-item">
                        <span className="preview-tags-label">Genres: </span>
                        {item.t_type && item.t_type.map((item, i, a) => (
                            i !== a.length - 1 ?
                                ` ${item},`
                                :
                                ` ${item} `
                        ))}

                    </span>

                </div>

            </div>
        </div>
    );
};

export default DetailInfo;