import React from 'react';
import '../PreviewInfo/PreviewInfo.scss';



import DetailInfoMetadata from '../DetailInfoMetadata';
import DetailInfoTags from '../DetailInfoTags';

const DetailInfo = () => {
    return (
        <div className="px-4 pb-4">
            <DetailInfoMetadata/>
            <DetailInfoTags/>
        </div>
    );
};

export default DetailInfo;