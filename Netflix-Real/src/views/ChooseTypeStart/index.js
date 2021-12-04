import React, { useEffect, useState } from "react";
import './languageSetup.scss';
import { Link, NavLink, useHistory } from "react-router-dom";
import { Footer, GenreItem, SignUpNavigationBar } from "../../components";
import { useSelector } from "react-redux";
import { postNewUserGenres } from '../../services/api/movie'


const ChooseTypeStart = () => {
    const history = useHistory()
    const [selectedGenre, setSelectedGenre] = useState([]);
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)

    const checkedGenresClicked = (data) => {
        setSelectedGenre([...selectedGenre, data])

    }

    const nextClicked = async () => {
        let removeDuplicate = [...new Set(selectedGenre)];
        history.push({
            pathname: '/choosemovies',
            search: `value=${JSON.stringify(removeDuplicate)}`,
        })

    }
    return (
        <div id='langSetup'>
            <div className={`registration `}>
                <SignUpNavigationBar />
                <div className='registration__background-image'>
                </div>
                <div className={`registration__body`}>
                    <div className={`registration__body__content justify-content-center`}>
                        <div className={`registration__body__content__main`}>
                            <div >
                                <h1 className="registration__body__content__main__step-title">
                                    Which genre do you like to watch shows and movies in?
                                </h1>
                                <div className="registration__body__content__main__step-content">
                                    Letting us know helps set up your personalization.
                                </div>
                            </div>

                            <ul className="languages-container mt-3 w-100">
                                {dataTypes.map(item => (<GenreItem id={item.id} language={item.t_name} checkedGenresClicked={checkedGenresClicked} />))}
                            </ul>

                            <div className='submitBtnContainer w-75' onClick={nextClicked}>
                                <div className={`registration__body__content__main__button-next`} >
                                    <span>Next
                                    </span>
                                </div>
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
export default ChooseTypeStart;