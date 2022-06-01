//create react router configuration for app
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Layout } from '@pages/home/dashboard';
const Login = React.lazy(() => import('@pages/home/login'));
const Signup = React.lazy(() => import('@pages/home/signup'));
const Notifications = React.lazy(
  () => import('@pages/home/dashboard/pages/allnotifications')
);
const Dashboard = React.lazy(() => import('@pages/home/dashboard'));
const AdminDashboard = React.lazy(() => import('@pages/admin/dashboard'));
import { Reset, SetPassword, Verification, VerifyEmail } from '@pages/home/login/components';
import { PrivateRoute } from './authenticate';
import ManagerShiftsBoard from '../pages/home/shifts/index';
import ManagerFavoritesBoard from '../pages/home/favourites/index';
import ManagerBillingBoard from '../pages/home/billings/index';
import ManagerHomeBoard from '../pages/home/dashboard/pages/home';
import ManagerSettingsBoard from '../pages/home/dashboard/pages/settings';
import ManagerHelpBoard from '../pages/home/dashboard/pages/help';
import ManagerLogoutBoard from '../pages/home/dashboard/pages/logout';
import ManagerAllNotifications from '../pages/home/dashboard/pages/allnotifications';
import { useRouteMatch } from 'react-router-dom';
//admin screens

import HomeBoard from '../pages/admin/dashboard/pages/home';
import ContractorsBoard from '@pages/admin/dashboard/pages/contractors';
import HotelsBoard from '@pages/admin/dashboard/pages/hotels';
import LogoutBoard from '@pages/admin/dashboard/pages/logout';
import BillingBoard from '@pages/admin/billings';
import { MoreBillingInfo } from '@pages/admin/billings/components';
import {
  ShiftsBoard,
  FavoritesBoard,
  SettingsBoard,
  HelpBoard,
} from '@pages/admin/dashboard/components';
import JobRolesBoard from '@pages/admin/jobRole';
import CertificatesBoard from '@pages/admin/certificates';
import { AdminDashboardLayout, index } from '@pages/admin/dashboard';
const ManagerRoutes = ({ url }) => {
  // console.log(url);
  return (
    <Switch>
      <Route path={`${url}/favorites`} component={ManagerFavoritesBoard} />
      <Route path={`${url}/shifts`} component={ManagerShiftsBoard} />
      <Route path={`${url}/billing`} component={ManagerBillingBoard} />
      <Route path={`${url}/settings`} component={ManagerSettingsBoard} />
      <Route path={`${url}/logout`} component={ManagerLogoutBoard} />
      <Route path={`${url}/help`} component={ManagerHelpBoard} />
      <Route
        path={`${url}/all-notifications`}
        component={ManagerAllNotifications}
      />
      <Route path={`${url}/home`} component={ManagerHomeBoard} />
      <Route path={`${url}/`} exact component={ManagerHomeBoard} />
    </Switch>
  );
};
const AdminRoutes = ({ url }) => {
  // console.log('url', url);
  return (
    <Switch>
      <Route path={`${url}/favorites`} component={FavoritesBoard} />
      <Route path={`${url}/hotels`} component={HotelsBoard} />
      <Route path={`${url}/shifts`} component={ShiftsBoard} />
      <Route path={`${url}/billing`} component={BillingBoard} />
      <Route path={`${url}/settings`} component={SettingsBoard} />
      <Route path={`${url}/logout`} component={LogoutBoard} />
      <Route path={`${url}/help`} component={HelpBoard} />
      <Route path={`${url}/contractors`} component={ContractorsBoard} />
      <Route path={`${url}/job role`} component={JobRolesBoard} />
      <Route path={`${url}/certificates`} component={CertificatesBoard} />
      <Route path={`${url}/more-info`} component={MoreBillingInfo} />

      <Route path={`${url}/home`} component={HomeBoard} />
      <Route path={`${url}/`} exact component={HomeBoard} />
    </Switch>
  );
};
const MainApp = () => {
  const match = useRouteMatch();
  // console.log('match ', match);
  return (
    <AdminDashboardLayout admin={false}>
      <ManagerRoutes url={match.url} />
    </AdminDashboardLayout>
  );
};
const AdminApp = () => {
  const match = useRouteMatch();
  return (
    <AdminDashboardLayout admin={true}>
      <AdminRoutes url={match.url} />
    </AdminDashboardLayout>
  );
};
const AppRoutes = () => {
  return (
    <Router>
      <div
        className="flex flex-col h-auto sm:h-screen w-screen
		justify-center items-center mainPage"
      >
        <Suspense fallback={
							<div style={{height: '100vh'}} className="w-full h-full flex justify-center items-center">
                <ClipLoader size={36} color={'#0c77f8'} loading={true}/>
              </div>
        }>
          <Switch>
            <PrivateRoute
              path="/admin"
              authorized={['ADMIN']}
              component={AdminApp}
            />

            <PrivateRoute
              authorized={['MANAGER']}
              path="/dashboard"
              component={MainApp}
            />

            <Route exact path="/signup" component={Signup} />
            <Route exact path="/reset-otp" component={Verification} />
            <Route exact path="/reset-password" component={SetPassword} />
            <Route exact path="/verify-email" component={VerifyEmail} />
            {/* <Route exact path="/reset" component={Reset} /> */}

            <Route path="/login" component={Login} exact />
            <Route path="/" component={Login} exact />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default AppRoutes;
