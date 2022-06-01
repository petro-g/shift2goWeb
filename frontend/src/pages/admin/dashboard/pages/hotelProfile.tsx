import React, { ReactElement, useEffect, useState } from 'react'

import verified from '@assets/icons/verified.png'
import verify from '@assets/icons/verify.png'
import star from '@assets/icons/str.png'
import badge from '@assets/icons/badge.png'
import edit from '@assets/icons/editsquare.png'

import UnderLine from '@assets/UnderLine.svg';
import rating from '@assets/icons/rating.png'
import ratingempty from '@assets/icons/ratingempty.png';
import moment from 'moment';
import { BsArrowDown } from 'react-icons/bs'
import { BsFillBellFill, BsArrowLeft, BsPlusCircle, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import {baseUrl, getHourlyRate, getDateAndTime, formatAMPM, getTimeDiffHM, useMergeState} from '@utils/helpers'

import { ReactSVG } from 'react-svg'
import Dates from '@assets/dashboard/icons/DateSelect.svg'
import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg'
import pen from '@assets/icons/pen.png'
import info from '@assets/icons/info.png'
import cancel from '@assets/icons/cancel.png'
import ReactPaginate from "react-paginate";

const Hotel = (props) => {
    const [shiftTab, setShiftTab] = useState('all')
    const [currentMsg, setCurrentMsg] = useState('')
    const [openReviews, setOpenReviews] = useState(false)
    const [hotelReviews, setHotelReviews] = useState(null)
    const [thisHotel, setThisHotel] = useState(null)

    const [allShifts, setAllShifts] = useState(null)
    const [allFShifts, setAllFShifts] = useState(null)

    const [shiftsType, setShiftsType] = useState('all')
    const [currentMenu, setCurrentMenu] = useState('') 

    const [unassignedShifts, setUnassignedShifts] = useState(null) 
    const [unassignedFShifts, setUnassignedFShifts] = useState(null) 
    
    const [pendingShifts, setPendingShifts] = useState(null) 
    const [pendingFShifts, setPendingFShifts] = useState(null) 
    
    const [cancelledShifts, setCancelledShifts] = useState(null) 
    const [cancelledFShifts, setCancelledFShifts] = useState(null) 

    const [shiftInfo, setShiftInfo] = useState(null) 
    const [allRoles, setAllRoles] = useState(null)
    const [roleFilter, setRoleFilter] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date)

    const localToken = localStorage.getItem('token')

    const selectMsg = (msgItem) => {
        if (currentMsg === msgItem) {
            setCurrentMsg('')
        } else {
            setCurrentMsg(msgItem)
        }
    }

    const selectMenu = (menuItem) => {
        if (currentMenu === menuItem) {
            setCurrentMenu('')
        } else {
            setCurrentMenu(menuItem)
        }
    }

    const showShiftDetails = (shift) => {
        // setShiftInfo(shift)
    }

    const getAllRoles =(token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/job_roles`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const allRoles = JSON.parse(result);
            setAllRoles(allRoles)

            console.log(allRoles)
		})
		.catch((error) => {
            console.log('error', error)
        })
    }

    const selectRoleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = JSON.parse(event.target.value)
        // value !== 'null' ? console.log(value) : console.log('null')
        // console.log(value)
        setRoleFilter(value)

        if (value !== null) {
            filterHotelShifts(value.name)
        } else {
            setAllFShifts(allShifts)
            setUnassignedFShifts(unassignedShifts)
            setPendingFShifts(pendingShifts)
            setCancelledFShifts(cancelledShifts)
        } 
    };

    const filterHotelShifts = (role) =>  {

        let all = allShifts
        let p = pendingShifts
        let u = unassignedShifts
        let c = cancelledShifts

        let allFiltered = []
        let pFiltered = []
        let uFiltered = []
        let cFiltered = []

        if (shiftsType === 'all') {
            for(let i=0; i<allShifts.length; i++) {
                if(allShifts[i].roles.length && allShifts[i].roles[0].name === role) {
                    allFiltered.push(allShifts[i])
                }
            }
        }

        if (shiftsType === 'scheduled') {
            for(let i=0; i<pendingShifts.length; i++) {
                if(pendingShifts[i].roles.length && pendingShifts[i].roles[0].name === role) {
                    pFiltered.push(allShifts[i])
                }
            }
        }
        if (shiftsType === 'unassigned') {
            for(let i=0; i<unassignedShifts.length; i++) {
                if(unassignedShifts[i].roles.length && unassignedShifts[i].roles[0].name === role) {
                    uFiltered.push(allShifts[i])
                }
            }
        }
        if (shiftsType === 'cancelled') {
            for(let i=0; i<cancelledShifts.length; i++) {
                if(cancelledShifts[i].roles.length && cancelledShifts[i].roles[0].name === role) {
                    cFiltered.push(cancelledShifts[i])
                }
            }
        }

        setAllFShifts(allFiltered)
        setPendingFShifts(pFiltered)
        setUnassignedFShifts(uFiltered)
        setCancelledFShifts(cFiltered)

        // console.log(allFiltered)
    }

    const setDateFilter = (date) => {
        // console.log(date)

        let all = allShifts
        let p = pendingShifts
        let u = unassignedShifts
        let c = cancelledShifts

        let allFiltered = []
        let pFiltered = []
        let uFiltered = []
        let cFiltered = []

        if (shiftsType === 'all') {
            for(let i=0; i<allShifts.length; i++) {
                let shiftDate = allShifts[i].startTime

                var moment1 = moment(shiftDate );
                var moment2 = moment(date );
                // console.log( moment1.isSame(moment2, 'day') ); // true

                if(moment1.isSame(moment2, 'day')) {
                    allFiltered.push(allShifts[i])
                }
            }
        }

        if (shiftsType === 'scheduled') {
            for(let i=0; i<pendingShifts.length; i++) {
                let shiftDate = pendingShifts[i].startTime

                var moment3 = moment(shiftDate );
                var moment4 = moment(date );
                console.log( moment3.isSame(moment4, 'day') ); // true

                if(moment3.isSame(moment4, 'day')) {
                    pFiltered.push(pendingShifts[i])
                }
            }
        }

        if (shiftsType === 'unassigned') {
            for(let i=0; i<unassignedShifts.length; i++) {
                let shiftDate = unassignedShifts[i].startTime

                var moment5 = moment(shiftDate );
                var moment6 = moment(date );
                console.log( moment5.isSame(moment6, 'day') ); // true

                if(moment5.isSame(moment6, 'day')) {
                    uFiltered.push(unassignedShifts[i])
                }
            }
        }

        if (shiftsType === 'cancelled') {
            for(let i=0; i<cancelledShifts.length; i++) {
                let shiftDate = cancelledShifts[i].startTime

                var moment7 = moment(shiftDate );
                var moment8 = moment(date );
                console.log( moment7.isSame(moment8, 'day') ); // true

                if(moment7.isSame(moment8, 'day')) {
                    cFiltered.push(cancelledShifts[i])
                }
            }
        }

        setAllFShifts(allFiltered)
        setPendingFShifts(pFiltered)
        setUnassignedFShifts(uFiltered)
        setCancelledFShifts(cFiltered)

        // console.log(allFiltered)
    }

	const calculateStarRating = (value) => {
		let whole = Math.trunc(value)
		let balance = 5 - whole

		// return [whole, balance]
		return (
			<>
			{[...Array(whole)].map((e, i) => <img key={i} src={rating} className='w-6 h-6' />)	}
			{[...Array(balance)].map((e, i) => <img key={i} src={ratingempty} className='w-6 h-6' />)	}
			</>
		)
	}

    const getAllShifts = (token, hotel, page) => {
        var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/shifts/hotel?hotel_id=${hotel.id}&page=${state.currentPage}`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const allShifts = JSON.parse(result);
            setAllShifts(allShifts)
            setAllFShifts(allShifts)
            console.log(allShifts)


            let unassigned = []
            let pending = []
            let cancelled = []
            
            for(let i=0; i<allShifts.length; i++) {
                if (allShifts[i].status === 'UNASSIGNED') {
                    unassigned.push(allShifts[i])
                } else if (allShifts[i].status === 'PENDING') {
                    pending.push(allShifts[i])
                } else if (allShifts[i].status === 'CANCELLED') {
                    cancelled.push(allShifts[i])
                }

                setUnassignedShifts(unassigned)
                setUnassignedFShifts(unassigned)

                setPendingShifts(pending)
                setPendingFShifts(pending)

                setCancelledShifts(cancelled)
                setCancelledFShifts(cancelled)

                setState({
                    pageCount: Math.ceil(allShifts.length / state.perPage),
                })
            }
		})
		.catch(error => console.log('error', error));
    }

    const [state, setState] = useMergeState({
        offset: 0,
        data: [],
        perPage: 50,
        currentPage: 1
    })

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * state.perPage;

        setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            getAllShifts(localToken, props.profile, state.currentPage)
        });
    };

    useEffect(() => {
        let localToken = localStorage.getItem('token')

        setThisHotel(props.profile)
        console.log(props)
        getAllShifts(localToken, props.profile, 1)
        getAllRoles(localToken)
    }, [])

    const tableStyle={
        width: '100%', 
        overflowX: 'auto'
    }

    return (
        <>
            <div className="flex justify-between items-center mt-4">
                <p className='flex items-center font-semibold text-sm cursor-pointer' onClick={() => props.back(null)} >
                    <BsArrowLeft className="mr-2"/>
                    Back
                </p>

                {/* <button className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 font-semibold"> 
                    <BsPlusCircle className='inline'/> Create Shift
                </button> */}
            </div>

            <div className="flex flex-wrap justify-between bg-blue-100 rounded-lg px-4 py-4 mt-6 xl:h-36">
                <div className="flex mb-4 xl:mb-0 items-center lg:items-start">
                    <div className="bg-blue-400 rounded-full w-20 h-20 lg:w-24 lg:h-24 xl:w-36 xl:h-36 mr-4 uppercase
                        flex items-center justify-center font-bold text-2xl no-wrap p-6">
                            {thisHotel && thisHotel.name.charAt(0)}
                    </div>

                    <div className='lg:mt-6'>
                        <p className="font-bold text-gray-700 text-lg lg:text-xl">
                            {thisHotel && thisHotel.name} &nbsp;
                            <img src={verified} className='w-6 h-6 inline'/>
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                            {thisHotel && thisHotel.address}
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="flex flex-wrap items-center">
                        <div className='border-r border-gray-300 px-4 lg:px-6'>
                            <p className="text-sm lg:text-lg text-gray-500">Ratings</p>

                            <div className="flex items-end mt-2 lg:mt-4">
                                <div className="bg-blue-600 rounded-full w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center mr-3 mb-1"> 
                                    <img src={star} className='h-4 w-4 lg:h-5 lg:w-5' />
                                </div>
                                
                                <p className="text-3xl lg:text-6xl font-medium">
                                    {thisHotel && thisHotel.rating ? thisHotel.rating : 0}
                                    <span className='text-gray-400 font-medium text-sm lg:text-2xl'>/5</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className='px-4 lg:px-6'>
                            <p className="text-sm lg:text-lg text-gray-500">Badges</p>

                            <div className="flex items-end mt-2 lg:mt-4">
                                <div className="bg-blue-600 rounded-full w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center mr-3 mb-1"> 
                                    <img src={badge} className='h-4 w-3 lg:h-5 lg:w-5' />
                                </div>
                                
                                <p className="text-3xl lg:text-6xl font-medium">
                                    {thisHotel && thisHotel.badge_count ? thisHotel.badge_count : 0}
                                        <span className='text-gray-400 font-medium text-sm lg:text-2xl'>/5</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className='px-2 lg:px-6 mt-6 lg:mt-0 flex justify-center'>
                            <div className="">
                                <div className="px-8 py-1 border-2 border-black font-semibold 
                                    cursor-pointer rounded-full flex justify-center items-center"
                                    onClick={() => setOpenReviews(true)}>
                                    See review
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className='flex flex-wrap items-center justify-center md:justify-start 
                    border-b border-gray-200'>
                    <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                        ${shiftsType === 'all' ?  'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setShiftsType('all')}>
                        <p className={`font-bold mr-4 text-sm
                            ${shiftsType === 'all' ? 'text-blue-600' : 'text-gray-300'}`}>
                                All Shifts
                        </p>

                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                            ${shiftsType === 'all' ? 'bg-black text-white' : 'bg-pink-200 text-pink-500'}`}>
                            {allFShifts && allFShifts.length ? allFShifts.length : 0}
                        </div>
                    </div>
                    
                    <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                        ${shiftsType === 'scheduled' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setShiftsType('scheduled')}>
                        <p className={`font-bold mr-4 text-sm
                            ${shiftsType === 'scheduled' ? 'text-black' : 'text-gray-300'}`}>
                                Scheduled Shifts
                        </p>

                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                            ${shiftsType === 'scheduled' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                            {pendingFShifts && pendingFShifts.length ? pendingFShifts.length : 0}
                        </div>
                    </div>
                    
                    <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                        ${shiftsType === 'unassigned' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setShiftsType('unassigned')}>
                        <p className={`font-bold mr-4 text-sm
                            ${shiftsType === 'unassigned' ? 'text-black' : 'text-gray-300'}`}>
                                Unassigned Shifts
                        </p>

                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                            ${shiftsType === 'unassigned' ? 'bg-black text-white' : 'bg-yellow-200 text-yellow-500'}`}>
                            {unassignedFShifts && unassignedFShifts.length ? unassignedFShifts.length : 0}
                        </div>
                    </div>
                    
                    <div className={`flex py-3 justify-between items-center cursor-pointer
                        ${shiftsType === 'cancelled' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setShiftsType('cancelled')}>
                        <p className={`font-bold mr-4 text-sm
                            ${shiftsType === 'cancelled' ? 'text-black' : 'text-gray-300'}`}>
                                Cancelled Shifts
                        </p>

                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                            ${shiftsType === 'cancelled' ? 'bg-black text-white' : 'bg-red-200 text-red-500'}`}>
                            {cancelledFShifts && cancelledFShifts.length ? cancelledFShifts.length : 0}
                        </div>
                    </div>
                </div>
            </div>

            {
                shiftsType === 'all' ? 
                    <div>
                        <div className="w-full flex md:flex-row flex-wrap mb-5 items-center mt-10">
                            <h1 className="font-bold text-2xl md:mr-4 mr-2" style={{width:"200px"}}>{moment(selectedDate).format("ddd MMM Do")}</h1>
                            
                            <input type="date" className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200
                                rounded-lg md:mr-4 mr-2 font-medium' value={moment(selectedDate).format("YYYY-MM-DD")} 
                                onChange={event =>{ setSelectedDate(new Date(event.target.value)); setDateFilter(new Date(event.target.value))}}/>

                            <button className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600 
                                font-semibold mt-4 lg:mt-0 md:mr-4 mr-2" onClick={() => { setSelectedDate(new Date()); setDateFilter(new Date())}}>
                                Today
                            </button>

                            <select className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200 rounded-lg md:mr-4 font-medium' onChange={selectRoleFilter}>
                                <option value={'null'}>All Job Roles</option>
                                {
                                    allRoles && allRoles.length ?
                                    allRoles.map((role, i) => {
                                        return (
                                            <option value={JSON.stringify(role)} key={role.id}>{role.name}</option>
                                        )
                                    })
                                    :
                                    null
                                }
                            </select>
                        </div>

                        <div className="mt-10 bg-white rounded-lg p-6">
                            <div className="table-container pb-12">
                                <table className="table">  
                                    <thead className="bg-white ">
                                        <tr>
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Shift ID
                                            </th>
                                            
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Scheduled time
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                Contractor
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Scheduled type
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Status
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Pay/hr
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white ">
                                        {
                                            allFShifts && allFShifts.length ?
                                                allFShifts.map((shift, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm font-semibold" >
                                                                    {shift.id}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {moment(shift.startTime).format('LT')} - {moment(shift.endTime).format('LT')}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        {
                                                                            shift.contractor && shift.contractor.owner.firstname && shift.contractor.owner.lastname ? 
                                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                                        {shift.contractor.owner.firstname.charAt(0)}
                                                                                        {shift.contractor.owner.lastname.charAt(0)}
                                                                                </div>
                                                                            :
                                                                                null
                                                                        }
                                                                    </div>

                                                                    <p className="text-sm ml-2">
                                                                        {shift.contractor && shift.contractor.owner.firstname ? shift.contractor.owner.firstname : '-'}&nbsp;
                                                                        {shift.contractor && shift.contractor.owner.lastname ? shift.contractor.owner.lastname : '-'}
                                                                    </p>
                                                                </div>
                                                            </td>


                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {shift.roles[0].name}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap"> 
                                                                <div className={`flex justify-center items-center p-1 rounded-full text-sm
                                                                    ${shift.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : ''} 
                                                                    ${shift.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : ''} 
                                                                    ${shift.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : ''} 
                                                                    `}>
                                                                    {shift.status}
                                                                </div> 
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm"> 
                                                                    ${getHourlyRate(shift.pay, shift.startTime, shift.endTime)}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <BsThreeDotsVertical className='text-gray-400' onClick={() => selectMenu('menua'+i)}/>

                                                                <div className="relative">
                                                                    
                                                                    {
                                                                        currentMenu === 'menua'+i ? 
                                                                            <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-64 p-2 flex justify-between items-center border border-gray-300">
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={info} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm" onClick={() => showShiftDetails(shift)} >Info</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={pen} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm">Edit</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={cancel} className='h-4 w-4 mr-1'/>

                                                                                    <p className="text-blue-500 font-semibold text-sm">Delete</p>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            null
                                                                    }
                                                                    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            :
                                                <tr>
                                                    <td colSpan={7}>
                                                        <p className="text-center text-gray-400 font-semibold my-6">No shifts yet.</p>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="w-full flex my-4 justify-end">
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    // subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                :
                    null
            }
           
            {
                shiftsType === 'scheduled' ? 
                    <div>
                        <div className="w-full flex md:flex-row flex-wrap mb-5 items-center mt-10">
                            <h1 className="font-bold text-2xl md:mr-4 mr-2">{moment(selectedDate).format("ddd MMM Do")}</h1>

                            <input type="date" className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200
                                rounded-lg md:mr-4 mr-2 font-medium' value={moment(selectedDate).format("YYYY-MM-DD")} 
                                onChange={event =>{ setSelectedDate(new Date(event.target.value)); setDateFilter(new Date(event.target.value))}}/>

                            <button className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600
                                font-semibold mt-4 lg:mt-0 md:mr-4 mr-2" onClick={() => { setSelectedDate(new Date()); setDateFilter(new Date())}}>
                                Today
                            </button>

                            <select className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200 rounded-lg md:mr-4 font-medium' onChange={selectRoleFilter}>
                                <option value={'null'}>All Job Roles</option>
                                {
                                    allRoles && allRoles.length ?
                                        allRoles.map((role, i) => {
                                            return (
                                                <option value={JSON.stringify(role)} key={role.id}>{role.name}</option>
                                            )
                                        })
                                        :
                                        null
                                }
                            </select>
                        </div>

                        <div className="mt-10 bg-white rounded-lg p-6">
                            <div className="table-container pb-12">
                                <table className="table">  
                                    <thead className="bg-white ">
                                        <tr>
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Shift ID
                                            </th>
                                            
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Scheduled time
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                Contractor
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Scheduled type
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Status
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Pay/hr
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white ">
                                        {
                                            pendingFShifts && pendingFShifts.length ?
                                                pendingFShifts.map((shift, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm font-semibold" >
                                                                    {shift.id}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {moment(shift.startTime).format('LT')} - {moment(shift.endTime).format('LT')}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        {
                                                                            shift.contractor && shift.contractor.owner.firstname && shift.contractor.owner.lastname ? 
                                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                                        {shift.contractor.owner.firstname.charAt(0)}
                                                                                        {shift.contractor.owner.lastname.charAt(0)}
                                                                                </div>
                                                                            :
                                                                                null
                                                                        }
                                                                    </div>

                                                                    <p className="text-sm ml-2">
                                                                        {shift.contractor && shift.contractor.owner.firstname ? shift.contractor.owner.firstname : '-'}&nbsp;
                                                                        {shift.contractor && shift.contractor.owner.lastname ? shift.contractor.owner.lastname : '-'}
                                                                    </p>
                                                                </div>
                                                            </td>


                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {shift.roles[0].name}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap"> 
                                                                <div className={`flex justify-center items-center p-1 rounded-full text-sm
                                                                    ${shift.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : ''} 
                                                                    ${shift.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : ''} 
                                                                    ${shift.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : ''} 
                                                                    `}>
                                                                    {shift.status}
                                                                </div> 
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm"> 
                                                                    ${getHourlyRate(shift.pay, shift.startTime, shift.endTime)}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <BsThreeDotsVertical className='text-gray-400' onClick={() => selectMenu('menub'+i)}/>

                                                                <div className="relative">
                                                                    
                                                                    {
                                                                        currentMenu === 'menub'+i ? 
                                                                            <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-64 p-2 flex justify-between items-center border border-gray-300">
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={info} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm" onClick={() => showShiftDetails(shift)} >Info</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={pen} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm">Edit</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={cancel} className='h-4 w-4 mr-1'/>

                                                                                    <p className="text-blue-500 font-semibold text-sm">Delete</p>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            null
                                                                    }
                                                                    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            :
                                                <tr>
                                                    <td colSpan={7}>
                                                        <p className="text-center text-gray-400 font-semibold my-6">No shifts yet.</p>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full flex my-4 justify-end">
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    // subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                :
                    null
            }
           
            {
                shiftsType === 'unassigned' ? 
                    <div>
                        <div className="w-full flex md:flex-row flex-wrap mb-5 items-center mt-10">
                            <h1 className="font-bold text-2xl md:mr-4 mr-2">{moment(selectedDate).format("ddd MMM Do")}</h1>

                            <input type="date" className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200
                                rounded-lg md:mr-4 mr-2 font-medium' value={moment(selectedDate).format("YYYY-MM-DD")} 
                                onChange={event =>{ setSelectedDate(new Date(event.target.value)); setDateFilter(new Date(event.target.value))}}/>

                            <button className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600
                                font-semibold mt-4 lg:mt-0 md:mr-4 mr-2" onClick={() => { setSelectedDate(new Date()); setDateFilter(new Date())}}>
                                Today
                            </button>

                            <select className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200 rounded-lg md:mr-4 font-medium' onChange={selectRoleFilter}>
                                <option value={'null'}>All Job Roles</option>
                                {
                                    allRoles && allRoles.length ?
                                        allRoles.map((role, i) => {
                                            return (
                                                <option value={JSON.stringify(role)} key={role.id}>{role.name}</option>
                                            )
                                        })
                                        :
                                        null
                                }
                            </select>
                        </div>

                        <div className="mt-10 bg-white rounded-lg p-6">
                            <div className="table-container pb-12">
                                <table className="table">  
                                    <thead className="bg-white ">
                                        <tr>
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Shift ID
                                            </th>
                                            
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Scheduled time
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                Contractor
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Scheduled type
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Status
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Pay/hr
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white ">
                                        {
                                            unassignedFShifts && unassignedFShifts.length ?
                                                unassignedFShifts.map((shift, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm font-semibold" >
                                                                    {shift.id}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {moment(shift.startTime).format('LT')} - {moment(shift.endTime).format('LT')}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        {
                                                                            shift.contractor && shift.contractor.owner.firstname && shift.contractor.owner.lastname ? 
                                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                                        {shift.contractor.owner.firstname.charAt(0)}
                                                                                        {shift.contractor.owner.lastname.charAt(0)}
                                                                                </div>
                                                                            :
                                                                                null
                                                                        }
                                                                    </div>

                                                                    <p className="text-sm ml-2">
                                                                        {shift.contractor && shift.contractor.owner.firstname ? shift.contractor.owner.firstname : '-'}&nbsp;
                                                                        {shift.contractor && shift.contractor.owner.lastname ? shift.contractor.owner.lastname : '-'}
                                                                    </p>
                                                                </div>
                                                            </td>


                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {shift.roles[0].name}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap"> 
                                                                <div className={`flex justify-center items-center p-1 rounded-full text-sm
                                                                    ${shift.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : ''} 
                                                                    ${shift.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : ''} 
                                                                    ${shift.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : ''} 
                                                                    `}>
                                                                    {shift.status}
                                                                </div> 
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm"> 
                                                                    ${getHourlyRate(shift.pay, shift.startTime, shift.endTime)}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <BsThreeDotsVertical className='text-gray-400' onClick={() => selectMenu('menuc'+i)}/>

                                                                <div className="relative">
                                                                    
                                                                    {
                                                                        currentMenu === 'menuc'+i ? 
                                                                            <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-64 p-2 flex justify-between items-center border border-gray-300">
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={info} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm" onClick={() => showShiftDetails(shift)} >Info</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={pen} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm">Edit</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={cancel} className='h-4 w-4 mr-1'/>

                                                                                    <p className="text-blue-500 font-semibold text-sm">Delete</p>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            null
                                                                    }
                                                                    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            :
                                                <tr>
                                                    <td colSpan={7}>
                                                        <p className="text-center text-gray-400 font-semibold my-6">No shifts yet.</p>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full flex my-4 justify-end">
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    // subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                :
                    null
            }

            {
                shiftsType === 'cancelled' ? 
                    <div>
                        <div className="w-full flex md:flex-row flex-wrap mb-5 items-center mt-10">
                            <h1 className="font-bold text-2xl md:mr-4 mr-2">{moment(selectedDate).format("ddd MMM Do")}</h1>

                            <input type="date" className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200
                                rounded-lg md:mr-4 mr-2 font-medium' value={moment(selectedDate).format("YYYY-MM-DD")} 
                                onChange={event =>{ setSelectedDate(new Date(event.target.value)); setDateFilter(new Date(event.target.value))}}/>

                            <button className="bg-blue-500 text-white rounded-lg px-6 py-3 hover:bg-blue-600
                                font-semibold mt-4 lg:mt-0 md:mr-4 mr-2" onClick={() => { setSelectedDate(new Date()); setDateFilter(new Date())}}>
                                Today
                            </button>

                            <select className='p-4 mt-4 lg:mt-0 h-14 border border-gray-200 rounded-lg md:mr-4 font-medium' onChange={selectRoleFilter}>
                                <option value={'null'}>All Job Roles</option>
                                {
                                    allRoles && allRoles.length ?
                                        allRoles.map((role, i) => {
                                            return (
                                                <option value={JSON.stringify(role)} key={role.id}>{role.name}</option>
                                            )
                                        })
                                        :
                                        null
                                }
                            </select>
                        </div>

                        <div className="mt-10 bg-white rounded-lg p-6">
                            <div className="table-container pb-12">
                                <table className="table">  
                                    <thead className="bg-white ">
                                        <tr>
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Shift ID
                                            </th>
                                            
                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Scheduled time
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                Contractor
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Scheduled type
                                            </th>

                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                Status
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                Pay/hr
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white ">
                                        {
                                            cancelledFShifts && cancelledFShifts.length ?
                                                cancelledFShifts.map((shift, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm font-semibold" >
                                                                    {shift.id}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {moment(shift.startTime).format('LT')} - {moment(shift.endTime).format('LT')}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        {
                                                                            shift.contractor && shift.contractor.owner.firstname && shift.contractor.owner.lastname ? 
                                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                                        {shift.contractor.owner.firstname.charAt(0)}
                                                                                        {shift.contractor.owner.lastname.charAt(0)}
                                                                                </div>
                                                                            :
                                                                                null
                                                                        }
                                                                    </div>

                                                                    <p className="text-sm ml-2">
                                                                        {shift.contractor && shift.contractor.owner.firstname ? shift.contractor.owner.firstname : '-'}&nbsp;
                                                                        {shift.contractor && shift.contractor.owner.lastname ? shift.contractor.owner.lastname : '-'}
                                                                    </p>
                                                                </div>
                                                            </td>


                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm ">
                                                                    {shift.roles[0].name}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap"> 
                                                                <div className={`flex justify-center items-center p-1 rounded-full text-sm
                                                                    ${shift.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : ''} 
                                                                    ${shift.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : ''} 
                                                                    ${shift.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : ''} 
                                                                    `}>
                                                                    {shift.status}
                                                                </div> 
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <p className="text-sm"> 
                                                                    ${getHourlyRate(shift.pay, shift.startTime, shift.endTime)}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <BsThreeDotsVertical className='text-gray-400' onClick={() => selectMenu('menud'+i)}/>

                                                                <div className="relative">
                                                                    
                                                                    {
                                                                        currentMenu === 'menud'+i ? 
                                                                            <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-64 p-2 flex justify-between items-center border border-gray-300">
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={info} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm" onClick={() => showShiftDetails(shift)} >Info</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={pen} className='h-4 w-4 mr-1' />

                                                                                    <p className="text-blue-500 font-semibold text-sm">Edit</p>
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                    <img src={cancel} className='h-4 w-4 mr-1'/>

                                                                                    <p className="text-blue-500 font-semibold text-sm">Delete</p>
                                                                                </div>
                                                                            </div>
                                                                        :
                                                                            null
                                                                    }
                                                                    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            :
                                                <tr>
                                                    <td colSpan={7}>
                                                        <p className="text-center text-gray-400 font-semibold my-6">No shifts yet.</p>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full flex my-4 justify-end">
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    // subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                />
                            </div>
                        </div>
                    </div>
                :
                    null
            }
            
            {
                openReviews ? 
                    <div className="fixed z-10 inset-0 overflow-y-auto">
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
                                sm:max-w-lg sm:w-full md:max-w-2xl">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="overflow-scroll" style={{maxHeight: '600px'}}>
                                        <div className="flex justify-end">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center 
                                                justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                                onClick={() => setOpenReviews(false)}>
                                                x
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between my-4'>
                                            <h1 className="font-bold text-3xl mb-0">
                                                Comments
                                                <img src={UnderLine} className="w-44"/>
                                            </h1>
                                        </div>

                                        <div>
                                            {
                                                hotelReviews && hotelReviews.length  ?
                                                hotelReviews.map((review, index) => {
                                                        return (
                                                            <div className="px-5 py-3 my-3 rounded-lg bg-gray-100" key={review.id}>
                                                                
                                                                <div className="flex items-center justify-end">
                                                                    {
                                                                        calculateStarRating(review.rating)
                                                                    }
                                                                </div>

                                                                <div className="flex">
                                                                    <div className="rounded-full bg-yellow-400 text-black h-12 w-12 
                                                                        p-4 flex items-center justify-center font-semibold mr-3">
                                                                        {review.owner.firstname.charAt(0)}
                                                                    </div>

                                                                    <div>
                                                                        <p className="font-semibold">{review.owner.firstname} {review.owner.lastname}</p>
                                                                        <p className="text-xs text-gray-400 font-semibold">{moment(review.createdAt).format('ll')}</p>

                                                                        
                                                                            {
                                                                                review.comment ? 
                                                                                <p className='text-sm mt-3'>	
                                                                                    {review.comment}
                                                                                </p>
                                                                                : 
                                                                                <p className='text-sm mt-3 text-gray-500'>
                                                                                    No comment
                                                                                </p>
                                                                            }
                                                                            
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                :
                                                    <div className="text-center my-5">
                                                        <p className="font-bold text-gray-500">No comments yet</p>
                                                    </div>
                                            }					
                                        </div>
                                    </div>

                                    <div className="flex justify-center w-full">
                                        {
                                            hotelReviews && hotelReviews.length  ?
                                                <div className="my-4 rounded-full bg-blue-500 py-1 px-12 text-center 
                                                    text-white font-semibold">
                                                    <BsArrowDown className='inline'/> Scroll for more
                                                </div>
                                            :
                                                null
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                :
                    null
            }

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
                                            onClick={() => setShiftInfo(null)}>
                                            x
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-2">
                                        <div className='text-center'>
                                            <img src={shiftInfo.contractor.profilePicture} className='h-20 w-20 rounded-full mx-auto' />

                                            <p className="my-2 font-semibold">
                                                {shiftInfo.contractor.owner.firstname} {shiftInfo.contractor.owner.lastname}
                                            </p>

                                            <div className="border border-green-500 py-1 px-2 rounded text-sm 
                                                text-green-600 inline">
                                                Live Shift
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className="flex justify-between align-center mt-2">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">Shift Role</p>

                                            <p className="text-lg font-bold text-gray-600">{shiftInfo.contractor.roles[0].name}</p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-xs text-gray-400 text-right font-medium">Pay</p>

                                            <p className="text-lg font-bold text-green-500 text-right">
                                                ${getHourlyRate(shiftInfo.pay, shiftInfo.startTime, shiftInfo.endTime)}/hr
                                            </p>

                                            <p className="text-xs text-gray-400 text-right font-medium mt-4">Total Payment</p>

                                            <p className="text-lg font-bold text-green-500 text-right">${shiftInfo.pay}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex justify-between align-center my-4">
                                            <p className="font-medium text-gray-600 text-sm">Start time</p>
                                            <p className="font-medium text-gray-600 text-sm">{getDateAndTime(shiftInfo.startTime)}</p>
                                        </div>

                                        <div className="flex justify-between align-center my-4">
                                            <p className="font-medium text-gray-600 text-sm">End time</p>
                                            <p className="font-medium text-gray-600 text-sm">{getDateAndTime(shiftInfo.endTime)}</p>
                                        </div>

                                        <div className="flex justify-between align-center my-4">
                                            <p className="font-medium text-gray-600 text-sm">Shift Length</p>
                                            <p className="font-medium text-gray-600 text-sm">
                                                {getTimeDiffHM(shiftInfo.startTime, shiftInfo.endTime)}
                                            </p>
                                        </div>

                                        <div className="flex justify-between align-center my-4">
                                            <p className="font-medium text-gray-600 text-sm">Duration</p>
                                            <p className="font-medium text-gray-600 text-sm">-</p>
                                        </div>

                                        <div className="flex justify-between align-center my-4">
                                            <p className="font-medium text-gray-600 text-sm">Clocked In</p>
                                            <p className="font-medium text-gray-600 text-sm">{formatAMPM(shiftInfo.startTime)}</p>
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
        </>
    )
}

export default Hotel