import React, { ReactElement, useEffect, useState } from 'react';
import Button from '@components/home/Button';

import { ReactSVG } from 'react-svg';
import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg';

import UnderLine from '@assets/UnderLine.svg';

import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg';

import {
  baseUrl,
  useMergeState,
  getHourlyRate,
  getTimeDiffHM,
  getRoleById,
} from '@utils/helpers';

import CreateShiftModal from '../../../components/CreateShift/index';
import {
  IconButton,
  Popover,
  Dialog,
  FormControlLabel,
  Select,
  MenuItem,
  Menu,
  FormControl,
  ListItem,
} from '@material-ui/core';
import Datee from '@assets/dashboard/icons/DateSelect.svg';

import star from '@assets/icons/starempty.png';
import starfull from '@assets/icons/starfull.png';
import rating from '@assets/icons/rating.png';
import ratingempty from '@assets/icons/ratingempty.png';

import ShiftTable from '@components/Table/ShiftsTable';
import CancelledSHiftTable from '@components/Table/CancelledShifts';

import { BpCheckbox } from '@components/Checkbox/Checkbox';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker, {
  Calendar,
  DayValue,
  DayRange,
  Day,
  utils,
} from 'react-modern-calendar-datepicker';
import { BsArrowLeft } from 'react-icons/bs';
import moment from 'moment';

interface Props {}
const Columns = [
  'Shift ID',
  'Scheduled Time',
  'Contractor',
  'Scheduled Type',
  'Status',
  'Request',
  'Pay/hr',
];

const ShiftTableHeading = [
  { id: 1, label: 'Shift ID' },
  { id: 2, label: 'Scheduled Time' },
  { id: 7, label: ' Contractor' },
  { id: 3, label: 'Shift Name' },
  { id: 5, label: 'Status' },
  { id: 4, label: 'Requests' },
  { id: 6, label: 'Pay/hr' },
];
const scheduledShiftHeading = [
  { id: 1, label: 'Shift ID' },
  { id: 2, label: 'Scheduled Time' },
  { id: 7, label: ' Contractor' },
  { id: 3, label: 'Shift Name' },
  { id: 5, label: 'Status' },
  { id: 6, label: 'Pay/hr' },
];

const cancelledShiftHeading = [
  { id: 1, label: 'Shift ID' },
  { id: 2, label: 'Scheduled Time' },
  { id: 3, label: 'Shift Name' },
  { id: 7, label: ' Contractor' },
  { id: 5, label: 'Status' },
];

const unAssignedShiftHeading = [
  { id: 1, label: 'Shift ID' },
  { id: 2, label: 'Scheduled Time' },
  { id: 3, label: 'Shift Name' },
  { id: 4, label: 'Requests' },
  { id: 5, label: 'Status' },
  { id: 5, label: 'Pay/hr' },
  ,
];

