import React, { ReactElement, useEffect, useState } from 'react'
import { BsFillBellFill, BsThreeDots } from 'react-icons/bs'
import pen from '@assets/icons/pen.png'
import info from '@assets/icons/info.png'
import cancel from '@assets/icons/cancel.png'
import Hotel from './hotelProfile'
import { CircularProgress } from '@material-ui/core'
import { baseUrl } from '@utils/helpers'

const HotelsBoard = () => {
    const [hotelTab, setHotelTab] = useState('all') 
    const [currentMenu, setCurrentMenu] = useState('') 
    const [hotelProfile, setHotelProfile] = useState(null) 
    const [pageLoading, setPageLoading] = useState(false)
    const[allHotels, setAllHotels] = useState(null)

    const selectDrop = (menuItem) => {
        if (currentMenu === menuItem) {
            setCurrentMenu('')
        } else {
            setCurrentMenu(menuItem)
        }
    }

    const showHotelProfile = (hotel) => {
        setHotelProfile(hotel)
    }

    const getAllHotels = (token) => {
		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/hotels`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            setPageLoading(false)
            const allHotels = JSON.parse(result);
            setAllHotels(allHotels)

            console.log(allHotels)
		})
		.catch((error) => {
            setPageLoading(false)
            console.log('error', error)
        })
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token')
        setPageLoading(true)

        getAllHotels(localToken)
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
                    {
                    hotelProfile ? 
                        <Hotel profile={hotelProfile} back={setHotelProfile }/>
                    :
                        <div>
                            <div className='flex flex-wrap items-center justify-center md:justify-start border-b border-gray-200'>
                                <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                    ${hotelTab === 'all' ?  'border-b-2 border-blue-500' : ''}`}
                                    onClick={() => setHotelTab('all')}>
                                    <p className={`font-bold mr-4 text-sm
                                        ${hotelTab === 'all' ? 'text-blue-600' : 'text-gray-300'}`}>
                                            All Hotels
                                    </p>

                                    <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                        ${hotelTab === 'all' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                        {allHotels && allHotels.length ? allHotels.length : 0}
                                    </div>
                                </div>
                                
                                {/* <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                    ${hotelTab === 'verified' ? 'border-b-2 border-blue-500' : ''}`}
                                    onClick={() => setHotelTab('verified')}>
                                    <p className={`font-bold mr-4 text-sm
                                        ${hotelTab === 'verified' ? 'text-black' : 'text-gray-300'}`}>
                                            Verified Hotels
                                    </p>

                                    <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                        ${hotelTab === 'verified' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                        298
                                    </div>
                                </div>
                                
                                <div className={`flex py-3 justify-between items-center mr-8 cursor-pointer
                                    ${hotelTab === 'unverified' ? 'border-b-2 border-blue-500' : ''}`}
                                    onClick={() => setHotelTab('unverified')}>
                                    <p className={`font-bold mr-4 text-sm
                                        ${hotelTab === 'unverified' ? 'text-black' : 'text-gray-300'}`}>
                                            Unverified Hotels
                                    </p>

                                    <div className={`px-3 h-8 flex items-center justify-center rounded-md text-sm font-medium
                                        ${hotelTab === 'unverified' ? 'bg-black text-white' : 'bg-blue-200 text-blue-500'}`}>
                                        298
                                    </div>
                                </div> */}
                            </div>   

                            <div className="mt-4 bg-gray-100 rounded-lg p-6">
                                {
                                    hotelTab === 'all' ?
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                            {
                                                allHotels && allHotels.length ?
                                                    allHotels.map((hotel, i) => {
                                                        return (
                                                            <div className="bg-white rounded-md p-6" key={hotel.id}>
                                                                <div className="flex justify-end">
                                                                    <BsThreeDots className='text-gray-400' onClick={() => selectDrop('dropa'+i)}/>
                                                                </div>
                                                                    <div className="bg-blue-200 text-blue-500 font-semibold text-xl flex 
                                                                        items-center justify-center h-14 w-14 rounded-full mx-auto">
                                                                        {hotel.name.charAt(0)}
                                                                    </div>

                                                                    <div>
                                                                        <p className="text-center texl-gray-500 mt-4">{hotel.name}</p> 
                                                                        
                                                                        <div className="relative">
                                                                                                                            
                                                                            {
                                                                                currentMenu === 'dropa'+i ? 
                                                                                    <div className="absolute -top-24 right-0 rounded-lg bg-gray-50 w-64 p-2 flex justify-between items-center border border-gray-300">
                                                                                        <div className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                                                                                            <img src={info} className='h-4 w-4 mr-1' />

                                                                                            <p className="text-blue-500 font-semibold text-sm" onClick={() => showHotelProfile(hotel)} >Info</p>
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
                                                                    </div>
                                                            </div>
                                                        )
                                                    })
                                                :
                                                    <div className="w-full flex my-6">
                                                        <p className="text-center font-semibold text-gray-400">No Hotels available</p>
                                                    </div>
                                            }
                                            
                                        </div>
                                    :
                                        null
                                }
                                
                            </div>
                        </div>
                }
                </div>
            }

            
        </>
    )
}

export default HotelsBoard