import React from 'react';
import './PreviewInfo.scss';

const DetailInfoTags = () => {
    return (
        <div>
            <div className="preview-tags">
                <span className="preview-tags-label">Cast:</span>
                <span className="preview-tags-item"> Tran Nghia, Truc Anh, Tran Phong</span>
            </div>
            <div className="preview-tags">
                <span className="preview-tags-label">Genres:</span>
                <span className="preview-tags-item"> Vietnamese, Movies based on Books, Dramas</span>
            </div>
            <div className="preview-tags">
                <span className="preview-tags-label">This Movie is:</span>
                <span className="preview-tags-item"> Sentimental, Understated, Emotional</span>
            </div>
        </div>
    );
};

export default DetailInfoTags;