const ShiftsBoard = () => {
  const [tileActive, setTabActive] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allShiftsData, setAllShiftsData] = useState<any[]>([]);
  const [cancelledShiftData, setCancelledShift] = useState<any[]>([]);
  const [assignedShifts, setAssignedShift] = useState<any[]>([]);
  const [unassigned, setUnassigned] = useState<any[]>([]);
  const [completedShifts, setCompletedShifts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [shiftPagination, setShiftPagination] = useState<any | undefined>();
  const [page_number, setPageNumber] = useState(1);
  const [cancelledPage_number, setCancelledPage_number] = useState(1);
  const [cancelledPagination, setCancelledPagination] = useState<
    any | undefined
  >();
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const setShiftPage = (value) => {
    setPageNumber(value);
  };
  const cancelledShiftPage = (value) => {
    setCancelledPage_number(value);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const token = localStorage.getItem('token');

  const [day, setDay] = useState<DayValue>(null);
  const [filterDay, setFilterDay] = useState('');
  const setTabUn = () => {
    setTabActive(2);
    getShiftData();
  };
  const extractDateData = (item: DayValue) => {
    if (!!!item) {
      return ' ';
    }

    const dateRes = `${item.year}-${item.month}-${item.day}`;
    setFilterDay(dateRes);
  };

  const targetAudienceFilters = [
    { label: 'Market', value: 'MARKET' },
    { label: 'Favorite', value: 'FAVOURITE' },
    { label: 'Manual', value: 'MANUAL' },
  ];
  const [targetFilter, setTargetFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [jobRole, setJobRole] = useState<any>([]);
  const [done, setDone] = useState(false);

  let api = new URL(
    `${baseUrl}/v1/shifts?page=${page_number}${
      targetFilter !== '' ? `&audience=${targetFilter}` : ''
    }${roleFilter !== '' ? `&job_role_id=${roleFilter}` : ''}${
      day !== null ? `&date=${day?.year}-${day?.month}-${day.day}` : ''
    }`
  );

  const getShiftData = async () => {
    await axios
      .get(api.toString(), {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setShiftPagination(res.headers);
        const item = res.data;
        item.sort(function (a, b) {
          var keyA = new Date(a.startTime),
            keyB = new Date(b.startTime);
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
        let active = item.filter((o) => o.active === true);
        setAllShiftsData(active);
        let UnAssigendArray = active.filter((o) => o.status === 'PENDING');
        let assignedArray = active.filter((o) => o.status === 'ACCEPTED');
        let completedArray = active.filter((o) => o.status === 'COMPLETED');
        setAssignedShift(assignedArray);
        setUnassigned(UnAssigendArray);
        setCompletedShifts(completedArray);
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Something went wrong,please try again');
        setLoading(false);
      });
  };

  const getCancelledShifts = async () => {
    const CancelledShiftEndpoint = `${baseUrl}/v1/shift_cancellations?page=${cancelledPage_number}`;
    await axios
      .get(CancelledShiftEndpoint, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let active = res.data?.filter((o) => o.active === true);
        setCancelledPagination(res.headers);

        setCancelledShift(active);
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Please try again');
        setLoading(false);
      });
  };
  const getRoles = async () => {
    const shiftRolesEndpoint = `${baseUrl}/v1/job_roles`;
    try {
      let res = await fetch(shiftRolesEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      let item = await res.json();
      setJobRole(item);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);

    getCancelledShifts();
  }, [cancelledPage_number]);
  useEffect(() => {
    setLoading(true);

    getShiftData();
    getRoles();
  }, [done, day, page_number]);
  const id = open ? 'calendar-popover' : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    getShiftData();
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const ShiftTitles = [
    {
      name: 'All Shifts',
      count: allShiftsData?.length,
    },
    {
      name: 'Assigned Shifts',
      count: assignedShifts?.length,
    },
    {
      name: 'Unassigned Shifts',
      count: unassigned?.length,
    },
    {
      name: 'Completed Shifts',
      count: completedShifts.length,
    },
    {
      name: 'Cancelled Shifts',
      count: cancelledShiftData.length,
    },
  ];

  const selectedPop = open ? 'simple-menu' : undefined;
  let todayDate = new Date().toDateString();

  const calculateStarRating = (value) => {
    let whole = Math.trunc(value);
    let balance = 5 - whole;

    // return [whole, balance]
    return (
      <>
        {[...Array(whole)].map((e, i) => (
          <img key={i} src={rating} className="w-6 h-6" />
        ))}
        {[...Array(balance)].map((e, i) => (
          <img key={i} src={ratingempty} className="w-6 h-6" />
        ))}
      </>
    );
  };

  const [openUnassigned, setOpenUnassigned] = useState(null);

  const approveContractor = (id, shift) => {
    let raw = {
      contractor_id: id,
      shift_id: shift,
    };

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    fetch(baseUrl + `/v1/shift/award`, {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify(raw),
    })
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        // console.log(response);

        setOpenUnassigned(null);
        getShiftData();
        getCancelledShifts();
        getRoles();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  return (
    <>
      {openUnassigned ? (
        <div className=" w-full flex flex-col px-10 justify-around items-center">
          {console.log(openUnassigned)}
          <div className="flex w-full justify-between items-center mt-4">
            <p
              className="flex items-center font-semibold cursor-pointer"
              onClick={() => setOpenUnassigned(null)}
            >
              <BsArrowLeft className="mr-2" />
              Go Back
            </p>
          </div>

          <div className="w-full flex flex-wrap justify-between items-center mt-12 bg-gray-50 rounded-lg p-10">
            <div>
              <p className="text-3xl font-bold">
                {openUnassigned ? openUnassigned?.roles[0]?.name : ''}
              </p>

              <p className="text-gray-700 font-medium mt-6">
                <span className="font-bold">Start Time:</span>{' '}
                {moment(openUnassigned.startTime).format('LT')}, &nbsp;
                {moment(openUnassigned.startTime).format('ll')}
              </p>

              <p className="text-gray-700 font-medium">
                <span className="font-bold">End Time:</span>{' '}
                {moment(openUnassigned.endTime).format('LT')}, &nbsp;
                {moment(openUnassigned.endTime).format('ll')}
              </p>
            </div>

            <div>
              <p className="text-gray-700 font-medium">
                <span className="font-bold">Date Posted: </span>
                {moment(openUnassigned.createdAt).format('ll')}
              </p>

              <p className="text-gray-700 font-bold text-xl my-3">
                Pay: &nbsp;
                <span className="text-green-500">
                  $
                  {getHourlyRate(
                    openUnassigned.pay,
                    openUnassigned.startTime,
                    openUnassigned.endTime
                  )}
                  /hr
                </span>
              </p>

              <p className="text-gray-700 font-medium">
                <span className="font-bold">Shift Duration: </span>{' '}
                {getTimeDiffHM(
                  openUnassigned.startTime,
                  openUnassigned.endTime
                )}
              </p>
            </div>
          </div>

          <div className="w-full px-10 py-8 my-10 bg-gray-50 rounded-lg">
            <div className="w-full overflow-x-scroll">
              <table className="w-full">
                <thead className="mb-4">
                  <tr className="text-left mb-4">
                    <th>
                      <p className="text-gray-400">Contractor</p>
                    </th>

                    <th>
                      <p className="text-gray-400">Schedule Type</p>
                    </th>

                    <th>
                      <p className="text-gray-400">Completed Shifts</p>
                    </th>

                    <th>
                      <p className="text-gray-400">Ratings</p>
                    </th>

                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {openUnassigned.requests && openUnassigned.requests.length ? (
                    openUnassigned.requests.map((contractor, i) => {
                      return (
                        <tr className="pt-4">
                          <td>
                            <p>
                              {contractor.contractor.owner.firstname} &nbsp;
                              {contractor.contractor.owner.lastname}
                            </p>
                          </td>

                          <td>
                            <p>{contractor.contractor.roles[0].name}</p>
                          </td>

                          <td>
                            <p>
                              {contractor.contractor.completedShiftsCount
                                ? contractor.contractor.completedShiftsCount
                                : 0}
                            </p>
                          </td>

                          <td>
                            <div className="flex">
                              {calculateStarRating(
                                contractor.contractor.rating
                              )}
                            </div>
                          </td>

                          <td>
                            <button
                              className="my-3 py-2 px-6 rounded-md font-semibold bg-green-500 text-white"
                              onClick={() =>
                                approveContractor(
                                  contractor.contractor.id,
                                  contractor.shift_id
                                )
                              }
                            >
                              Accept
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <p className="my-3 font-semibold text-gray-500 text-center">
                          No Requests yet
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full flex flex-col lg:px-10 sm:px-3  ">
          <div className="w-full flex flex-row justify-between mb-4 py-8">
            <div>
              <p className="lg:text-4xl text-2xl font-bold text-black pb-1">
                Shifts
              </p>
              <img src={UnderLine} className=" w-1/2 h-auto" />
            </div>

            <button
              className="bg-statusBlue flex items-center space-x-2 px-2 sm:py-2 lg:py-4 rounded-md"
              onClick={handleDialogOpen}
            >
              <ReactSVG src={CircleOutline} />
              <p className="text-white text-sm lg:text-base whitespace-nowrap">
                Create new shifts
              </p>
            </button>
          </div>
          <hr />
          <div className="lg:flex flex-col w-full lg:border-grayBorder hidden  ">
            <div className="  flex  lg:flex-row lg:justify-between lg:items-center lg:border-t-2 lg:border-b-2   ">
              {ShiftTitles.map((item, index) => {
                return (
                  <div
                    onClick={() => setTabActive(index)}
                    className={`flex flex-row space-x-3 items-center z-0  focus:border-b-2 focus:border-red-500 cursor-pointer py-4
                ${tileActive == index ? ' border-b-2 border-appBlue ' : ''}`}
                    key={index}
                  >
                    <h1
                      className={`text-sm font-semibold 	${
                        tileActive == index
                          ? ' text-black '
                          : 'text-tableHeading'
                      } `}
                    >
                      {item.name}
                    </h1>
                    <h1
                      style={{ borderRadius: 10 }}
                      className={` text-sm flex items-center justify-center p-1.5 px-2    	${
                        tileActive == index
                          ? 'bg-statusBlue text-white '
                          : index === 1
                          ? 'bg-statusBlue bg-opacity-30 text-yellow-100'
                          : index === 2
                          ? 'bg-yellow-500 bg-opacity-30 text-yellow-300'
                          : 'bg-red-500 bg-opacity-30 text-red-300'
                      }`}
                    >
                      {item.count}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:hidden z-0">
            {ShiftTitles.map((item, index) => (
              <MenuItem
                disableRipple
                style={{ boxShadow: 'none', zIndex: 0 }}
                className="flex px-2 "
              >
                <FormControlLabel
                  style={{ fontSize: '0.875rem', boxShadow: 'none', zIndex: 0 }}
                  classes={{
                    root: 'bg-white',
                    label: 'text-sm text-shadeOfBlack font-semibold',
                  }}
                  control={
                    <BpCheckbox
                      checked={tileActive === index ? true : false}
                      value={tileActive}
                      onClick={() => setTabActive(index)}
                    />
                  }
                  label={item.name}
                />
              </MenuItem>
            ))}
          </div>
          <CreateShiftModal
            openDialog={dialogOpen}
            closeDialog={handleDialogClose}
            setState={setTabUn}
          />
          <div className="w-full lg:flex flex-col lg:flex-row mb-5 lg:py-4 lg:pt-7 items-center justify-between">
            <h1 className="text-2xl text-black font-bold">{todayDate}</h1>
            <div className="border border-inputBorder flex flex-row  justify-between items-center lg:pl-8 lg:pr-4">
              <p className="text-shadeOfBlack font-semibold">
                {day === null
                  ? `${utils('en').getToday().day}/${
                      utils('en').getToday().month
                    }/${utils('en').getToday().year}`
                  : `${day.year}/${day.month}/${day.day} `}
              </p>
              <IconButton onClick={handlePopoverOpen} className="flex-end">
                <ReactSVG src={Datee} />
              </IconButton>
            </div>
            <div className="flex justify-between items-center lg:py-0 py-2 lg:hidden">
              <div className=" bg-appBlue px-4 lg:px-7  py-2 rounded-md">
                <p
                  className=" text-white text-center cursor-pointer"
                  onClick={() => setDay(utils('en').getToday())}
                >
                  Today
                </p>
              </div>
              <div className="  ">
                <div
                  aria-controls="simple-menu"
                  onClick={handleMenuClick}
                  className="h-full  w-full  bg-white
                flex  "
                >
                  <IconButton
                    disableRipple={true}
                    disableFocusRipple={true}
                    onClick={handleMenuClick}
                    aria-describedby={selectedPop}
                    classes={{ root: 'items-center flex space-x-2 ' }}
                  >
                    <p className="text-sm text-shadeOfBlack font-semibold px-2">
                      {' '}
                      Filter Shifts
                    </p>
                    <ReactSVG src={ArrowDown} className=" m-auto" />
                  </IconButton>
                </div>

                <Popover
                  aria-describedby={selectedPop}
                  open={Boolean(menuAnchorEl)}
                  anchorEl={menuAnchorEl}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  PaperProps={{
                    style: {
                      borderRadius: 20,
                      padding: 20,
                      overflowX: 'hidden',
                    },
                  }}
                >
                  <MenuItem disableRipple className="flex px-2">
                    <FormControlLabel
                      classes={{
                        root: 'bg-white',
                        label: 'text-sm-shadeOfBlack font-semibold',
                      }}
                      control={
                        <BpCheckbox
                          onChange={() => {
                            setTargetFilter('');
                            setRoleFilter('');
                            setFilterDay('');
                            setDone(!done);
                          }}
                        />
                      }
                      label="All Shifts"
                    />
                  </MenuItem>{' '}
                  {targetAudienceFilters?.map((item) => (
                    <MenuItem disableRipple className="flex px-2">
                      <FormControlLabel
                        classes={{
                          root: 'bg-white',
                          label: 'text-sm-shadeOfBlack font-semibold',
                        }}
                        control={
                          <BpCheckbox
                            checked={item.value === targetFilter ? true : false}
                            value={targetFilter}
                            onChange={() => {
                              targetFilter === item.value
                                ? setTargetFilter('')
                                : setTargetFilter(item.value);
                            }}
                          />
                        }
                        label={item.label}
                      />
                    </MenuItem>
                  ))}
                  {jobRole.length > 0 &&
                    jobRole.map((item) => (
                      <MenuItem disableRipple className="flex px-2 ">
                        <FormControlLabel
                          classes={{
                            root: 'bg-white',
                            label: 'text-sm-shadeOfBlack font-semibold',
                          }}
                          control={
                            <BpCheckbox
                              checked={item.id === roleFilter ? true : false}
                              value={roleFilter}
                              onChange={() => {
                                roleFilter === item.id
                                  ? setRoleFilter('')
                                  : setRoleFilter(item.id);
                              }}
                            />
                          }
                          label={item.name}
                        />
                      </MenuItem>
                    ))}
                  <MenuItem
                    disableRipple
                    className="grid justify-end  bg-app-TQ  rounded-md items-end"
                  >
                    <div className="w-full flex flex-row-reverse">
                      <button
                        onClick={() => {
                          setDone(!done);
                          handleMenuClose();
                        }}
                        style={{ backgroundColor: '#30BFA3' }}
                        className="bg-app-TQ  rounded-md py-1 px-3 text-white "
                      >
                        Done
                      </button>
                    </div>
                  </MenuItem>
                </Popover>
              </div>
            </div>
            <div className=" bg-appBlue w-1/5 hidden lg:block p-3 rounded-md">
              <p
                className=" text-white text-center cursor-pointer"
                onClick={() => setDay(utils('en').getToday())}
              >
                Today
              </p>
            </div>
            <div className=" hidden lg:block ">
              <div
                aria-controls="simple-menu"
                onClick={handleMenuClick}
                className="h-full  w-full   bg-white
                flex  "
              >
                <IconButton
                  disableRipple={true}
                  disableFocusRipple={true}
                  onClick={handleMenuClick}
                  aria-describedby={selectedPop}
                  classes={{ root: 'items-center flex space-x-2 ' }}
                >
                  <p className="text-sm text-shadeOfBlack font-semibold px-2">
                    {' '}
                    Filter Shifts
                  </p>
                  <ReactSVG src={ArrowDown} className=" m-auto" />
                </IconButton>
              </div>
            </div>
          </div>
          {tileActive === 0 ? (
            <ShiftTable
              unAssigned={false}
              heading={ShiftTableHeading}
              row={allShiftsData}
              assigned={false}
              loading={loading}
              getShiftData={getShiftData}
              setState={setTabUn}
              setRequests={setOpenUnassigned}
              shiftPaginationData={shiftPagination}
              setPageNumber={setShiftPage}
            />
          ) : tileActive === 4 ? (
            <CancelledSHiftTable
              heading={cancelledShiftHeading}
              row={cancelledShiftData}
              unAssigned={false}
              loading={loading}
              getShiftData={getCancelledShifts}
              cancelledPagination={cancelledPagination}
              setPageNumber={cancelledShiftPage}
            />
          ) : tileActive === 2 ? (
            <ShiftTable
              heading={unAssignedShiftHeading}
              unAssigned={true}
              row={unassigned}
              loading={loading}
              assigned={false}
              getShiftData={getShiftData}
              setState={setTabUn}
              setRequests={setOpenUnassigned}
              shiftPaginationData={shiftPagination}
              setPageNumber={setShiftPage}
            />
          ) : tileActive === 3 ? (
            <ShiftTable
              unAssigned={false}
              assigned={true}
              heading={scheduledShiftHeading}
              row={completedShifts}
              loading={loading}
              getShiftData={getShiftData}
              setState={setTabUn}
              setRequests={setOpenUnassigned}
              shiftPaginationData={shiftPagination}
              setPageNumber={setShiftPage}
            />
          ) : (
            <ShiftTable
              unAssigned={false}
              assigned={true}
              heading={scheduledShiftHeading}
              row={assignedShifts}
              loading={loading}
              getShiftData={getShiftData}
              setState={setTabUn}
              setRequests={setOpenUnassigned}
              shiftPaginationData={shiftPagination}
              setPageNumber={setShiftPage}
            />
          )}

          <Popover
            id={id}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Calendar
              value={day}
              onChange={(e) => {
                setDay(e);
                if (!!!day) return null;
                extractDateData(day);
                setDone(!done);
              }}
              // minimumDate={utils('en').getToday()}
              colorPrimary="#0C77F8"
              colorPrimaryLight="#333333"
              shouldHighlightWeekends={false}
            />
          </Popover>
        </div>
      )}
    </>
  );
};

export default ShiftsBoard;
