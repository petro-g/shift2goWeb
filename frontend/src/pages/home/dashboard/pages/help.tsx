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
import Dates from '@assets/dashboard/icons/DateSelect.svg'
import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg'
import Table from '@components/home/Table';
import NoDataTable from '@assets/dashboard/icons/NoDataTable.svg'
import NoFavorites from '@assets/dashboard/icons/NoFavorites.svg'
import NoBillings from '@assets/dashboard/icons/NoBillings.svg'

import loginIcon from '../../../../assets/icons/Login.png'
import logoutIcon from '../../../../assets/icons/Logout.png'
import shiftIcon from '../../../../assets/icons/File.png'
import shift2Icon from '../../../../assets/icons/Check.png'

import avatar from '../../../../assets/icons/hotavatar.png'
import rating from '../../../../assets/icons/rating.png'
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
import edit from '../../../../assets/icons/edit.png'

import starempty from '../../../../assets/icons/starempty.png'
import starfull from '../../../../assets/icons/starfull.png'

import clean from '../../../../assets/icons/clean.png'
import goals from '../../../../assets/icons/goals.png'
import service from '../../../../assets/icons/service.png'
import amenity from '../../../../assets/icons/amenity.png'
import { baseUrl, useMergeState } from '@utils/helpers';

import { BsArrowLeft, BsChevronLeft } from 'react-icons/bs'
import timely from '../../../../assets/icons/time.png';
import team from '../../../../assets/icons/team.png';
import knowledge from '../../../../assets/icons/knowledge.png';
import dressing from '../../../../assets/icons/dressing.png';




export const HelpBoard = () => {
	return (
		<>
			<div className="h-full w-full flex flex-col helpBoard">
				
				<div className="w-full flex flex-col items-center h-full">
					<h1 className="text-2xl lg:text-4xl font-bold mt-12">Other ways to get help</h1>
					<img className="underLine" src={UnderLine} />
					<small className="subTitle"> For when you just need to speak to someone</small>
					<div className="w-full flex flex-row flex-wrap justify-center">
					<div className="imageOne mb-6 lg:mr-8">
						<img src={Woman} />
						<div className="bottom">
							<div className="w-full flex items-center justify-between">
								<h1 className='font-semibold'>Support Documentation</h1>
								<MdArrowForward />
							</div>
						</div>
					</div>
					<div className="imageTwo mb-6">
						<img src={BlackMan} />
						<div className="bottom">
							<div className="w-full flex items-center justify-between">
								<h1 className='font-semibold'>Send us a mail</h1>
								<MdArrowForward />
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default HelpBoard