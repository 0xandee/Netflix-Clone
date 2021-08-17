import React, { useRef, useState } from "react";
import './Slider.scss';
import { BigBanner, Slider, Footer } from "../../components";

const movieData = [{
    id: 1,
    sliderTitle: 'Popular Now',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABW0hEyNvRlA9VItn8gFnqsw98MxPkuDFVajE1R4XI-afTllo0E0alvKE1IK_J3IjTmZ0mLYGHItLqzA_CLp-6ygrH-XueNNRhZzN4AuzoRXHBChinBDhypgGGPjO.jpg?r=da1',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTkLaJLrR7faXhHg_plP0nXDQ4L2Uy4QWERQL58jtuB2yp7l3AoXr41P6QY-XzvkS-lQpOqBqvq21jjipSZ6zHK8IRVKqf2bTJ61Lir5CXBI7Vi-Q3GD4PlAwaZz.jpg?r=93f',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVu0lndH33ByfgLDg-WrwQTvDojoNk8ScnfTqtT7hTkmhrvoNNWxCCNtFzg2HfiZjB-8t8QcXn0o9at8bOj3O0ZGWomJ2uTk19uwyDGrUb-_sPJ-o1DqZ6PqYUuQ.jpg?r=335',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbmGaD5018rVP_nUYVzupsK32kNp9ysby23NrjLdbr8RgbRl6vLcVqAQatGSiowON_vyr43O70NAtytCtQReeE6HWJYfZ4d720L3-g2ULJUhWotqNlL7oGH7Du_-.jpg?r=0e9',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSXmhtJ6JRKnBgJFnmvAhKsxeNkf1fqHW5v-ODTpVymAZ4ZGvJQHcsioelP5-GWq7yumfK7TDXvhPskB896I-GtHcF-C9KgFcfQmDsGnFfZ_KfkgPROx9VOl-ChJ.jpg?r=f59',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQvxXNAtHZO0L3elCihVEFr9kUl58LC4hz89kuhtxCpLtRlo099P722G-xO_L3vCpPV9zJt8UwjaLkd0n-j5ZFrWucMP0a-YMLYvO9uO14slVUVj3nZa4t51E2Av.jpg?r=4a1',
        movieLink: ''
    },{
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVp2asRLMqBDtgNX3bwzallgbvVwPg5d8BWUMuJjnesDoy8BJjjcirT4IRdWrCopjNdbNpCPdUE0OJgqe6x5va-SB5rn9rDEYtFtFCMg1hLGNmIJ7oszYvXw-opz.jpg?r=9a7',
        movieLink: ''
    }]
},{
    id: 2,
    sliderTitle: 'Action & Adventure',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABW0hEyNvRlA9VItn8gFnqsw98MxPkuDFVajE1R4XI-afTllo0E0alvKE1IK_J3IjTmZ0mLYGHItLqzA_CLp-6ygrH-XueNNRhZzN4AuzoRXHBChinBDhypgGGPjO.jpg?r=da1',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTkLaJLrR7faXhHg_plP0nXDQ4L2Uy4QWERQL58jtuB2yp7l3AoXr41P6QY-XzvkS-lQpOqBqvq21jjipSZ6zHK8IRVKqf2bTJ61Lir5CXBI7Vi-Q3GD4PlAwaZz.jpg?r=93f',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVu0lndH33ByfgLDg-WrwQTvDojoNk8ScnfTqtT7hTkmhrvoNNWxCCNtFzg2HfiZjB-8t8QcXn0o9at8bOj3O0ZGWomJ2uTk19uwyDGrUb-_sPJ-o1DqZ6PqYUuQ.jpg?r=335',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbmGaD5018rVP_nUYVzupsK32kNp9ysby23NrjLdbr8RgbRl6vLcVqAQatGSiowON_vyr43O70NAtytCtQReeE6HWJYfZ4d720L3-g2ULJUhWotqNlL7oGH7Du_-.jpg?r=0e9',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSXmhtJ6JRKnBgJFnmvAhKsxeNkf1fqHW5v-ODTpVymAZ4ZGvJQHcsioelP5-GWq7yumfK7TDXvhPskB896I-GtHcF-C9KgFcfQmDsGnFfZ_KfkgPROx9VOl-ChJ.jpg?r=f59',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQvxXNAtHZO0L3elCihVEFr9kUl58LC4hz89kuhtxCpLtRlo099P722G-xO_L3vCpPV9zJt8UwjaLkd0n-j5ZFrWucMP0a-YMLYvO9uO14slVUVj3nZa4t51E2Av.jpg?r=4a1',
        movieLink: ''
    },{
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVp2asRLMqBDtgNX3bwzallgbvVwPg5d8BWUMuJjnesDoy8BJjjcirT4IRdWrCopjNdbNpCPdUE0OJgqe6x5va-SB5rn9rDEYtFtFCMg1hLGNmIJ7oszYvXw-opz.jpg?r=9a7',
        movieLink: ''
    }]
}]

const Homepage = () => {
    return (
        <div className="overflow-x-hidden">
            <BigBanner/>
            {movieData.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList}/>))}
            <Footer/>
        </div>
    );
};

export default Homepage;