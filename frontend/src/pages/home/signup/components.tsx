import React, { ReactElement, useState } from 'react'
import Input from '@components/home/Input';
import Button from '@components/home/Button'
import { Link, useHistory } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io'
import {useMergeState, baseUrl, placeAutoCompleteKey} from "../../../utils/helpers";
import flag from '@assets/icons/usa.png';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  IconButton,
  Dialog,
  FormControlLabel,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@assets/close_big.svg';
import Pulse from '@assets/pulse.svg';

interface Props {
onSubmit: React.FormEventHandler;
}


export const First = ({currentPage}) => {
	const history = useHistory();
	const [formError, setFormError] = useState('');
	const [successMessage, setSuccessMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [showSuccessDialog, setShowSuccessDialog] = useState(false)
	
	const [formError2, setFormError2] = useState('');
	const [successMessage2, setSuccessMessage2] = useState('')
	const [errorMessage2, setErrorMessage2] = useState('')

	const [hotelAddress, setHotelAddress] = useState(null);
	const [page, setPage] = useState(currentPage);
	const [userData, setUserData] = useMergeState({
		email: '',
		password: '',
		confirmpassword: '',
		firstname: '',
		lastname: '',
		address: '',
		phone: '',
		countryCode: 'US',
		profilePicture: 'www.google.com'
	})

	const placeAutoComplete = placeAutoCompleteKey;

	const [hotelData, setHotelData] = useMergeState({
		"legal_name": "",
		"phone": "",
		"address": "",
		"employerIdentificationNumber": "",
		
		"contractorsRadius": 20,
		"notification": {
			"push": true,
			"email": true
		},

		"bankname": "",
		"accnumber": "",
		"routingnumber": "",
	})

	const getProfile = () => {
		let localToken = localStorage.getItem('token');
		let localUser = localStorage.getItem('user');

		var myHeaders = new Headers();
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append(
			'Authorization',
			'Bearer ' + localToken
		);

		fetch(baseUrl + '/v1/manager/me', {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		})
			.then((response) => response.text())
			.then((result) => {
				const profile = JSON.parse(result);
				sessionStorage.setItem('hotel_id', profile.hotels[0].id);
				//   setProfile(profile);
			})
			.catch((error) => {
				console.log('error', error)
				toast.error('Something went wrong, please try again');
			});
	};

	const logUserIn = (user) => {
		if (user.userType === 'ADMIN') {
			history.push('/admin/home');
		} else if (user.userType === 'MANAGER') {
			history.push('/dashboard');
		}
	};

	const filterNumber = (e) => {
		const value = e.target.value.replace(/\D/g, "");
		setUserData({ phone: value })

		// const re = /^[0-9\b]+$/;
		// if (e.target.value === '' || re.test(e.target.value)) {
		// 	setUserData({ phone: '+1'+e.target.value })
		// }
	}
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};
	const signUpHandle = async () => {

		if (userData.firstname === '') {
			setErrorMessage('Please enter first name')
			setTimeout(() => {
				setErrorMessage('')
			}, 3000);
			
			return
		}
		
		if (userData.lastname === '') {
			setErrorMessage('Please enter last name')
			setTimeout(() => {
				setErrorMessage('')
			}, 3000);
			
			return
		}
		
		if (userData.email === '') {
			setErrorMessage("Please enter your company's email address")
			setTimeout(() => {
				setErrorMessage('')
			}, 3000);
			
			return
		}


		
		if(!validateEmail(userData.email)){
			setErrorMessage("Please enter a valid email address")
			setTimeout(() => {
				setErrorMessage('')
			}, 3000);
			
			return
		}

		if (!userData.password || !userData.confirmpassword) {
			setErrorMessage('Please enter password');

			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return
		}

		if (userData.password !== userData.confirmpassword) {
			setErrorMessage('Passwords do not match')

			setTimeout(() => {
				setErrorMessage('')
			}, 3000);
			
			return
		}

		if (!userData.phone) {
			setErrorMessage('Please enter phone number');

			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
            return
        }

		setLoading(true)

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(userData);

		fetch(baseUrl + "/v1/manager/signup",
		{
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
			}
		)
		.then(response => response.text())
		.then((result) => {

			setLoading(false)
			// console.log(Response.toString())
			console.log(JSON.parse(result))
			let payload = JSON.parse(result)

			if(payload.access_token) {
				localStorage.setItem('token', payload.access_token)
				localStorage.setItem('user', JSON.stringify(payload.manager))
				setErrorMessage('')
				setShowSuccessDialog(true)
				// setTimeout(() => {
				// 	setPage(2)
				// }, 2000);
			} else {
				if (payload.detail) {
					setSuccessMessage('')
					setErrorMessage(payload.detail)
				} else {
					setSuccessMessage('')
					setErrorMessage('Something went wrong, please try again')
				}
				setTimeout(() => {
					setErrorMessage('');
				}, 4000);
			}
		})
		.catch((error) => {
			setLoading(false)
			console.log('error', error);
			setErrorMessage('Something went wrong, please try again')
		})
	}

	const isEmpty = (word) => {
		return word.replaceAll(' ', '') === '';
	}

	const createHotelHandle = () => {

		if (!hotelData.legal_name || isEmpty(hotelData.legal_name)) {
			setErrorMessage2("Please enter legal name")
			return
		}
		if (!hotelData.phone || isEmpty(hotelData.phone)) {
			setErrorMessage2("Please enter phone number")
			return
		}
		console.log(hotelAddress);
		if (!hotelAddress) {
			setErrorMessage2("Please enter address")
			return
		}
		if (!hotelData.employerIdentificationNumber || isEmpty(hotelData.employerIdentificationNumber)) {
			setErrorMessage2("Please enter identification number")
			return
		}
		if (!hotelData.employerIdentificationNumber || isEmpty(hotelData.employerIdentificationNumber)) {
			setErrorMessage2("Please enter identification number")
			return
		}
		if (!hotelData.bankname || isEmpty(hotelData.bankname)) {
			setErrorMessage2("Please enter bank name")
			return
		}
		if (!hotelData.accnumber || isEmpty(hotelData.accnumber)) {
			setErrorMessage2("Please enter account number")
			return
		}
		if (hotelData.accnumber !== hotelData.accnumber2) {
			setErrorMessage2("Account numbers don't match")
			return
		}
		if (!hotelData.routingnumber || isEmpty(hotelData.routingnumber)) {
			setErrorMessage2("Please enter routing number")
			return
		}
		if (hotelData.routingnumber !== hotelData.routingnumber2) {
			setErrorMessage2("Bank routing numbers don't match")
			return
		}

		geocodeByAddress(hotelAddress.label)
			.then(results => getLatLng(results[0]))
			.then(({ lat, lng }) =>
				console.log('Successfully got latitude and longitude', { lat, lng })
			);
		console.log('After geocodde latlng')
		console.log(hotelAddress.label)

		let token = localStorage.getItem('token')
		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer ' + token);

		let newHotelData = {
			"legal_name": hotelData.legal_name,
			"phone": hotelData.phone,
			"address": hotelAddress.label,
			"employerIdentificationNumber": hotelData.employerIdentificationNumber,
			
			"contractorsRadius": 20,
			"notification": {
				"push": true,
				"email": true
			},
			"longitude": 40.7516,
			"latitude": 73.9755,
			"bank": {
				"name": hotelData.bankname,
				"accountNumber": hotelData.accnumber,
				"routingNumber": hotelData.routingnumber
			}
		}
		var raw = JSON.stringify(newHotelData);
		console.log(newHotelData)
		// if (newHotelData) return;

		setLoading(true)
		fetch(baseUrl + "/v1/hotel/create",
		{
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
			}
		)
		.then(response => response.text())
		.then((result) => {

			setLoading(false)
			console.log(JSON.parse(result))
			let payload = JSON.parse(result)

			if (payload.id) {
				console.log('saving hotel id', payload.id)
				sessionStorage.setItem('hotel_id', payload.id);
				setErrorMessage2('')
				setSuccessMessage2('Successful, redirecting...')

				// new
				getProfile();
				

				let user = localStorage.getItem('user');
				let token = localStorage.getItem('token');

				if (user && token) {
					console.log(JSON.parse(user));
					logUserIn(JSON.parse(user));
				}
				// new

				setTimeout(() => {
					history.push('/dashboard')
				}, 2000);
			} else {
				if (payload.detail) {
					setSuccessMessage2('')
					setErrorMessage2(payload.detail)
				} else {
					setSuccessMessage2('')
					setErrorMessage2('Something went wrong, pls try again')
				}
			}

		})
		.catch((error) => {
			setLoading(false)
			console.log('error', error);
			setErrorMessage2('Something went wrong, pls try again')
		})
	}

	return (
		<>
			
		<Dialog
			fullWidth={false}
			onClose={() => {
				history.push('/')
			}}
			open={showSuccessDialog}
			aria-labelledby="max-width-dialog-title"
			PaperProps={{
				style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
			}}
			>
			<div style={{ width: '100%' }} className=" grid justify-items-end">
				<div className="flex space-x-3 items-center">
				<IconButton
					onClick={() => {
						setShowSuccessDialog(false)
						history.push('/')
					}}
					className="w-10 h-10 object-none object-right-top"
				>
				<img
					src={CloseIcon}
					alt=""
					className="w-full h-full object-contain"
					/>
				</IconButton>
				</div>
			</div>

			<div className="justify-center items-center w-full p-4">
				<img src={Pulse} alt=" " className="w-1/2 mx-auto" />
				<div className="justify-center items-center">
				<p className="text-3xl text-black mx-auto text-center">
							Registration Successful 
				</p>
				<p className="text-2xl text-black mx-auto text-center">
							Please check your inbox and verify your email
				</p>
				</div>
			</div>
		</Dialog>
			
			
		<form className='account_form' style={{display: `${page === 1 ? 'block' : 'none'}`}}>
			<h1 className="title">Account Information</h1>

			<small className="subTitle">
				Please enter your Account Information
			</small>
			
			<div className="form-group flex flex-col mt-4 mb-12">
				<div className="form-group mb-8">
					<label>First Name</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text"  onChange={e => setUserData({firstname: e.target.value})}/>
				</div>

				<div className="form-group mb-8">
					<label>Last Name</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text"  onChange={e => setUserData({lastname: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label>Company’s Email Address</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text"  onChange={e => setUserData({email: e.target.value})}/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="form-group mb-8">
						<label>Create Password</label>
						<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
							px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							type="password"  onChange={e => setUserData({password: e.target.value})}/>
					</div>

					<div className="form-group mb-8">
						<label>Confirm Password</label>
						<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
							px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							type="password"  onChange={e => setUserData({confirmpassword: e.target.value})}/>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-1.5 sm:gap-0 subForm mb-5">
					<small>Minimum of 8 characters</small>
					<small> One UPPERCASE character </small>
					<small>One Unique Character (e.g: !@#$%&*?)</small>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="form-group mb-8">
						<label>Phone Number</label>

						<div className="relative text-gray-600 focus-within:text-gray-400">
							<span className="absolute inset-y-0 left-0 flex items-center pl-2">
								<div className="p-1 focus:outline-none focus:shadow-outline flex items-center">
									<img src={flag} className="w-8 h-8"/> +1
								</div>
							</span> 

							<input type="text" name="q" className="border border-gray-300 rounded py-2 h-10 w-full
								px-3 text-gray-700 pl-20 focus:outline-none focus:bg-white focus:text-gray-900" 
								onChange={filterNumber} value={userData.phone}/>
						</div>
					</div>
				</div>
				<div className="flex flex-row subForm mb-2">

				<small className="font-bold">By Creating your account, 
				you have read and 
					agree to our <Link to="/terms" className="text-blue-500">Terms and 
					Conditions</Link></small>
				</div>
				{
					!formError && !formError.length ? 
					<div className="text-red-600 center mb-4"> {formError} </div>
					:
					null
				}
				<div className="w-full flex justify-end">
					{
						successMessage && successMessage.length ?
							<div className='flex items-center justify-center w-full mr-4'>
								<div className='text-green-600 text-white rounded-full py-3 px-4 w-full text-right my-4'>
									{successMessage} 
								</div>
							</div>
						:
							null
					}
					{
						errorMessage && errorMessage.length ?
							<div className='flex items-center justify-center w-full mr-4'>
								<div className='text-red-600 text-white rounded-full py-3 px-4 w-full text-right my-4'>
									{errorMessage} 
								</div>
							</div>
						:
							null
					}
					
					<Button className="firstButton" type="button" onClick={signUpHandle}>
						Rigister
						{loading ?
							<ClipLoader size={22} color={'#fff'} loading={true}/>
							: null
						}
					</Button>
				</div>
				
			</div>
		</form>

		<form className='business_form' style={{display: `${page === 2 ? 'block' : 'none'}`}}>
			<h1 className="title">Business Information</h1>

			<small className="subTitle">
				Please enter your Business Information for tax and payment purposes
			</small>

			<div className="form-group flex flex-col mt-6">

				<div className="form-group mb-8">
					<label>Company’s Legal Name</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text" onChange={e => setHotelData({legal_name: e.target.value})}/>
				</div>

				<div className="form-group mb-8">
					<label>Business Phone Number </label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text" onChange={e => setHotelData({phone: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label>Business Address </label>
					<GooglePlacesAutocomplete
						apiKey={placeAutoComplete}
						selectProps={{
							hotelAddress,
							onChange: setHotelAddress,
						}}
						apiOptions={{
							language: 'en',
							region: 'us',
						}}
						autocompletionRequest={{
							componentRestrictions: {
								country: ['us'],
							}
						}}
					/>

					{/*<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full*/}
					{/*	px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" */}
					{/*	type="text" onChange={e => setHotelData({address: e.target.value})}/>*/}
				</div>
				
				<div className="form-group mb-8">
					<label>Employer Identification Number (EIN) </label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text"  onChange={e => setHotelData({employerIdentificationNumber: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label>Bank Name</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text"  onChange={e => setHotelData({bankname: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label>Bank Account Number</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text" onChange={e => setHotelData({accnumber: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label>Confirm Bank Account Number</label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text" onChange={e => setHotelData({accnumber2: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label>Bank Routing Number </label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="text" onChange={e => setHotelData({routingnumber: e.target.value})}/>
				</div>
				
				<div className="form-group mb-8">
					<label> Confirm Bank Routing Number </label>
					<input className="appearance-none border border-gray-300 rounded py-2 h-10 w-full
						px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="address"  onChange={e => setHotelData({routingnumber2: e.target.value})}/>
				</div>


				{
					!formError2 && !formError2.length ? 
					<div className="text-red-600 center mb-4"> {formError2} </div>
					:
					null
				}
				<div className="w-full flex flex-col sm:flex-row items-end">
					{
						successMessage2 && successMessage2.length ?
							<div className='flex items-center justify-end sm:justify-center w-full mr-4'>
								<div className='text-green-600 text-white rounded-full py-3 px-4 w-full text-right my-4'>
									{successMessage2} 
								</div>
							</div>
						:
							null
					}
					{
						errorMessage2 && errorMessage2.length ?
							<div className='flex items-center justify-center w-full mr-4'>
								<div className='text-red-600 text-white rounded-full py-3 px-4 w-full text-right my-4'>
									{errorMessage2} 
								</div>
							</div>
						:
							null
					}
					
					<Button className="secondButton font-bold" type="button" onClick={createHotelHandle}>
						Save & Continue
						{loading ?
							<ClipLoader size={22} color={'#fff'} loading={true}/>
							: null
						}
					</Button>
				</div>

				{/* <div className="w-full flex flex-row-reverse justify-between">
					<Button className="secondButton font-bold" type='button' onClick={createHotelHandle}>
						Save & Continue
					</Button> */}

					{/* <p className=" uppercase font-bold text-blue-500 cursor-pointer" onClick={() => setPage(1)}>
						Previous Step
					</p> */}
				{/* </div> */}

				{/* <div className="w-full flex flex-row-reverse justify-between mt-4 mb-12">
					<Link to="/dashboard" className="hover:text-blue-700 text-blue-500 font-medium">
						Skip this Step for now
					</Link>
				</div> */}
			</div>
		</form>
	</>
	)
}
