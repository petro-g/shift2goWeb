import React, { ReactElement, useEffect, useState } from 'react'
import Input from '@components/home/Input';
import Button from '@components/home/Button'
import { BsFillBellFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg'
import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg'
import Woman from '@assets/dashboard/help/woman.png'
import BlackMan from '@assets/dashboard/help/blackman.png'
import UnderLine from '@assets/UnderLine.svg';
import ForwardIcon from '@assets/dashboard/icons/Forward.svg'
import { MdArrowForward } from 'react-icons/md'
import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg'
import Table from '@components/home/Table';
import NoDataTable from '@assets/dashboard/icons/NoDataTable.svg'
import NoFavorites from '@assets/dashboard/icons/NoFavorites.svg'
import NoBillings from '@assets/dashboard/icons/NoBillings.svg'
import PaperOne from '@assets/dashboard/icons/PaperOne.svg'
import LogIcon from '@assets/dashboard/icons/LogIcon.svg'
import LogOutIcon from '@assets/dashboard/icons/LogoutIcon.svg'
import TickSquare from '@assets/dashboard/icons/TickSquare.svg'
import TwoUsers from '@assets/dashboard/icons/2Users.svg'
import Locations from '@assets/dashboard/icons/Locations.svg'
import { baseUrl } from '@utils/helpers';
import Moment from 'moment';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import { ChartOptions, Chart } from 'chart.js'
// import Category from 'chart.js/auto'
import {CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, Filler } from 'chart.js';
Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title, Filler)



