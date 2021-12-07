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

import { ForgotPassword, PlanForm, Registration, RegistrationForm, SignUp, SignIn, GroupStreaming, ChooseTypeStart, AccountProfile, OnboardingMovies, VideoPlayer, Homepage, MyPlaylistPage, PopularPage, MoviesPage, SearchPage, ErrorPage } from "./views/index";
import { getMovieTypeAPI } from "./services/api/movie";
import { useDispatch } from "react-redux";
import { setMovieTypes } from "./services/redux/actions";
import { useSelector } from "react-redux";

// import {socket} from "./services/socket/socket"

//const socket = io.connect('http://localhost:8000');
// const socket = io("localhost:8000", { transports: ["websocket"] });
function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => localStorage.getItem('access_token') !== null
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />}
        />
    )
}

export default function WebRouter() {
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await getMovieTypeAPI(localStorage.getItem('access_token'))
        if (response.status === 200) {
            let data = await response.json()
            dispatch(setMovieTypes(data))
        }


    }, [dispatch])
    return (
        <Router>

            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => {
                        return localStorage.getItem('access_token') !== null ? <Redirect to='/home' /> : <Redirect to='/signin' />
                    }}
                />                
                <Route path="/signin" component={SignIn} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/signup/registration" component={Registration} />
                <Route path="/signup/registrationform" component={RegistrationForm} />
                <Route path="/profile" component={AccountProfile} />
                <Route path="/choosetype" component={ChooseTypeStart} />
                <Route path="/choosemovies" component={OnboardingMovies} />
                <PrivateRoute exact path="/playlist" component={MyPlaylistPage} />
                <PrivateRoute exact path="/movies/:idGenre" component={MoviesPage} />
                <PrivateRoute exact path="/popular" component={PopularPage} />
                <PrivateRoute exact path='/home' component={Homepage} />
                <PrivateRoute exact path='/detail/:idMovie' component={PreviewPopup} />
                <PrivateRoute exact path='/search' component={SearchPage} />
                <PrivateRoute path="/watch" component={VideoPlayer} />
                <PrivateRoute path="/watchgroup/:idgroup" component={GroupStreaming} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    );
}

