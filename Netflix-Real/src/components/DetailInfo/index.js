import React from 'react';
import { Link } from 'react-router-dom';
import '../PreviewInfo/PreviewInfo.scss';

const DetailInfo = (props) => {
    const { item } = props;

    return (
        <div className="px-4 pb-4" >
            <div className="preview-detail-metadata">
                <h2 className="episodes__label">{item.name}</h2>
                <span className="match-score">{props.percentMatched > 30  && `${props.percentMatched}% Match`}</span>
                <span className="maturiry-rating ml-2">
                    <span className="maturity-number">13+</span>
                </span>
                <span className="duration ml-2">1h 56m</span>
                <span className="player-feature-badge ml-2">HD</span>
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
                        {item.type && item.type.map((item, i, a) => (
                            i !== a.length - 1 ?
                                <Link to={`/movies/${item.id}`} key={i} className="genre-title" >
                                  {  ` ${item.name}, `}
                                </Link>
                                :
                                <Link to={`/movies/${item.id}`} key={i} className="genre-title">
                                    {` ${item.name} `}
                                </Link>

                        ))}

                    </span>

                </div>

            </div>
        </div>
    );
};

export default DetailInfo;