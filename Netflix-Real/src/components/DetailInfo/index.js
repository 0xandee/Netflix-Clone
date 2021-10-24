import React from 'react';
import '../PreviewInfo/PreviewInfo.scss';



import DetailInfoMetadata from '../DetailInfoMetadata';
import DetailInfoTags from '../DetailInfoTags';

const DetailInfo = (props) => {
    const {item} = props;
    return (
        <div className="px-4 pb-4">
            <DetailInfoMetadata item={item}/>
            <DetailInfoTags item= {item}/>
        </div>
    );
};

export default DetailInfo;