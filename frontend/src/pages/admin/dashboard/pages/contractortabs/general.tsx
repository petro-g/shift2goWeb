import React, { ReactElement, useEffect, useState } from 'react'
import Contractor from './contractor'

import review from '@assets/icons/reviews.png'
import verified from '@assets/icons/verified.png'
import unverified from '@assets/icons/unverified.png'
import menu from '@assets/icons/menu.png'
import pen from '@assets/icons/pen.png'
import info from '@assets/icons/info.png'
import cancel from '@assets/icons/cancel.png'
import {baseUrl, useMergeState} from '@utils/helpers'
import Moment from 'moment'
import { CircularProgress } from '@material-ui/core'
import ReactPaginate from 'react-paginate';
// import {getCertificates, getCertificateType} from '@utils/helpers'


const GeneralTab = (props) => {
    const [contractorType, setContractorType] = useState('all')
    const [openMenu, setOpenMenu] = useState(null)
    const [currentMenu, setCurrentMenu] = useState('')
    const [contProfile, setContProfile] = useState(null)
    const [pageLoading, setPageLoading] = useState(false)
    const [allCert, setAllCert] = useState(null)
    const [deleteUser, setDeleteUser] = useState(null)

    const localToken = localStorage.getItem('token')

    const selectMenu = (menuItem) => {
        if (currentMenu === menuItem) {
            setCurrentMenu('')
        } else {
            setCurrentMenu(menuItem)
        }
    }

    const showContractorProfile = (item) => {
        setContProfile(item)
    }

    const [allContractors, setAllContractors] = useState(null)
    const [vContractors, setVContractors] = useState(null)
    const [uContractors, setUContractors] = useState(null)
    
	const getAllContractors = (token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/contractors?page=${state.currentPage}`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)
            const allContractors = JSON.parse(result);
            setAllContractors(allContractors)

            let verified = []
            let unverified = []

            for(let i=0; i<allContractors.length; i++) {
                if(allContractors[i].verified) {
                    verified.push(allContractors[i])
                } else {
                    unverified.push(allContractors[i])
                }
            }

            setVContractors(verified)
            setUContractors(unverified)

            setState({
                pageCount: Math.ceil(allContractors.length / state.perPage),
            })
		})
		.catch((error) => {
            setPageLoading(false)
            console.error('error', error)
        })
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
            props.getAllContractors(localToken)
        });
    };

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
            console.error('error', error);
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

    const promptDelete = (contractor) => {
        setDeleteUser(contractor)
    }

    const deleteContractor = (contractor) => {

        let token = localStorage.getItem('token')
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + token);

        fetch(baseUrl + `/v1/contractor/delete/${contractor.id}`,
            {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            }
        )
            .then(response => response.text())
            .then((result) => {
                setDeleteUser(null)
                setCurrentMenu('')
                props.getAllContractors(localToken)
            })
            .catch((error) => {
                console.error('error', error);
            })
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token')
        setPageLoading(true)

        props.getAllContractors(localToken)
        getCertificates()

    }, [])

    return (
        <div key={props.all}>
            {
                props.loading ? 
                    <div className=" p-12">
                        <div className="w-full flex">
                            <CircularProgress className='mx-auto'/>
                        </div>
                        
                        <p className="mt-4 text-sm text-blue-700 font-semibold text-center">Just a moment</p>
                    </div>
                :
                <div>
                    {
                        contProfile ? 
                            <Contractor profile={contProfile} back={setContProfile}/>
                        :
                            <>
                                <div className='flex flex-wrap items-center justify-center md:justify-start border-b border-gray-200'>
                                    <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                        ${contractorType === 'all' ?  'border-b-2 border-blue-500' : ''}`}
                                        onClick={() => setContractorType('all')}>
                                        <p className={`font-bold mr-4 text-sm
                                            ${contractorType === 'all' ? 'text-blue-600' : 'text-gray-300'}`}>
                                                All Contractors
                                        </p>

                                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                            ${contractorType === 'all' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                            {props.all && props.all.length ? props.all.length : 0}
                                        </div>
                                    </div>
                                    
                                    <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                        ${contractorType === 'verified' ? 'border-b-2 border-blue-500' : ''}`}
                                        onClick={() => setContractorType('verified')}>
                                        <p className={`font-bold mr-4 text-sm
                                            ${contractorType === 'verified' ? 'text-black' : 'text-gray-300'}`}>
                                                Verified Contractors
                                        </p>

                                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                            ${contractorType === 'verified' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                            {props.vfContractors && props.vfContractors.length ? props.vfContractors.length : 0}
                                        </div>
                                    </div>
                                    
                                    <div className={`flex py-3 justify-between items-center cursor-pointer
                                        ${contractorType === 'unverified' ? 'border-b-2 border-blue-500' : ''}`}
                                        onClick={() => setContractorType('unverified')}>
                                        <p className={`font-bold mr-4 text-sm
                                            ${contractorType === 'unverified' ? 'text-black' : 'text-gray-300'}`}>
                                                Unverified Contractors
                                        </p>

                                        <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                            ${contractorType === 'unverified' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                            {props.unvfContractors && props.unvfContractors.length ? props.unvfContractors.length : 0}
                                        </div>
                                    </div>
                                </div>

                                {
                                    contractorType === 'all' ?
                                        <div>
                                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
                                                    <div className="border-b border-gray-200 sm:rounded-lg pb-8" >
                                                        <table className="min-w-full overflow-scroll">
                                                            <thead className="bg-white">
                                                                <tr>
                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        
                                                                    </th>
                                                                    
                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        Contractor
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                                        Job Role 
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                        Date Joined
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                        Shift Completed
                                                                    </th>

                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        Ratings
                                                                    </th>

                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="bg-white">
                                                                {
                                                                    props.all && props.all.length ?
                                                                        props.all.map((contractor, i) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm font-semibold" >
                                                                                            {i+1}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="flex items-center">
                                                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                                                {
                                                                                                    contractor.profilePicture ? 
                                                                                                    <img className="h-10 w-10 rounded-full mr-2" src={contractor.profilePicture}/>
                                                                                                    :
                                                                                                    <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                                        flex items-center justify-center font-medium text-lg no-wrap">
                                                                                                            {contractor.owner.firstname.charAt(0)}
                                                                                                    </div>
                                                                                                }
                                                                                            
                                                                                            </div>

                                                                                            <div className="text-sm ml-2">
                                                                                                {contractor.owner.firstname} {contractor.owner.lastname}
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm ">
                                                                                            {contractor.roles[0] ? contractor.roles[0].name : '---'}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm ">
                                                                                            {Moment(contractor.createdAt).format('ll')}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm ">
                                                                                            {contractor.completedShiftsCount ? contractor.completedShiftsCount : 0}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="flex items-center">
                                                                                            <img src={review} className='h-6 w-6 mr-3' />

                                                                                            <p>{contractor.rating ? contractor.rating : 0}/5</p>
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <img src={menu} className='h-5 cursor-pointer px-2' onClick={() => selectMenu('menua'+i)}/>

                                                                                       { currentMenu === 'menua'+i && <div
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            height: "100%",
                                                                                            position: "absolute",
                                                                                            top: 0,
                                                                                            left: 0,
                                                                                            zIndex: 1,
                                                                                        }}
                                                                                        onClick={() => setCurrentMenu('') }
                                                                                        ></div>}

                                                                                        <div className="relative">
                                                                                            
                                                                                            {
                                                                                                currentMenu === 'menua'+i ? 
                                                                                                    <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-48 p-2
                                                                                                        flex justify-between items-center border border-gray-300" style={{zIndex: 100}}>
                                                                                                        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md" 
                                                                                                        onClick={() => {setCurrentMenu('');showContractorProfile(contractor)}} >
                                                                                                            <img src={info} className='h-4 w-4 mr-1' />

                                                                                                            <p className="text-blue-500 font-semibold text-sm" >Info</p>
                                                                                                        </div>
                                                                                                        
                                                                                                        {/*<div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">*/}
                                                                                                        {/*    <img src={pen} className='h-4 w-4 mr-1' />*/}

                                                                                                        {/*    <p className="text-blue-500 font-semibold text-sm">Edit</p>*/}
                                                                                                        {/*</div>*/}
                                                                                                        
                                                                                                        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                                                                                                            onClick={() => {setCurrentMenu('');promptDelete(contractor)}}>
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
                                                                                <p className="text-center font-semibold text-gray-400 my-4">No contractor available</p>
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

                                        </div>
                                    :
                                        null
                                }

                                {
                                    contractorType === 'verified' ?
                                        <div>
                                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4 pb-10">
                                                    <div className="border-b border-gray-200 sm:rounded-lg" >
                                                        
                                                        <table className="min-w-full overflow-x-scroll ">
                                                            <thead className="bg-white">
                                                                <tr>
                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        Contractor
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                                        Job Role 
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                        Certification
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                        Bank Details
                                                                    </th>

                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        Work Permit
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="bg-white">
                                                                {
                                                                    props.vfContractors && props.vfContractors.length ?
                                                                        props.vfContractors.map((contractor, i) =>{
                                                                            return (
                                                                                <tr>
                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="flex items-center">
                                                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                                                {
                                                                                                    contractor.profilePicture ? 
                                                                                                    <img className="h-10 w-10 rounded-full mr-2" src={contractor.profilePicture}/>
                                                                                                    :
                                                                                                    <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                                        flex items-center justify-center font-medium text-lg no-wrap">
                                                                                                            {contractor.owner.firstname.charAt(0)}
                                                                                                    </div>
                                                                                                }
                                                                                            
                                                                                            </div>

                                                                                            <div className="text-sm ml-2">
                                                                                                {contractor.owner.firstname} {contractor.owner.lastname}
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm ">
                                                                                            {contractor.roles[0] ? contractor.roles[0].name : '---'}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm flex items-center">
                                                                                            {
                                                                                                contractor.certificates && contractor.certificates.length ? 
                                                                                                    contractor.certificates.map((cert) => {
                                                                                                        return (
                                                                                                            <div className="rounded-full bg-blue-100 text-blue-500 
                                                                                                                px-4 py-1 text-sm font-semibold mr-2">
                                                                                                                {certificateType(cert.certificate_type_id).name}
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                :
                                                                                                    <p>---</p>
                                                                                            }
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="text-sm ">
                                                                                            {
                                                                                                contractor.bank && contractor.bank.accountNumber ? 
                                                                                                    <div className="text-sm bg-green-100 text-green-600 rounded py-1 px-4 
                                                                                                        inline-block font-semibold">
                                                                                                        Completed
                                                                                                    </div>
                                                                                                :
                                                                                                    <div className="text-sm bg-red-100 text-red-600 rounded py-1 px-4 
                                                                                                        inline-block font-semibold">
                                                                                                        Incomplete
                                                                                                    </div>
                                                                                            }
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <div className="inline-block">
                                                                                            <div className="flex items-center border border-black rounded-full p-2">
                                                                                                <p className="text-sm mr-2">{contractor.documents.length} of 3</p>

                                                                                                <img src={contractor.documents.length === 3 ? verified : unverified} className='h-5 w-5 ' />
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>

                                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                                        <img src={menu} className='h-5 cursor-pointer px-2' onClick={() => selectMenu('menua'+i)}/>
                                                                                        { currentMenu === 'menua'+i && <div
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            height: "100%",
                                                                                            position: "absolute",
                                                                                            top: 0,
                                                                                            left: 0,
                                                                                            zIndex: 1,
                                                                                        }}
                                                                                        onClick={() => setCurrentMenu('') }
                                                                                        ></div>}

                                                                                        <div className="relative">
                                                                                            
                                                                                            {
                                                                                                currentMenu === 'menua'+i ? 
                                                                                                    <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-48 p-2
                                                                                                    flex justify-between items-center border border-gray-300" style={{zIndex: 100}}>
                                                                                                        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                                                                                                            onClick={() => {setCurrentMenu('');showContractorProfile(contractor)}} >
                                                                                                            <img src={info} className='h-4 w-4 mr-1' />

                                                                                                            <p className="text-blue-500 font-semibold text-sm">Info</p>
                                                                                                        </div>
                                                                                                        
                                                                                                        {/* <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                                            <img src={pen} className='h-4 w-4 mr-1' />

                                                                                                            <p className="text-blue-500 font-semibold text-sm">Edit</p>
                                                                                                        </div> */}
                                                                                                        
                                                                                                        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                                                                                                            onClick={() => {setCurrentMenu(''); promptDelete(contractor)}}>
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
                                                                                <p className="text-center font-semibold text-gray-400 my-4">No contractor available</p>
                                                                            </td>
                                                                        </tr>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        null
                                }

                                {
                                    contractorType === 'unverified' ?
                                        <div>
                                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4 pb-10">
                                                    <div className="border-b border-gray-200 sm:rounded-lg" >
                                                        
                                                        <table className="min-w-full overflow-x-scroll ">
                                                            <thead className="bg-white">
                                                                <tr>
                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        Contractor
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 " >
                                                                        Job Role 
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                        Certification
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
                                                                        Bank Details
                                                                    </th>

                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        Work Permit
                                                                    </th>

                                                                    <th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
                                                                        
                                                                    </th>
                                                                </tr>
                                                            </thead>

                                                            <tbody className="bg-white">
                                                                    {
                                                                        props.unvfContractors && props.unvfContractors.length ?
                                                                            props.unvfContractors.map((contractor, i) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                            <div className="flex items-center">
                                                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                                                    {
                                                                                                        contractor.profilePicture ? 
                                                                                                        <img className="h-10 w-10 rounded-full mr-2" src={contractor.profilePicture}/>
                                                                                                        :
                                                                                                        <div className="bg-yellow-400 rounded-full w-10 h-10 mr-2 uppercase
                                                                                                            flex items-center justify-center font-medium text-lg no-wrap">
                                                                                                                {contractor.owner.firstname.charAt(0)}
                                                                                                        </div>
                                                                                                    }
                                                                                                
                                                                                                </div>

                                                                                                <div className="text-sm ml-2">
                                                                                                    {contractor.owner.firstname} {contractor.owner.lastname}
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                            <div className="text-sm ">
                                                                                                {contractor.roles[0] ? contractor.roles[0].name : '---'}
                                                                                            </div>
                                                                                        </td>

                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                            <div className="text-sm flex items-center">
                                                                                                {
                                                                                                    contractor.certificates && contractor.certificates.length ? 
                                                                                                        contractor.certificates.map((cert) => {
                                                                                                            return (
                                                                                                                <div className="rounded-full bg-blue-100 text-blue-500 
                                                                                                                    px-4 py-1 text-sm font-semibold mr-2">
                                                                                                                    {certificateType(cert.certificate_type_id).name}
                                                                                                                </div>
                                                                                                            )
                                                                                                        })
                                                                                                    :
                                                                                                        <p>---</p>
                                                                                                }
                                                                                            </div>
                                                                                        </td>

                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                            <div className="text-sm ">
                                                                                                {
                                                                                                    contractor.bank && contractor.bank.accountNumber ? 
                                                                                                        <div className="text-sm bg-green-100 text-green-600 rounded py-1 px-4 
                                                                                                            inline-block font-semibold">
                                                                                                            Completed
                                                                                                        </div>
                                                                                                    :
                                                                                                        <div className="text-sm bg-red-100 text-red-600 rounded py-1 px-4 
                                                                                                            inline-block font-semibold">
                                                                                                            Incomplete
                                                                                                        </div>
                                                                                                }
                                                                                            </div>
                                                                                        </td>

                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                            <div className="inline-block">
                                                                                                <div className="flex items-center border border-black rounded-full p-2">
                                                                                                    <p className="text-sm mr-2">{contractor.documents.length} of 3</p>

                                                                                                    <img src={contractor.documents.length === 3 ? verified : unverified} className='h-5 w-5 ' />
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>

                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                            <img src={menu} className='h-5 cursor-pointer px-2' onClick={() => selectMenu('menua'+i)}/>
                                                                                           
                                                                                            { currentMenu === 'menua'+i && <div
                                                                                                style={{
                                                                                                    width: "100%",
                                                                                                    height: "100%",
                                                                                                    position: "absolute",
                                                                                                    top: 0,
                                                                                                    left: 0,
                                                                                                    zIndex: 1,
                                                                                                }}
                                                                                                onClick={() => setCurrentMenu('') }
                                                                                                ></div>
                                                                                            }
                                                                                            <div className="relative">
                                                                                                
                                                                                                {
                                                                                                    currentMenu === 'menua'+i ? 
                                                                                                        <div className="absolute top-2 right-6 rounded-lg bg-gray-50 w-48 p-2 flex justify-between items-center border border-gray-300"
                                                                                                        style={{zIndex: 100}}>
                                                                                                            <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                                                <img src={info} className='h-4 w-4 mr-1' />

                                                                                                                <p className="text-blue-500 font-semibold text-sm" 
                                                                                                                onClick={() => {setCurrentMenu(''); showContractorProfile(contractor)}} >Info</p>
                                                                                                            </div>
                                                                                                            
                                                                                                            {/* <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                                                <img src={pen} className='h-4 w-4 mr-1' />

                                                                                                                <p className="text-blue-500 font-semibold text-sm">Edit</p>
                                                                                                            </div> */}
                                                                                                            
                                                                                                            <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                                                                                                            onClick={() => {setCurrentMenu(''); promptDelete(contractor)}}>
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
                                                                                    <p className="text-center font-semibold text-gray-400 my-4">No contractor available</p>
                                                                                </td>
                                                                            </tr>
                                                                    }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        null
                                }
                            </>
                    }
                </div>
            }

            {
                deleteUser ?
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
                                    <div className="overflow-scroll w-full" style={{maxHeight: '600px'}}>
                                        <div className="flex justify-end">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center
                                            justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                                 onClick={() => setDeleteUser(null)}>
                                                x
                                            </div>
                                        </div>

                                        <div className='mb-4 w-full'>
                                            <div className="">
                                                <p className="text-xl font-bold text-center my-4">
                                                    Are you sure you want to delete {deleteUser.owner.firstname} {deleteUser.owner.lastname}?
                                                </p>

                                                <p className="text-center text-gray-600">This action cannot be reversed.</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center my-4">
                                            <button className="bg-red-500 px-4 py-3 rounded-lg text-white font-semibold mr-4"
                                                onClick={() => deleteContractor(deleteUser)}>
                                                Delete
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
    )
}

export default GeneralTab