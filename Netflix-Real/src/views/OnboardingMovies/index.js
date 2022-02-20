import React, { useEffect, useState } from "react";
import './onboardingMovies.scss';
import {  useHistory, useLocation } from "react-router-dom";
import { Footer, OnboardingMovieItem, SignUpNavigationBar } from "../../components";
import { Button } from "reactstrap";
import { getMoviesByGenres, postNewUserMovies } from "../../services/api/movie";
import { getToken } from "../../services/function";


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
            const response = await postNewUserMovies(selectedMovies, getToken())
            if (response.status === 200) {
                localStorage.setItem('new_user', false);
                setTimeout(() => {
                    history.push({
                        pathname: '/home',
                    })
                }, 3000);
            }
        }
        catch (error) {
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

    useEffect(() => {
        async function fetchData() {
            // You can await here
            let temp = JSON.parse(query.get('value'))
            try {
                const response = await getMoviesByGenres(temp, 32, getToken())

                if (response.status === 200) {
                    setMovies(await response.data)
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }

            }
            catch (e) {
                if (e.response.status === 500) {
                    document.location.reload(true)
                }

            }
        }
        fetchData();

    }, [])

    return (
        <div id='onboardingMovies'>
            <div className={`registration`}>
                <SignUpNavigationBar />
                <div className='registration__background-image'>
                </div>
                <div className={`registration__body`}>
                    {/* <div className=' mb-3' onClick={() => localStorage.setItem('access_token', '1')}>
                        REmove token key
                    </div> */}
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
                            <div className="registration__body__content__main__boxes w-75">
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