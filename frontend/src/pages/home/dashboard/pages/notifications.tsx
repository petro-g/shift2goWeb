import React, { useEffect, useState } from 'react';
import { baseUrl, getDateTime } from '@utils/helpers';
import { getAuthToken } from '@utils/authenticate';
import { Link, useHistory } from 'react-router-dom';

function NotificationsBox (props)  {

	const history = useHistory();
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
            // console.log(JSON.parse(result))
            
            let notList = JSON.parse(result)
            let thisUser = JSON.parse(localStorage.getItem('profile'))
            let newList = [];

            // notList = notList.filter(notification => !notification.readBy.includes(thisUser.owner.id))
            // console.log(notList)

            for (let i=0; i<notList.length; i++) {
                let readBy = notList[i]
                
                if (notList[i].readBy) {
                    if (notList[i].readBy.includes(thisUser.owner.id)) {
                        
                    } else {
                        newList.push(notList[i])
                    }
                } else {
                    newList.push(notList[i])
                }
            }

            setNotifList(newList)
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

    const notificationsPage = () => {
        // history.push('./all-notifications');
        
        props.setNotif(false)
        props.setPage('notifications')
        window.location.href = "#/dashboard#all-notifications";
    }

    useEffect(() => {
        let localToken = localStorage.getItem('token');

        getAllNotifs(localToken)
        
    }, [])

    return (
        <div className="absolute top-8 right-1 bg-gray-100 rounded-lg px-6 py-8 notify-box shadow overflow-scroll" >
            <div className="overflow-scroll" style={{height: '450px'}}>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">Notifications</p>

                    <Link to={`#all-notifications`}>
                        <p className="text-blue-600 font-semibold text-sm cursor-pointer">View all</p>
                    </Link>
                </div>

                <hr />

                {
                    notifList && notifList.length ? 
                        notifList.map((item) => {
                            return (
                                <div className="flex items-center justify-between 
                                my-4 pb-3 border-b border-gray-200" key={item.id} onClick={() => showNotif(item)}>
                                    <div className="flex items-center mr-3">
                                        <div className="bg-yellow-400 rounded-full w-12 h-12 mr-2 
                                            flex items-center justify-center font-medium text-lg no-wrap">
                                                A
                                        </div>

                                        <div>
                                            <p className='font-medium text-sm'>{item.title}</p>
                                            {/* <p className="text-xs">{item.message}</p> */}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 font-semibold text-xs no-wrap">{getDateTime(item.createdAt)}</p>
                                </div>
                            )
                            
                        })
                    :
                    <p className="text-center text-gray-500 font-medium">No new notifications</p>
                }

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
            
        </div>
    )
   
}

export default NotificationsBox