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
import { baseUrl } from '@utils/helpers'
import Moment from 'moment'
import { BsChevronRight } from 'react-icons/bs'
import { CircularProgress } from '@material-ui/core'


const CertificationsTab = () => {
    const [certType, setCertType] = useState('verified')
    const [showCert, setShowCert] = useState(null)

    const [allCertificates, setAllCertificates] = useState(null)
    const [vContractors, setVContractors] = useState(null)
    const [uContractors, setUContractors] = useState(null)
    const [pageLoading, setPageLoading] = useState(false)
    const [allCert, setAllCert] = useState(null)
    
	const getAllCertificates = (token, page) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/certificates/all?page=${page}`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)
            const allCertificates = JSON.parse(result);
            setAllCertificates(allCertificates)
            console.log(allCertificates)

            let verified = []

            // for (let i=0; i<allCertificates.length; i++) {
            //     if (allCertificates[i].certificates.length) {
            //         for (let j=0; j<allCertificates[i].certificates.length; j++) {
            //             certs.push(allCertificates[i].certificates[j])
            //         }
            //     }
            // }
            // console.log(certs)

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
        setPageLoading(true)

        getAllCertificates(localToken, 1)
        // getCertificates()
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
                                ${certType === 'verified' ?  'border-b-2 border-blue-500' : ''}`}
                                onClick={() => setCertType('verified')}>
                                <p className={`font-bold mr-4 text-sm
                                    ${certType === 'verified' ? 'text-blue-600' : 'text-gray-300'}`}>
                                        Verified Certificates
                                </p>

                                <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                    ${certType === 'verified' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                    298
                                </div>
                            </div>
                            
                            {/* <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                ${certType === 'pending' ? 'border-b-2 border-blue-500' : ''}`}
                                onClick={() => setCertType('pending')}>
                                <p className={`font-bold mr-4 text-sm
                                    ${certType === 'pending' ? 'text-black' : 'text-gray-300'}`}>
                                        Pending Certificates
                                </p>

                                <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                    ${certType === 'pending' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                    298
                                </div>
                            </div> */}
                        </div>


                        {
                            certType === 'verified' ? 
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
                                                        allCertificates && allCertificates.length ?
                                                            allCertificates.map((cert, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="flex items-center">
                                                                                
                                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                                        {cert.owner.firstname.charAt(0)}{cert.owner.lastname.charAt(0)}
                                                                                </div>

                                                                                <div className="text-sm ml-2">
                                                                                    {cert.owner.firstname} {cert.owner.lastname}
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                {cert.type.name}
                                                                            </div>
                                                                        </td>

                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                <p className="text-green-500 text-sm font-semibold">
                                                                                    {cert.type.name} file
                                                                                </p>
                                                                            </div>
                                                                        </td>

                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="text-sm ">
                                                                                {Moment(cert.createdAt).format('ll')}
                                                                            </div>
                                                                        </td>

                                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                                            <div className="py-2 px-1 rounded-md bg-gray-100 flex items-center 
                                                                                justify-center cursor-pointer" onClick={() => setShowCert(cert)}>
                                                                                <BsChevronRight className=''/>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                                
                                                            })
                                                        :
                                                            <tr>
                                                                <td colSpan={6}>
                                                                    <p className="text-gray-400 font-semibold text-center my-6">No Certificates yet.</p>
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
                            certType === 'pending' ? 
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                        <div className="border-b border-gray-200 sm:rounded-lg pb-8" >
                                            <table className="min-w-full overflow-scroll">
                                                <thead className="bg-white">
                                                    <tr>
                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                            Contractor
                                                        </th>

                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                            Job Role 
                                                        </th>

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
                                                    <tr>
                                                        <td className='px-6 py-4 whitespace-nowrap'>
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
                                                                    <p className="text-blue-500 text-sm font-semibold">Print Label 040021 (1).pdf</p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="text-sm ">
                                                                25th May, 2021
                                                            </div>
                                                        </td>

                                                        <td className='px-6 py-4 whitespace-nowrap'>
                                                            <div className="py-2 px-1 rounded-md bg-gray-100 flex items-center 
                                                                justify-center cursor-pointer" onClick={() => setShowCert(true)}>
                                                                <BsChevronRight className=''/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                        }

                        {
                            showCert ? 
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
                                                            onClick={() => setShowCert(null)}>
                                                            x
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-between mb-4'>
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                    flex items-center justify-center font-medium text-lg no-wrap">
                                                                        {showCert.owner.firstname.charAt(0)}{showCert.owner.lastname.charAt(0)}
                                                                </div>
                                                            </div>

                                                            <div className="text-sm ml-2">
                                                                {showCert.owner.firstname} {showCert.owner.lastname}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='bg-gray-100 rounded-lg p-4'>
                                                        <p className="text-center text-blue-500 my-4 font-semibold">
                                                            {showCert.type.name} file
                                                        </p>

                                                        <div className="flex justify-center">
                                                            <img src={showCert.url} className='h-72' />
                                                        </div>

                                                        {/* <p className="text-center text-blue-500 my-4 font-semibold">Expires: 01/2021</p> */}
                                                    </div>

                                                    <div className="flex justify-center items-center my-4">
                                                        <button className="bg-red-500 px-4 py-3 rounded-lg text-white font-semibold mr-4">
                                                            Remove
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

export default CertificationsTab