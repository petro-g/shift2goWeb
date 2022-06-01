import React, { ReactElement, useEffect, useState } from 'react'
import UnderLine from '@assets/UnderLine.svg';

import avatar from '../../../../assets/icons/hotavatar.png'
import rating from '../../../../assets/icons/rating.png'
import ratingempty from '@assets/icons/ratingempty.png';
import flag from '@assets/icons/usa.png';

import infoIcon from '../../../../assets/icons/Shield.png'
import paymentIcon from '../../../../assets/icons/Wallet.png'
import ratingIcon from '../../../../assets/icons/Star.png'
import passwordIcon from '../../../../assets/icons/Lock.png'
import notifIcon from '../../../../assets/icons/Notification.png'

import infoIconActive from '../../../../assets/icons/ShieldActive.png'
import paymentIconActive from '../../../../assets/icons/WalletActive.png'
import ratingIconActive from '../../../../assets/icons/StarActive.png'
import passwordIconActive from '../../../../assets/icons/LockActive.png'
import notifIconActive from '../../../../assets/icons/NotificationActive.png'

import str from '../../../../assets/icons/str.png'
import badge from '../../../../assets/icons/badge.png'

import clean from '../../../../assets/icons/clean.png'
import goals from '../../../../assets/icons/goals.png'
import service from '../../../../assets/icons/service.png'
import amenity from '../../../../assets/icons/amenity.png'
import { baseUrl, useMergeState, getDateTime, placeAutoCompleteKey} from '@utils/helpers';
import { BsArrowDown } from 'react-icons/bs';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import ClipLoader from 'react-spinners/ClipLoader';


