import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Logo from '@assets/Shift2go.svg';
import UnderLine from '@assets/UnderLine.svg';
import { DashboardContainer } from './styles';
import LogoIcon from '@assets/dashboard/logoIcon.svg';
import { BsFillBellFill, BsArrowLeft, BsList } from 'react-icons/bs';

import ShiftsBoard from '../shifts/index';
import FavoritesBoard from '../favourites/index';
import BillingBoard from '../billings/index';
import HomeBoard from './pages/home';
import SettingsBoard from './pages/settings';
import HelpBoard from './pages/help';
import LogoutBoard from './pages/logout';
import AllNotifications from './pages/allnotifications';

import SideBar from '@components/home/SideBar';
import { useLocation, Link } from 'react-router-dom';
import avatar from '../../../assets/icons/hotavatar.png';
import { baseUrl } from '@utils/helpers';
import NotificationsBox from './pages/notifications';

export const index = () => {
  const [currentPage, setCurrentPage] = React.useState('/dashboard/home');
  const history = useLocation();
  React.useEffect(() => {
    // setCurrentPage(history.hash.replace('#', ''));
  }, [history.hash]);

  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    console.log('toggle');
    setSideBar(!sideBar);
  };

  const getPage = (page: string) => {
    switch (page) {
      case 'home':
        return <HomeBoard />;
      case 'shifts':
        return <ShiftsBoard />;
      case 'favorites':
        return <FavoritesBoard />;
      case 'billing':
        return <BillingBoard />;
      case 'settings':
        return <SettingsBoard />;
      case 'help':
        return <HelpBoard />;
      case 'all-notifications':
        return <AllNotifications />;
      case 'logout':
        return <LogoutBoard />;
      default:
        return <HomeBoard />;
    }
  };

  const [notificationBox, setNotificationBox] = useState(false);
  const [notifList, setNotifList] = useState([]);
  const [notifPage, setNotifPage] = useState(1);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [profile, setProfile] = useState(null);

  const getAllNotifs = (token) => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    fetch(baseUrl + `/v1/notifications?page=${notifPage}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        setNotifList(JSON.parse(result));
      })
      .catch((error) => {
        console.log('error', error);
        setApiErrorMessage('Something went wrong, pls try again');

        setTimeout(() => {
          setApiErrorMessage('');
        }, 4000);
      });
  };

  const getProfile = () => {
    let localToken = localStorage.getItem('token');

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + localToken);

    fetch(baseUrl + '/v1/manager/me', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        const profile = JSON.parse(result);

        setProfile(profile);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    let localToken = localStorage.getItem('token');

    getAllNotifs(localToken);
    getProfile();
  }, []);

  return (
    <DashboardContainer className="relative h-full w-full flex">
      <div
        className={`absolute inset-y-0 left-0 transform
			${sideBar ? '' : '-translate-x-full'} transition 
			duration-200 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="w-72 bg-blue-600 h-full flex flex-col py-12">
          <div className="w-full flex flex-row items-center justify-center logoHolder">
            <img src={LogoIcon} className="w-10 h-10 logo mr-2" />

            <h1 className="text-xl font-bold text-white">Shift2go</h1>
          </div>

          <SideBar active={currentPage} setPage={setCurrentPage} />
        </div>
      </div>

      <div
        className={`flex-1 bg-gray-50 top-div ${
          sideBar ? 'overflow-hidden' : ''
        }`}
      >
        <div className="md:p-6 p-6 h-full overflow-scroll">
          <div className="nav">
            <div className="flex justify-end">
              <div className="flex items-center">
                <BsFillBellFill className="mr-8" />

                <p className="font-semibold mb-0 mr-3">Admin</p>
                <img src={avatar} alt="avatar" className="w-12 h-12 mr-8" />

                <BsList
                  className="block lg:hidden w-7 h-7"
                  onClick={toggleSideBar}
                />
              </div>
            </div>
          </div>

          {getPage(currentPage)}
        </div>
      </div>
    </DashboardContainer>

    // <DashboardContainer className="w-full h-full grid grid-cols-5">
    //   <div className="flex flex-col col-span-1 left bg-blue-600 w-full overflow-scroll">
    //     <Link to={`#home`}>
    //       <div className="w-full flex flex-row items-center justify-center logoHolder">
    //         <img src={LogoIcon} className="w-10 h-10 logo mr-2" />
    //
    //         <h1 className="text-xl font-bold text-white">Shift2go</h1>
    //       </div>
    //     </Link>
    //
    //     <SideBar active={currentPage} setPage={setCurrentPage} />
    //   </div>
    //
    //   <div className="h-full justify-center items-center col-span-4 bg-white">
    //     <div className="flex flex-row-reverse items-center w-full mainNav pt-6 pr-6">
    //       <img className="w-12 h-12 rounded-full mx-4" src={avatar} />
    //       <h1 className="topName">{profile && profile.hotels ? profile.hotels[0]?.name : ''}</h1>
    //
    //       <div className="relative">
    //         <BsFillBellFill
    //           className="mr-4"
    //           onClick={() => setNotificationBox(!notificationBox)}
    //         />
    //         {notificationBox ? (
    //           <NotificationsBox
    //             setPage={setCurrentPage}
    //             setNotif={setNotificationBox}
    //           />
    //         ) : null}
    //       </div>
    //     </div>
    //
    //     {getPage(currentPage)}
    //   </div>
    // </DashboardContainer>
  );
};

