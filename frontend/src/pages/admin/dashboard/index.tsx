import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Logo from '@assets/Shift2go.svg';
import UnderLine from '@assets/UnderLine.svg';
import { DashboardContainer } from './styles';
import LogoIcon from '@assets/dashboard/logoIcon.svg';
import { BsFillBellFill, BsList } from 'react-icons/bs';
import {
  ShiftsBoard,
  FavoritesBoard,
  SettingsBoard,
  HelpBoard,
} from './components';
import HomeBoard from './pages/home';
import ContractorsBoard from './pages/contractors';
import HotelsBoard from './pages/hotels';
import LogoutBoard from './pages/logout';

import SideBar from '@components/home/SideBar';
import { useLocation } from 'react-router-dom';
import BillingBoard from '../billings/index';
import JobRolesBoard from '../jobRole/index';
import { MoreBillingInfo } from '../billings/components';
import avatar from '@assets/icons/admin.png';

export const index = () => {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [notificationBox, setNotificationBox] = useState(false);
  const [notifList, setNotifList] = useState([]);
  const [thisUser, setThisUser] = useState(null)

  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    console.log('toggle');
    setSideBar(!sideBar);
  };

  const history = useLocation();
  React.useEffect(() => {
    setCurrentPage(history.hash.replace('#', ''));
  }, [history.hash]);
  const getPage = (page: string) => {
    switch (page) {
      case 'home':
        return <HomeBoard />;
      case 'contractors':
        return <ContractorsBoard />;
      case 'hotels':
        return <HotelsBoard />;
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
      case `job role`:
        return <JobRolesBoard />;
      case 'more-info':
        return <MoreBillingInfo />;
      case 'logout':
        return <LogoutBoard />;
      default:
        return <HomeBoard />;
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    setThisUser(user)
  }, [])

  return (
    <DashboardContainer className="relative h-full w-full flex">
      <div
        className={`absolute inset-y-0 left-0 transform
			${sideBar ? '' : '-translate-x-full'} transition 
			duration-200 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="w-72 bg-gray-900 h-full flex flex-col py-12">
          <div
            className="w-full flex flex-row items-center justify-center
              logoHolder"
          >
            <img src={LogoIcon} className="w-10 h-10 logo mr-2" />

            <h1 className="text-xl font-bold text-white">Shift2go</h1>
          </div>

          <SideBar
            active={currentPage}
            admin
            setPage={setCurrentPage}
            open={sideBar}
            ToggleDrawer={toggleSideBar}
          />
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

                <p className="font-semibold mb-0 mr-3">{thisUser && thisUser.lastname ? thisUser.lastname : ''}</p>
                <img src={avatar} alt="avatar" className="w-9 h-9 mr-8" />

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

    // <DashboardContainer className="w-full overflow-hidden
    // 	h-full grid grid-cols-5"
    // >
    // <div
    // 	className="flex flex-col col-span-1 left bg-gray-900
    // 		h-full w-full"
    // >
    // 	<div className="w-full flex flex-row items-center
    // 	justify-center logoHolder">
    // 	<img src={LogoIcon} className="w-10 h-10 logo mr-2" />
    // 	<h1 className="text-xl font-bold text-white">Shift2go</h1>
    // 	</div>
    // 	<SideBar active={currentPage} admin setPage={setCurrentPage} />

    // </div>
    // <div className="col-span-4 bg-white overflow-scroll" >
    // 	<div className="flex flex-row items-center w-full justify-end px-2 h-20">

    // 		<div className="flex flex-row-reverse items-center w-full mainNav pt-6 pr-6">
    // 			<img className="w-12 h-12 rounded-full" src={avatar}/>

    // 			<h1 className="topName mx-3">Admin</h1>

    // 			<div className="relative">
    // 				<BsFillBellFill className="mr-4" onClick={() => setNotificationBox(!notificationBox)}/>

    // 				{
    // 					notificationBox ?
    // 						<div className="absolute top-8 right-1 bg-gray-100 rounded-lg px-6 py-8 w-96 notify-box shadow">
    // 							<div className="flex items-center justify-between mb-2">
    // 								<p className="font-bold">Notifications</p>
    // 							</div>

    // 							<hr />

    // 							{
    // 								notifList && notifList.length ?
    // 									notifList.map((item) => {
    // 										return (
    // 											<div className="flex items-center justify-between
    // 											my-4 pb-3 border-b border-gray-200" key={item.id}>
    // 												<div className="flex items-center mr-3">
    // 													<div className="bg-yellow-400 rounded-full w-12 h-12 mr-2
    // 														flex items-center justify-center font-medium text-lg no-wrap">
    // 															A
    // 													</div>

    // 													<div>
    // 														<p className='font-medium text-sm'>{item.title}</p>
    // 														<p className="text-xs">{item.message}</p>
    // 													</div>
    // 												</div>

    // 												<p className="text-gray-400 font-semibold text-xs no-wrap">5 min ago</p>
    // 											</div>
    // 										)

    // 									})
    // 								:
    // 								<p className="text-center text-gray-500 font-medium">No new notifications</p>
    // 							}

    // 						</div>
    // 					:
    // 					null
    // 				}
    // 			</div>
    // 		</div>
    // 	</div>
    // 	{getPage(currentPage)}
    // </div>
    // </DashboardContainer>
  );
};

export const AdminDashboardLayout = ({ children, admin }) => {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [notificationBox, setNotificationBox] = useState(false);
  const [notifList, setNotifList] = useState([]);
  const [thisUser, setThisUser] = useState(null)

  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => {
    console.log('toggle');
    setSideBar(!sideBar);
  };

  const history = useLocation();
  // React.useEffect(() => {
  //   //  setCurrentPage(history.hash.replace('#', ''));
  // }, [history.hash]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    setThisUser(user)
  }, [])

  return (
    <DashboardContainer className=" h-full w-full flex">
      <div
        className={`absolute inset-y-0 left-0 transform
			${sideBar ? '' : '-translate-x-full'} transition 
			duration-200 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div
          style={{ zIndex: 1000, height: '100vh' }}
          className={`lg:w-72  h-full flex flex-col  py-12 bg-opacity-100 overflow-scroll ${
            admin === true ? 'bg-gray-900' : 'bg-blue-600'
          }`}
        >
          <div
            className="w-full flex flex-row items-center justify-center
              logoHolder"
          >
            <img src={LogoIcon} className="w-10 h-10 logo mr-2" />

            <h1 className="text-xl font-bold text-white">Shift2go</h1>
          </div>

          <SideBar
            active={currentPage}
            admin={admin}
            setPage={setCurrentPage}
            open={sideBar}
            ToggleDrawer={toggleSideBar}
          />
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

                {
                  admin === true ?
                      <p className="font-semibold mb-0 mr-3">Admin</p>
                    :
                      <p className="font-semibold mb-0 mr-3">{thisUser && thisUser.owner ? thisUser.owner.firstname : ''}</p>
                }

                <img src={avatar} alt="avatar" className="w-9 h-9 mr-8" />

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
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
