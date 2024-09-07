import React from "react"
import Home from '../pages/Home/home';
import NotFound from '../components/NotFound/notFound';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../pages/Profile/profile';
import Login from '../pages/Login/login';
import Register from "../pages/Register/register";
import MaintenancePlanning from "../pages/MaintenancePlanning/maintenancePlanning";

import { Layout } from 'antd';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecordResidentEvents from "../pages/RecordResidentEvents/recordResidentEvents";
import ComplaintManagement from "../pages/ComplaintManagement/complaintManagement";
import EmergencyMaintenance from "../pages/EmergencyMaintenance/emergencyMaintenance";
import ChangePassword from "../pages/ChangePassword/changePassword";
import ResidenceRules from "../pages/ResidenceRules/residenceRules";

const RouterURL = withRouter(({ location }) => {

    const PrivateContainer = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout style={{ display: 'flex', justifyContent: 'center', flex: 'row' }}>
                    <Route exact path="/home">
                        <Home />
                    </Route>

                    <PrivateRoute exact path="/profile">
                        <Profile />
                    </PrivateRoute>

                    <PrivateRoute exact path="/maintenance-planning">
                        <MaintenancePlanning />
                    </PrivateRoute>

                    <PrivateRoute exact path="/residence-event">
                        <RecordResidentEvents />
                    </PrivateRoute>

                    <PrivateRoute exact path="/complaint-management">
                        <ComplaintManagement />
                    </PrivateRoute>

                    <PrivateRoute exact path="/change-password">
                        <ChangePassword />
                    </PrivateRoute>

                    <PrivateRoute exact path="/emergency">
                        <EmergencyMaintenance />
                    </PrivateRoute>

                    <PrivateRoute exact path="/residence-rules">
                        <ResidenceRules />
                    </PrivateRoute>

                </Layout>
            </Layout>
        </div>
    )

    const PublicContainer = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout style={{ display: 'flex', justifyContent: 'center', flex: 'row' }}>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Layout>
            </Layout>
        </div>
    )

    const LoginContainer = () => (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout style={{ display: 'flex' }}>
                    <PublicRoute exact path="/">
                        <Login />
                    </PublicRoute>
                    <PublicRoute exact path="/login">
                        <Login />
                    </PublicRoute>
                    <PublicRoute exact path="/register">
                        <Register />
                    </PublicRoute>
                </Layout>
            </Layout>
        </div>
    )

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <PublicContainer />
                    </Route>

                    <Route exact path="/contact">
                        <PublicContainer />
                    </Route>

                    <Route exact path="/login">
                        <LoginContainer />
                    </Route>

                    <Route exact path="/register">
                        <LoginContainer />
                    </Route>
                    
                    <Route exact path="/residence-event">
                        <PrivateContainer />
                    </Route>

                    <Route exact path="/maintenance-planning">
                        <PrivateContainer />
                    </Route>

                    <Route exact path="/home">
                        <PrivateContainer />
                    </Route>

                    <Route exact path="/profile">
                        <PrivateContainer />
                    </Route>

                    <Route exact path="/complaint-management">
                        <PrivateContainer />
                    </Route>

                    <Route exact path="/change-password">
                        <PrivateContainer />
                    </Route>
                    
                    <Route exact path="/emergency">
                        <PrivateContainer />
                    </Route>

                    <Route exact path="/residence-rules">
                        <PrivateContainer />
                    </Route>

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
})

export default RouterURL;