export const Layout = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState('home');

  const [notificationBox, setNotificationBox] = useState(false);
  const [notifList, setNotifList] = useState([]);
  const [notifPage, setNotifPage] = useState(1);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [profile, setProfile] = useState(null);

  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    console.log('toggle');
    setSideBar(!sideBar);
  };

  const getAllNotifs = (token) => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    fetch(baseUrl + `/v1/notifications?page=${notifPage}`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        setNotifList(JSON.parse(result));
      })
      .catch((error) => {
        console.log('error', error);
        setApiErrorMessage('Something went wrong, pls try again');

        setTimeout(() => {
          setApiErrorMessage('');
        }, 4000);
      });
  };

  const getProfile = () => {
    let localToken = localStorage.getItem('token');

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + localToken);

    fetch(baseUrl + '/v1/manager/me', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        const profile = JSON.parse(result);

        setProfile(profile);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    let localToken = localStorage.getItem('token');

    getAllNotifs(localToken);
    getProfile();
  }, []);

  return (
    <DashboardContainer className="relative h-full w-full flex">
      <div
        className={`absolute inset-y-0 left-0 transform
			${sideBar ? '' : '-translate-x-full'} transition 
			duration-200 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="w-72 bg-blue-600 h-full flex flex-col py-12">
          <div
            className="w-full flex flex-row items-center justify-center
              logoHolder"
          >
            <img src={LogoIcon} className="w-10 h-10 logo mr-2" />

            <h1 className="text-xl font-bold text-white">Shift2go</h1>
          </div>

          <SideBar active={currentPage} setPage={setCurrentPage} />
        </div>
      </div>

      <div
        className={`flex-1 bg-gray-50 top-div ${
          sideBar ? 'overflow-hidden' : ''
        }`}
      >
        <div className="md:p-6 p-6 h-full overflow-scroll">
          <div className="nav">
            <div className="flex justify-end">
              <div className="flex items-center">
                <BsFillBellFill className="mr-8" />

                <p className="font-semibold mb-0 mr-3">Admin</p>
                <img src={avatar} alt="avatar" className="w-12 h-12 mr-8" />

                <BsList
                  className="block lg:hidden w-7 h-7"
                  onClick={toggleSideBar}
                />
              </div>
            </div>
          </div>
          {children}{' '}
        </div>
      </div>
    </DashboardContainer>

    // <DashboardContainer className="w-full h-full grid grid-cols-5">
    //   <div className="flex flex-col col-span-1 left bg-blue-600 w-full overflow-scroll">
    //     <Link to={`#home`}>
    //       <div className="w-full flex flex-row items-center justify-center logoHolder">
    //         <img src={LogoIcon} className="w-10 h-10 logo mr-2" />
    //
    //         <h1 className="text-xl font-bold text-white">Shift2go</h1>
    //       </div>
    //     </Link>
    //
    //     <SideBar active={currentPage} setPage={setCurrentPage} />
    //   </div>
    //
    //   <div className="h-full justify-center items-center col-span-4 bg-white">
    //     <div className="flex flex-row-reverse items-center w-full mainNav pt-6 pr-6">
    //       <img className="w-12 h-12 rounded-full mx-4" src={avatar} />
    //       <h1 className="topName">{profile ? profile?.hotels[0]?.name : ''}</h1>
    //
    //       <div className="relative">
    //         <BsFillBellFill
    //           className="mr-4"
    //           onClick={() => setNotificationBox(!notificationBox)}
    //         />
    //         {notificationBox ? (
    //           <NotificationsBox
    //             setPage={setCurrentPage}
    //             setNotif={setNotificationBox}
    //           />
    //         ) : null}
    //       </div>
    //     </div>
    //     {children}{' '}
    //   </div>
    // </DashboardContainer>
  );
};
const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
