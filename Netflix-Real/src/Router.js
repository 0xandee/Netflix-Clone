import React, { useEffect, useRef, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    Redirect
} from "react-router-dom";

import './App.css'
import io from "socket.io-client";
import { Slider, NavBar, NavigationBar, SignUpNavigationBar, PreviewInfo, PreviewPopup } from "./components/index";

import { ForgotPassword, PlanForm, Registration, RegistrationForm, SignUp, SignIn, GroupStreaming, LanguageSetup, AccountProfile, OnboardingMovies, VideoPlayer, Homepage, MyPlaylistPage, PopularPage, MoviesPage, SearchPage, ErrorPage } from "./views/index";
import { getMovieTypeAPI } from "./services/api/movie";
import { useDispatch } from "react-redux";
import { setMovieTypes } from "./services/redux/actions";
import { useSelector } from "react-redux";

//const socket = io.connect('http://localhost:8000');
const socket = io("localhost:8000", { transports: ["websocket"] });
export default function WebRouter() {
    const dispatch = useDispatch();
    const history = useHistory();
    const checkToken = () => {
        console.log("checkToken");
        if (localStorage.getItem('access_token') === null) {
            history.push('/signin')
        }
    }
    useEffect(() => {
        getMovieTypeAPI(async (res) => {
            console.log("🚀 ~ file: index.js ~ line 260 ~ getMovieType ~ res", res.data)
            if (res.status == 200) {
                dispatch(setMovieTypes(res.data))
            }
        });

    }, [dispatch])
    return (
        <Router>
            <div >
                <Switch>

                    {/* Sign In */}
                    <Route path="/signin">
                        <SignIn />
                    </Route>

                    {/* Watch Video Player */}
                    <Route path="/watch">
                        <VideoPlayer />
                    </Route>

                    {/* Watch Video In Group */}
                    <Route path="/watchgroup/:idgroup">
                        <GroupStreaming socket={socket} />
                    </Route>

                    {/* Sign Up */}
                    <Route path="/signup">
                        <div className="App">
                            <SignUpNavigationBar />
                            <Switch>
                                {/* Step 1 */}
                                <Route path="/signup/registration">
                                    <Registration />
                                </Route>
                                {/* Step 1.1 */}
                                <Route path="/signup/registrationform">
                                    <RegistrationForm />
                                </Route>
                                {/* Step 2 */}
                                <Route path="/signup/chooseplan">
                                    <SignUp />
                                </Route>
                                {/* Step 3 */}
                                <Route path="/signup/chooseplanform">
                                    <PlanForm />
                                </Route>
                                {/* Step 4 */}
                                <Route path="/signup/languagesetup">
                                    <LanguageSetup />
                                </Route>
                                {/* Step 5 */}
                                <Route path="/signup/choosemovies">
                                    <OnboardingMovies />
                                </Route>
                            </Switch>
                        </div>
                    </Route>

                    <Route path="/profile">
                        <AccountProfile />
                    </Route>

                    {localStorage.getItem('refresh_token') === null ?
                        <Redirect
                            to={{
                                pathname: "/signin",
                            }}
                        />
                        :
                        <Route path="/">
                            <Switch>
                                <Route exact path="/playlist" component={MyPlaylistPage} />
                                <Route exact path="/movies/:idGenre" component={MoviesPage} />
                                <Route exact path="/popular" component={PopularPage} />
                                <Route exact path='/home' component={Homepage} />
                                
                                <Route exact path='/detail/:idMovie' component={PreviewPopup} />
                                <Route exact path='/search' component={SearchPage} />
                                <Route component={ErrorPage} />
                            </Switch>


                        </Route>
                    }

                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </Router>
    );
}

