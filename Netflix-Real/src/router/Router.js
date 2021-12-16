import React, { Suspense, useEffect, useRef, useState } from "react";
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

import '../App.css'
import io from "socket.io-client";
import { Slider, NavBar, NavigationBar, SignUpNavigationBar, PreviewInfo, PreviewPopup } from "../components/index";

import { ForgotPassword, PlanForm, Registration, RegistrationForm, SignUp, SignIn, GroupStreaming, ChooseTypeStart, AccountProfile, OnboardingMovies, VideoPlayer, Homepage, MyPlaylistPage, PopularPage, MoviesPage, SearchPage, ErrorPage } from "../views/index";
import { getMovieTypeAPI } from "../services/api/movie";
import { useDispatch } from "react-redux";
import { setMovieTypes } from "../services/redux/actions";
import { useSelector } from "react-redux";
import { Routes, DefaultRoute } from "./routes";
import { Spinner } from "reactstrap";

// import {socket} from "./services/socket/socket"

//const socket = io.connect('http://localhost:8000');
// const socket = io("localhost:8000", { transports: ["websocket"] });

const LoadingRoute = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
            <div class="spinner-border  text-danger" style={{ height: '10vh', width: '10vh', borderWidth:'15px'}} role="status" />

        </div>

    )
}

const FinalRoute = (props) => {

    const route = props.route
    console.log("🚀 ~ file: Router.js ~ line 58 ~ FinalRoute ~ route", route)
    // ** Assign vars based on route meta
    if (localStorage.getItem('access_token') == null && route.meta === undefined) {
        return <Redirect to='/signin' />

    } else if (route.meta && route.meta.authRoute && localStorage.getItem('access_token') != null) {
        return <Redirect to='/' />
    }
    return <route.component {...props} >
        Loading routes
    </route.component>
}

export default function WebRouter() {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => {
                        return localStorage.getItem('access_token') !== null ? <Redirect to={DefaultRoute} /> : <Redirect to='/signin' />
                    }}
                />
                {Routes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact === true}
                        render={props => {
                            return (
                                <Suspense fallback={<LoadingRoute />}>
                                    <FinalRoute route={route} {...props} />
                                </Suspense>
                            )
                        }}
                    />
                )}

                {/* <Route path="/signin" component={SignIn} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/signup/registration" component={Registration} />
                <Route path="/signup/registrationform" component={RegistrationForm} />
                <Route path="/choosetype" component={ChooseTypeStart} />
                <Route path="/choosemovies" component={OnboardingMovies} />
                <PrivateRoute exact path="/playlist" component={MyPlaylistPage} />
                <PrivateRoute exact path="/movies/:idGenre" component={MoviesPage} />
                <PrivateRoute exact path="/popular" component={PopularPage} />
                <Route exact path='/home' component={Homepage} />
                <PrivateRoute exact path='/detail/:idMovie' component={PreviewPopup} />
                <PrivateRoute exact path='/search' component={SearchPage} />
                <PrivateRoute path="/watch" component={VideoPlayer} />
                <PrivateRoute path="/watchgroup/:idgroup" component={GroupStreaming} />
                <Route path="/profile" component={AccountProfile} /> */}
                <Route component={ErrorPage} />
            </Switch>

        </Router >
    );
}

