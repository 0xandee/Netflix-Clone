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

import { ForgotPassword, PlanForm, Registration, RegistrationForm, SignUp, SignIn, GroupStreaming, LanguageSetup, AccountProfile, OnboardingMovies, VideoPlayer, Homepage, MyPlaylist, PopularPage, MoviesPage } from "./views/index";
import { getMovieTypeAPI } from "./services/api/movie";
import { useDispatch } from "react-redux";
import { setMovieTypes } from "./services/redux/actions";
import { useSelector } from "react-redux";

//const socket = io.connect('http://localhost:8000');
const socket = io("localhost:8000", { transports: ["websocket"] });
export default function WebRouter() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        getMovieTypeAPI(async (res) => {
            console.log("🚀 ~ file: index.js ~ line 260 ~ getMovieType ~ res", res.data)
            if (res.status == 200) {
                dispatch(setMovieTypes(res.data))

            }
        });
    }, [])
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
                                    <ChoosePlan />
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

                    {/* Profile Setting */}
                    <Route path="/profile">
                        <AccountProfile />
                    </Route>

                    {/* <Route path="/regform">
                        <RegistrationForm />
                    </Route> */}

                    <Route path="/">
                        {/* <NavigationBar /> */}
                        <Switch>
                            <Route path="/tvshow" component={TVShow}>
                                <NavigationBar />
                                <TVShow />
                            </Route>

                            <Route path="/playlist" component={MyPlaylist}>
                                <NavigationBar />
                                <MyPlaylist />
                            </Route>

                            <Route path="/movies/:idGenre" component={MoviesPage}>
                                <NavigationBar />
                                <MoviesPage />
                            </Route>

                            <Route path="/popular" component={PopularPage}>
                                <NavigationBar />
                                <PopularPage />
                            </Route>

                            <Route path='/home' component={Homepage}>
                                <NavigationBar />
                                <Home />
                            </Route>

                        </Switch>
                        <Route path='/detail/:idMovie' component={PreviewPopup} >
                            {/* <NavigationBar /> */}
                            {/* <PreviewPopup /> */}
                        </Route>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

function ChoosePlan() {
    return <SignUp />;
}

function Home() {
    return <Homepage />;
}

function TVShow() {
    return <Homepage />;
}
// function MyPlaylist() {
//     return <MyPlaylist />;
// }


function NewAndPopular() {
    return <h2>NewAndPopular</h2>;
}
function Profile1() {
    return <h2>Profile1</h2>;
}
function Profile2() {
    return <h2>Profile1</h2>;
}


// function Topics() {
//     let match = useRouteMatch();

//     return (
//         <div>
//             <h2>Topics</h2>
//             <ul>
//                 <li>
//                     <Link to={`${match.url}/components`}>Components</Link>
//                 </li>
//                 <li>
//                     <Link to={`${match.url}/props-v-state`}>
//                         Props v. State
//                     </Link>
//                 </li>
//             </ul>

//             {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//             <Switch>
//                 <Route path={`${match.path}/:topicId`}>
//                     <Topic />
//                 </Route>
//                 <Route path={match.path}>
//                     <h3>Please select a topic.</h3>
//                 </Route>
//             </Switch>
//         </div>
//     );
// }

// function Topic() {
//     let { topicId } = useParams();
//     return <h3>Requested topic ID: {topicId}</h3>;
// }