export const SettingsBoard = () => {
	

	const [settingPage, setSettingPage] = useState('page1')
	const [paymentVerify, setPaymentVerify] = useState(false)

	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const [pageLoading, setPageLoading] = useState(false)

	const localToken = localStorage.getItem('token')
    const localProfile: any = JSON.parse(localStorage.getItem('profile'))
    const [profile, setProfile] = useState([])
    const [myHotel, setMyHotel] = useState(null)
    const [hotelBadges, setHotelBadges] = useState([])
    const [hotelReviews, setHotelReviews] = useState([])
    const [openReviews, setOpenReviews] = useState(false)
	const [notifSettings, setNotifSettings] = useMergeState({
		"push": null,
		"email": null,
		"cancels_shift": null,
		"ends_shift": null,
		"begins_shift": null,
		"accepts_shift": null,
		"declines_shift": null
	})
	const [hotelAddress, setHotelAddress] = useState(null);

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
			setHotelAddress(thisHotel.address)

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

	const getProfile = () => {
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
			console.log(result)
            const profile = JSON.parse(result);
            localStorage.setItem('profile', result)
            
            setProfile(profile)
			setMyHotel(profile.hotels[0])
            getHotel(profile.hotels[0].id)
            getBadges(profile.hotels[0].id)
            getReviews(profile.hotels[0].id)
		})
		.catch(error => console.log('error', error));
	}

	const getNotificationSettings = () => {
		let localToken = localStorage.getItem('token')

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+localToken);

		fetch(baseUrl + "/v1/notification/settings/me",
		{
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const notifSettings = JSON.parse(result);
            
			setNotifSettings({
				"push": notifSettings.push ? notifSettings.push : false,
				"email": notifSettings.email ? notifSettings.email : false,
				"cancels_shift": notifSettings.cancels_shift ? notifSettings.cancels_shift : false,
				"ends_shift": notifSettings.ends_shift ? notifSettings.ends_shift : false,
				"begins_shift": notifSettings.begins_shift ? notifSettings.begins_shift : false,
				"accepts_shift": notifSettings.accepts_shift ? notifSettings.accepts_shift : false,
				"declines_shift": notifSettings.declines_shift ? notifSettings.declines_shift : false,
			})
		})
		.catch(error => console.log('error', error));
	}

	const getBadges = (hotelId) => {
		let localToken = localStorage.getItem('token')

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+localToken);

		fetch(baseUrl + `/v1/badges/hotel?hotel_id=${hotelId}`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const badges = JSON.parse(result);
            
            setHotelBadges(badges)
		})
		.catch(error => console.log('error', error));
	}

	const getReviews = (hotelId) => {
		let localToken = localStorage.getItem('token')

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+localToken);

		fetch(baseUrl + `/v1/reviews/hotel?hotel_id=${hotelId}&$page=1`,
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const reviews = JSON.parse(result);
            setHotelReviews(reviews)

			setPageLoading(false)
		})
		.catch((error) => {
			console.log('error', error)
			setPageLoading(false)
		})
	}

	const [hotelDetails, setHotelDetails] = useMergeState({
		'name': '',
		'address': '',
		'phone': ''
	})

	useEffect(() => {		
        const localToken = localStorage.getItem('token')
		setPageLoading(true)
        
		getProfile()
		getNotificationSettings()
	}, [])

	const handleUpdateInfo = async (e) => {
		e.preventDefault()

		if(hotelDetails.name === '' || hotelDetails.address === '' || hotelDetails.phone === '' || hotelAddress === null) {
			console.log('incomplete form')
			return
		}

		let newHotel = {
			'name': hotelDetails.name,
			'address': hotelAddress.label,
			'phone': hotelDetails.phone,
		}

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer ' + localToken);

		var raw = JSON.stringify(newHotel);
		console.log(raw)

		await fetch(baseUrl + `/v1/hotel/update/${localProfile.hotels[0].id}`,
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

		fetch(baseUrl + `/v1/hotel/update/${localProfile.hotels[0].id}`,
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
		'user_id': localProfile && localProfile.length ? localProfile.userID : null ,
		'email': localProfile && localProfile.length ? localProfile.owner.email : null,
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

	const handleUpdateNotif = (e) => {
		e.preventDefault

		let localToken = localStorage.getItem('token')

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer ' + localToken);

		var raw = notifSettings;
		
		fetch(baseUrl + `/v1/notification/settings/update`,
		{
			method: 'PATCH',
			headers: myHeaders,
			body: JSON.stringify(raw),
			redirect: 'follow'
			}
		)
		.then((response) => {
			response.text()
		})
		.then((result) => {
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

	return (
		<>
			{
				pageLoading ? 
					<div className="flex h-screen">
						<div className="m-auto">
							<ClipLoader size={36} color={'#0c77f8'} loading={true}/>
						</div>
					</div>
				:
					<div className=" w-full flex flex-row sm:settingsBoard">
						<div className="grid grid-cols-1 gap-y-4 sm:gap-4 lg:grid-cols-4">
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
										<p className="text-gray-500 text-xs">Details about your company’s information</p>
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
																<GooglePlacesAutocomplete
																	apiKey={placeAutoCompleteKey}
																	// selectProps={{
																	// 	hotelAddress,
																	// 	onChange: setHotelAddress,
																	// }}
																	selectProps={{
																		defaultInputValue: hotelAddress, //set default value
																		onChange: setHotelAddress, //save the value gotten from google
																	}}
																/>

																{/*<input className="appearance-none border border-gray-300 */}
																{/*	rounded py-2 h-10 w-full px-3 text-gray-700 leading-tight */}
																{/*	focus:outline-none focus:shadow-outline" */}
																{/*	type="text" value={hotelDetails.address} onChange={e => setHotelDetails({address: e.target.value})}/>*/}
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

												<div className="bg-blue-600 px-4 py-2 font-semibold text-white rounded-md cursor-pointer"
													onClick={() => setOpenReviews(true)}>
													{hotelReviews.length} Reviews 
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
																	{myHotel.rating ? myHotel.rating : 0}
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
																	{hotelBadges.length ? hotelBadges.length : 0}
																	<span className='text-xl text-gray-500'>/ 4</span>
																</p>
															</div>
														</div>
													</div>

													<div className="mt-4">
														<p className="text-base font-bold text-gray-600">Earned Badges</p>

														<div className="mt-3 flex justify-between items-center">
															{
																hotelBadges && hotelBadges.length ?
																	hotelBadges.map((badge, index) => {
																		return (
																			<div key={badge.id}>
																				<div className='flex justify-center'>
																					<img src={badge.image} className='w-20 rounded-full' />
																				</div>
																				<div className='flex justify-center mt-2'>
																					<p className='text-sm text-gray-500  text-center'>{badge.name}</p>
																				</div>
																			</div>
																		)
																	})
																:
																	<div className="w-full flex justify-center">
																		<p className="text-gray-500 font-semibold">No badges earned yet</p>
																	</div>
															}
														</div>
													</div>
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

																			<p className="font-semibold text-sm">{hotelReviews.length} reviews</p>
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
																										<p className="text-xs text-gray-400 font-semibold">{getDateTime(review.createdAt)}</p>

																										
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
															rounded-full bg-white border-4 appearance-none cursor-pointer " checked = {notifSettings.cancels_shift}
															onChange={() => setNotifSettings({cancels_shift: !notifSettings.cancels_shift})}/>
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
															rounded-full bg-white border-4 appearance-none cursor-pointer "  checked = {notifSettings.ends_shift}
															onChange={() => setNotifSettings({ends_shift: !notifSettings.ends_shift})}/>
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
															rounded-full bg-white border-4 appearance-none cursor-pointer " checked = {notifSettings.begins_shift}
															onChange={() => setNotifSettings({begins_shift: !notifSettings.begins_shift})}/>
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
															rounded-full bg-white border-4 appearance-none cursor-pointer " checked = {notifSettings.accepts_shift}
															onChange={() => setNotifSettings({accepts_shift: !notifSettings.accepts_shift})}/>
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
															rounded-full bg-white border-4 appearance-none cursor-pointer " checked = {notifSettings.declines_shift}
															onChange={() => setNotifSettings({declines_shift: !notifSettings.declines_shift})}/>
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
															rounded-full bg-white border-4 appearance-none cursor-pointer " checked = {notifSettings.email}
															onChange={() => setNotifSettings({email: !notifSettings.email})}/>
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
															rounded-full bg-white border-4 appearance-none cursor-pointer " checked = {notifSettings.push}
															onChange={() => setNotifSettings({push: !notifSettings.push})}/>
														<label	className="toggle-label block overflow-hidden h-6 rounded-full 
															bg-gray-300 cursor-pointer"></label>
													</div>
													
													<label className="text-sm font-medium text-gray-700">Text Notifications</label>
												</div>
											</div>

											<hr />

											<div className='flex items-center'>
												<button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700' 
													type='button' onClick={handleUpdateNotif}>
													Save Settings
												</button>

												{
													successMessage && successMessage.length ?
															<p className='text-green-600 text-white py-3 px-4 text-right'>
																{successMessage} 
															</p>
													:
														null
												}
												{
													errorMessage && errorMessage.length ?
															<p className='text-red-600 text-white py-3 px-4 text-right'>
																{errorMessage} 
															</p>
													:
														null
												}	
											</div>
										</div>
									</>
									:
									null
								}
							</div>
						</div>
					</div>
			}
			
		</>
	)
}

export default SettingsBoard