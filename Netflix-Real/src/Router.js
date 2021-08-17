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
import { Slider, NavBar, NavigationBar, SignUpNavigationBar, PreviewInfo, PreviewPopup } from "./components/index";

import { ForgotPassword, PlanForm, Registration, RegistrationForm, SignUp, SignIn, LanguageSetup, OnboardingMovies, VideoPlayer, Homepage, MyPlaylist, PopularPage } from "./views/index";


export default function WebRouter() {
    const history = useHistory();
    return (
        <Router>
            <div >
                <Switch>
                    <Route path="/signin">
                        {/* <SignIn /> */}
                        {/* <LanguageSetup /> */}
                        {/* <ForgotPassword /> */}
                    </Route>

                    <Route path="/watch">
                        <VideoPlayer />
                    </Route>

                    <Route path="/signup">
                        <div className="App">
                            <SignUpNavigationBar />
                            <Switch>
                                <Route path="/signup/registration">
                                    {/* Step 1 */}
                                    <Registration />
                                </Route>
                                <Route path="/signup/registrationform">
                                    {/* Step 1.1 */}
                                    <RegistrationForm />
                                </Route>
                                <Route path="/signup/chooseplan">
                                    {/* Step 2 */}
                                    <ChoosePlan />
                                </Route>
                                <Route path="/signup/chooseplanform">
                                    {/* Step 3 */}
                                    <PlanForm />
                                </Route>
                                <Route path="/signup/languagesetup">
                                    {/* Step 4 */}
                                    <LanguageSetup />
                                </Route>
                                <Route path="/signup/choosemovies">
                                    {/* Step 5 */}
                                    <OnboardingMovies />
                                </Route>
                            </Switch>
                        </div>

                    </Route>

                    <Route path="/profile">
                        <Profile1 />
                    </Route>
                    <Route path="/regform">
                        <RegistrationForm />
                    </Route>
                    <Route path="/">

                        <NavigationBar />
                        <Redirect to="/home" />

                        <Switch>
                            <Route path="/tvshow">
                                <TVShow />
                            </Route>
                            <Route path="/playlist">
                                <MyPlaylist />
                            </Route>
                            <Route path="/movies">
                                <Movies />
                            </Route>
                            <Route path="/popular">
                                <PopularPage/>
                            </Route>
                            <Route path='/home' component={Homepage}>
                                {/* <Home /> */}
                            </Route>
                            <Route path="/registration">
                                <Registration />
                            </Route>


                        </Switch>
                        <Route path = '/' component = {PreviewPopup} />

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

function Movies() {
    return <Homepage />;
}
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