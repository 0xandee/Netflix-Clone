import React, { useEffect, useState } from "react";
import './onboardingMovies.scss';
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { Footer, OnboardingMovieItem, SignUpNavigationBar } from "../../components";
import { Button } from "reactstrap";
import { getMoviesByGenres, postNewUserMovies } from "../../services/api/movie";

const artworkData = [{
    id: 1,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdq7uWdcgr-iutmrDG4_pw7ak_o_DrkfwJmSyQTahiEMVr-Hc5xZr9aGEk4v3Rg1yys06uvHXIA_dF4kpnR1emwajA.jpg?r=a43'
}, {
    id: 2,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABWVrqreoTb1Evojb0HBnTGcyAftKFkHKpyotCBCbtz8C0vN8jtVq0w_sSqcpba9qs_90CopZxolVRIy5dEpTMh4ggmjHMaSmE5rSuUPP7JB2f7f6gkiH-8kZPOs.jpg?r=20d'
}, {
    id: 3,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX-_GKy3ey9eeZwZflmrwgeko8lLWIpkZq8jziWBi1FYOAJsqBr3XHvGlkV-4-rKqxW-bNBe-CbudVzreQI-q-aj4w.jpg?r=8aa'
}, {
    id: 4,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUO2PnUpSpQQ1c9fZviK06V_dhWfoCxna5yp2sbNn6NyEmnolJnwA8MbhanckGLSCe5mIw1v8vC6B85qmWZgyxj6DsapJv4d19XSphT-ylkq5u-idf6OmQI5z5M.jpg?r=319'
}, {
    id: 5,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUVtaA-j-Wz6jSNlw55hX58S75Pxrc-g1nKLX0WrSoAqVoBvAbRO8WFb-ujggPfYE13Qik9eSfb22B77YkxhKJ7E7ecSeukLRR4SL9ec0x3D-lQBFqXJa7M-CpU.jpg?r=b1f'
}, {
    id: 6,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABfhY52RXjTMD-fDGRa9HZF-u3kPV8f5h0bd_ipkMxV3evPmzXJtCay-uw88uwymiAMPyknbtkC289ZO_S2cy8dDEZ7RqlcZbRX8S_6kX5EEii6uXcirkdKKNMHg.jpg?r=b85'
}, {
    id: 7,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABWVrqreoTb1Evojb0HBnTGcyAftKFkHKpyotCBCbtz8C0vN8jtVq0w_sSqcpba9qs_90CopZxolVRIy5dEpTMh4ggmjHMaSmE5rSuUPP7JB2f7f6gkiH-8kZPOs.jpg?r=20d'
}, {
    id: 8,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX-_GKy3ey9eeZwZflmrwgeko8lLWIpkZq8jziWBi1FYOAJsqBr3XHvGlkV-4-rKqxW-bNBe-CbudVzreQI-q-aj4w.jpg?r=8aa'
}, {
    id: 9,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUO2PnUpSpQQ1c9fZviK06V_dhWfoCxna5yp2sbNn6NyEmnolJnwA8MbhanckGLSCe5mIw1v8vC6B85qmWZgyxj6DsapJv4d19XSphT-ylkq5u-idf6OmQI5z5M.jpg?r=319'
}, {
    id: 10,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUVtaA-j-Wz6jSNlw55hX58S75Pxrc-g1nKLX0WrSoAqVoBvAbRO8WFb-ujggPfYE13Qik9eSfb22B77YkxhKJ7E7ecSeukLRR4SL9ec0x3D-lQBFqXJa7M-CpU.jpg?r=b1f'
}, {
    id: 11,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABfhY52RXjTMD-fDGRa9HZF-u3kPV8f5h0bd_ipkMxV3evPmzXJtCay-uw88uwymiAMPyknbtkC289ZO_S2cy8dDEZ7RqlcZbRX8S_6kX5EEii6uXcirkdKKNMHg.jpg?r=b85'
}, {
    id: 12,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX-_GKy3ey9eeZwZflmrwgeko8lLWIpkZq8jziWBi1FYOAJsqBr3XHvGlkV-4-rKqxW-bNBe-CbudVzreQI-q-aj4w.jpg?r=8aa'
}]



const OnboardingMovies = () => {
    const query = new URLSearchParams(useLocation().search)
    const [isFinished, setIsFinished] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const history = useHistory()
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [movies, setMovies] = useState([]);

    const triggerFinished = async () => {
        setIsFinished(!isFinished);
        try {
            const response = await postNewUserMovies(selectedMovies, localStorage.getItem('access_token'))
            if (response.status === 200)
                setTimeout(() => {
                    history.push({
                        pathname: '/home',
                    })
                }, 3000);
        }
        catch (error) {
            console.log("🚀 ~ file: index.js ~ line 69 ~ triggerFinished ~ error", error)
        }
    }

    const checkedMoviesClicked = (data) => {
        if (selectedMovies.length >= 2)
            setIsDisabled(false);
        else setIsDisabled(true);
        setSelectedMovies([...selectedMovies, data])
    }

    const notCheckedMoviesClicked = (data) => {
        let temp = selectedMovies;
        let index = temp.indexOf(data);
        if (index > -1) {
            temp.splice(index, 1);
        }
        if (temp.length < 3)
            setIsDisabled(true)
        setSelectedMovies(temp)
    }

    useEffect(async () => {
        let temp = JSON.parse(query.get('value'))
        const response = await getMoviesByGenres(temp, localStorage.getItem('access_token'))
        if (response.status === 200) {
            setMovies(await response.json())
        }

    }, [])

    return (
        <div id='onboardingMovies'>
            <div className={`registration`}>
                <SignUpNavigationBar />
                <div className='registration__background-image'>
                </div>
                <div className={`registration__body`}>
                    <div className={`registration__body__content`}>
                        <div className={`registration__body__content__main `}>
                            {isFinished ?
                                <div className='mb-3 d-flex flex-column justify-content-center align-items-center'>
                                    <h1 className="registration__body__content__main__step-title">Personalizing for You.</h1>
                                    <div className="registration__body__content__main__waiting-spinner">
                                        <div className="basic-spinner center-absolute"></div>
                                    </div>
                                    <div className="registration__body__content__main__step-content">
                                        We're looking for movies and TV shows we think you'll love.
                                    </div>
                                </div>
                                :
                                <div className='mb-3 d-flex flex-column justify-content-center align-items-center'>
                                    <h1 className="registration__body__content__main__step-title">
                                        Choose at least 3 you like.</h1>
                                    <div className="registration__body__content__main__step-content">
                                        It will help us find movies you'll love! Click the ones you like!
                                    </div>
                                    <Button className={`button-next`} onClick={triggerFinished} disabled={isDisabled}>
                                        <span>Next</span>
                                    </Button>
                                </div>}
                            <div className="registration__body__content__main__boxes w-100">
                                {movies.map(item => (<OnboardingMovieItem id={item.id} artLink={item.uri_avatar} checkedMoviesClicked={checkedMoviesClicked} notCheckedMoviesClicked={notCheckedMoviesClicked} />))}
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer style={{ background: '#f3f3f3' }} />
                </div>

            </div>

        </div>
    )
}
export default OnboardingMovies;