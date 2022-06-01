import React, { useEffect, useState } from 'react';
import { baseUrl, getDateTime } from '@utils/helpers';
import { getAuthToken } from '@utils/authenticate';
import UnderLine from '@assets/UnderLine.svg';

const allNotifications = () => {

    const [notifList, setNotifList] = useState([]);
    const [notifPage, setNotifPage] = useState(1);
    const [apiErrorMessage, setApiErrorMessage] = useState('')
    const [openNotif, setOpenNotif] = useState(false)
    const [currentNotif, setCurrentNotif] = useState(null)

    const getAllNotifs = (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + token);

        fetch(baseUrl + `/v1/notifications?page=${notifPage}`,
        {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            }
        )
        .then(response => response.text())
        .then((result) => {
            
            let notList = JSON.parse(result)
            let thisUser = JSON.parse(localStorage.getItem('profile'))
            
            setNotifList(notList)
        })
        .catch((error) => {
            console.log('error', error);
            setApiErrorMessage('Something went wrong, pls try again')

            setTimeout(() => {
                setApiErrorMessage('')
            }, 4000);
        })
    }

    const showNotif = (item) => {
        setCurrentNotif(item)
        
        let token = getAuthToken()
        console.log(token)
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + token);

        fetch(baseUrl + `/v1/notification/read?notification_id=${item.id}`,
        {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow'
            }
        )
        .then(response => response.text())
        .then((result) => {
            
            getAllNotifs(token)
        })
        .catch((error) => {
            console.log('error', error);
            setApiErrorMessage('Something went wrong, pls try again')

            setTimeout(() => {
                setApiErrorMessage('')
            }, 4000);
        })
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token');

        getAllNotifs(localToken)
    }, [])

    return (
        <div className="">

                <div className="m-8">
                    <h1 className="homeWelcome">
                        All Notifications
                        <img src={UnderLine} className="w-44"/>
                    </h1>
									
                    {
                        notifList && notifList.length ? 
                            notifList.map((item) => {
                                return (
                                    <div className="flex items-center justify-between 
                                    my-4 pb-3 border-b border-gray-200" key={item.id} onClick={() => showNotif(item)}>
                                        <div className="flex items-center mr-10">
                                            <div className="bg-yellow-400 rounded-full w-12 h-12 mr-2 
                                                flex items-center justify-center font-medium text-lg no-wrap">
                                                    A
                                            </div>

                                            <div>
                                                <p className='font-medium text-sm'>{item.title}</p>
                                                <p className="text-xs ml-4">{item.message}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 font-semibold text-xs no-wrap">{getDateTime(item.createdAt)}</p>
                                    </div>
                                )
                                
                            })
                        :
                        <p className="text-center text-gray-500 font-medium">No notifications yet.</p>
                    }
                </div>

            {
                currentNotif ?
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
                            sm:max-w-lg sm:w-full ">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-end">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center 
                                        justify-center text-gray-500 font-semibold cursor-pointer text-lg"
                                        onClick={() => setCurrentNotif(null)}>
                                        x
                                    </div>
                                </div>

                                <div className=" mt-2">
                                    <p className="my-2 text-lg text-blue-700 font-semibold">
                                        {currentNotif.title}
                                    </p>
                                </div>

                                <div className="my-10">
                                    <p className='text-gray-500 font-medium'>
                                        {currentNotif.message}
                                    </p>
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

export default allNotifications