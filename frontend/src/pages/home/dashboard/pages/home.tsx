import React, { ReactElement, useEffect, useState } from 'react';
import Button from '@components/home/Button';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import UnderLine from '@assets/UnderLine.svg';
import ForwardIcon from '@assets/dashboard/icons/Forward.svg';

import loginIcon from '../../../../assets/icons/Login.png';
import logoutIcon from '../../../../assets/icons/Logout.png';
import shiftIcon from '../../../../assets/icons/File.png';
import shift2Icon from '../../../../assets/icons/Check.png';

import starempty from '../../../../assets/icons/starempty.png';
import {
baseUrl,
useMergeState,
getDateTime,
getDateAndTime,
getTimeDifferenceNow,
formatAMPM,
getHourlyRate,
getTimeDiffHM,
getTimeDiffNow,
} from '@utils/helpers';
import {Line} from 'react-chartjs-2';

import { BsArrowLeft, BsChevronLeft } from 'react-icons/bs';
import timely from '../../../../assets/icons/time.png';
import team from '../../../../assets/icons/team.png';
import knowledge from '../../../../assets/icons/knowledge.png';
import dressing from '../../../../assets/icons/dressing.png';
import axios from 'axios';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeBoard = () => {
	const [allShifts, setAllShifts] = useState([]);
	const [homePage, setHomePage] = useState('home');
	const [shiftInfo, setShiftInfo] = useState(null);
	const [shiftReview, setShiftReview] = useState(false);

	const [liveShifts, setLiveShifts] = useState(null);
	const [clockedInShifts, setClockedInShifts] = useState(null);
	const [clockedOutShifts, setClockedOutShifts] = useState(null);
	const [confirmedShifts, setConfirmedShifts] = useState(null);
	const [unconfirmedShifts, setUnconfirmedShifts] = useState(null);
	const [unconfirmedFShifts, setUnconfirmedFShifts] = useState(null);
	const [chartData, setChartData] = useState(
		{
			labels: [
				"1:00",
				"2:00",
				"3:00",
				"4:00",
				"5:00",
				"6:00",
			],
			datasets: [
				{
					label: "Last 6 hours contractors",
					backgroundColor: "#6F78E3",
					borderColor: "#6F78E3",
					data: [15, 39, 28, 17, 50, 27, 7],
					// fill: true,
					// barThickness: 10,
				}
			],
		}
	)

	let todayDate = new Date().toDateString();

	const getThisUser = () => {
		let localToken = localStorage.getItem('token');

		var myHeaders = new Headers();
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', 'Bearer ' + localToken);

		fetch(baseUrl + '/v1/manager/me', {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
		})
		.then((response) => response.text())
		.then((result) => {
			// localStorage.setItem('business', result)
		})
		.catch((error) => console.log('error', error));
	};

	const getConfirmedShifts = (page) => {
		let localToken = localStorage.getItem('token');

		var myHeaders = new Headers();
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', 'Bearer ' + localToken);

		fetch(baseUrl + `/v1/shift/confirmed?page=${page}`, {
		method: 'POST',
		headers: myHeaders,
		redirect: 'follow',
		})
		.then((response) => response.text())
		.then((result) => {
			let confirmed = JSON.parse(result);
			let confirmToday = []

			for (let i=0; i<confirmed.length; i++) {
				let shiftDate = confirmed[i].endedAt
				var moment1 = moment(shiftDate );
				var moment2 = moment();

				if(moment1.isSame(moment2, 'day')) {
					confirmToday.push(confirmed[i]);
				}
			}
			setConfirmedShifts(confirmToday);
		})
		.catch((error) => console.log('error', error));
	};

	const shiftModalContent = (shift) => {
		setShiftInfo(shift);
	};
	const hotel_id = sessionStorage.getItem('hotel_id');

	const setDateFilter = (date) => {
		console.log(date)

		let all = allShifts

		let allFiltered = []

			for(let i=0; i<all.length; i++) {
				let shiftDate = all[i].endedAt

				var moment1 = moment(shiftDate );
				var moment2 = moment(date );
				// console.log( moment1.isSame(moment2, 'day') ); // true

				if(moment1.isSame(moment2, 'day')) {
					if(all[i].status === 'COMPLETED' && all[i].confirmed === false) {
						allFiltered.push(all[i])
					}
				}
			}

		setUnconfirmedFShifts(allFiltered)

		// console.log(allFiltered)
	}

	useEffect(() => {
		let localToken = localStorage.getItem('token');

		let ShiftProps = {
		page: 1,
		audience: 'MARKET',
		job_role_id: 1,
		};

		const getAllShifts = async () => {
			const endpoint = baseUrl + `/v1/shifts?page=${ShiftProps.page}`;

			try {
				await fetch(endpoint, {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${localToken}`,
					},
				}).then((res) => {
					let live = [];
					let clockedIn = [];
					let clockedOut = [];
					let unconfirmed = [];

					res.json().then(function (data) {
						setAllShifts(data);

						for (let i = 0; i < data.length; i++) {
							if (data[i].status === 'ONGOING') {
								live.push(data[i]);
							}

							if (data[i].startedAt) {
								let shiftDate = data[i].startedAt
								var moment1 = moment(shiftDate );
								var moment2 = moment();

								if(moment1.isSame(moment2, 'day')) {
									clockedIn.push(data[i]);
								}
							}

							if (data[i].endedAt) {
								let shiftDate = data[i].endedAt
								var moment1 = moment(shiftDate );
								var moment2 = moment();

								if(moment1.isSame(moment2, 'day')) {
									clockedOut.push(data[i]);
									if(data[i].status === 'COMPLETED' && data[i].confirmed === false) {
										unconfirmed.push(data[i])
									}
								}
							}
						}

						setClockedInShifts(clockedIn);
						setClockedOutShifts(clockedOut);
						setUnconfirmedShifts(unconfirmed);
						setUnconfirmedFShifts(unconfirmed);
					});
				});
			} catch (error) {
				console.log(error);
			}
		};

		const getLiveShifts = async () => {
		const endpoint =
			baseUrl + `/v1/shifts/hotel/ongoing/?hotel_id=${hotel_id}`;

		try {
			await axios
			.get(`${baseUrl}/v1/shift/hotel/ongoing?hotel_id=${hotel_id}`, {
				headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localToken}`,
				},
			})
			.then((res) => {
				// console.log('res', res);
				setLiveShifts(res.data);
			});
		} catch (error) {
			console.log(error);
		}
		};
		
		// check if user is verified
		fetch(baseUrl + '/v1/manager/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${localToken}`,
			},
			redirect: 'follow',
		})
		.then((response) => {
			if (response.status === 404) {
				toast('Please check your email and verify your account',{
					autoClose: 5000,
				});
			}
			return response.text();
		})
		.catch((error) => {
			console.log('error', error)
		});

		getAllShifts();
		getLiveShifts();
		getConfirmedShifts(1);
		getThisUser();
	}, []);


	return (
		<>
		<ToastContainer />
		{homePage === 'home' ? (
			<>
			{allShifts && allShifts.length ? (
				<div className="lg:p-8">
				<div className="w-full flex flex-row flex-wrap justify-between mb-4 mt-4">
					<h1 className="homeWelcome">
					Dashboard
					<img src={UnderLine} className="w-44" />
					</h1>

					<div>
						<div>
							<p className="font-bold text-base">Today</p>

							<div className="bg-gray-100 rounded-2xl p-4 w-full">
								<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
									<div className="flex items-center">
									<div
										className="p-2 rounded-md mr-3"
										style={{ backgroundColor: '#F1A19F' }}
									>
										<img src={shiftIcon} className="h-4" />
									</div>

									<div>
										<small className="text-xs">Scheduled Shifts</small>

										<h6 className="text-sm font-bold">
										{allShifts ? allShifts.length : 0}
										</h6>
									</div>
									</div>

									<div className="flex items-center">
									<div
										className="p-2 rounded-md mr-3"
										style={{ backgroundColor: '#A9A0F7' }}
									>
										<img src={logoutIcon} className="h-4" />
									</div>

									<div>
										<small className="text-xs">Clocked In</small>

										<h6 className="text-sm font-bold">
										{clockedInShifts ? clockedInShifts.length : 0}
										</h6>
									</div>
									</div>

									<div className="flex items-center">
									<div
										className="p-2 rounded-md mr-3"
										style={{ backgroundColor: '#F5C2A2' }}
									>
										<img src={loginIcon} className="h-4" />
									</div>

									<div>
										<small className="text-xs">Clocked Out</small>

										<h6 className="text-sm font-bold">
										{clockedOutShifts ? clockedOutShifts.length : 0}
										</h6>
									</div>
									</div>

									<div className="flex items-center">
									<div
										className="p-2 rounded-md mr-3"
										style={{ backgroundColor: '#9CC7F5' }}
									>
										<img src={shift2Icon} className="h-4" />
									</div>

									<div>
										<small className="text-xs">Confirmed Shifts</small>

										<h6 className="text-sm font-bold">
										{confirmedShifts ? confirmedShifts.length : 0}
										</h6>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<h1 className="text-xl font-bold">Today, {todayDate}</h1>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-5">
					<div className="col-span-2">
					<div className=" p-4 rounded-xl bg-gray-50">
						<h1 className="text-lg font-bold">Live Shifts</h1>

						<div className="flex flex-col overflow-x-scroll  mt-4">
						<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow border-b border-gray-200 sm:rounded-lg">
								<table className="min-w-full ">
								<thead className="bg-white">
									<tr>
									<th
										scope="col"
										className=" px-6 py-3 text-left text-xs font-bold text-gray-400"
									>
										Contractor
									</th>

									<th
										scope="col"
										className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
									>
										Shift Role
									</th>

									<th
										scope="col"
										className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
									>
										Clock In
									</th>

									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-bold text-gray-400"
									>
										Status
									</th>

									<th
										scope="col"
										className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
									>
										Time Remaining
									</th>
									</tr>
								</thead>

								<tbody className="bg-white">
									{liveShifts && liveShifts.length ? (
									liveShifts.map((shift, index) => {
										return (
										<tr>
											<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
												<img
													className="h-10 w-10 rounded-full"
													src={
													shift.contractor
														.profilePicture
													}
												/>
												</div>

												<div className="text-sm ml-2">
												{shift.contractor.owner.firstname}{' '}
												{shift.contractor.owner.lastname}
												</div>
											</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm ">
												{shift.roles[0].name}
											</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm ">
												{formatAMPM(shift.startedAt)}
											</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
											<div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
												Live Shifts
											</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm ">
												{getTimeDiffNow(shift.endTime)
												? getTimeDiffNow(shift.endTime)
												: 0}
											</div>
											</td>
										</tr>
										);
									})
									) : (
									<tr>
										<td colSpan={5}>
										{' '}
										<p className="text-center text-gray-500 font-semibold text-sm my-4">
											No live shifts at this time.
										</p>{' '}
										</td>
									</tr>
									)}
								</tbody>
								</table>

								<hr />

								<div
								className="bg-white py-3 flex items-center justify-center text-gray-500 
																	text-sm cursor-pointer font-semibold"
								onClick={() => setHomePage('live')}
								>
								View All
								</div>
							</div>
							</div>
						</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
						<div className="p-4 rounded-xl bg-gray-50">
						<h1 className="font-bold">Contractor Clock In Times</h1>

							<div className="mt-1">
								{clockedInShifts && clockedInShifts.length ? (
								clockedInShifts.map((shift, index) => {
									return (
									<div
										className="flex items-center justify-between mt-6"
										key={shift.id}
									>
										<div className="flex items-center">
										<div className="flex-shrink-0 h-10 w-10">
											<img
											className="h-10 w-10 rounded-full"
											src={shift?.contractor?.profilePicture}
											/>
										</div>

										<div className="ml-2">
											<p className="text-sm font-bold text-gray-700">
											{shift?.contractor?.owner?.firstname}{' '}
											{shift?.contractor?.owner?.lastname}
											</p>
											<p className="text-xs font-bold text-gray-400">
											{shift?.roles[0]?.name}
											</p>
										</div>
										</div>

										<p className="text-xs text-gray-400">
										{formatAMPM(shift?.startedAt)}
										</p>
									</div>
									);
								})
								) : (
								<div className="flex justify-center">
									<p className="text-center text-gray-500 font-semibold text-sm my-4">
									No clock in yet.
									</p>
								</div>
								)}
							</div>
							</div>

						<div className="p-4 rounded-xl bg-gray-50">
						<div className="flex flex-wrap justify-between items-center">
							<h1 className="font-bold">Clocked Out</h1>

							<button
							className="rounded bg-blue-600 hover:bg-blue-700 py-2 
														px-3 text-white text-sm font-bold "
							onClick={() => setHomePage('confirm')}
							>
							Confirm Shifts
							</button>
						</div>

						<div className="mt-1">
							{clockedOutShifts && clockedOutShifts.length ? (
							clockedOutShifts.map((shift, index) => {
								return (
								<div className="flex items-center justify-between mt-6">
									<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<img
										className="h-10 w-10 rounded-full"
										src={shift.contractor.profilePicture}
										/>
									</div>

									<div className="ml-2">
										<p className="text-sm font-bold text-gray-700">
										{shift?.contractor?.owner?.firstname}{' '}
										{shift?.contractor?.owner?.lastname}
										</p>
										<p className="text-xs font-bold text-gray-400">
										{shift?.contractor?.roles[0]?.name}
										</p>
									</div>
									</div>

									<p className="text-xs text-gray-400">
									{formatAMPM(shift.endedAt)}
									</p>
								</div>
								);
							})
							) : (
							<div className="flex justify-center">
								<p className="text-center text-gray-500 font-semibold text-sm my-4">
								No clock out yet.
								</p>
							</div>
							)}
						</div>
						</div>
					</div>
					</div>

					<div>
					<div className="p-4 rounded-xl bg-gray-50">
						<h1 className="font-bold">Today's Confirmed Shifts</h1>

						<div className="mt-1 mb-4">
						{confirmedShifts && confirmedShifts.length ? (
							confirmedShifts.map((shift, index) => {
							return (
								<div className="flex items-center justify-between mt-6">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
									<img
										className="h-10 w-10 rounded-full"
										src={shift.contractor.profilePicture}
									/>
									</div>

									<div className="ml-2">
									<p className="text-sm font-bold text-gray-700">
										{shift?.contractor?.owner?.firstname}{' '}
										{shift?.contractor?.owner?.lastname}
									</p>
									<p className="text-xs font-bold text-gray-400">
										{shift?.contractor?.roles[0]?.name}
									</p>
									</div>
								</div>

								<div>
									<p className="text-sm text-green-500 font-bold">
									${shift.pay}
									</p>
									<p className="text-xs text-gray-400">
									$
									{getHourlyRate(
										shift.pay,
										shift.startTime,
										shift.endTime
									)}
									/hr
									</p>
								</div>
								</div>
							);
							})
						) : (
							<div className="flex justify-center">
							<p className="text-center text-gray-500 font-smibold text-sm my-4">
								No confirmed shift yet.
							</p>
							</div>
						)}
						</div>

						<hr />

						<div
						className="bg-gray-50 py-3 flex items-center justify-center text-gray-500 
													text-sm cursor-pointer font-semibold"
						onClick={() => setHomePage('confirmed')}
						>
						View All
						</div>
					</div>
					</div>
				</div>
				</div>
			) : (
				<div className="h-full w-full flex flex-col homeBoard p-4">
				<div className="w-full flex flex-row justify-between mb-4">
					<h1 className="homeWelcome">
					Welcome
					<img src={UnderLine} className="w-40" />
					</h1>

					{/* <Button className="homeShiftCreate" isActive={true}>
					<ReactSVG src={CircleOutline} />
					Create new Shifts
					</Button> */}
				</div>

				<div className="w-full flex flex-col">
					<div className="emptyHolder flex flex-col">
					<h1 className="starter">Start creating shifts</h1>

					<small className="subStarter">
						There are pools of Contractors waiting for you. Get
						<br />
						started by creating Shifts
					</small>

					<Link to="/dashboard/shifts" className="starterButton">
						<span>Go to Shifts</span>
						<ReactSVG src={ForwardIcon} />
					</Link>
					</div>
				</div>
				</div>
			)}
			</>
		) : null}

		{homePage === 'live' ? (
			<>
			<div className="w-full h-full p-8">
				<div className="flex flex-wrap justify-between">
				<h1 className="homeWelcome">
					Live Shifts
					<img src={UnderLine} className="w-44" />
				</h1>

				<div>
					{/* <Button className="homeShiftCreate" isActive={true}>
					<ReactSVG src={CircleOutline} />
					Create new Shifts
					</Button> */}
				</div>
				</div>

				<h1 className="text-xl font-bold">Today, {todayDate}</h1>

				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
					<div className="filter drop-shadow-md overflow-scroll border-b border-gray-200 sm:rounded-lg">
					<table className="min-w-full ">
						<thead className="bg-white">
						<tr>
							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400"
							>
							Shift ID
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400"
							>
							Contractor
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Shift Type
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Shift Duration
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Clocked In
							</th>

							<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-bold text-gray-400"
							>
							Status
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Time Remaining
							</th>
						</tr>
						</thead>

						<tbody className="bg-white">
						{liveShifts && liveShifts.length ? (
							liveShifts.map((shift, index) => {
							return (
								<tr key={shift.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div
									className="text-sm font-semibold text-blue-600 cursor-pointer"
									onClick={() => {
										shiftModalContent(shift);
									}}
									>
									000456
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<img
										className="h-10 w-10 rounded-full"
										src={shift.contractor.profilePicture}
										/>
									</div>

									<div className="text-sm ml-2">
										{shift.contractor.owner.firstname}{' '}
										{shift.contractor.owner.lastname}
									</div>
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
									{shift.roles[0].name}
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
									{formatAMPM(shift.startTime)} -{' '}
									{formatAMPM(shift.endTime)}
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
									{formatAMPM(shift.startedAt)}
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
									Live Shifts
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
									{getTimeDiffNow(shift.endTime)
										? getTimeDiffNow(shift.endTime)
										: 0}
									</div>
								</td>
								</tr>
							);
							})
						) : (
							<tr>
							<td colSpan={7}>
								{' '}
								<p className="text-center my-4 text-gray-500 font-semibold text-sm">
								No live shifts at this time.
								</p>{' '}
							</td>
							</tr>
						)}
						</tbody>
					</table>
					</div>
				</div>
				</div>

				<p
				className="font-bold text-gray-500 mt-4 cursor-pointer"
				onClick={() => setHomePage('home')}
				>
				<BsChevronLeft className="mr-1 inline" /> Back
				</p>

				{shiftInfo ? (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					{/* Background overlay, show/hide based on modal state.*/}

					<div
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
						aria-hidden="true"
					></div>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>

					{/* Modal panel, show/hide based on modal state.*/}

					<div
						className="inline-block align-bottom bg-white rounded-lg text-left 
												overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle 
												sm:max-w-lg sm:w-full lg:max-w-md"
					>
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="flex justify-end">
							<div
							className="w-8 h-8 rounded-full bg-gray-200 flex items-center 
															justify-center text-gray-500 font-semibold cursor-pointer text-lg"
							onClick={() => setShiftInfo(null)}
							>
							x
							</div>
						</div>

						<div className="flex justify-center mt-2">
							<div className="text-center">
							<img
								src={shiftInfo.contractor.profilePicture}
								className="h-20 w-20 rounded-full mx-auto"
							/>

							<p className="my-2 font-semibold">
								{shiftInfo.contractor.owner.firstname}{' '}
								{shiftInfo.contractor.owner.lastname}
							</p>

							<div
								className="border border-green-500 py-1 px-2 rounded text-sm 
																text-green-600 inline"
							>
								Live Shift
							</div>
							</div>
						</div>

						<div className="flex justify-between align-center mt-2">
							<div>
							<p className="text-xs text-gray-400 font-medium">
								Shift Role
							</p>

							<p className="text-lg font-bold text-gray-600">
								{shiftInfo.contractor.roles[0].name}
							</p>
							</div>

							<div>
							<p className="text-xs text-gray-400 text-right font-medium">
								Pay
							</p>

							<p className="text-lg font-bold text-green-500 text-right">
								$
								{getHourlyRate(
								shiftInfo.pay,
								shiftInfo.startTime,
								shiftInfo.endTime
								)}
								/hr
							</p>

							<p className="text-xs text-gray-400 text-right font-medium mt-4">
								Total Payment
							</p>

							<p className="text-lg font-bold text-green-500 text-right">
								${shiftInfo.pay}
							</p>
							</div>
						</div>

						<div className="mt-6">
							<div className="flex justify-between align-center my-4">
							<p className="font-medium text-gray-600 text-sm">
								Start time
							</p>
							<p className="font-medium text-gray-600 text-sm">
								{getDateAndTime(shiftInfo.startTime)}
							</p>
							</div>

							<div className="flex justify-between align-center my-4">
							<p className="font-medium text-gray-600 text-sm">
								End time
							</p>
							<p className="font-medium text-gray-600 text-sm">
								{getDateAndTime(shiftInfo.endTime)}
							</p>
							</div>

							<div className="flex justify-between align-center my-4">
							<p className="font-medium text-gray-600 text-sm">
								Shift Length
							</p>
							<p className="font-medium text-gray-600 text-sm">
								{getTimeDiffHM(
								shiftInfo.startTime,
								shiftInfo.endTime
								)}
							</p>
							</div>

							<div className="flex justify-between align-center my-4">
							<p className="font-medium text-gray-600 text-sm">
								Duration
							</p>
							<p className="font-medium text-gray-600 text-sm">-</p>
							</div>

							<div className="flex justify-between align-center my-4">
							<p className="font-medium text-gray-600 text-sm">
								Clocked In
							</p>
							<p className="font-medium text-gray-600 text-sm">
								{formatAMPM(shiftInfo.startTime)}
							</p>
							</div>

							<div className="flex justify-between align-center my-4">
							<p className="font-medium text-gray-600 text-sm">
								Clocked Out
							</p>
							<p className="font-medium text-gray-600 text-sm">-</p>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				) : null}
			</div>
			</>
		) : null}
		{homePage === 'confirm' ? (
			<>
			<div className="w-full h-full p-8">
				<div className="flex flex-wrap justify-between">
				<h1 className="homeWelcome">
					Confirm Shifts
					<img src={UnderLine} className="w-44" />
				</h1>

				<div>
					{/* <Button className="homeShiftCreate" isActive={true}>
					<ReactSVG src={CircleOutline} />
					Create new Shifts
					</Button> */}
				</div>
				</div>

				<div className="flex flex-wrap justify-start items-center my-4">
				<h1 className="text-xl font-bold mr-4">{todayDate}</h1>

				<input type="date" className="border border-gray-200 py-3 px-2 mr-4"
					   onChange={event => setDateFilter(event.target.value)}/>

				<Button className="homeShiftCreate" isActive={true}
						onClick={() => setDateFilter(moment())}>
					Today
				</Button>
				</div>

				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
					<div className="filter drop-shadow-md  border-b border-gray-200 sm:rounded-lg">
					<table className="min-w-full overflow-scroll">
						<thead className="bg-white">
						<tr>
							<th></th>

							<th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
								Shift ID
							</th>

							<th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400">
								Contractor
							</th>

							<th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
								Shift Type
							</th>

							<th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
								Shift Duration
							</th>

							<th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
								Clocked In
							</th>

							<th scope="col" className=" px-6 py-3 text-left text-xs font-bold text-gray-400 ">
								Clocked Out
							</th>

							<th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">
								Status
							</th>

							<th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-400">

							</th>
						</tr>
						</thead>

						<tbody className="bg-white">
						{
							unconfirmedFShifts && unconfirmedFShifts.length ?
								unconfirmedFShifts.map((shift, i) => {
									return (
										<tr key={shift.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<input type="checkbox" />
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-semibold cursor-pointer">
													{shift.id}
												</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="text-sm ml-2">
														{shift.contractor && shift.contractor.owner.firstname}&nbsp;
														{shift.contractor && shift.contractor.owner.lastname}
													</div>
												</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm ">{shift.roles[0].name}</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm ">
													{moment(shift.startTime).format('LT')} - {moment(shift.endTime).format('LT')}
												</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm ">{moment(shift.startedAt).format('LT')}</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm ">{moment(shift.endedAt).format('LT')}</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
													Clocked Out
												</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<div
													className="text-sm text-blue-500 cursor-pointer"
													onClick={() => {
														setShiftReview(true);
													}}
												>
													Review
												</div>
											</td>
										</tr>
									)
								})
							:
								<tr>
									<td colSpan={9}>
										<p className="my-4 font-semibold text-center text-gray-500">No Shifts here yet</p>
									</td>
								</tr>
						}

						</tbody>
					</table>
					</div>
				</div>
				</div>

				<div className="flex items-center justify-between mt-4">
				<p
					className="font-bold text-gray-500 cursor-pointer"
					onClick={() => setHomePage('home')}
				>
					<BsChevronLeft className="mr-1 inline" /> Back
				</p>

				<button className="px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold">
					Confirm Shift
				</button>
				</div>

				{shiftReview ? (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div
					className="flex items-end justify-center min-h-screen pt-4 px-4 
											pb-20 text-center sm:block sm:p-0"
					>
					{/* Background overlay, show/hide based on modal state.*/}

					<div
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
						aria-hidden="true"
					></div>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>

					{/* Modal panel, show/hide based on modal state.*/}
					<div
						className="inline-block align-bottom bg-white rounded-lg text-left 
												overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle 
												sm:max-w-lg sm:w-full "
					>
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="flex justify-end">
							<div
							className="w-8 h-8 rounded-full bg-gray-200 flex items-center 
															justify-center text-gray-500 font-semibold cursor-pointer text-lg"
							onClick={() => setShiftReview(false)}
							>
							x
							</div>
						</div>

						<div className=" mt-2">
							<p className="my-2 text-2xl text-blue-700 font-semibold">
							How well did this contractor perform?
							</p>
						</div>

						<div className="flex align-center mt-2">
							<div className="flex align-center mr-4">
							<img src={starempty} className="w-10 h-10 mr-1" />
							<img src={starempty} className="w-10 h-10 mr-1" />
							<img src={starempty} className="w-10 h-10 mr-1" />
							<img src={starempty} className="w-10 h-10 mr-1" />
							<img src={starempty} className="w-10 h-10 mr-1" />
							</div>

							<p className="text-xs my-auto">Rate</p>
						</div>

						<div className="mt-10">
							<p className="text-sm text-gray-500 font-medium">
							Leave a comment
							</p>
							<textarea
							cols={45}
							rows={4}
							className="border rounded-md border-blue-100 p-2"
							></textarea>
						</div>

						<div className="my-10">
							<p className="text-sm text-gray-500 font-medium">
							Select badges
							</p>

							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
							<div>
								<img src={timely} className="h-14 w-14 mx-auto" />

								<p className="text-center text-xs">
								On time to shift
								</p>
							</div>

							<div>
								<img
								src={knowledge}
								className="h-14 w-14 mx-auto"
								/>

								<p className="text-center text-xs">
								Advanced System Knowledge
								</p>
							</div>

							<div>
								<img src={dressing} className="h-14 w-14 mx-auto" />

								<p className="text-center text-xs">
								Dressed Appropriately
								</p>
							</div>

							<div>
								<img src={team} className="h-14 w-14 mx-auto" />

								<p className="text-center text-xs">Team Player</p>
							</div>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				) : null}
			</div>
			</>
		) : null}
		{homePage === 'confirmed' ? (
			<>
			<div className="w-full h-full p-8">
				<div className="flex flex-wrap justify-between">
				<h1 className="homeWelcome">
					Confirmed Shifts
					<img src={UnderLine} className="w-44" />
				</h1>

				<div>
					{/* <Button className="homeShiftCreate" isActive={true}>
					<ReactSVG src={CircleOutline} />
					Create new Shifts
					</Button> */}
				</div>
				</div>

				<div className="flex flex-wrap justify-start items-center my-4">
				<h1 className="text-xl font-bold mr-4">Today, {todayDate}</h1>
				</div>

				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-4">
					<div className="filter drop-shadow-md  border-b border-gray-200 sm:rounded-lg">
					<table className="min-w-full overflow-scroll">
						<thead className="bg-white">
						<tr>
							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400"
							>
							Shift ID
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400"
							>
							Contractor
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Shift Type
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Shift Duration
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Clocked In
							</th>

							<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-bold text-gray-400"
							>
							Status
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Pay/hr
							</th>

							<th
							scope="col"
							className=" px-6 py-3 text-left text-xs font-bold text-gray-400 "
							>
							Final Pay
							</th>
						</tr>
						</thead>

						<tbody className="bg-white">
						{confirmedShifts && confirmedShifts.length
							? confirmedShifts.map((shift, index) => {
								return (
								<tr>
									<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-semibold cursor-pointer">
										{shift.id}
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<div className="flex-shrink-0 h-10 w-10">
										<img
											className="h-10 w-10 rounded-full"
											src={shift.contractor.profilePicture}
										/>
										</div>

										<div className="text-sm ml-2">
										{shift.contractor.owner.firstname}{' '}
										{shift.contractor.owner.lastname}
										</div>
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
										{shift.contractor.roles[0].name}
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
										{formatAMPM(shift.startTime)} -{' '}
										{formatAMPM(shift.endTime)}
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
										{formatAMPM(shift.startedAt)}
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="border border-green-500 py-1 px-2 rounded text-sm text-green-600 inline">
										Confirmed
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">
										$
										{getHourlyRate(
										shift.pay,
										shift.startTime,
										shift.endTime
										)}
										/hr
									</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm ">${shift.pay}</div>
									</td>
								</tr>
								);
							})
							: null}
						</tbody>
					</table>
					</div>
				</div>
				</div>

				<div className="flex items-center justify-between mt-4">
				<p
					className="font-bold text-gray-500 cursor-pointer"
					onClick={() => setHomePage('home')}
				>
					<BsChevronLeft className="mr-1 inline" /> Back
				</p>
				</div>
			</div>
			</>
		) : null}
		</>
	);
};

export default HomeBoard;
