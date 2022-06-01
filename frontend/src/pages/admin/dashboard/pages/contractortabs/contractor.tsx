import React, { ReactElement, useEffect, useState } from 'react'

import review from '@assets/icons/reviews.png'
import verified from '@assets/icons/verified.png'
import verify from '@assets/icons/verify.png'
import unverified from '@assets/icons/unverified.png'
import menu from '@assets/icons/menu.png'
import pen from '@assets/icons/pen.png'
import info from '@assets/icons/info.png'
import cancel from '@assets/icons/cancel.png'
import avatar from '@assets/icons/admin.png'
import star from '@assets/icons/str.png'
import badge from '@assets/icons/badge.png'
import edit from '@assets/icons/editsquare.png'

import UnderLine from '@assets/UnderLine.svg';
import rating from '@assets/icons/rating.png'
import ratingempty from '@assets/icons/ratingempty.png';
import moment from 'moment';
import { BsArrowDown } from 'react-icons/bs'
import { BsFillBellFill, BsArrowLeft } from 'react-icons/bs'
import { baseUrl } from '@utils/helpers'
import { CircularProgress } from '@material-ui/core'
import { getHourlyRate } from '@utils/helpers'

const Contractor = (props) => {
    const [shiftTab, setShiftTab] = useState('all')
    const [currentMsg, setCurrentMsg] = useState('')
    const [openReviews, setOpenReviews] = useState(false)
    const [contractorReviews, setContractorReviews] = useState(null)
    const [thisContractor, setThisContractor] = useState(null)
    const [allShifts, setAllShifts] = useState(null)
    const [completedShifts, setCompletedShifts] = useState(null)
    const [upcomingShifts, setUpcomingShifts] = useState(null)
    const [acceptedShifts, setAcceptedShifts] = useState(null)

    const [cancelledShifts, setCancelledShifts] = useState(null)
    const [pageLoading, setPageLoading] = useState(false)
    const [allCert, setAllCert] = useState(null)
    const [openDocument, setOpenDocument] = useState(null)

    const selectMsg = (msgItem) => {
        if (currentMsg === msgItem) {
            setCurrentMsg('')
        } else {
            setCurrentMsg(msgItem)
        }
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

    const getAllShifts = (token, page) => {
        var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/shift/history?contractor_id=${props.profile.id}&page=${page}`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)

            const allShifts = JSON.parse(result);
            setAllShifts(allShifts)
            console.log(allShifts)

            let complete = []
            let pending = []
            let cancelled = []
            let accepted = []
            
            for(let i=0; i<allShifts.length; i++) {
                if (allShifts[i].status === 'COMPLETED') {
                    complete.push(allShifts[i])
                } else if (allShifts[i].status === 'PENDING') {
                    pending.push(allShifts[i])
                } else if (allShifts[i].status === 'CANCELLED') {
                    cancelled.push(allShifts[i])
                } else if (allShifts[i].status === 'ACCEPTED') {
                    accepted.push(allShifts[i])
                }

                setCompletedShifts(complete)
                setUpcomingShifts(pending)
                setCancelledShifts(cancelled)
                setAcceptedShifts(accepted)
            }

            console.log(completedShifts)
            console.log(upcomingShifts)
            console.log(cancelledShifts)
            console.log(acceptedShifts)
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
    }

    const getThisContractor = () => {
        setPageLoading(true)
        let token = localStorage.getItem('token')

        var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/contractor/${props.profile.id}`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)
            setThisContractor(JSON.parse(result))
            // console.log(JSON.parse(result))
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
    }

    const verifyContractor = () => {
        let token = localStorage.getItem('token')

        var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/unverified_contractor/verify?contractor_id=${props.profile.id}`,
		{
			method: 'PATCH',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)
            console.log(JSON.parse(result))
            getThisContractor()
            props.profile.verified=true
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
    }

    const getCertificates = () => {
        let token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + token);
    
        fetch(baseUrl + `/v1/certificate/types`,
        {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            }
        )
        .then(response => response.text())
        .then((result) => {
            setAllCert(JSON.parse(result))
        })
        .catch((error) => {
            console.log('error', error);
        })
    }

    const certificateType = (id) => {
        let cert = allCert
    
        if (cert && cert.length) {
            for (let i=0; i<cert.length; i++) {
                if (cert[i].id === id) {
                    return cert[i]
                }
            }
        }
    }
    
    useEffect(() => {
        let localToken = localStorage.getItem('token')

        setThisContractor(props.profile)
        if(props.profile.verified) {
            setPageLoading(true)
            getAllShifts(localToken, 1)
            getThisContractor()
        }
        getCertificates()
        // console.log(props.profile)
    }, [])

    return (
        <>
            <div className="flex justify-between items-center mt-4">
                <p className='flex items-center font-semibold text-sm cursor-pointer' onClick={() => props.back(null)} >
                    <BsArrowLeft className="mr-2"/>
                    Back
                </p>

                <p className="text-blue-600 underline text-sm font-semibold cursor-pointer">Save Changes</p>
            </div>

            <div className="flex flex-wrap justify-between bg-yellow-100 rounded-lg px-8 py-4 mt-6 xl:h-36">
                <div className="flex mb-4 xl:mb-0 items-center lg:items-start">
                    {
                        thisContractor && thisContractor.profilePicture ?
                            <img src={thisContractor.profilePicture} className='w-20 h-20 lg:w-24 lg:h-24 xl:w-36 xl:h-36 rounded-full mr-4'/>
                        :
                            <div className="bg-yellow-400 rounded-full w-20 h-20 lg:w-24 lg:h-24 xl:w-36 xl:h-36 mr-4 uppercase
                                flex items-center justify-center font-bold text-2xl no-wrap">
                                    {thisContractor && thisContractor.owner.firstname.charAt(0)} {thisContractor && thisContractor.owner.lastname.charAt(0)}
                            </div>
                    }
                    

                    <div className='lg:mt-6 lg:max-w-xs'>
                        <p className="font-bold text-gray-700 text-lg lg:text-xl">
                            {thisContractor && thisContractor.owner.firstname ? thisContractor.owner.firstname : ''} &nbsp;
                            {thisContractor && thisContractor.owner.lastname ? thisContractor.owner.lastname : ''} &nbsp;
                            <img src={verified} className='w-6 h-6 inline'/>
                        </p>
                        <p className="text-sm text-gray-500 font-medium">{thisContractor && thisContractor.owner.address}</p>
                    </div>
                </div>

                <div className="">
                    <div className="flex flex-wrap items-center">
                        <div className='border-r border-gray-300 px-4 lg:px-6'>
                            <p className="text-sm lg:text-lg text-gray-500">Ratings</p>

                            <div className="flex items-end mt-2 lg:mt-4">
                                <div className="bg-blue-600 rounded-full w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center mr-3">
                                    <img src={star} className='h-4 w-4 lg:h-5 lg:w-5' />
                                </div>
                                
                                <p className="text-3xl lg:text-6xl font-medium">
                                    {thisContractor && thisContractor.rating ? thisContractor.rating : 0}
                                    <span className='text-gray-400 font-medium text-sm lg:text-2xl'>/5</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className='px-4 lg:px-6'>
                            <p className="text-sm lg:text-lg text-gray-500">Badges</p>

                            <div className="flex items-end mt-2 lg:mt-4">
                                <div className="bg-blue-600 rounded-full w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center mr-3">
                                    <img src={badge} className='h-4 w-3 lg:h-5 lg:w-5' />
                                </div>
                                
                                <p className="text-3xl lg:text-6xl font-medium">
                                    {thisContractor && thisContractor.badge_count}<span className='text-gray-400 font-medium text-sm lg:text-2xl'>/5</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className='mt-10'>
                    <p className="font-bold">Shifts</p>

                    <div className="bg-white p-6 rounded-lg mb-8">
                        <div className="flex justify-between items-center w-full mb-6 cursor-pointer" onClick={() => setShiftTab('all')}>
                            <p className={`font-semibold text-sm mr-8 lg:mr-2 
                                ${shiftTab === 'all' ? 'text-blue-600' : 'text-gray-600'}`} >
                                All Shifts
                            </p>

                            <div className={`flex justify-center items-center py-1 px-4 rounded-full text-sm font-semibold
                                ${shiftTab === 'all' ? 'bg-blue-600 text-white' : 'text-blue-500 bg-blue-100'}`}>
                                {allShifts && allShifts.length ? allShifts.length : 0}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center w-full mb-6 cursor-pointer" onClick={() => setShiftTab('accepted')}>
                            <p className={`font-semibold text-sm mr-8 lg:mr-2 
                                ${shiftTab === 'accepted' ? 'text-blue-600' : 'text-gray-600'}`} >
                                Accepted Shifts
                            </p>

                            <div className={`flex justify-center items-center py-1 px-4 rounded-full text-sm font-semibold
                                ${shiftTab === 'accepted' ? 'bg-blue-600 text-white' : 'text-black bg-white border border-black'}`}>
                                {acceptedShifts && acceptedShifts.length ? acceptedShifts.length : 0}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center w-full mb-6 cursor-pointer" onClick={() => setShiftTab('completed')}>
                            <p className={`font-semibold text-sm mr-8 lg:mr-2
                                ${shiftTab === 'completed' ? 'text-blue-600' : 'text-gray-600'}`}>
                                Completed Shifts
                            </p>

                            <div className={`flex justify-center items-center py-1 px-4 rounded-full text-sm font-semibold
                                ${shiftTab === 'completed' ? 'bg-blue-600 text-white' : 'text-green-500 bg-green-100'}`}>
                                {completedShifts && completedShifts.length ? completedShifts.length : 0}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center w-full mb-6 cursor-pointer" onClick={() => setShiftTab('upcoming')}>
                            <p className={`font-semibold text-sm mr-8 lg:mr-2
                                ${shiftTab === 'upcoming' ? 'text-blue-600' : 'text-gray-600'}`}>
                                Upcoming Shifts
                            </p>

                            <div className={`flex justify-center items-center py-1 px-4 rounded-full text-sm font-semibold
                                ${shiftTab === 'upcoming' ? 'bg-blue-600 text-white' : 'text-yellow-500 bg-yellow-100'}`}>
                                {upcomingShifts && upcomingShifts.length ? upcomingShifts.length : 0}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center w-full mb-2 cursor-pointer" onClick={() => setShiftTab('cancelled')}>
                            <p className={`text-gray-600 font-semibold text-sm mr-8 lg:mr-2
                                ${shiftTab === 'cancelled' ? 'text-blue-600' : 'text-gray-600'}`}>
                                Cancelled Shifts
                            </p>

                            <div className={`flex justify-center items-center py-1 px-4 rounded-full text-sm font-semibold
                                ${shiftTab === 'cancelled' ? 'bg-blue-600 text-white' : 'text-pink-500 bg-pink-100'}`}>
                                {cancelledShifts && cancelledShifts.length ? cancelledShifts.length : 0} 
                            </div>
                        </div>
                    </div>


                    <p className="font-bold">Certifications</p>

                    <div className="flex flex-wrap items-center mb-8">
                        {
                            props.profile.certificates && props.profile.certificates.length ? 
                                props.profile.certificates.map((cert, i) => {
                                    return (
                                        <div className="px-2 py-1 text-sm border border-black cursor-pointer rounded-full 
                                            flex justify-center items-center mr-2 my-1 inline" onClick={() => setOpenDocument(cert.url)}>
                                            {certificateType(cert.certificate_type_id) ? certificateType(cert.certificate_type_id).name : ''}
                                        </div>
                                    )
                                })
                            :
                                <p className="text-sm text-gray-400 py-2">No certificates</p>
                        }
    
                    </div>


                    <p className="font-bold">Work Verification</p>

                    <div className="flex flex-wrap items-center mb-8">
                        {
                            props.profile.documents.length === 3 ? 
                                <div className="px-2 py-1 text-sm border border-black cursor-pointer 
                                    rounded-full flex justify-center items-center mr-2 my-1 inline">
                                    <span className="mr-1">{props.profile.documents.length} of 3</span>
                                    <img src={verify} className='w-6 h-6' />
                                </div>
                            :
                                <div className="px-2 py-1 text-sm border border-black cursor-pointer 
                                    rounded-full flex justify-center items-center mr-2 my-1 inline">
                                    <span className="mr-1">{props.profile.documents.length} of 3</span>
                                    <img src={unverified} className='w-6 h-6' />
                                </div>
                        }

                        {
                            props.profile && props.profile.documents.length ?
                                props.profile.documents.map((doc, i) => {
                                    return (
                                        <div className="px-2 py-1 text-sm border border-black cursor-pointer 
                                            rounded-full flex justify-center items-center mr-2 my-1 inline" onClick={() => setOpenDocument(doc.url)}>
                                            <span className="mr-1">{i+1}</span>
                                        </div>
                                    )
                                })
                            :
                                null
                        }
                        
                    </div>

                    <div className='mt-4 mb-8'>
                        {
                            props.profile && props.profile.verified ? 
                            <div className='flex items-center'>
                                <img src={verify} className='w-6 h-6 mr-1' />
                                <p className="text-sm">
                                    Contractor Verified
                                </p> 
                            </div>
                            :
                            <button className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold" 
                                onClick={verifyContractor}>
                                Verify Contractor
                            </button>
                        }
                    </div>
                </div>
                
                <div className="mt-10 col-span-3">
                    {
                        pageLoading ? 
                            <div className=" p-12">
                                <div className="w-full flex">
                                    <CircularProgress className='mx-auto'/>
                                </div>
                                
                                <p className="mt-4 text-sm text-blue-700 font-semibold text-center">Just a moment</p>
                            </div>
                        :   
                            <div>
                                {
                                    shiftTab === 'all' ?
                                        <>
                                            <p className="font-bold">All Shifts</p>

                                            <div className="overflow-scroll bg-white rounded-lg p-4">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                ID
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Date
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Shift Role
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hotel
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Total Pay
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            allShifts && allShifts.length ? 
                                                                allShifts.map((shift, i) => {
                                                                    return (
                                                                        <tr key={shift.id}>
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.id}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {moment(shift.startTime).format('ll')}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.hotel.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> ${shift.pay}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <div className={`flex justify-center items-center p-1 rounded-full text-sm
                                                                                    ${shift.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : ''} 
                                                                                    ${shift.status === 'COMPLETED' ? 'bg-green-100 text-green-600' : ''} 
                                                                                    ${shift.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : ''} 
                                                                                    `}>
                                                                                    {shift.status}
                                                                                </div> 
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            :
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <p className="text-center fnt-semibold text-gray-400 my-6">No shifts available</p>
                                                                    </td>
                                                                </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    :
                                        null
                                }

                                {
                                    shiftTab === 'completed' ?
                                        <>
                                            <p className="font-bold">Completed Shifts</p>

                                            <div className="overflow-scroll bg-white rounded-lg p-4">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                ID
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Date
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Shift Role
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hotels
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Total Pay
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            completedShifts && completedShifts.length ?
                                                                completedShifts.map((shift, i) => {
                                                                    return (
                                                                        <tr key={shift.id}>
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.id}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {moment(shift.startTime).format('ll')}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.hotel.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> 
                                                                                    ${shift.pay}  
                                                                                </p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <div className={`flex justify-center items-center p-1 rounded-full 
                                                                                    text-sm bg-green-100 text-green-600 `}>
                                                                                    Completed
                                                                                </div> 
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            :
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <p className="text-center fnt-semibold text-gray-400 my-6">No shifts available</p>
                                                                    </td>
                                                                </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    :
                                        null
                                }
                                
                                {
                                    shiftTab === 'accepted' ?
                                        <>
                                            <p className="font-bold">Accepted Shifts</p>

                                            <div className="overflow-scroll bg-white rounded-lg p-4">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                ID
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Date
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Shift Role
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hotels
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Total Pay
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            acceptedShifts && acceptedShifts.length ?
                                                            acceptedShifts.map((shift, i) => {
                                                                    return (
                                                                        <tr key={shift.id}>
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.id}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {moment(shift.startTime).format('ll')}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.hotel.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> 
                                                                                    ${shift.pay}
                                                                                </p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <div className={`flex justify-center items-center p-1 rounded-full 
                                                                                    text-sm bg-white text-black border border-black`}>
                                                                                    Accepted
                                                                                </div> 
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            :
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <p className="text-center fnt-semibold text-gray-400 my-6">No shifts available</p>
                                                                    </td>
                                                                </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    :
                                        null
                                }
                                
                                {
                                    shiftTab === 'upcoming' ?
                                        <>
                                            <p className="font-bold">Upcoming Shifts</p>

                                            <div className="overflow-scroll bg-white rounded-lg p-4">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                ID
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Date
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Shift Role
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hotels
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hourly Pay
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            upcomingShifts && upcomingShifts.length ?
                                                                upcomingShifts.map((shift, i) => {
                                                                    return (
                                                                        <tr key={shift.id}>
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.id}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {moment(shift.startTime).format('ll')}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.hotel.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> 
                                                                                    ${getHourlyRate(shift.pay, shift.startTime, shift.endTime)}
                                                                                </p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <div className={`flex justify-center items-center p-1 rounded-full 
                                                                                    text-sm bg-yellow-100 text-yellow-600 `}>
                                                                                    Scheduled
                                                                                </div> 
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            :
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <p className="text-center fnt-semibold text-gray-400 my-6">No shifts available</p>
                                                                    </td>
                                                                </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    :
                                        null
                                }

                                {
                                    shiftTab === 'cancelled' ?
                                        <>
                                            <p className="font-bold">Cancelled Shifts</p>

                                            <div className="overflow-x-scroll overflow-y-visible bg-white rounded-lg p-4 pb-48">
                                                <table className="min-w-full">
                                                    <thead className="bg-white">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                ID
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Date
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Shift Role
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hotels
                                                            </th>
                                                        
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Hourly Pay
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                Status
                                                            </th>
                                                            
                                                            <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            cancelledShifts && cancelledShifts.length ?
                                                                cancelledShifts.map((shift, i) => {
                                                                    return (
                                                                        <tr key={shift.id}>
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.id}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {moment(shift.startTime).format('ll')}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm"> {shift.hotel.name}</p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <p className="text-sm text-center"> 
                                                                                    -
                                                                                </p>
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <div className={`flex justify-center items-center p-1 rounded-full 
                                                                                    text-sm bg-red-100 text-red-600 `}>
                                                                                    Cancelled
                                                                                </div> 
                                                                            </td>
                                                                            
                                                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                                                <div className="text-sm cursor-pointer">
                                                                                    <img src={edit} className='h-6 w-6' onClick={() => selectMsg('msga1')}/>


                                                                                    <div className="relative">
                                                                                        {
                                                                                            currentMsg === 'msga1' ? 
                                                                                                <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-80 p-2 border border-gray-300">
                                                                                                    <p className="text-lg font-bold block">Note</p>

                                                                                                    <div className="">
                                                                                                        <p className="text-sm whitespace-normal">
                                                                                                            Wont be able to attend my shift because my wife was sick. and i have to stay with her at the hospital. Cheers.
                                                                                                        </p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            :
                                                                                                null
                                                                                        }
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            :
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <p className="text-center fnt-semibold text-gray-400 my-6">No shifts available</p>
                                                                    </td>
                                                                </tr>
                                                        }
                                                       
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    :
                                        null
                                }
                            </div>
                    }

                </div>
            </div>

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
                                                contractorReviews && contractorReviews.length  ?
                                                contractorReviews.map((review, index) => {
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
                                            contractorReviews && contractorReviews.length  ?
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
                openDocument ?
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
                                            onClick={() => setOpenDocument(null)}>
                                            x
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between mb-4'>
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {/* <img className="h-10 w-10 rounded-full"
                                                src={avatar}
                                                /> */}
                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-4 uppercase
                                                    flex items-center justify-center font-medium no-wrap">
                                                        {thisContractor && thisContractor.owner.firstname.charAt(0)}{thisContractor && thisContractor.owner.lastname.charAt(0)}
                                                </div>
                                            </div>

                                            <div className="text-sm ml-2">
                                                {thisContractor && thisContractor.owner.firstname ? thisContractor.owner.firstname : ''} &nbsp;
                                                {thisContractor && thisContractor.owner.lastname ? thisContractor.owner.lastname : ''}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bg-gray-100 rounded-lg p-4'>
                                        {/* <p className="text-center text-blue-500 my-4 font-semibold">Print Label 040021 (1).pdf</p> */}

                                        <div className="flex justify-center">
                                            <img src={openDocument} className='h-72' />
                                        </div>

                                        {/* <p className="text-center text-blue-500 my-4 font-semibold">Expires: 01/2021</p> */}
                                    </div>

                                    {/* <div className="flex justify-center items-center my-4">
                                        <button className="bg-red-500 px-4 py-3 rounded-lg text-white font-semibold mr-4">
                                            Decline
                                        </button>
                                        
                                        <button className="bg-blue-500 px-4 py-3 rounded-lg text-white font-semibold">
                                            Accept
                                        </button>
                                    </div> */}
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

export default Contractor