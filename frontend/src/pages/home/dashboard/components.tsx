import React, { ReactElement, useEffect, useState } from 'react'
import Input from '@components/home/Input';
import Button from '@components/home/Button'
import { BsFillBellFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg'
import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg'
import Woman from '@assets/dashboard/help/woman.png'
import BlackMan from '@assets/dashboard/help/blackman.png'
import UnderLine from '@assets/UnderLine.svg';
import ForwardIcon from '@assets/dashboard/icons/Forward.svg'
import { MdArrowForward } from 'react-icons/md'
import Dates from '@assets/dashboard/icons/DateSelect.svg'
import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg'
import Table from '@components/home/Table';
import NoDataTable from '@assets/dashboard/icons/NoDataTable.svg'
import NoFavorites from '@assets/dashboard/icons/NoFavorites.svg'
import NoBillings from '@assets/dashboard/icons/NoBillings.svg'

import loginIcon from '../../../assets/icons/Login.png'
import logoutIcon from '../../../assets/icons/Logout.png'
import shiftIcon from '../../../assets/icons/File.png'
import shift2Icon from '../../../assets/icons/Check.png'

import avatar from '../../../assets/icons/hotavatar.png'
import rating from '../../../assets/icons/rating.png'
import flag from '@assets/icons/usa.png';

import infoIcon from '../../../assets/icons/Shield.png'
import paymentIcon from '../../../assets/icons/Wallet.png'
import ratingIcon from '../../../assets/icons/Star.png'
import passwordIcon from '../../../assets/icons/Lock.png'
import notifIcon from '../../../assets/icons/Notification.png'

import infoIconActive from '../../../assets/icons/ShieldActive.png'
import paymentIconActive from '../../../assets/icons/WalletActive.png'
import ratingIconActive from '../../../assets/icons/StarActive.png'
import passwordIconActive from '../../../assets/icons/LockActive.png'
import notifIconActive from '../../../assets/icons/NotificationActive.png'

import str from '../../../assets/icons/str.png'
import badge from '../../../assets/icons/badge.png'
import edit from '../../../assets/icons/edit.png'

import starempty from '../../../assets/icons/starempty.png'
import starfull from '../../../assets/icons/starfull.png'

import clean from '../../../assets/icons/clean.png'
import goals from '../../../assets/icons/goals.png'
import service from '../../../assets/icons/service.png'
import amenity from '../../../assets/icons/amenity.png'
import { baseUrl, useMergeState } from '@utils/helpers';

import { BsArrowLeft, BsChevronLeft } from 'react-icons/bs'
import timely from '../../../assets/icons/time.png';
import team from '../../../assets/icons/team.png';
import knowledge from '../../../assets/icons/knowledge.png';
import dressing from '../../../assets/icons/dressing.png';

interface Props {

}

export const HomeBoard = () => {
    const [allShifts, setAllShifts] = useState([])
    const [homePage, setHomePage] = useState('home')
    const [shiftInfo, setShiftInfo] = useState(false)
    const [shiftReview, setShiftReview] = useState(false)

    let todayDate = new Date().toDateString();

    const getThisUser = () => {
        let localToken = localStorage.getItem('token')

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer '+localToken);

        fetch(baseUrl + "/v1/manager/me",
            {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            })
            .then(response => response.text())
            .then((result) => {
                // localStorage.setItem('user', result)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token')

        let ShiftProps = {
            page: 1,
            audience: 'MARKET',
            job_role_id: 1,
        }

        const getAllShifts = async() => {
            const endpoint = baseUrl + `/v1/shifts?page=${ShiftProps.page}&audience=${ShiftProps.audience}&job_role_id=${ShiftProps.job_role_id}`

            try {
                await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localToken}`,
                    },
                })
                    .then((res) => {
                        res.json().then(function(data) {
                            console.log(data);
                            setAllShifts(data)
                        });
                    })
            }
            catch (error) {
                console.log(error);
            }
        }

        getAllShifts()

        // getThisUser()

    }, [])

    return (
        <>
            {
                homePage === 'home' ?
                    <>
                        {
                            allShifts && allShifts.length ?
                                <div className='p-8'>
                                    <div className="w-full flex flex-row flex-wrap justify-between mb-4 mt-4">
                                        <h1 className="homeWelcome">
                                            Dashboard
                                            <img src={UnderLine} className="w-44"/>
                                        </h1>

                                        <div>
                                            <div>
                                                <p className="font-bold text-base">Today</p>

                                                <div className="bg-gray-100 rounded-2xl p-4 w-full">
                                                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                                                        <div className="flex items-center">
                                                            <div className="p-2 rounded-md mr-3" style={{backgroundColor: '#F1A19F'}}>
                                                                <img src={shiftIcon} className="h-4"/>
                                                            </div>

                                                            <div>
                                                                <small className="text-xs">Scheduled Shifts</small>

                                                                <h6 className="text-sm font-bold">45</h6>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center">
                                                            <div className="p-2 rounded-md mr-3" style={{backgroundColor: '#A9A0F7'}}>
                                                                <img src={logoutIcon} className="h-4"/>
                                                            </div>

                                                            <div>
                                                                <small className="text-xs">Clocked In</small>

                                                                <h6 className="text-sm font-bold">15</h6>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center">
                                                            <div className="p-2 rounded-md mr-3" style={{backgroundColor: '#F5C2A2'}}>
                                                                <img src={loginIcon} className="h-4"/>
                                                            </div>

                                                            <div>
                                                                <small className="text-xs">Clocked Out</small>

                                                                <h6 className="text-sm font-bold">20</h6>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center">
                                                            <div className="p-2 rounded-md mr-3" style={{backgroundColor: '#9CC7F5'}}>
                                                                <img src={shift2Icon} className="h-4"/>
                                                            </div>

                                                            <div>
                                                                <small className="text-xs">Confirmed Shifts</small>

                                                                <h6 className="text-sm font-bold">2</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h1 className="text-xl font-bold">Today, {todayDate}</h1>

                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-5">
                                        <div className="col-span-2">
                                            <div className=" p-4 rounded-xl bg-gray-50">
                                                <h1 className="text-lg font-bold">Live Shifts</h1>

                                                <div className="flex flex-col mt-4">
                                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                            <div className="shadow overflow-scroll border-b border-gray-200 sm:rounded-lg" >

                                                                <table className="min-w-full ">
                                                                    <thead className="bg-white">
                                                                    <tr>
                                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                            Contractor
                                                                        </th>

                                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                                            Shift Role
                                                                        </th>

                                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                            Clock In
                                                                        </th>

                                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                            Status
                                                                        </th>

                                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                                            Time Remaining
                                                                        </th>
                                                                    </tr>
                                                                    </thead>

                                                                    <tbody className="bg-white">
                                                                    <tr>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                    <img className="h-10 w-10 rounded-full"
                                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                                    />
                                                                                </div>

                                                                                <div className="text-sm ml-2">
                                                                                    Mary Roselyn
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                Front Desk
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                08:00AM
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600">
                                                                                Live Shifts
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                01:25:48
                                                                            </div>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                    <img className="h-10 w-10 rounded-full"
                                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                                    />
                                                                                </div>

                                                                                <div className="text-sm ml-2">
                                                                                    Mary Roselyn
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                Front Desk
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                08:00AM
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600">
                                                                                Live Shifts
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                01:25:48
                                                                            </div>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                    <img className="h-10 w-10 rounded-full"
                                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                                    />
                                                                                </div>

                                                                                <div className="text-sm ml-2">
                                                                                    Mary Roselyn
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                Front Desk
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                08:00AM
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600">
                                                                                Live Shifts
                                                                            </div>
                                                                        </td>

                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="text-sm ">
                                                                                01:25:48
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>

                                                                <hr />

                                                                <div className="bg-white py-3 flex items-center justify-center text-gray-500
																text-sm cursor-pointer font-semibold"
                                                                     onClick={() => setHomePage('live')}>
                                                                    View All
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
                                                <div className="p-4 rounded-xl bg-gray-50">
                                                    <h1 className="font-bold">Contractor Clock In Times</h1>

                                                    <div className="mt-1">
                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="p-4 rounded-xl bg-gray-50">
                                                    <div className="flex flex-wrap justify-between items-center">
                                                        <h1 className="font-bold">Clocked Out</h1>

                                                        <button className="rounded bg-blue-600 hover:bg-blue-700 py-2
													px-3 text-white text-sm font-bold " onClick={() => setHomePage('confirm')}>
                                                            Confirm Shifts
                                                        </button>
                                                    </div>

                                                    <div className="mt-1">
                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-6">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                         src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                    <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                                </div>
                                                            </div>

                                                            <p className="text-xs text-gray-400">8 mins ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="p-4 rounded-xl bg-gray-50">
                                                <h1 className="font-bold">Today's Confirmed Shifts</h1>

                                                <div className="mt-1 mb-4">
                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-6">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                                />
                                                            </div>

                                                            <div className="ml-2">
                                                                <p className="text-sm font-bold text-gray-700">Wade Warren</p>
                                                                <p className="text-xs font-bold text-gray-400">Front Desk</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <p className="text-sm text-green-500 font-bold">$290</p>
                                                            <p className="text-xs text-gray-400">$26/hr</p>
                                                        </div>
                                                    </div>

                                                </div>

                                                <hr />

                                                <div className="bg-gray-50 py-3 flex items-center justify-center text-gray-500
												text-sm cursor-pointer font-semibold" onClick={() => setHomePage('confirmed')}>
                                                    View All
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="h-full w-full flex flex-col homeBoard">
                                    <div className="w-full flex flex-row justify-between mb-4">
                                        <h1 className="homeWelcome">
                                            Welcome
                                            <img src={UnderLine} className='w-40'/>
                                        </h1>

                                        <Button className="homeShiftCreate" isActive={true}>
                                            <ReactSVG src={CircleOutline} />
                                            Create new Shifts
                                        </Button>
                                    </div>

                                    <div className="w-full flex flex-col">
                                        <div className="emptyHolder flex flex-col">
                                            <h1 className="starter">Start creating shifts</h1>

                                            <small className="subStarter">
                                                There are pools of Contractors waiting for you. Get<br />
                                                started by creating Shifts
                                            </small>

                                            <Link to="#shifts" className="starterButton">
                                                <span>Go to Shifts</span>
                                                <ReactSVG src={ForwardIcon} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                        }
                    </>
                    :
                    null
            }

            {
                homePage === 'live' ?
                    <>
                        <div className="w-full h-full p-8">
                            <div className="flex flex-wrap justify-between">
                                <h1 className="homeWelcome">
                                    Live Shifts
                                    <img src={UnderLine} className="w-44"/>
                                </h1>

                                <div>
                                    <Button className="homeShiftCreate" isActive={true}>
                                        <ReactSVG src={CircleOutline} />
                                        Create new Shifts
                                    </Button>
                                </div>
                            </div>

                            <h1 className="text-xl font-bold">Today, {todayDate}</h1>

                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                    <div className="filter drop-shadow-md overflow-scroll border-b border-gray-200 sm:rounded-lg" >

                                        <table className="min-w-full ">
                                            <thead className="bg-white">
                                            <tr>
                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Shift ID
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Contractor
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Shift Type
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                    Shift Duration
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                    Clocked In
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Status
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Time Remaining
                                                </th>
                                            </tr>
                                            </thead>

                                            <tbody className="bg-white">
                                            <tr>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-blue-600 cursor-pointer"
                                                         onClick={() => {setShiftInfo(true)}}>
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        01:25:48
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-blue-600">
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        01:25:48
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-blue-600">
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        01:25:48
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-blue-600">
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        01:25:48
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-blue-600">
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        01:25:48
                                                    </div>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <p className="font-bold text-gray-500 mt-4 cursor-pointer"
                               onClick={() => setHomePage('home')}>
                                <BsChevronLeft className="mr-1 inline" /> Back
                            </p>

                            {
                                shiftInfo ?
                                    <div className="fixed z-10 inset-0 overflow-y-auto" >
                                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                                            {/* Background overlay, show/hide based on modal state.*/}

                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                                            {/* This element is to trick the browser into centering the modal contents. */}
                                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                                            {/* Modal panel, show/hide based on modal state.*/}

                                            <div className="inline-block align-bottom bg-white rounded-lg text-left
											overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle
											sm:max-w-lg sm:w-full lg:max-w-md">
                                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="flex justify-end">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center
														justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                                             onClick={() => setShiftInfo(false)}>
                                                            x
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-center mt-2">
                                                        <div className='text-center'>
                                                            <img src={avatar} className='h-20 w-18 rounded-full mx-auto' />

                                                            <p className="my-2 font-semibold">Mary Roselyn</p>

                                                            <div className="border border-green-500 py-1 px-2 rounded text-sm
															text-green-600 inline">
                                                                Live Shift
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="flex justify-between align-center mt-2">
                                                        <div>
                                                            <p className="text-xs text-gray-400 font-medium">Shift Role</p>

                                                            <p className="text-lg font-bold text-gray-600">Maintenance</p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-gray-400 text-right font-medium">Pay</p>

                                                            <p className="text-lg font-bold text-green-500 text-right">$65/hr</p>

                                                            <p className="text-xs text-gray-400 text-right font-medium">Total Payment</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6">
                                                        <div className="flex justify-between align-center my-4">
                                                            <p className="font-medium text-gray-600 text-sm">Start time</p>
                                                            <p className="font-medium text-gray-600 text-sm">08:00AM, Nov 16</p>
                                                        </div>

                                                        <div className="flex justify-between align-center my-4">
                                                            <p className="font-medium text-gray-600 text-sm">End time</p>
                                                            <p className="font-medium text-gray-600 text-sm">08:00AM, Nov 16</p>
                                                        </div>

                                                        <div className="flex justify-between align-center my-4">
                                                            <p className="font-medium text-gray-600 text-sm">Shift Length</p>
                                                            <p className="font-medium text-gray-600 text-sm">4hrs 30mins</p>
                                                        </div>

                                                        <div className="flex justify-between align-center my-4">
                                                            <p className="font-medium text-gray-600 text-sm">Duration</p>
                                                            <p className="font-medium text-gray-600 text-sm">-</p>
                                                        </div>

                                                        <div className="flex justify-between align-center my-4">
                                                            <p className="font-medium text-gray-600 text-sm">Clocked In</p>
                                                            <p className="font-medium text-gray-600 text-sm">07:58AM</p>
                                                        </div>

                                                        <div className="flex justify-between align-center my-4">
                                                            <p className="font-medium text-gray-600 text-sm">Clocked Out</p>
                                                            <p className="font-medium text-gray-600 text-sm">-</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }

                        </div>
                    </>
                    :
                    null
            }
            {
                homePage === 'confirm' ?
                    <>
                        <div className="w-full h-full p-8">
                            <div className="flex flex-wrap justify-between">
                                <h1 className="homeWelcome">
                                    Confirm Shifts
                                    <img src={UnderLine} className="w-44"/>
                                </h1>

                                <div>
                                    <Button className="homeShiftCreate" isActive={true}>
                                        <ReactSVG src={CircleOutline} />
                                        Create new Shifts
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-start items-center my-4">
                                <h1 className="text-xl font-bold mr-4">{todayDate}</h1>

                                <input type="date" className='border border-gray-200 py-3 px-2 mr-4'/>

                                <Button className="homeShiftCreate" isActive={true}>
                                    Today
                                </Button>
                            </div>


                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                    <div className="filter drop-shadow-md  border-b border-gray-200 sm:rounded-lg" >

                                        <table className="min-w-full overflow-scroll">
                                            <thead className="bg-white">
                                            <tr>
                                                <th></th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Shift ID
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Contractor
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Shift Type
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                    Shift Duration
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                    Clocked In
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Status
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Time Remaining
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Actions
                                                </th>
                                            </tr>
                                            </thead>

                                            <tbody className="bg-white">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        04:00PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => {setShiftReview(true)}}>
                                                        Review
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        04:00PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => {setShiftReview(true)}}>
                                                        Review
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        04:00PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => {setShiftReview(true)}}>
                                                        Review
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        04:00PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => {setShiftReview(true)}}>
                                                        Review
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input type="checkbox" />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        04:00PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Live Shifts
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => {setShiftReview(true)}}>
                                                        Review
                                                    </div>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <p className="font-bold text-gray-500 cursor-pointer"
                                   onClick={() => setHomePage('home')}>
                                    <BsChevronLeft className="mr-1 inline" /> Back
                                </p>

                                <button className='px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold'>
                                    Confirm Shift
                                </button>
                            </div>

                            {
                                shiftReview ?
                                    <div className="fixed z-10 inset-0 overflow-y-auto" >
                                        <div className="flex items-end justify-center min-h-screen pt-4 px-4
										pb-20 text-center sm:block sm:p-0">

                                            {/* Background overlay, show/hide based on modal state.*/}

                                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                                 aria-hidden="true"></div>

                                            {/* This element is to trick the browser into centering the modal contents. */}
                                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                                  aria-hidden="true">&#8203;</span>


                                            {/* Modal panel, show/hide based on modal state.*/}
                                            <div className="inline-block align-bottom bg-white rounded-lg text-left
											overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle
											sm:max-w-lg sm:w-full ">
                                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                    <div className="flex justify-end">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center
														justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                                             onClick={() => setShiftReview(false)}>
                                                            x
                                                        </div>
                                                    </div>

                                                    <div className=" mt-2">
                                                        <p className="my-2 text-2xl text-blue-700 font-semibold">
                                                            How well did this contractor perform?
                                                        </p>
                                                    </div>

                                                    <div className="flex align-center mt-2">
                                                        <div className='flex align-center mr-4'>
                                                            <img src={starempty} className='w-10 h-10 mr-1' />
                                                            <img src={starempty} className='w-10 h-10 mr-1' />
                                                            <img src={starempty} className='w-10 h-10 mr-1' />
                                                            <img src={starempty} className='w-10 h-10 mr-1' />
                                                            <img src={starempty} className='w-10 h-10 mr-1' />
                                                        </div>

                                                        <p className='text-xs my-auto'>Rate</p>
                                                    </div>

                                                    <div className="mt-10">
                                                        <p className='text-sm text-gray-500 font-medium'>Leave a comment</p>
                                                        <textarea cols={45} rows={4} className='border rounded-md border-blue-100 p-2'></textarea>
                                                    </div>

                                                    <div className="my-10">
                                                        <p className='text-sm text-gray-500 font-medium'>Select badges</p>

                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                                            <div>
                                                                <img src={timely} className='h-14 w-14 mx-auto' />

                                                                <p className="text-center text-xs">
                                                                    On time to shift
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <img src={knowledge} className='h-14 w-14 mx-auto' />

                                                                <p className="text-center text-xs">
                                                                    Advanced System Knowledge
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <img src={dressing} className='h-14 w-14 mx-auto' />

                                                                <p className="text-center text-xs">
                                                                    Dressed Appropriately
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <img src={team} className='h-14 w-14 mx-auto' />

                                                                <p className="text-center text-xs">
                                                                    Team Player
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </>
                    :
                    null
            }
            {
                homePage === 'confirmed' ?
                    <>
                        <div className="w-full h-full p-8">
                            <div className="flex flex-wrap justify-between">
                                <h1 className="homeWelcome">
                                    Confirmed Shifts
                                    <img src={UnderLine} className="w-44"/>
                                </h1>

                                <div>
                                    <Button className="homeShiftCreate" isActive={true}>
                                        <ReactSVG src={CircleOutline} />
                                        Create new Shifts
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-start items-center my-4">
                                <h1 className="text-xl font-bold mr-4">Today, {todayDate}</h1>
                            </div>

                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                    <div className="filter drop-shadow-md  border-b border-gray-200 sm:rounded-lg" >

                                        <table className="min-w-full overflow-scroll">
                                            <thead className="bg-white">
                                            <tr>
                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Shift ID
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Contractor
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Shift Type
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                    Shift Duration
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                    Clocked In
                                                </th>

                                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                    Status
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Pay/hr
                                                </th>

                                                <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                    Final Pay
                                                </th>
                                            </tr>
                                            </thead>

                                            <tbody className="bg-white">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Confirmed
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        $55/hr
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        $250
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Confirmed
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        $55/hr
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        $250
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold cursor-pointer" >
                                                        000456
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full"
                                                                 src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                            />
                                                        </div>

                                                        <div className="text-sm ml-2">
                                                            Mary Roselyn
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        Front Desk
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM - 02:30PM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        08:00AM
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
                                                        Confirmed
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        $55/hr
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        $250
                                                    </div>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <p className="font-bold text-gray-500 cursor-pointer"
                                   onClick={() => setHomePage('home')}>
                                    <BsChevronLeft className="mr-1 inline" /> Back
                                </p>
                            </div>
                        </div>
                    </>
                    :
                    null
            }

        </>
    )
}

const ShiftTitles = [
    {
        "name": "All Shifts",
        "count": 0
    },
    {
        "name": "Assigned Shifts",
        "count": 0
    },
    {
        "name": "Unassigned Shifts",
        "count": 0
    },
    {
        "name": "Cancelled Shifts",
        "count": 0
    }
]

const Columns = [
    "Shift ID",
    "Scheduled Time",
    "Contractor",
    "Scheduled Type",
    "Status",
    "Request",
    "Pay/hr"
]

export const ShiftsBoard = () => {
    const [tileActive, setTileActive] = React.useState(0)
    return (
        <div className="h-full w-full flex flex-col shiftsBoard items-center">
            <div className="w-full flex flex-row justify-between mb-4">
                <h1 className="homeWelcome">Shifts
                    <img src={UnderLine} /></h1>
                <Button className="homeShiftCreate" isActive={true}>
                    <ReactSVG src={CircleOutline} />
                    Create new Shifts
                </Button>
            </div>
            <hr />
            <div className="flex flex-col w-full">
                <div className="headTiles flex flex-row justify-between items-center">
                    {ShiftTitles.map((item, index) => {
                        return (
                            <div onClick={() => setTileActive(index)}
                                 className={`flex flex-row items-center holdTiles 
				${tileActive == index ? 'active' : ''}`} key={index}>
                                <h1 className="tileTitle">{item.name}</h1>
                                <h1 className="tileCount">{item.count}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-row mb-5 items-center justify-between">
                <h1 className="tableTopHeader">Fri Oct 24th</h1>
                <div className="dateSelect flex flex-row items-center pl-8 pr-4">
                    <input type="text" pattern="[12]\d{3}-(0[1-9]|1[0-2])-
				(0[1-9]|[12]\d|3[01])"/>
                    <ReactSVG src={Dates} />
                </div>
                <Button isActive={true} className="today">
                    Today
                </Button>
                <div className="relative">
                    <div className="h-full absolute w-10 border-t
				border-r border-b z-50 bg-white right-0
				flex flex-col justify center items-center">
                        <ReactSVG src={ArrowDown} className=" m-auto" />
                    </div>
                    <select className="shiftSelect focus:outline-none px-6 relative">

                        <option value="allShifts">All Shifts</option>
                    </select>
                </div>
            </div>
            <div className="tableHolder">
                <Table noDataIcon={<ReactSVG src={NoDataTable}
                                             className=" mb-5" />} noData="No Shift here" columns={Columns} />
            </div>
        </div>
    )
}

const FavoriteColumns = [
    "Contractor",
    "Completed Shifts",
    "Contractor Role",
    "Ratings",
    "Badges"
]

export const FavoritesBoard = () => {
    return (
        <div className="h-full w-full flex flex-col items-center favoritesBoard">
            <div className="w-full flex flex-row justify-between mb-12">
                <h1 className="homeWelcome">Favorites
                    <img src={UnderLine} /></h1>
                <Button className="homeShiftCreate" isActive={true}>
                    <ReactSVG src={CircleOutline} />
                    Create new Shift
                </Button>
            </div>
            <div className="flex flex-row-reverse mb-5 w-full">
                <div>
                    <label htmlFor="selectRole" className="filterBy">Filter by</label>
                    <div className="relative">
                        <div className="h-full absolute w-10 border-t
				border-r border-b z-50 bg-white right-0
				flex flex-col justify center items-center">
                            <ReactSVG src={ArrowDown} className=" m-auto" />
                        </div>
                        <select className="roleFilter focus:outline-none px-6 relative">

                            <option value="allShifts">All Job Role</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="tableHolder">
                <Table noDataIcon={<ReactSVG src={NoFavorites}
                                             className=" mb-5" />} noData="No Favorites yet"
                       columns={FavoriteColumns} />
            </div>
        </div>
    )
}

const BillingsColumns = [
    "Shift ID",
    "Contractor",
    "Shift Type",
    "Scheduled Time",
    "Shift Status",
    "Pay/hr",
    "FinalPay"
]

export const BillingBoard = () => {
    return (
        <div className="h-full w-full flex flex-col items-center BillingBoard">
            <div className="w-full flex flex-row justify-between mb-16">
                <h1 className="homeWelcome">Billings
                    <img src={UnderLine} /></h1>
                <Button className="homeShiftCreate" isActive={true}>
                    <ReactSVG src={CircleOutline} />
                    Create new Shift
                </Button>
            </div>
            <div className="w-full flex flex-row mb-5 items-center justify-around">
                <h1 className="tableTopHeader">Fri Oct 24th</h1>
                <div className="dateSelect flex flex-row items-center pl-8 pr-4">
                    <input type="text" pattern="[12]\d{3}-(0[1-9]|1[0-2])-
				(0[1-9]|[12]\d|3[01])"/>
                    <ReactSVG src={Dates} />
                </div>
                <Button isActive={true} className="current">
                    Current Billing Period
                </Button>
                <h1 className="tableTopBottom">$0.00</h1>
            </div>
            <div className="tableHolder">
                <Table noDataIcon={<ReactSVG src={NoBillings}
                                             className=" mb-5" />} noData="No Billings yet"
                       columns={BillingsColumns} />
            </div>
        </div>
    )
}

const leftSettings = [{
    "title": "Company Information",
    "subTitle": "Details about your company's information",
    "icon": ""
},
    {
        "title": "Payments",
        "subTitle": "Update your payment information",
        "icon": ""
    },
    {
        "title": "Ratings",
        "subTitle": "Know about your ratings and reviews",
        "icon": ""
    },
    {
        "title": "Password",
        "subTitle": "Change password",
        "icon": ""
    },
    {
        "title": "Notifications Settings",
        "subTitle": "Edit and customise your notifications settings",
        "icon": ""
    }
]

export const SettingsBoard = () => {


    const [settingPage, setSettingPage] = useState('page1')
    const [paymentVerify, setPaymentVerify] = useState(false)

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const localToken = localStorage.getItem('token')
    const localBusiness: any = JSON.parse(localStorage.getItem('business'))

    const getHotel = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + localToken);

        fetch(baseUrl + `/v1/hotel/${id}`,
            {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
        ).then(response => response.text())
            .then((result) => {
                let thisHotel = JSON.parse(result)

                setHotelDetails({
                    'name': thisHotel.name,
                    'address': thisHotel.address,
                    'phone': thisHotel.phone,
                })

                setBankDetails({
                    'ein': thisHotel.employerIdentificationNumber,
                    'accountnumber': thisHotel.bank.accountNumber,
                    'routingnumber': thisHotel.bank.routingNumber,
                })
            })
            .catch((error) => {
                console.log('error', error);
            })

    }

    const getThisManager = () => {
        let localToken = localStorage.getItem('token')

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer '+localToken);

        fetch(baseUrl + "/v1/manager/me",
            {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            })
            .then(response => response.text())
            .then((result) => {
                localStorage.setItem('business', result)
            })
            .catch(error => console.log('error', error));
    }

    const [hotelDetails, setHotelDetails] = useMergeState({
        'name': '',
        'address': '',
        'phone': ''
    })

    useEffect(() => {
        const localToken = localStorage.getItem('token')
        const localBusiness: any = JSON.parse(localStorage.getItem('business'))
        console.log(localBusiness)

        getHotel(localBusiness.hotels[0].id)

        getThisManager()
    }, [])

    const handleUpdateInfo = (e) => {
        e.preventDefault()
        if(hotelDetails.name === '' || hotelDetails.address === '' || hotelDetails.phone === '') {
            console.log('incomplete form')
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + localToken);

        var raw = JSON.stringify(hotelDetails);

        fetch(baseUrl + `/v1/hotel/update/${localBusiness.hotels[0].id}`,
            {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
        )
            .then((response) => {
                response.text()
                console.log(response)
            })
            .then((result) => {
                console.log(result)
                setSuccessMessage('Successful')

                setTimeout(() => {
                    setSuccessMessage('')
                }, 2000);

            })
            .catch((error) => {
                console.log('error', error);
                setErrorMessage('Something went wrong, pls try again')

                setTimeout(() => {
                    setErrorMessage('')
                }, 4000);
            })
    }

    const [bankDetails, setBankDetails] = useMergeState({
        'ein': '',
        'accountnumber': '',
        'routingnumber': '',
    })

    const handleUpdateBank = (e) => {
        e.preventDefault()

        if(bankDetails.ein === '' || bankDetails.accountnumber === '' || bankDetails.routingnumber === '') {
            console.log('incomplete form')
            return
        }

        let bankUpdateDetails = {
            'employerIdentificationNumber': bankDetails.ein,
            'bank': {
                "accountNumber": bankDetails.accountnumber,
                "routingNumber": bankDetails.routingnumber
            }
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + localToken);

        var raw = JSON.stringify(bankUpdateDetails);

        fetch(baseUrl + `/v1/hotel/update/${localBusiness.hotels[0].id}`,
            {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
        )
            .then((response) => {
                response.text()
                console.log(response)
            })
            .then((result) => {
                console.log(result)
                setSuccessMessage('Successful')

                setTimeout(() => {
                    setSuccessMessage('')
                }, 2000);

            })
            .catch((error) => {
                console.log('error', error);
                setErrorMessage('Something went wrong, pls try again')

                setTimeout(() => {
                    setErrorMessage('')
                }, 4000);
            })
    }

    const [passwordDetails, setPasswordDetails] = useMergeState({
        'user_id': localBusiness.userID,
        'email': localBusiness.length ? localBusiness.owner.email : null,
        'old_password': '',
        'new_password': '',
        'new_password_confirm': ''
    })

    const handleUpdatePassword = (e) => {
        e.preventDefault()

        if(passwordDetails.old_password === '' || passwordDetails.new_password === '') {
            console.log('incomplete form')
            return
        }

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + localToken);

        var raw = JSON.stringify(passwordDetails);

        fetch(baseUrl + `/v1/auth/password/change`,
            {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
        )
            .then((response) => {
                response.text()
                console.log(response)
            })
            .then((result) => {
                console.log(result)
                setSuccessMessage('Successful')

                setTimeout(() => {
                    setSuccessMessage('')
                }, 2000);

            })
            .catch((error) => {
                console.log('error', error);
                setErrorMessage('Something went wrong, pls try again')

                setTimeout(() => {
                    setErrorMessage('')
                }, 4000);
            })
    }

    return (
        <>
            <div className="h-full w-full flex flex-row settingsBoard">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    <div>
                        <div className={`p-4 flex bord-bott cursor-pointer 
							${settingPage === 'page1' ? 'border-r-2 border-blue-400' : ''}`}
                             onClick={() => setSettingPage('page1')}>
                            {
                                settingPage === 'page1' ?
                                    <img src={infoIconActive} className="h-5 mt-1 mr-2"/>
                                    :
                                    <img src={infoIcon} className="h-5 mt-1 mr-2"/>
                            }

                            <div>
                                <p className={`font-medium ${settingPage === 'page1' ? ' text-blue-500' : ''}`}>
                                    Company Information
                                </p>
                                <p className="text-gray-500 text-xs">Details about your company's information</p>
                            </div>
                        </div>

                        <div className={`p-4 flex bord-bott cursor-pointer 
							${settingPage === 'page2' ? 'border-r-2 border-blue-400' : ''}`}
                             onClick={() => setSettingPage('page2')}>
                            {
                                settingPage === 'page2' ?
                                    <img src={paymentIconActive} className="h-5 mt-1 mr-2"/>
                                    :
                                    <img src={paymentIcon} className="h-5 mt-1 mr-2"/>
                            }

                            <div>
                                <p className={`font-medium ${settingPage === 'page2' ? ' text-blue-500' : ''}`}>
                                    Payments
                                </p>
                                <p className="text-gray-500 text-xs">Update your payment information</p>
                            </div>
                        </div>

                        <div className={`p-4 flex bord-bott cursor-pointer 
							${settingPage === 'page3' ? 'border-r-2 border-blue-400' : ''}`}
                             onClick={() => setSettingPage('page3')}>
                            {
                                settingPage === 'page3' ?
                                    <img src={ratingIconActive} className="h-5 mt-1 mr-2"/>
                                    :
                                    <img src={ratingIcon} className="h-5 mt-1 mr-2"/>
                            }

                            <div>
                                <p className={`font-medium ${settingPage === 'page3' ? ' text-blue-500' : ''}`}>
                                    Ratings
                                </p>
                                <p className="text-gray-500 text-xs">Know about your ratings and reviews</p>
                            </div>
                        </div>

                        <div className={`p-4 flex bord-bott cursor-pointer
							${settingPage === 'page4' ? 'border-r-2 border-blue-400' : ''}`}
                             onClick={() => setSettingPage('page4')}>
                            {
                                settingPage === 'page4' ?
                                    <img src={passwordIconActive} className="h-5 mt-1 mr-2"/>
                                    :
                                    <img src={passwordIcon} className="h-5 mt-1 mr-2"/>
                            }

                            <div>
                                <p className={`font-medium ${settingPage === 'page4' ? ' text-blue-500' : ''}`}>
                                    Password
                                </p>
                                <p className="text-gray-500 text-xs">Change password</p>
                            </div>
                        </div>

                        <div className={`p-4 flex bord-bott cursor-pointer 
							${settingPage === 'page5' ? 'border-r-2 border-blue-400' : ''}`}
                             onClick={() => setSettingPage('page5')}>
                            {
                                settingPage === 'page5' ?
                                    <img src={notifIconActive} className="h-5 mt-1 mr-2"/>
                                    :
                                    <img src={notifIcon} className="h-5 mt-1 mr-2"/>
                            }

                            <div>
                                <p className={`font-medium ${settingPage === 'page5' ? ' text-blue-500' : ''}`}>
                                    Notification Settings
                                </p>
                                <p className="text-gray-500 text-xs">Edit and customise your notifications</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 bg-gray-50 rounded-2xl p-8">
                        {
                            settingPage === 'page1' ?
                                <>
                                    <div>
                                        <h1 className="text-xl font-bold">
                                            Company Information
                                            <img src={UnderLine} className="w-52"/>
                                        </h1>

                                        <div className="mt-12">
                                            <div className="w-full lg:w-3/4">
                                                <div className="flex justify-center">
                                                    <img src={avatar} className="w-20" />
                                                </div>

                                                <div className="flex justify-center mt-2">
                                                    <img src={rating} className="w-5"/>
                                                    <img src={rating} className="w-5"/>
                                                    <img src={rating} className="w-5"/>
                                                    <img src={rating} className="w-5"/>
                                                    <img src={rating} className="w-5"/>
                                                </div>

                                                <div className="mt-4">
                                                    <form>
                                                        <div className="form-group mb-8">
                                                            <label className="text-sm block text-gray-500 font-semibold">Company's Legal Name</label>
                                                            <input className="appearance-none border border-gray-300
															rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
															focus:outline-none focus:shadow-outline"
                                                                   type="text" value={hotelDetails.name} onChange={e => setHotelDetails({name: e.target.value})}/>
                                                        </div>

                                                        <div className="form-group mb-8">
                                                            <label className="text-sm block text-gray-500 font-semibold">Business Address</label>
                                                            <input className="appearance-none border border-gray-300
															rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
															focus:outline-none focus:shadow-outline"
                                                                   type="text" value={hotelDetails.address} onChange={e => setHotelDetails({address: e.target.value})}/>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                            <div className="form-group mb-8">
                                                                <label className="text-sm block text-gray-500 font-semibold">Phone Number</label>


                                                                <div className="relative text-gray-600 focus-within:text-gray-400">
																<span className="absolute inset-y-0 left-0 flex items-center pl-2">
																	<div className="p-1 focus:outline-none focus:shadow-outline flex items-center">
																		<img src={flag} className="w-8 h-8"/> +1
																	</div>
																</span>

                                                                    <input type="number" name="q" className="border border-gray-300 rounded py-2 h-10 w-full
																	px-3 text-gray-700 pl-20 focus:outline-none focus:bg-white focus:text-gray-900"
                                                                           value={hotelDetails.phone} onChange={e => setHotelDetails({phone: e.target.value})}/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end items-center w-full">
                                                            {
                                                                successMessage && successMessage.length ?
                                                                    <p className='text-green-600 text-white py-3 px-4 text-right my-4'>
                                                                        {successMessage}
                                                                    </p>
                                                                    :
                                                                    null
                                                            }
                                                            {
                                                                errorMessage && errorMessage.length ?
                                                                    <p className='text-red-600 text-white py-3 px-4 text-right my-4'>
                                                                        {errorMessage}
                                                                    </p>
                                                                    :
                                                                    null
                                                            }

                                                            <div className="">
                                                                <button className="bg-blue-600 rounded-md py-3 px-3 text-white font-semibold hover:bg-blue-700"
                                                                        onClick={handleUpdateInfo} type='button'>
                                                                    Save Settings
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                        {
                            settingPage === 'page2' ?
                                <>
                                    {
                                        !paymentVerify ?
                                            <div>
                                                <h1 className="text-xl font-bold">
                                                    Payments
                                                    <img src={UnderLine} className="w-28"/>
                                                </h1>

                                                <div className="mt-12">
                                                    <div className="w-full lg:w-3/4">

                                                        <div className="mt-4">
                                                            <form>
                                                                <div className="form-group mb-8">
                                                                    <label className="text-sm block text-gray-500 font-semibold">Employer Identification Number (EIN) </label>
                                                                    <input className="appearance-none border border-gray-300
																	rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
																	focus:outline-none focus:shadow-outline"
                                                                           type="text" value={bankDetails.ein} onChange={e => setBankDetails({ein: e.target.value})}/>
                                                                </div>

                                                                <div className="form-group mb-8">
                                                                    <label className="text-sm block text-gray-500 font-semibold">Bank Account Number</label>
                                                                    <input className="appearance-none border border-gray-300
																	rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
																	focus:outline-none focus:shadow-outline"
                                                                           type="text" value={bankDetails.accountnumber}  onChange={e => setBankDetails({accountnumber: e.target.value})}/>
                                                                </div>

                                                                <div className="form-group mb-8">
                                                                    <label className="text-sm block text-gray-500 font-semibold">Bank Routing Number</label>
                                                                    <input className="appearance-none border border-gray-300
																	rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
																	focus:outline-none focus:shadow-outline"
                                                                           type="text" value={bankDetails.routingnumber}  onChange={e => setBankDetails({routingnumber: e.target.value})}/>
                                                                </div>

                                                                <div className="flex justify-end items-center w-full">
                                                                    {
                                                                        successMessage && successMessage.length ?
                                                                            <p className='text-green-600 text-white py-3 px-4 text-right my-4'>
                                                                                {successMessage}
                                                                            </p>
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        errorMessage && errorMessage.length ?
                                                                            <p className='text-red-600 text-white py-3 px-4 text-right my-4'>
                                                                                {errorMessage}
                                                                            </p>
                                                                            :
                                                                            null
                                                                    }

                                                                    <div className="flex justify-end items-center">
                                                                        {/* <p className="text-blue-500 font-semibold mr-4 cursor-pointer" onClick={() => setPaymentVerify(true)}>Enter Deposit</p> */}

                                                                        <button className="bg-blue-600 rounded-md py-3 px-3 text-white font-semibold hover:bg-blue-700"
                                                                                onClick={handleUpdateBank} type='button'>
                                                                            Save Settings
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <h1 className="text-xl font-bold">
                                                    Verify Account
                                                    <img src={UnderLine} className="w-28"/>
                                                </h1>

                                                <div className="mt-8">
                                                    <div className="w-full lg:w-3/4">

                                                        <div className="mt-4">
                                                            <p className="text-sm text-gray-500 font-semibold mb-4">
                                                                To verify your Account, enter the two micro deposits below. if you dont see them, they should arrive in 1-3 business days.
                                                            </p>

                                                            <form>
                                                                <div className="form-group mb-8">
                                                                    <label className="text-sm block text-gray-500 font-semibold">Amount 1 </label>
                                                                    <input className="appearance-none border border-gray-300
																	rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
																	focus:outline-none focus:shadow-outline"
                                                                           type="text" />
                                                                </div>

                                                                <div className="form-group mb-8">
                                                                    <label className="text-sm block text-gray-500 font-semibold">Amount 2</label>
                                                                    <input className="appearance-none border border-gray-300
																	rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
																	focus:outline-none focus:shadow-outline"
                                                                           type="text" />
                                                                </div>

                                                                <div className="flex justify-end items-center">
                                                                    <p className="text-gray-500 font-semibold mr-4 cursor-pointer" onClick={() => setPaymentVerify(false)}>Back</p>

                                                                    <button className="bg-blue-600 rounded-md py-3 px-6 text-white font-semibold hover:bg-blue-700">Verify</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                    }

                                </>
                                :
                                null
                        }
                        {
                            settingPage === 'page3' ?
                                <>
                                    <div>
                                        <div className="flex flex-wrap justify-between items-center">
                                            <h1 className="text-xl font-bold">
                                                Ratings
                                                <img src={UnderLine} className="w-28"/>
                                            </h1>

                                            <div className="bg-blue-600 px-4 py-2 font-semibold text-white rounded-md">
                                                120 Reviews
                                            </div>
                                        </div>

                                        <div className="mt-12">
                                            <div className="w-full lg:w-3/4">
                                                <div className="mt-4">
                                                    <p className="text-base font-bold text-gray-600">Keep up the good work</p>

                                                    <p className="text-gray-500 text-sm">
                                                        Great start! A few more shift moves and
                                                        you'll boost your fitness score
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-12">
                                                    <div className="p-3 md:border-r border-gray-300">
                                                        <p className='text-gray-600'>Ratings</p>

                                                        <div className="flex items-baseline mt-4">
                                                            <div className='flex items-center bg-green-200 rounded-full p-3 mr-3'>
                                                                <img src={str} className='w-5 h-5' />
                                                            </div>

                                                            <p className='text-7xl font-medium leading-none'>
                                                                4.5
                                                                <span className='text-xl text-gray-500'>/ 5</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="p-3">
                                                        <p className='text-gray-600'>Badges</p>

                                                        <div className="flex items-baseline mt-4">
                                                            <div className='flex items-center bg-green-200 rounded-full p-3 mr-3'>
                                                                <img src={badge} className='w-5 h-5' />
                                                            </div>

                                                            <p className='text-7xl font-medium leading-none'>
                                                                0
                                                                <span className='text-xl text-gray-500'>/ 4</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-base font-bold text-gray-600">Earned Badges</p>

                                                    <div className="mt-3 flex justify-between items-center">
                                                        <div>
                                                            <div className='flex justify-center'>
                                                                <img src={clean} className='w-20 ' />
                                                            </div>
                                                            <div className='flex justify-center mt-2'>
                                                                <p className='text-sm text-gray-500  text-center'>Clean <br /> Facilities</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className='flex justify-center'>
                                                                <img src={goals} className='w-20 ' />
                                                            </div>
                                                            <div className='flex justify-center mt-2'>
                                                                <p className='text-sm text-gray-500 text-center'>Management has <br /> Clear goals</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className='flex justify-center'>
                                                                <img src={service} className='w-20 ' />
                                                            </div>
                                                            <div className='flex justify-center mt-2'>
                                                                <p className='text-sm text-gray-500  text-center'>Excellent <br /> Service</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className='flex justify-center'>
                                                                <img src={amenity} className='w-20 ' />
                                                            </div>
                                                            <div className='flex justify-center mt-2'>
                                                                <p className='text-sm text-gray-500  text-center'>Great <br /> Amenities</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                        {
                            settingPage === 'page4' ?
                                <>
                                    <div>
                                        <h1 className="text-xl font-bold">
                                            Password & Security
                                            <img src={UnderLine} className="w-52"/>
                                        </h1>

                                        <div className="mt-12">
                                            <div className="w-full lg:w-3/4">
                                                <div className="mt-4">
                                                    <form>
                                                        <div className="form-group mb-8">
                                                            <label className="text-sm block text-gray-500 font-semibold">Current Password </label>
                                                            <input className="appearance-none border border-gray-300
															rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
															focus:outline-none focus:shadow-outline"
                                                                   type="password" onChange={e => setPasswordDetails({old_password: e.target.value})}/>
                                                        </div>

                                                        <div className="form-group mb-8">
                                                            <label className="text-sm block text-gray-500 font-semibold">New Password</label>
                                                            <input className="appearance-none border border-gray-300
															rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
															focus:outline-none focus:shadow-outline"
                                                                   type="password"  onChange={e => setPasswordDetails({new_password: e.target.value})}/>
                                                        </div>

                                                        <div className="form-group mb-8">
                                                            <label className="text-sm block text-gray-500 font-semibold">Confirm New Password</label>
                                                            <input className="appearance-none border border-gray-300
															rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight
															focus:outline-none focus:shadow-outline"
                                                                   type="password"  onChange={e => setPasswordDetails({new_password_confirm: e.target.value})}/>
                                                        </div>

                                                        <div className="flex justify-end items-center">
                                                            <p className="text-blue-500 font-semibold mr-4 cursor-pointer" onClick={() => setPaymentVerify(true)}>Forgot Your Password?</p>

                                                            <button className="bg-blue-600 rounded-md py-3 px-3 text-white font-semibold hover:bg-blue-700"
                                                                    type='button' onClick={handleUpdatePassword}>
                                                                Save Settings
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                        {
                            settingPage === 'page5' ?
                                <>
                                    <div>
                                        <h1 className="text-xl font-bold">
                                            Notification Settings
                                            <img src={UnderLine} className="w-52"/>
                                        </h1>

                                        <p className='text-lg text-gray-600 font-bold my-8'>Notify me, when</p>

                                        <div className='mb-8'>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " checked/>
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">A Contractor cancels a shift</label>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " />
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">A Contractor ends a shift</label>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " checked/>
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">A Contractor begins a shift</label>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " checked/>
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">A Contractor accepts a shift</label>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " />
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">A Contractor declines a shift</label>
                                            </div>
                                        </div>

                                        <hr />

                                        <div className="mt-8">
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " checked/>
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">Email Notification</label>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " />
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">Text Notifications</label>
                                            </div>
                                            <div className='mb-3'>
                                                <div className=" relative inline-block w-10 mr-2 align-middle
												select-none transition duration-200 ease-in" >
                                                    <input type="checkbox" name="toggle" id="toggle"
                                                           className=" toggle-checkbox absolute block w-6 h-6
													rounded-full bg-white border-4 appearance-none cursor-pointer " checked/>
                                                    <label	className="toggle-label block overflow-hidden h-6 rounded-full
													bg-gray-300 cursor-pointer"></label>
                                                </div>

                                                <label className="text-sm font-medium text-gray-700">Notification sound</label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export const HelpBoard = () => {
    return (
        <>
            <div className="h-full w-full flex flex-col helpBoard">

                <div className="w-full flex flex-col items-center h-full">
                    <h1 className="mainName">Other ways to get help</h1>
                    <img className="underLine" src={UnderLine} />
                    <small className="subTitle"> For when you just need to speak to someone</small>
                    <div className="w-full flex flex-row justify-center">
                        <div className="imageOne">
                            <img src={Woman} />
                            <div className="bottom">
                                <div className="mt-4 w-full flex items-center justify-between">
                                    <h1>Support Documentation</h1>
                                    <MdArrowForward />
                                </div>
                            </div>
                        </div>
                        <div className="imageTwo">
                            <img src={BlackMan} />
                            <div className="bottom">
                                <div className="mt-4 w-full flex items-center justify-between">
                                    <h1>Send us a mail</h1>
                                    <MdArrowForward />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const LogoutBoard = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setTimeout(() => {
        window.location.href = "/login";
    }, 2000)


    return (
        null
    )
}
