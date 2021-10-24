// import React, { useEffect } from 'react';
// import './PreviewPlayer.scss';
// import DetailInfo from '../DetailInfo';
// import Episodes from '../Episodes';
// import PreviewButtonControl from '../PreviewButtonControl';

// const PreviewPlayer = (props) => {
//     const { item } = props
//     useEffect(() => {
//         console.log("🚀 ~ file: index.js ~ line 12 ~ PreviewPlayer ~ item", item)

//     }, [])
//     return (
//         <div className="position-relative float-start w-75 pt-4">
//             <div className="mask-image position-relative d-flex justify-content-center">
//                 <img style={{maxHeight:'510px'}} className='w-75 h-100' alt="playerArt" src={item.uri_thumbnail} />
//                 <PreviewButtonControl/>
//             </div>
//             <DetailInfo item={item}/>
//             <Episodes />
//         </div>
//     );
// };

// export default PreviewPlayer;