import React, { ReactElement } from 'react';
import Input from '@components/home/Input';
import Button from '@components/home/Button';
import { BsFillBellFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg';
import Woman from '@assets/dashboard/help/woman.png';
import BlackMan from '@assets/dashboard/help/blackman.png';
import UnderLine from '@assets/UnderLine.svg';
import ForwardIcon from '@assets/dashboard/icons/Forward.svg';
import { MdArrowForward } from 'react-icons/md';
import Date from '@assets/dashboard/icons/DateSelect.svg';
import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg';
import Table from '@components/home/Table';
import NoDataTable from '@assets/dashboard/icons/NoDataTable.svg';
import NoFavorites from '@assets/dashboard/icons/NoFavorites.svg';
import NoBillings from '@assets/dashboard/icons/NoBillings.svg';
import PaperOne from '@assets/dashboard/icons/PaperOne.svg';
import LogIcon from '@assets/dashboard/icons/LogIcon.svg';
import LogOutIcon from '@assets/dashboard/icons/LogoutIcon.svg';
import TickSquare from '@assets/dashboard/icons/TickSquare.svg';
import TwoUsers from '@assets/dashboard/icons/2Users.svg';
import Locations from '@assets/dashboard/icons/Locations.svg';

interface Props {}

export const HomeBoard = () => {
	return (
		<div className="h-full w-full flex flex-col p-6 bg-gray-50">
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 lg:col-span-8 flex flex-col">

				<div className="h-30 grid grid-cols-4 mb-4 col-span-4
					py-7 shadow-sm rounded-md bg-white">
					<div className="flex flex-row items-center justify-center
						border-r border-gray-300 px-3">
						<div className="bg-red-50 flex 
							flex-row justify-center items-center p-4 rounded-lg mr-3">
							<ReactSVG src={PaperOne} />
						</div>
						<div className="">
							<h1 className="text-xs text-gray-600">
								All Contractors
							</h1>

							<h2 className="font-bold">281</h2>
						</div>
					</div>

					<div className="flex flex-row items-center justify-center
					border-r border-gray-300 px-3">
						<div className="bg-indigo-50 flex mr-3
						flex-row justify-center items-center p-4 rounded-lg">
							<ReactSVG src={LogIcon} />
						</div>

						<div className="">
							<h1 className="text-xs text-gray-600">
								All Hotels
							</h1>

							<h2 className="font-bold">281</h2>
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
								Total No of Contractors
							</h1>

							<h2 className="font-bold">281</h2>
						</div>
					</div>

					<div className="flex flex-row items-center justify-center px-3">
						<div className="bg-green-50 flex mr-3
						flex-row justify-center items-center p-4 rounded-lg">
							<ReactSVG src={TickSquare} />
						</div>

						<div className="">
							<h1 className="text-xs text-gray-600">
								Total No of Contractors
							</h1>

							<h2 className="font-bold">281</h2>
						</div>
					</div>
				</div>

				<div className="w-full rounded-md shadow-sm h-96
				bg-white flex flex-col p-10">
					<h1 className="font-bold">Contractors in the last 6 hours</h1>
				</div>

				<div className="grid grid-cols-2 gap-4 mt-4">
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
								596
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
								24
								</h1>
							</div>
							</div>

						</div>
					</div>

					<div className="flex flex-col w-full bg-white 
					rounded-md shadow-sm p-6">
						<h1 className="text-lg font-bold mb-6">Cancelled Shifts</h1>
						<div className="w-full grid grid-cols-1 gap-2">
							<div className="flex flex-row w-full mb-4">
								<img
									src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
									className="w-10 h-10 mr-2 rounded-full
								object-cover" alt="" />
								<div className="grid grid-cols-1 w-3/6">
									<p className="font-bold text-sm m-0">Oyewusi Michael</p>
									<small className="text-gray-400 font-light">
									Front desk</small>
								</div>
								<div className="grid grid-cols-1 w-2/6">
									<p className="font-bold text-sm text-green-600 ">Hilton hotel</p>
									<small className="text-gray-500 font-light text-sm ">
									25-10-2021
									</small>
								</div>
							</div>
							
							<div className="flex flex-row w-full mb-4">
								<img
									src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
									className="w-10 h-10 mr-2 rounded-full
								object-cover" alt="" />
								<div className="grid grid-cols-1 w-3/6">
									<p className="font-bold text-sm m-0">Oyewusi Michael</p>
									<small className="text-gray-400 font-light">
									Front desk</small>
								</div>
								<div className="grid grid-cols-1 w-2/6">
									<p className="font-bold text-sm text-green-600 ">Hilton hotel</p>
									<small className="text-gray-500 font-light text-sm ">
									25-10-2021
									</small>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<div className="col-span-12 lg:col-span-4 ">
				<div className='bg-white rounded-md px-4 py-8'>
					<p className='text-lg font-bold'>Today’s Confirmed Shifts</p>

					<div className="flex flex-row w-full items-center my-6">
						<img src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
							className="w-10 h-10 mr-2 rounded-full object-cover" alt="" />
						<div className="grid grid-cols-1 w-3/6">
							<p className="font-bold m-0 text-sm">Oyewusi Michael</p>
							
							<small className="text-gray-600 font-light">Hilton Hotel</small>
						</div>
						<div className="grid grid-cols-1 w-2/6">
							<h1 className="font-bold text-green-500 text-right">$23</h1>
							
							<small className="text-gray-500 font-light text-xs text-right">
								25-10-2021
							</small>
						</div>
					</div>
					
					<div className="flex flex-row w-full items-center my-6">
						<img src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
							className="w-10 h-10 mr-2 rounded-full object-cover" alt="" />
						<div className="grid grid-cols-1 w-3/6">
							<p className="font-bold m-0 text-sm">Oyewusi Michael</p>
							
							<small className="text-gray-600 font-light">Hilton Hotel</small>
						</div>
						<div className="grid grid-cols-1 w-2/6">
							<h1 className="font-bold text-green-500 text-right">$23</h1>
							
							<small className="text-gray-500 font-light text-xs text-right">
								25-10-2021
							</small>
						</div>
					</div>
					
					<div className="flex flex-row w-full items-center my-6">
						<img src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
							className="w-10 h-10 mr-2 rounded-full object-cover" alt="" />
						<div className="grid grid-cols-1 w-3/6">
							<p className="font-bold m-0 text-sm">Oyewusi Michael</p>
							
							<small className="text-gray-600 font-light">Hilton Hotel</small>
						</div>
						<div className="grid grid-cols-1 w-2/6">
							<h1 className="font-bold text-green-500 text-right">$23</h1>
							
							<small className="text-gray-500 font-light text-xs text-right">
								25-10-2021
							</small>
						</div>
					</div>
					
					<div className="flex flex-row w-full items-center my-6">
						<img src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
							className="w-10 h-10 mr-2 rounded-full object-cover" alt="" />
						<div className="grid grid-cols-1 w-3/6">
							<p className="font-bold m-0 text-sm">Oyewusi Michael</p>
							
							<small className="text-gray-600 font-light">Hilton Hotel</small>
						</div>
						<div className="grid grid-cols-1 w-2/6">
							<h1 className="font-bold text-green-500 text-right">$23</h1>
							
							<small className="text-gray-500 font-light text-xs text-right">
								25-10-2021
							</small>
						</div>
					</div>
					
					<div className="flex flex-row w-full items-center my-6">
						<img src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?cs=srgb&dl=pexels-emre-keshavarz-3619947.jpg&fm=jpg"
							className="w-10 h-10 mr-2 rounded-full object-cover" alt="" />
						<div className="grid grid-cols-1 w-3/6">
							<p className="font-bold m-0 text-sm">Oyewusi Michael</p>
							
							<small className="text-gray-600 font-light">Hilton Hotel</small>
						</div>
						<div className="grid grid-cols-1 w-2/6">
							<h1 className="font-bold text-green-500 text-right">$23</h1>
							
							<small className="text-gray-500 font-light text-xs text-right">
								25-10-2021
							</small>
						</div>
					</div>

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

const ShiftTitles = [
	{
		"name": "All Shifts",
		"count": 0
	},
	{
		"name": "Assigned Shifts",
		"count": 0
	},
	{
		"name": "Unassigned Shifts",
		"count": 0
	},
	{
		"name": "Cancelled Shifts",
		"count": 0
	}
]

const Columns = [
	"Shift ID",
	"Scheduled Time",
	"Contractor",
	"Scheduled Type",
	"Status",
	"Request",
	"Pay/hr"
]

export const ShiftsBoard = () => {
	const [tileActive, setTileActive] = React.useState(0)
	return (
		<div className="h-full w-full flex flex-col shiftsBoard items-center">
		<div className="w-full flex flex-row justify-between mb-4">
			<h1 className="homeWelcome">Shifts
			<img src={UnderLine} /></h1>
			<Button className="homeShiftCreate" isActive={true}>
			<ReactSVG src={CircleOutline} />
			Create new Shifts
			</Button>
		</div>
		<hr />
		<div className="flex flex-col w-full">
			<div className="headTiles flex flex-row justify-between items-center">
			{ShiftTitles.map((item, index) => {
				return (
				<div onClick={() => setTileActive(index)}
					className={`flex flex-row items-center holdTiles 
				${tileActive == index ? 'active' : ''}`} key={index}>
					<h1 className="tileTitle">{item.name}</h1>
					<h1 className="tileCount">{item.count}</h1>
				</div>
				)
			})}
			</div>
		</div>
		<div className="w-full flex flex-row mb-5 items-center justify-between">
			<h1 className="tableTopHeader">Fri Oct 24th</h1>
			<div className="dateSelect flex flex-row items-center pl-8 pr-4">
			<input type="text" pattern="[12]\d{3}-(0[1-9]|1[0-2])-
				(0[1-9]|[12]\d|3[01])"/>
			<ReactSVG src={Date} />
			</div>
			<Button isActive={true} className="today">
			Today
			</Button>
			<div className="relative">
			<div className="h-full absolute w-10 border-t
				border-r border-b z-50 bg-white right-0
				flex flex-col justify center items-center">
				<ReactSVG src={ArrowDown} className=" m-auto" />
			</div>
			<select className="shiftSelect focus:outline-none px-6 relative">

				<option value="allShifts">All Shifts</option>
			</select>
			</div>
		</div>
		<div className="tableHolder">
			<Table noDataIcon={<ReactSVG src={NoDataTable}
			className=" mb-5" />} noData="No Shift here" columns={Columns} />
		</div>
		</div>
	)
	}

	const FavoriteColumns = [
	"Contractor",
	"Completed Shifts",
	"Contractor Role",
	"Ratings",
	"Badges"
	]

	export const FavoritesBoard = () => {
	return (
		<div className="h-full w-full flex flex-col items-center favoritesBoard">
		<div className="w-full flex flex-row justify-between mb-12">
			<h1 className="homeWelcome">Favorites
			<img src={UnderLine} /></h1>
			<Button className="homeShiftCreate" isActive={true}>
			<ReactSVG src={CircleOutline} />
			Create new Shift
			</Button>
		</div>
		<div className="flex flex-row-reverse mb-5 w-full">
			<div>
			<label htmlFor="selectRole" className="filterBy">Filter by</label>
			<div className="relative">
				<div className="h-full absolute w-10 border-t
				border-r border-b z-50 bg-white right-0
				flex flex-col justify center items-center">
				<ReactSVG src={ArrowDown} className=" m-auto" />
				</div>
				<select className="roleFilter focus:outline-none px-6 relative">

				<option value="allShifts">All Job Role</option>
				</select>
			</div>
			</div>
		</div>
		<div className="tableHolder">
			<Table noDataIcon={<ReactSVG src={NoFavorites}
			className=" mb-5" />} noData="No Favorites yet"
			columns={FavoriteColumns} />
		</div>
		</div>
	)
	}

	const BillingsColumns = [
	"Shift ID",
	"Contractor",
	"Shift Type",
	"Scheduled Time",
	"Shift Status",
	"Pay/hr",
	"FinalPay"
	]

	export const BillingBoard = () => {
	return (
		<div className="h-full w-full flex flex-col items-center BillingBoard">
		<div className="w-full flex flex-row justify-between mb-16">
			<h1 className="homeWelcome">Billings
			<img src={UnderLine} /></h1>
			<Button className="homeShiftCreate" isActive={true}>
			<ReactSVG src={CircleOutline} />
			Create new Shift
			</Button>
		</div>
		<div className="w-full flex flex-row mb-5 items-center justify-around">
			<h1 className="tableTopHeader">Fri Oct 24th</h1>
			<div className="dateSelect flex flex-row items-center pl-8 pr-4">
			<input type="text" pattern="[12]\d{3}-(0[1-9]|1[0-2])-
				(0[1-9]|[12]\d|3[01])"/>
			<ReactSVG src={Date} />
			</div>
			<Button isActive={true} className="current">
			Current Billing Period
			</Button>
			<h1 className="tableTopBottom">$0.00</h1>
		</div>
		<div className="tableHolder">
			<Table noDataIcon={<ReactSVG src={NoBillings}
			className=" mb-5" />} noData="No Billings yet"
			columns={BillingsColumns} />
		</div>
		</div>
	)
	}

	const leftSettings = [{
	"title": "Company Information",
	"subTitle": "Details about your company’s information",
	"icon": ""
	},
	{
	"title": "Payments",
	"subTitle": "Update your payment information",
	"icon": ""
	},
	{
	"title": "Ratings",
	"subTitle": "Know about your ratings and reviews",
	"icon": ""
	},
	{
	"title": "Password",
	"subTitle": "Change password",
	"icon": ""
	},
	{
	"title": "Notifications Settings",
	"subTitle": "Edit and customize your notifications settings",
	"icon": ""
	}]

	export const SettingsBoard = () => {
	return (
		<div className="h-full w-full flex flex-row settingsBoard">
		<div className="left flex flex-col">
			{leftSettings.map((item, index) => {
			return (
				<div className="flex flex-row">
				<div className="side flex flex-col">
					{item.icon}
				</div>
				<div className="w-full flex flex-col">
					<h1 className="settingsTitle">{item.title}</h1>
					<h1 className="settingsSubTitle">{item.subTitle}</h1>
				</div>

				</div>
			)
			})}
		</div>
		<div className="right">

		</div>
		</div>
	)
	}

	export const HelpBoard = () => {
	return (
		<div className="h-full w-full flex flex-col helpBoard">
		<div className="w-full flex flex-row-reverse">
			<div className="flex flex-row items-center">
			<BsFillBellFill className="mr-4" />
			<h1 className="topName">Choice Hotels</h1>
			<img className="w-12 h-12 rounded-full" />
			</div>
		</div>
		<div className="w-full flex flex-col items-center h-full">
			<h1 className="mainName">Other ways to get help</h1>
			<img className="underLine" src={UnderLine} />
			<small className="subTitle">
			For when you just need to speak to someone</small>
			<div className="w-full flex flex-row justify-center">
			<div className="imageOne">
				<img src={Woman} />
				<div className="bottom">
				<h1>Support Documentation</h1>
				<MdArrowForward />
				</div>
			</div>
			<div className="imageTwo">
				<img src={BlackMan} />
				<div className="bottom">
				<h1>Send us a mail</h1>
				<MdArrowForward />
				</div>
			</div>
			</div>
		</div>
		</div>
	)
}