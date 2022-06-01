import React, { ReactElement, useEffect, useState } from 'react'

import GeneralTab from './contractortabs/general'
import CertificationsTab from './contractortabs/certifications'
import VerificationsTab from './contractortabs/verifications'
import { baseUrl, isObject } from '@utils/helpers'



const ContractorsBoard = () => {
    const [contractScreen, setContractScreen] = useState('general')
    const [allRoles, setAllRoles] = useState(null)
    const [filterRole, setFilterRole] = useState()
    const [roleFilter, setRoleFilter] = useState(null)
    const [pageLoading, setPageLoading] = useState(false)

    const [allContractors, setAllContractors] = useState(null)
    const [vContractors, setVContractors] = useState(null)
    const [uContractors, setUContractors] = useState(null)

    const [allFContractors, setAllFContractors] = useState(null)
    const [vFContractors, setVFContractors] = useState(null)
    const [uFContractors, setUFContractors] = useState(null)
    let token = localStorage.getItem('token')
    // const selectRoleFilter = (role) => {
       
    //    console.log(role)
    // }

    const selectRoleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = JSON.parse(event.target.value)
        // value !== 'null' ? console.log(value) : console.log('null')
        // console.log(value)
        setRoleFilter(value)

        if (value !== null) {
            filterContractorsRoles(value.name)
        } else {
            setAllFContractors(allContractors)
            setUFContractors(uContractors)
            setVFContractors(vContractors)
        }
    };

    const filterContractorsRoles = (role) => {
        let all = allContractors
        let v = vContractors
        let u = uContractors

        let allFiltered = []
        let uFiltered = []
        let vFiltered = []

        for(let i=0; i<allContractors.length; i++) {
            if(allContractors[i].roles.length && allContractors[i].roles[0].name === role) {
                allFiltered.push(allContractors[i])
            }
        }

        for(let i=0; i<vContractors.length; i++) {
            if(vContractors[i].roles.length && vContractors[i].roles[0].name === role) {
                vFiltered.push(vContractors[i])
            }
        }
        
        for(let i=0; i<uContractors.length; i++) {
            if(uContractors[i].roles.length && uContractors[i].roles[0].name === role) {
                uFiltered.push(uContractors[i])
            }
        }

        setAllFContractors(allFiltered)
        setUFContractors(uFiltered)
        setVFContractors(vFiltered)
        // console.log(allFiltered)
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

    const getAllContractors = (token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/contractors?page=1`,
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
            setAllFContractors(allContractors)

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
            setVFContractors(verified)

            setUContractors(unverified)
            setUFContractors(unverified)
            console.log(verified)
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
	}

    useEffect(() => {
        
        setPageLoading(true)

        getAllRoles(token)
        getAllContractors(token)
    }, [])

	return (
		<div className="h-full flex flex-col py-6 bg-gray-50">
            {/* <div className=" flex justify-center items-center">
                <div className="flex justify-center items-center">
                    <div className={`font-medium text-sm pb-3 cursor-pointer
                        ${contractScreen === 'general' ? 'border-b-2 border-blue-500' : 'text-gray-400'}`}
                        onClick={() => setContractScreen('general')}>
                            General
                    </div>
                    
                    <div className={`font-medium text-sm pb-3 cursor-pointer mx-6 
                        ${contractScreen === 'certifications' ? 'border-b-2 border-blue-500' : 'text-gray-400'}`}
                        onClick={() => setContractScreen('certifications')}>
                            Certification
                    </div>

                    <div className={`font-medium text-sm pb-3 cursor-pointer
                        ${contractScreen === 'verifications' ? 'border-b-2 border-blue-500' : 'text-gray-400'}`}
                        onClick={() => setContractScreen('verifications')}>
                            Work Verification
                    </div>
                </div>
            </div> */}
            
            <div className="flex flex-wrap justify-center md:justify-end items-center mt-2 pb-4 border-b border-gray-200">
                {/* <input type="text" className='rounded-full w-64 px-4 py-2 border border-gray-200 mr-3 text-sm' placeholder='Search'/> */}

                <select className='rounded-md px-4 mt-3 md:mt-0 py-2 border border-gray-200 text-sm' onChange={selectRoleFilter}>
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

            <div className="">
                {
                    contractScreen === 'general' ?
                        <GeneralTab all={allFContractors} vfContractors={vFContractors} unvfContractors={uFContractors} loading={pageLoading}
                        getAllContractors={(e) =>getAllContractors(token)}
                        />
                    :
                        null
                }
                {
                    contractScreen === 'certifications' ?
                        <CertificationsTab/>
                    :
                        null
                }
                {
                    contractScreen === 'verifications' ?
                        <VerificationsTab/>
                    :
                        null
                }
            </div>  
        </div>
    )
}

export default ContractorsBoard