const HomeBoard = () => {
	const[allContractors, setAllContractors] = useState(null)
	const[weekContractors, setWeekContractors] = useState(null)

	const[allManagers, setAllManagers] = useState(null)

	const[allHotels, setAllHotels] = useState(null)
	const[weekHotels, setWeekHotels] = useState(null)

	const[allShifts, setAllShifts] = useState(null)
	const[cancelledShifts, setCancelledShifts] = useState(null)
	const[confirmedShifts, setConfirmedShifts] = useState(null)
	const[chartData, setChartData] = useState(null)

	const data = {
		labels: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "01:00 PM"],
		datasets: [
			{
				label: "First dataset",
				data: [0, 0, 0, 0, 0, 0],
				fill: true,
				backgroundColor: 'rgba(12,119,248, .25)',
				borderColor: "#0C77F8",
				lineTension : .5,
			}
		]
	}

	const getAllContractors = (token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + "/v1/contractors",
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const allContractors = JSON.parse(result);
            setAllContractors(allContractors)

			let thisWeekContractors = []

			for(let i=0; i<allContractors.length; i++) {
				let momentDate = Moment(new Date(allContractors[0].createdAt))
				var REFERENCE = Moment()
				var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
				
				if (momentDate.isAfter(A_WEEK_OLD)) {
					thisWeekContractors.push(allContractors[i])
				}
				
			}
			setWeekContractors(thisWeekContractors)
		})
		.catch(error => console.log('error', error));
	}

	const getAllManagers = (token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + "/v1/managers",
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const allManagers = JSON.parse(result);
            setAllManagers(allManagers)
		})
		.catch(error => console.log('error', error));
	}

	const getAllHotels = (token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + "/v1/hotels",
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const allHotels = JSON.parse(result);
            setAllHotels(allHotels)

			let thisWeekHotels = []

			for(let i=0; i<allHotels.length; i++) {
				let momentDate = Moment(new Date(allHotels[0].createdAt))
				var REFERENCE = Moment()
				var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
				
				if (momentDate.isAfter(A_WEEK_OLD)) {
					thisWeekHotels.push(allHotels[i])
				}
				
			}
			setWeekHotels(thisWeekHotels)
		})
		.catch(error => console.log('error', error));
	}

	const getConfirmedShifts = (token, page) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + `/v1/shift/confirmed?page=${parseInt(page)}`,
		{
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const confirmedShifts = JSON.parse(result);
            setConfirmedShifts(confirmedShifts)
			
		})
		.catch(error => console.log('error', error));
	}

	const getAllShifts = (token) => {

		var myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+token);

		fetch(baseUrl + "/v1/shifts",
		{
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then((result) => {
            const allShifts = JSON.parse(result);
            setAllShifts(allShifts)
			// console.log(allShifts)

			let pastSix = getSixTimeRanges(new Date())
			let hour0=0, hour1=0, hour2=0, hour3=0, hour4=0, hour5 = 0;
			for (let i=0; i<allShifts.length; i++) {

				if (allShifts[i].endedAt) {
					var compareDate = moment(allShifts[i].endedAt)

					for (let i=0; i<pastSix.length; i++) {
						var startDate = moment(pastSix[i].from, "DD/MM/YYYY");
						var endDate = moment(pastSix[i].to, "DD/MM/YYYY");

						// @ts-ignore
						if (compareDate.isBetween(startDate, endDate, '[]')) {
							switch(i) {
								case 0:
									hour0 += (allShifts[i].pay)
									break;
								case 1:
									hour1 += (allShifts[i].pay)
									break;
								case 2:
									hour2 += (allShifts[i].pay)
									break;
								case 3:
									hour3 += (allShifts[i].pay)
									break;
								case 4:
									hour4 += (allShifts[i].pay)
									break;
								case 5:
									hour5 += (allShifts[i].pay)
									break;
								default:
								// code block
							}

						}
					}
				}
			}

			setChartData({
				labels: [moment(pastSix[5].from,'DD/MM/YYYY[T]HH:mm:ss').format('LT'),
					moment(pastSix[4].from,'DD/MM/YYYY[T]HH:mm:ss').format('LT'),
					moment(pastSix[3].from,'DD/MM/YYYY[T]HH:mm:ss').format('LT'),
					moment(pastSix[2].from,'DD/MM/YYYY[T]HH:mm:ss').format('LT'),
					moment(pastSix[1].from,'DD/MM/YYYY[T]HH:mm:ss').format('LT'),
					moment(pastSix[0].from,'DD/MM/YYYY[T]HH:mm:ss').format('LT') ],
				datasets: [
					{
						label: "First dataset",
						data: [hour0, hour1, hour2, hour3, hour4, hour5],
						fill: true,
						backgroundColor: 'rgba(12,119,248, .25)',
						borderColor: "#0C77F8",
						lineTension : .5,
					}
				]
			})

			console.log(chartData)
			setTimeout(() => {
				console.log(chartData)
			}, 2000)

			let cancelled = []
			for(let i=0; i<allShifts.length; i++) {
				if (allShifts[i].status === 'CANCELLED') {
					cancelled.push(allShifts[i])
				}
			}
			setCancelledShifts(cancelled)
		})
		.catch(error => console.log('error', error));
	}

	function getSixTimeRanges( timestampString ) {

		var firstTo = moment(timestampString , 'DD-MM-YYY HH:mm');

		var firstFrom = firstTo .clone().startOf('hour');

		var format = 'DD/MM/YYYY HH:mm'

		var timeRanges = [{
			from : firstFrom.format(format),
			to : firstTo.format(format)
		}]

		for(var i = 0; i < 5; i++) {

			var from = firstFrom.clone().subtract(i + 1, 'hours').startOf('hour')
			var to = firstFrom.clone().subtract(i, 'hours').startOf('hour')

			timeRanges.push({
				from : from.format(format),
				to : to.format(format)
			})
		}

		return timeRanges
		console.log(timeRanges)
	}

	useEffect(() => {
		let localToken = localStorage.getItem('token')

		getAllContractors(localToken)
		getAllManagers(localToken)
		getAllHotels(localToken)
		getAllShifts(localToken)
		getConfirmedShifts(localToken, 1)
	}, [])

	return (
		<div className="h-full w-full flex flex-col py-6 bg-gray-50">
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 lg:col-span-8 flex flex-col">

				<div className="grid grid-cols-2 lg:grid-cols-4 mb-4 col-span-4
					py-7 shadow-sm rounded-md bg-white">
					<div className="flex flex-row items-center justify-center
						border-r border-gray-300 px-3 mb-4 lg:mb-0">
						<div className="bg-red-50 flex 
							flex-row justify-center items-center p-4 rounded-lg mr-3">
							<ReactSVG src={PaperOne} />
						</div>
						<div className="">
							<h1 className="text-xs text-gray-600">
								All Contractors
							</h1>

							<h2 className="font-bold">{allContractors ? allContractors.length : 0}</h2>
						</div>
					</div>

					<div className="flex flex-row items-center justify-center
					lg:border-r border-gray-300 px-3 mb-4 lg:mb-0">
						<div className="bg-indigo-50 flex mr-3
						flex-row justify-center items-center p-4 rounded-lg">
							<ReactSVG src={LogIcon} />
						</div>

						<div className="">
							<h1 className="text-xs text-gray-600">
								All Hotels
							</h1>

							<h2 className="font-bold">{allHotels ? allHotels.length : 0}</h2>
						</div>
					</div>

					<div className="flex flex-row items-center justify-center
						border-r border-gray-300 px-3">
						<div className="bg-blue-50 flex mr-3
							flex-row justify-center items-center p-4 rounded-lg">
							<ReactSVG src={LogOutIcon} />
						</div>

						<div className="">
							<h1 className="text-xs text-gray-600">
								All Managers
							</h1>

							<h2 className="font-bold">{allManagers ? allManagers.length : 0}</h2>
						</div>
					</div>

					<div className="flex flex-row items-center justify-center px-3">
						<div className="bg-green-50 flex mr-3
						flex-row justify-center items-center p-4 rounded-lg">
							<ReactSVG src={TickSquare} />
						</div>

						<div className="">
							<h1 className="text-xs text-gray-600">
								All Shifts
							</h1>

							<h2 className="font-bold">{allShifts ? allShifts.length : 0}</h2>
						</div>
					</div>
				</div>

				<div className="w-full rounded-md shadow-sm h-96
					bg-white flex flex-col p-10">
					<h1 className="font-bold">Contractors in the last 6 hours</h1>

					<div className="w-full h-full overflow-auto">
						{
							chartData ?
								<Line data={chartData} height={null} width={null}
									  options={{ maintainAspectRatio: false }}
								/>
							:
								<Line data={data} height={null} width={null}
									  options={{ maintainAspectRatio: false }}
								/>
						}
					</div>

				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
					<div className="flex flex-col w-full bg-white rounded-md 
					shadow-sm py-6 px-4">
						<h1 className="text-lg font-bold mb-6">New Users</h1>
						<div className="grid grid-cols-1 gap-2">
							<div className="flex flex-row w-full ">
							<div className="p-4 rounded-lg bg-blue-50 mr-4">
								<ReactSVG src={TwoUsers} />
							</div>
							<div className="flex flex-col">
								<small>New Contractors this week</small>
								<h1 className="text-lg font-bold">
									{weekContractors ? weekContractors.length : 0}
								</h1>
							</div>
							</div>
							<hr />
							<div className="flex flex-row w-full ">
							<div className="p-4 rounded-lg bg-red-50 mr-4">
								<ReactSVG src={Locations} />
							</div>
							<div className="flex flex-col">
								<small>New Hotels this week</small>
								<h1 className="text-lg font-bold">
									{weekHotels ? weekHotels.length : 0}
								</h1>
							</div>
							</div>

						</div>
					</div>

					<div className="flex flex-col w-full bg-white 
					rounded-md shadow-sm p-6">
						<h1 className="text-lg font-bold mb-6">Cancelled Shifts</h1>
						<div className="w-full grid grid-cols-1 gap-2">
							{
								cancelledShifts && cancelledShifts.length ?
								cancelledShifts.map((shift, i) => {
									return (
										<div className="flex flex-row w-full mb-4">
											<img
												src={shift.contractor.profilePicture}
												className="w-10 h-10 mr-2 rounded-full
											object-cover" alt="" />
											<div className="grid grid-cols-1 w-3/6">
												<p className="font-bold text-sm m-0">
													{shift.contractor.owner.firstname} {shift.contractor.owner.lastname}
												</p>
												<small className="text-gray-400 font-light">
													{shift.contractor.roles[0].name}
												</small>
											</div>
											<div className="grid grid-cols-1 w-2/6">
												<p className="font-bold text-sm text-green-600 ">{shift.hotel.name}</p>
												<small className="text-gray-500 font-light text-sm ">
													{moment(shift.startTime).format('ll')}
												</small>
											</div>
										</div>
									)
								})
								:
								<div className="flex flex-row w-full mb-4">
									<p className="text-center font-semibold text-gray-400 text-sm">No cancelled shifts</p>
								</div>
							}
						</div>
					</div>
				</div>
			</div>

			<div className="col-span-12 lg:col-span-4 ">
				<div className='bg-white rounded-md px-4 py-8'>
					<p className='text-lg font-bold'>Confirmed Shifts</p>

					{
						confirmedShifts && confirmedShifts.length ?
							confirmedShifts.map((shift, i) => {
								return (
									<div className="flex flex-row w-full items-center my-6">
										<img src={shift.contractor.profilePicture}
											className="w-10 h-10 mr-2 rounded-full object-cover" alt="" />
										<div className="grid grid-cols-1 w-3/6">
											<p className="font-bold m-0 text-sm">
												{shift.contractor.owner.firstname} {shift.contractor.owner.lastname}
											</p>
											
											<small className="text-gray-600 font-light">{shift.hotel.name}</small>
										</div>
										<div className="grid grid-cols-1 w-2/6">
											<h1 className="font-bold text-green-500 text-right">${shift.pay}</h1>
											
											<small className="text-gray-500 font-light text-xs text-right">
												{moment(shift.startTime).format('ll')}
											</small>
										</div>
									</div>			
								)
							})
						:
							<div className="flex flex-row w-full my-4">
								<p className="text-center font-semibold text-gray-400 text-sm">No confirmed shifts yet</p>
							</div>
					}

					<hr />

					<div className="pt-4 text-center">
						<p className='text-sm text-gray-500'>View all</p>
					</div>
				</div>
				

			</div>
		</div>
		</div>
	)
}

export default HomeBoard