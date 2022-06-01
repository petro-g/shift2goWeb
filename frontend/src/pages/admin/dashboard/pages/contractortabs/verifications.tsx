import React, { ReactElement, useEffect, useState } from 'react'
import Contractor from './contractor'

import review from '@assets/icons/reviews.png'
import verified from '@assets/icons/verified.png'
import unverified from '@assets/icons/unverified.png'
import menu from '@assets/icons/menu.png'
import pen from '@assets/icons/pen.png'
import info from '@assets/icons/info.png'
import cancel from '@assets/icons/cancel.png'
import avatar from '@assets/icons/admin.png'
import cert from '@assets/cert.png'
import { baseUrl, useMergeState } from '@utils/helpers'
import Moment from 'moment'
import { BsChevronRight } from 'react-icons/bs'
import { CircularProgress } from '@material-ui/core'


const VerificationsTab = () => {
    const [verType, setVerType] = useState('verified')
    const [showVer, setShowVer] = useState(null)
    const [showUnver, setShowUnver] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)
    const [allVerifications, setAllVerifications] = useState(null)
    const [verified, setVerified] = useState(null)
    const [unVerified, setUnverified] = useState(null)

    const approvePermit = (permit) => {
        let token = localStorage.getItem('token')
        let raw = {
            'id': permit.id,
            'verified': true
        }

        var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json"); 
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/document/update/${permit.id}`,
		{
			method: 'PATCH',
			headers: myHeaders,
			redirect: 'follow',
            body: JSON.stringify(raw)
		})
		.then(response => response.text())
		.then((result) => {
            console.log(JSON.parse(result))
            getAllVerifications(token)
            setShowVer(null)
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
    }

    const getAllVerifications = (token) => {
        var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/documents`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)
            let allVerifications = JSON.parse(result)
            console.log(JSON.parse(result))
            setAllVerifications(allVerifications)

            let ver = []
            let unver = []

            for (let i=0; i<allVerifications.length; i++) {
                if (allVerifications[i].verified === true) {
                    ver.push(allVerifications[i])
                } else {
                    unver.push(allVerifications[i])
                }
            }

            setVerified(ver)
            setUnverified(unver)
            console.log(ver)
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token')

        setPageLoading(true)
        getAllVerifications(localToken)
    }, [])

    return (
        <>
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
                        <div className='flex flex-wrap items-center justify-center md:justify-start border-b border-gray-200'>
                            <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                ${verType === 'verified' ?  'border-b-2 border-blue-500' : ''}`}
                                onClick={() => setVerType('verified')}>
                                <p className={`font-bold mr-4 text-sm
                                    ${verType === 'verified' ? 'text-blue-600' : 'text-gray-300'}`}>
                                        Verified Work Permits
                                </p>

                                <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                    ${verType === 'verified' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                    {verified ? verified.length : 0}
                                </div>
                            </div>
                            
                            <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                ${verType === 'unverified' ? 'border-b-2 border-blue-500' : ''}`}
                                onClick={() => setVerType('unverified')}>
                                <p className={`font-bold mr-4 text-sm
                                    ${verType === 'unverified' ? 'text-black' : 'text-gray-300'}`}>
                                        Unverified Work Permits
                                </p>

                                <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                    ${verType === 'pending' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                    {unVerified ? unVerified.length : 0}
                                </div>
                            </div>
                        </div>


                        {
                            verType === 'verified' ? 
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                        <div className="border-b border-gray-200 sm:rounded-lg pb-8" >
                                            <table className="min-w-full overflow-scroll">
                                                <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            Contractor
                                                        </th>

                                                        {/* <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                            Job Role 
                                                        </th> */}

                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                            Certificate
                                                        </th>

                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                            Uploaded Files
                                                        </th> 

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            Date Uploaded
                                                        </th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className='bg-white'>
                                                    {
                                                        verified && verified.length ?
                                                            verified.map((verification, i) => {
                                                                return (
                                                                    <tr key={verification.id}>
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                    <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                        flex items-center justify-center font-medium text-lg no-wrap">
                                                                                            {verification.owner.firstname.charAt(0)}
                                                                                            {verification.owner.lastname.charAt(0)}
                                                                                    </div>
                                                                                </div>
                
                                                                                <div className="text-sm ml-2">
                                                                                    {verification.owner.firstname} {verification.owner.lastname}
                                                                                </div>
                                                                            </div>
                                                                        </td>
{/*                 
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                Contractor
                                                                            </div>
                                                                        </td>*/}
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                Document
                                                                            </div>
                                                                        </td>
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                <div className="flex items-center">
                                                                                    {/* <div className="bg-yellow-100 text-yellow-500 rounded-lg font-semibold 
                                                                                        text-sm flex justify-between items-center px-4 py-3 mr-2">
                                                                                        PDF
                                                                                    </div> */}
                                                                                    <p className="text-green-500 text-sm font-semibold">
                                                                                        Document File
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td> 
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                {Moment(verification.createdAt).format('ll')}
                                                                            </div>
                                                                        </td>
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                        <   div className="py-2 px-1 rounded-md bg-gray-100 flex items-center 
                                                                                justify-center cursor-pointer" onClick={() => setShowVer(verification)}>
                                                                                <BsChevronRight className=''/>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        :
                                                            <tr>
                                                                <td colSpan={4}>
                                                                    <p className="text-center font-semibold text-gray-400 my-4">No permit available</p>
                                                                </td>
                                                            </tr>
                                                    }
                                                    {/* <tr>
                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img className="h-10 w-10 rounded-full"
                                                                    src={avatar}
                                                                    />
                                                                </div>

                                                                <div className="text-sm ml-2">
                                                                    Marilyn Manson
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="text-sm ">
                                                                Contractor
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="text-sm ">
                                                                Fossil
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="text-sm ">
                                                                <div className="flex items-center">
                                                                    <div className="bg-yellow-100 text-yellow-500 rounded-lg font-semibold 
                                                                        text-sm flex justify-between items-center px-4 py-3 mr-2">
                                                                        PDF
                                                                    </div>
                                                                    <p className="text-green-500 text-sm font-semibold">Print Label 040021 (1).pdf</p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="text-sm ">
                                                                25th May, 2021
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                        <   div className="py-2 px-1 rounded-md bg-gray-100 flex items-center 
                                                                justify-center cursor-pointer" onClick={() => setShowVer(true)}>
                                                                <BsChevronRight className=''/>
                                                            </div>
                                                        </td>
                                                    </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                        {
                            verType === 'unverified' ? 
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                        <div className="border-b border-gray-200 sm:rounded-lg pb-8" >
                                            <table className="min-w-full overflow-scroll">
                                                <thead className="bg-white">
                                                    <tr>
                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            Contractor
                                                        </th>

                                                        {/* <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                            Job Role 
                                                        </th> */}

                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                            Certificate
                                                        </th>

                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                            Uploaded Files
                                                        </th> 

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            Date Uploaded
                                                        </th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody className='bg-white'>
                                                    {
                                                        unVerified && unVerified.length ?
                                                            unVerified.map((verification, i) => {
                                                                return (
                                                                    <tr key={verification.id}>
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="flex items-center">
                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                    <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                        flex items-center justify-center font-medium text-lg no-wrap">
                                                                                            {verification.owner.firstname.charAt(0)}
                                                                                            {verification.owner.lastname.charAt(0)}
                                                                                    </div>
                                                                                </div>
                
                                                                                <div className="text-sm ml-2">
                                                                                    {verification.owner.firstname} {verification.owner.lastname}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        
                                                                        {/*<td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                Contractor
                                                                            </div>
                                                                        </td>*/}
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                Document
                                                                            </div>
                                                                        </td>
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                <div className="flex items-center">
                                                                                    {/* <div className="bg-yellow-100 text-yellow-500 rounded-lg font-semibold 
                                                                                        text-sm flex justify-between items-center px-4 py-3 mr-2">
                                                                                        PDF
                                                                                    </div> */}
                                                                                    <p className="text-green-500 text-sm font-semibold">
                                                                                        Document File
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </td> 
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                {Moment(verification.createdAt).format('ll')}
                                                                            </div>
                                                                        </td>
                
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                        <   div className="py-2 px-1 rounded-md bg-gray-100 flex items-center 
                                                                                justify-center cursor-pointer" onClick={() => setShowVer(verification)}>
                                                                                <BsChevronRight className=''/>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        :
                                                            <tr>
                                                                <td colSpan={4}>
                                                                    <p className="text-center font-semibold text-gray-400 my-4">No permit available</p>
                                                                </td>
                                                            </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                        {
                            showVer ? 
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
                                            sm:max-w-lg sm:w-full md:max-w-3xl">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="overflow-scroll" style={{maxHeight: '600px'}}>
                                                    <div className="flex justify-end">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center 
                                                            justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                                            onClick={() => setShowVer(null)}>
                                                            x
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-between mb-4'>
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                        {showVer.owner.firstname.charAt(0)}{showVer.owner.lastname.charAt(0)}
                                                                </div>
                                                            </div>

                                                            <div className="text-sm ml-2">
                                                                {showVer.owner.firstname} {showVer.owner.lastname}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='bg-gray-100 rounded-lg p-4'>
                                                        {/* <p className="text-center text-blue-500 my-4 font-semibold">
                                                            {showVer.type.name} file
                                                        </p> */}

                                                        <div className="flex justify-center">
                                                            <img src={showVer.url} className='h-72' />
                                                        </div>

                                                        {/* <p className="text-center text-blue-500 my-4 font-semibold">Expires: 01/2021</p> */}
                                                    </div>

                                                    <div className="flex justify-center items-center my-4">
                                                        <button className="bg-red-500 px-4 py-3 rounded-lg text-white font-semibold mr-4">
                                                            Decline
                                                        </button>
                                                        <button className="bg-blue-500 px-4 py-3 rounded-lg text-white font-semibold" 
                                                            onClick={() => approvePermit(showVer)}>
                                                            Approve
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }
                        {
                            showUnver ? 
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
                                            sm:max-w-lg sm:w-full md:max-w-3xl">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="overflow-scroll" style={{maxHeight: '600px'}}>
                                                    <div className="flex justify-end">
                                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center 
                                                            justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                                            onClick={() => setShowUnver(false)}>
                                                            x
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-between mb-4'>
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full"
                                                                src={avatar}
                                                                />
                                                            </div>

                                                            <div className="text-sm ml-2">
                                                                Arknis Onazi
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='bg-gray-100 rounded-lg p-4'>
                                                        <p className="text-center text-blue-500 my-4 font-semibold">Print Label 040021 (1).pdf</p>

                                                        <div className="flex justify-center">
                                                            <img src={cert} className='h-72' />
                                                        </div>

                                                        <p className="text-center text-blue-500 my-4 font-semibold">Expires: 01/2021</p>
                                                    </div>

                                                    <div className="flex justify-center items-center my-4">
                                                        <button className="bg-red-500 px-4 py-3 rounded-lg text-white font-semibold mr-4">
                                                            Decline
                                                        </button>
                                                        
                                                        <button className="bg-blue-500 px-4 py-3 rounded-lg text-white font-semibold">
                                                            Accept
                                                        </button>
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
            }
        </>
    )
}

export default VerificationsTab