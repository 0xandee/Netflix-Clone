import React from 'react';
import '../scss/PreviewInfo.scss';

import DetailInfoMetadata from './DetailInfoMetadata';
import DetailInfoTags from './DetailInfoTags';

const DetailInfo = () => {
    return (
        <div>
            <DetailInfoMetadata/>
            <DetailInfoTags/>
        </div>
    );
};

export default DetailInfo;