import React, { useEffect, useState } from "react";
import './languageSetup.scss';
import { useHistory } from "react-router-dom";
import { Footer, GenreItem, SignUpNavigationBar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getMovieTypeAPI } from '../../services/api/movie'
import { Button } from "reactstrap";
import { setMovieTypes } from "../../services/redux/actions";
import { getToken } from "../../services/function";


const ChooseTypeStart = () => {
    const history = useHistory()
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    const dispatch = useDispatch();
    const checkedGenresClicked = (data) => {
        if (selectedGenre.length >= 0)
            setIsDisabled(false);
        else setIsDisabled(true);
        setSelectedGenre([...selectedGenre, data])

    }

    const notCheckedGenresClicked = (data) => {
        let temp = selectedGenre;
        let index = temp.indexOf(data);
        if (index > -1) {
            temp.splice(index, 1);
        }
        if (temp.length < 1)
            setIsDisabled(true)
        setSelectedGenre(temp)
    }

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getMovieTypeAPI(getToken())
                if (response.status === 200) {
                    let data = await response.data
                    dispatch(setMovieTypes(data))
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }
            }
            catch (err) {
                //  history.push('/maintenance')
            }
        }
        fetchData();

    }, [dispatch])

    const nextClicked = async () => {
        let removeDuplicate = [...new Set(selectedGenre)];
        history.push({
            pathname: '/choosemovies',
            search: `value=${JSON.stringify(removeDuplicate)}`,
        })

    }
    return (
        <div id='langSetup'>
            <div className={`registration`}>
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
                                {dataTypes.map(item => (
                                    <GenreItem
                                        id={item.id}
                                        language={item.name}
                                        checkedGenresClicked={checkedGenresClicked}
                                        notCheckedGenresClicked={notCheckedGenresClicked}

                                    />))}
                            </ul>

                            <div className='submitBtnContainer w-75' >
                                <Button className={`registration__body__content__main__button-next`} onClick={nextClicked} disabled={isDisabled} >
                                    <span>Next
                                    </span>
                                </Button>
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