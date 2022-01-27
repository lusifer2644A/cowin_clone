import React, { Fragment, useEffect } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Footer from "./components/layouts/Footer";

import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import OTP from "./components/auth/otp";

import Alert from "./components/layouts/Alert";

//REDUX
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard/Dashboard";
import { loadUser, logout } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import NotFound from "./components/auth/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import MemberForm from "./components/User/MemberForm";
import DoseForm from "./components/User/DoseForm";
import { loadMembersData } from "./actions/member";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(loadMembersData());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/auth" component={Register} />
                        <Route exact path="/otp" component={OTP} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute
                            exact
                            path="/addmember"
                            component={MemberForm}
                        />
                        <PrivateRoute
                            exact
                            path="/register-vaccination/member/:memberId/dose/:doseName"
                            component={DoseForm}
                        />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <Alert />
                    <Footer />
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
