import React, { useCallback, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"


// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper/core';

import './Slider.scss';
import '../PreviewButtonControl/PreviewButtonControl.scss';
import '../PreviewInfo/PreviewInfo.scss';
import PlayButton from "../PlayButton";
import AddButton from "../AddButton";
import DislikeButton from "../DislikeButton";
import LikeButton from "../LikeButton";
import PreviewPopup from "../PreviewPopup";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";



// install Swiper modules
SwiperCore.use([Navigation]);

const Slider = () => {
    //const [showed, setShowed] = useState(false)
    const showed = useSelector((state) => state.isPopUp)
    const homePageRef = useRef(null)
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const dispatch = useDispatch()
    const handleMoreInfo = () => {
        dispatch(showPopUpInfo(!showed))
        console.log("🚀 ~ file: index.js ~ line 44 ~ handleMoreInfo ~ currentScrollY", currentScrollY)

        if (!showed) {
            console.log("🚀 ~ file: index.js ~ line 40 ~ handleMoreInfo ~ showed", showed)

            homePageRef.current.style.position = 'fixed'
            homePageRef.current.style.top = -currentScrollY + 'px'
           
            // window.scroll(0,0)
        }
        else {
            console.log("🚀 ~ file: index.js ~ line 40 ~ handleMoreInfo ~ showed 2", showed)
            homePageRef.current.style.position = 'relative'
            homePageRef.current.style.top =null
        
        }

    }
    const handleScroll = useCallback(() => {
        setCurrentScrollY(window.scrollY)
        console.log("🚀 ~ file: index.js ~ line 59 ~ handleScroll ~ currentScrollY", currentScrollY)
    }, [currentScrollY]);

    useEffect(() => {


        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
    return (
        <div style={{position:'relative',}}>
            <div ref={homePageRef} className={`blackBg  ${showed && 'shown-pop-up'} `}>
                <div className={`billboard `}>
                    <div className="hero-image-wrapper">
                        <img class="hero static-image image-layer" src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYc72Xn4KxiSlpUDG8BMuyUWBb_6o7OR-51Nz0ucjOemsjDqJRkKgPpGDeuCJIZM9mrNoChvYsV-EERaCnryX0IqbOXs.jpg?r=37c" alt="aaa" />
                    </div>
                    <div className="info meta-layer">
                        <div className="logo-and-text meta-layer mt-5">
                            <div className="billboard-title">
                                <img class="title-logo" src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABYqOu3IJzW1aa-pvgk4axk5iU6sYHNXg2BgwjhsgGwlitw1lWvSQy3JoKkW89gf1P7jU73Ikf4-p_1IQhYrSkjSLZu6vIsWk56EpstV4AdiZXjvcu10HepdDvG_zCOaoiOYedyqc3673WNpb1DeJ7ekAPJAQ_K0IUdDS7v5hjXyA2g.png?r=58b" title="" alt="aaaa" />
                            </div>
                            <div className="info-wrapper">
                                <div class="synopsis no-supplemental"> Two strangers meet on a train and form a bond that evolves over the years. After a separation, they reconnect and reflect on their love for each other. </div>
                            </div>
                            <div className="billboard-links button-layer forward-leaning">
                                <div className="PreviewButton__container">
                                    <PlayButton />
                                </div>
                                <div className="PreviewButton__container" >
                                    <span onClick={handleMoreInfo}>  More Info
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="">
                    <section className="thumbSection mb-3">
                        <h2 class="thumbTitle">Popular Now</h2>
                        <Swiper spaceBetween={5}
                            slidesPerView={3}
                            loop={true}
                            freeMode={true}
                            loopAdditionalSlides={5}
                            speed={500}
                            navigation={true}
                            breakpoints={{
                                "768": {
                                    "slidesPerView": 4,
                                    "slidesPerGroup": 4,
                                    freeMode: false
                                },
                                "1024": {
                                    "slidesPerView": 6,
                                    "slidesPerGroup": 6,
                                    freeMode: false
                                },
                            }} className="swiper-container">
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <img class="thumbTile__image"
                                        src="https://occ-0-1433-1432.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUqwomVyMFsby9zeXLLnkfv744mKCzQDWL7rUDhbwg89bpT-V7qYoW-NNfjFaG3nFcDWu-U49vpUFB_L4njc2GFl6l60Efb4oT-_0e3oi3Dh8nwyLZhG2ciBHGUnRMB_J-D2jQk2Qz_WM4n8A_8b8ZqFDpj80B6KJ9T2bXR7rYcl0M8MaDCsR68.jpg?r=93f"
                                        alt="The Queen's Gambit" />
                                </a>
                                <div className="controlPlayer pl-4em">
                                    <div className="PreviewButton__container_preview PreviewButton__hidden-container">
                                        <PlayButton />
                                        <AddButton />
                                        <LikeButton />
                                        <DislikeButton />
                                        <span className="match-score d-inlinee ml-2">98% Match</span>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </section>
                </div>
                <div>
                    <section className="thumbSection mb-3">
                        <h2 class="thumbTitle">Top 10 in Vietnam Today</h2>
                        <Swiper spaceBetween={5}
                            slidesPerView={3}
                            loop={true}
                            freeMode={true}
                            loopAdditionalSlides={5}
                            speed={500}
                            navigation={true}
                            breakpoints={{
                                "768": {
                                    "slidesPerView": 4,
                                    "slidesPerGroup": 4,
                                    freeMode: false
                                },
                                "1024": {
                                    "slidesPerView": 6,
                                    "slidesPerGroup": 6,
                                    freeMode: false
                                },
                            }} className="swiper-container">
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <svg className="svg-num" id="rank-1" viewBox="-20 0 70 154" width="100%" height="100%">
                                        <path stroke="#595959" stroke-width="4" d="M35.3768546,152 L72,152 L72,2.53765761 L2,19.3621723 L2,49.7031179 L35.3768546,41.2439629 L35.3768546,152 Z" stroke-linejoin="square"></path>
                                    </svg>
                                    <img class="thumbTile__image svg-img"
                                        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABS3cBtNxL37wMsJ9p33neV3RGvOaBN7Mogj0aaUgpVaTA0UDm75zUOL2ejOHAk_gKQw5IoIV3k3mhF6I4VboNFhXxmw3.jpg?r=caa"
                                        alt="The Queen's Gambit" />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <svg className="svg-num" id="rank-2" viewBox="0 0 80 154" width="100%" height="100%">
                                        <path stroke="#595959" stroke-width="4" d="M3.71962617,152 L113,152 L113,121.825843 L50.4844717,121.825843 L54.839038,118.275715 L84.2920208,94.2637235 C89.3795156,90.1399373 94.0402308,85.805476 98.2750133,81.2602394 C102.434328,76.796003 105.756249,71.9213605 108.246552,66.6313093 C110.695961,61.4281262 111.925234,55.5183519 111.925234,48.8820225 C111.925234,39.4542826 109.631416,31.2553428 105.049555,24.2365257 C100.453019,17.1952271 94.1085233,11.742935 85.9792809,7.86095975 C77.8037249,3.95686825 68.4966826,2 58.0373832,2 C47.5910414,2 38.3690168,4.02334203 30.3474738,8.05909511 C22.3318754,12.0918574 15.8900692,17.6378936 10.9952657,24.7136643 C6.5032786,31.2071367 3.60632064,38.5172162 2.30154382,46.6657205 L36.3572487,46.6657303 C37.5926743,43.1463939 39.7549135,40.1454308 42.815641,37.6955965 C46.3553833,34.8623544 51.0931115,33.4719101 56.9626168,33.4719101 C62.8931333,33.4719101 67.5151959,35.0087133 70.7225988,38.1533405 C73.9040847,41.2725581 75.5140187,45.1770811 75.5140187,49.747191 C75.5140187,53.8980504 74.3540224,57.681458 72.0462787,61.0445252 C69.8539253,64.2394343 66.0587912,68.1694332 60.6407465,72.8844961 L3.71962617,122.466411 L3.71962617,152 Z" stroke-linejoin="square"></path>
                                    </svg>
                                    <img class="thumbTile__image svg-img"
                                        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/Da_vleYcahiCE7JMYt8LJRyoenc/AAAABVxRGtlk5FGdOsaPZAPeqlnpo-g-_1QshW_ByydgIVuPjj_qclWZL89PCJMw0pj7gst9qkOTh4CXaiTPNKNnDZJDZ8hyXalLaFfhsqpIp2Atw3NT9MMWvmWTVH-bkHT9s8pvtyV9LFEnqf3-eXmKOHVJr7OC5dcvRmqpvVYCI07WYs86D9vcRIQY9ddJwM35VIfG75IMybpvXg6bddgpGtOJHHLRcpwj4EeaWTs5J2zYMNk6WLDXJse_E4xubYTsAEeJx2Bx-IjGzAbkCeF7tdENcbFIS2Z3FLI8DOD_pHYlCfcM2J2QU36zUwlfnSFBZ8pC7vVP5p2pShMvJ4kd4lY0fPHXlCoJY06cbamV5HhPc1Y8moqOkhzJlfwa2PcBPjKbJLkvcpJ8xZcU39bsfjUeZ3W-_WryPZxX2vA.jpg?r=ff5"
                                        alt="The Queen's Gambit" />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <svg className="svg-num" id="rank-3" viewBox="0 0 80 154" width="100%" height="100%">
                                        <path stroke="#595959" stroke-width="4" d="M3.80882206,41.5769231 L37.0515061,41.5769231 C38.3517545,38.8746012 40.596863,36.6304279 43.7263895,34.8562867 C47.2803012,32.8415598 51.5554462,31.8461538 56.5236364,31.8461538 C62.0793836,31.8461538 66.6639688,32.9574015 70.2470584,35.2230465 C74.0855721,37.6502004 76.0290909,41.5064608 76.0290909,46.5384615 C76.0290909,51.0910005 74.1755177,54.9331497 70.5561046,57.9179921 C67.0085429,60.8435804 62.3753187,62.2884615 56.7345455,62.2884615 L41.44,62.2884615 L41.44,90.6538462 L58.2109091,90.6538462 C63.7817365,90.6538462 68.4848473,91.8810709 72.2776806,94.3654147 C76.2972058,96.998244 78.3490909,100.94626 78.3490909,105.980769 C78.3490909,111.686239 76.4064369,115.956248 72.4962035,118.543035 C68.8382092,120.962954 64.2037189,122.153846 58.6327273,122.153846 C53.4279294,122.153846 48.8132219,121.213099 44.8064998,119.317495 C41.1082533,117.567834 38.4855585,115.045145 37.020696,111.788462 L2.32955254,111.788462 C4.42638081,123.876999 10.0911608,133.438882 19.3577843,140.568737 C29.2417774,148.173605 42.5943157,152 59.4763636,152 C70.1821774,152 79.6506285,150.217225 87.895614,146.663352 C96.0808203,143.135246 102.470757,138.1767 107.103765,131.778885 C111.699318,125.432794 114,117.841297 114,108.942308 C114,101.989991 112.069829,95.4478798 108.190354,89.2758666 C104.375056,83.2059551 98.5093901,78.9092584 90.507307,76.3677038 L85.0464375,74.6332682 L90.4004403,72.5926759 C97.0585205,70.0550555 102.066667,66.2546907 105.482826,61.1810519 C108.914299,56.0846696 110.625455,50.3747984 110.625455,44 C110.625455,35.5289649 108.363236,28.2215491 103.838408,22.0147147 C99.2644272,15.7404564 93.1388421,10.8456193 85.4297592,7.31870223 C77.6830773,3.77458354 69.1087589,2 59.6872727,2 C44.0840361,2 31.5154566,5.81589607 21.9099369,13.4146886 C12.9108379,20.5337501 6.88473271,29.9006747 3.80882206,41.5769231 Z" stroke-linejoin="square"></path>
                                    </svg>
                                    <img class="thumbTile__image svg-img"
                                        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABSG0ls9hjengg71nXqSKTr92BHv4hdM1FJX1anO3fIHHPcG4IAWXm9-IJkFdhMcAA7Mp4yCps2JqvvjaTty1jHQ4i9xURW4LVbw0ib5n8Ztuba697suT_bNIOUuZLA.jpg?r=5e3"
                                        alt="The Queen's Gambit" />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <svg className="svg-num" id="rank-4" viewBox="0 0 81 154" width="100%" height="100%">
                                        <path stroke="#595959" stroke-width="4" d="M72,152 L107.333333,152 L107.333333,121.022989 L128,121.022989 L128,92.4971264 L107.333333,92.4971264 L107.333333,2 L69.8901556,2 L2,92.7115182 L2,121.022989 L72,121.022989 L72,152 Z M36.2019688,92.1878453 L72.1315789,44.189673 L72.1315789,92.1878453 L36.2019688,92.1878453 Z" stroke-linejoin="square"></path>
                                    </svg>
                                    <img class="thumbTile__image svg-img"
                                        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABQgctL4G7MN5t4xwrUqK6R2I-wUzdKLcoBW_-fmZtJrFJQcE3HSvVC9Cnf1RHBtoIyIUGppdqsa_zqELsPNuJbLSYYmY.jpg?r=950"
                                        alt="The Queen's Gambit" />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <svg className="svg-num" id="rank-5" viewBox="0 0 81 154" width="100%" height="100%">
                                        <path stroke="#595959" stroke-width="4" d="M105.588235,32.1741573 L105.588235,2 L13.5341512,2 L5.23346137,90.3567416 L37.6974221,90.3567416 C39.8423634,87.9945599 42.5633685,86.1026486 45.8404943,84.6818815 C49.4251171,83.1278019 53.3831573,82.3539326 57.6985294,82.3539326 C63.9461666,82.3539326 69.1167687,84.0989833 73.1169188,87.6090599 C77.1783818,91.1729376 79.2205882,95.978777 79.2205882,101.873596 C79.2205882,107.914983 77.1770505,112.764709 73.0997273,116.26119 C69.1009578,119.690308 63.937755,121.393258 57.6985294,121.393258 C53.4004064,121.393258 49.5296219,120.698508 46.0975297,119.298481 C42.9870514,118.029647 40.5213861,116.352289 38.7303477,114.255618 L2.59164274,114.255618 C5.89986424,125.848885 12.3741772,134.878877 22.0519735,141.420254 C32.4724245,148.463604 45.6402245,152 61.6029412,152 C71.7212682,152 80.8962731,150.009613 89.150474,146.033804 C97.3481348,142.085229 103.861138,136.316269 108.722159,128.699343 C113.566267,121.108918 116,111.748478 116,100.575843 C116,91.3942122 113.987122,83.2618815 109.968062,76.1449748 C105.948525,69.0272223 100.453725,63.4447397 93.4584195,59.3700459 C86.4675635,55.2979443 78.6089657,53.261236 69.8455882,53.261236 C58.786395,53.261236 49.7471332,56.7437015 42.6116093,63.7220125 L38.7199998,67.5278803 L41.9927694,32.1741573 L105.588235,32.1741573 Z" stroke-linejoin="square"></path>
                                    </svg>
                                    <img class="thumbTile__image svg-img"
                                        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABWcoRGLb5wvMIjAZe2IugcEYLgmgwowqDLRcj1nhzsFjbXxFwSrViAnrXmARudjEeg8nEaSbn-J2bLKBUa5OpApM-hdYacDxs-2NI4_8nkQ2rRELWdlECGKBid-l8A.jpg?r=41f"
                                        alt="The Queen's Gambit" />
                                </a>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <a class="thumbTile" href="#">
                                    <svg className="svg-num" id="rank-6" viewBox="0 0 81 154" width="100%" height="100%">
                                        <path stroke="#595959" stroke-width="4" d="M79.4818812,38.1923077 L115.033301,38.1923077 C111.749021,27.2465475 106.069812,18.6188874 97.9854392,12.2541237 C89.3233245,5.4345086 77.5311253,2 62.5441696,2 C50.7574139,2 40.3504286,4.8597556 31.2782856,10.5766748 C22.2136435,16.2888673 15.0801345,24.6664083 9.8664516,35.7548512 C4.62956893,46.8926352 2,60.425245 2,76.3653846 C2,90.780675 4.35590519,103.709082 9.05862071,115.163484 C13.7255523,126.530727 20.6318333,135.502394 29.7929258,142.119053 C38.9042225,148.699746 50.2253375,152 63.8162544,152 C70.6650534,152 77.302793,150.907572 83.7383942,148.721644 C90.1464523,146.545072 95.9352915,143.283414 101.116249,138.930292 C106.269729,134.600255 110.371484,129.290084 113.430132,122.983061 C116.472342,116.709933 118,109.427498 118,101.115385 C118,92.3027337 115.938328,84.4792137 111.818117,77.6051375 C107.684009,70.7078755 102.174938,65.3123315 95.26749,61.3933792 C88.3630693,57.4761445 80.7883391,55.5192308 72.5088339,55.5192308 C57.9616172,55.5192308 47.1671496,60.0681559 39.9394182,69.1493234 L35.9360238,74.1793242 L36.3793189,67.7659347 C37.2527065,55.1301639 39.9385541,45.9159863 44.5467545,40.1121284 C49.2370196,34.204913 55.4320427,31.2115385 62.9681979,31.2115385 C67.2287179,31.2115385 70.7941922,31.9462343 73.652726,33.4515201 C76.0982063,34.7392946 78.0488724,36.3185428 79.4818812,38.1923077 Z M62.6054054,123 C56.7795005,123 51.7032171,121.106493 47.4689421,117.344581 C43.1731726,113.528035 41,108.602678 41,102.710227 C41,96.8286965 43.1638139,91.8460839 47.439446,87.8923814 C51.6754127,83.9753577 56.7634547,82 62.6054054,82 C68.4522832,82 73.511145,83.9791368 77.6793421,87.9048705 C81.8776909,91.859002 84,96.8365423 84,102.710227 C84,108.594809 81.8685262,113.515118 77.6500438,117.332405 C73.4832613,121.102908 68.4361895,123 62.6054054,123 Z" stroke-linejoin="square"></path>
                                    </svg>
                                    <img class="thumbTile__image svg-img"
                                        src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABXaAZdiUpWKPGdmfIYwcwMCawISWQ8ZozikzUSmiuEVRDYeYsNGd0VazvormIUj9zbZkkWtt9ymiUelpMMP3-_T2krhTwDdN5VqfbJUSFwPNC9Cv3KZFNjzwxMtZ4w.jpg?r=7b3"
                                        alt="The Queen's Gambit" />
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </section>
                </div>
            </div>
            <div className={`pop-up ${showed && 'showed'}`}>
                <PreviewPopup onCloseButton={handleMoreInfo} />
            </div>

        </div>

    );
};

export default Slider;