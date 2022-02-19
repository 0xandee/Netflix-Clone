import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import '../App.css'
import { ErrorPage } from "../views/index";

import { Routes, DefaultRoute } from "./routes";
import { getToken } from "../services/function";
import { IconNetflix } from "../assets/Icon";

const LoadingRoute = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
            <div className="text-danger" style={{ height: '20vh', width: '10vh', borderWidth: '15px', fill: 'red' }} role="status" >
                <IconNetflix />
            </div>
        </div>

    )
}

const FinalRoute = (props) => {
    const route = props.route
    if (route.meta === undefined && getToken() === null) {
        console.log("1")
        return <Redirect to='/signin' />

    }
    // else if (route.meta === undefined && getToken() != null && localStorage.getItem('new_user') == 'true') {
    //     console.log("12")
    //     return <Redirect to='/choosetype' />
    // }
    // else if (route.meta && route.meta.authRoute && getToken() != null && localStorage.getItem('new_user') == 'false') {
    //     console.log("13")
    //     return <Redirect to='/' />
    // }
    console.log("14")
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
                        return getToken() !== null ? <Redirect to={DefaultRoute} /> : <Redirect to='/signin' />
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
                <Route component={ErrorPage} />
            </Switch>

        </Router >
    );
}

