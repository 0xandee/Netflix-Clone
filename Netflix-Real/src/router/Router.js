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
import { ErrorPage } from "../views/index";

import { Routes, DefaultRoute } from "./routes";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

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
    console.log("🚀 ~ file: Router.js ~ line 37 ~ FinalRoute ~ route", route)
    // ** Assign vars based on route meta
    console.log("🚀 ~ file: Router.js ~ line 40 ~ FinalRoute ~ read_cookie('access_token')", read_cookie('access_token'))

    if (route.meta === undefined && read_cookie('access_token').length == 0  ) {
        return <Redirect to='/signin' />

    } else if (route.meta && route.meta.authRoute &&  read_cookie('access_token').length && !read_cookie('new_user')) {
        return <Redirect to='/' />
    }
    return <route.component {...props} />
        
}

export default function WebRouter() {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => {
                        return read_cookie('access_token') !== null ? <Redirect to={DefaultRoute} /> : <Redirect to='/signin' />
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

