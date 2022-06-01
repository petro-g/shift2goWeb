/* eslint-disable max-len */
import React, { ReactElement, useState, useEffect } from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, DayValue, utils } from 'react-modern-calendar-datepicker';
import {
  IconButton,
  Dialog,
  FormControlLabel,
  Avatar,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';
import Input from '@components/home/Input';
import Button from '@components/home/Button';
import { BpCheckbox } from '@components/Checkbox/Checkbox';

import UnderLine from '@assets/UnderLine.svg';

import CloseIcon from '@assets/close_big.svg';
import Pulse from '@assets/pulse.svg';

import { useDispatch, useSelector } from 'react-redux';
import { GetFaveList, GetManagerDetails } from '../../context/actions/auth';
import { baseUrl, useMergeState } from '@utils/helpers';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import subDays from 'date-fns/subDays';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment from 'moment';

const CreateShiftModal = ({
  openDialog,
  closeDialog,
  setState,
  editShiftItem = null,
}) => {
  const [shiftRolesList, setShiftRolesList] = React.useState<any[]>([]);
  const [requiredCertificates, setRequiredCertificates] = React.useState<any[]>(
    []
  );
  const history = useHistory();
  const [startTime, setTime] = React.useState('');
  const [endTime, setT] = React.useState('');
  let startDateInput = {
    placeholder: 'Start Date',
  };
  let startTimeInput = {
    placeholder: 'Start Time',
  };
  let endDateInput = {
    placeholder: 'End Date',
  };
  let endTimeInput = {
    placeholder: 'End Time',
  };
  let yesterday = subDays(new Date(), 1);
  let valid = function (current) {
    return current.isAfter(yesterday);
  };
  const [creatingShift, setCreatingShift] = useState(false);

  const [faveList, setFaveList] = React.useState<any[]>([]);
  const dispatch = useDispatch();
  const hotel_id: string = sessionStorage.getItem('hotel_id');
  const token = localStorage.getItem('token');
  const getHotelId = async () => {
    const request = await fetch(`${baseUrl}/v1/manager/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (request.ok) {
      const response = await request.json();
      if(response.hotels.length === 0){
        history.push('/signup', {
          page: 2
        })
      } else {
        sessionStorage.setItem('hotel_id', response.hotels[0].id)
      }
      return true;
    }
    return false;
  }
  if (!hotel_id) getHotelId();
  useEffect(() => {
    const getRoles = async () => {
      const shiftRolesEndpoint = `${baseUrl}/v1/job_roles`;
      let item;
      try {
        let res = await fetch(shiftRolesEndpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        item = await res.json();
        setShiftRolesList(item);
      } catch (error) {
        console.error(error);
      }
    };
    const getCertificatesRequired = async () => {
      const certEndpoint = `${baseUrl}/v1/certificate/types`;
      let item;
      try {
        let res = await fetch(certEndpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        item = await res.json();
        setRequiredCertificates(item);
      } catch (error) {
        console.error(error);
      }
    };
    const getFavoriteList = async () => {
      const favelistEndpoint = `${baseUrl}/v1/hotel/favourites?hotel_id=${hotel_id}&page=1`;

      try {
        let res = await fetch(favelistEndpoint, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const item = await res.json();
        setFaveList(item);
        dispatch(GetFaveList(item));
      } catch (error) {
        console.error(error);
      }
    };
    getRoles();
    getCertificatesRequired();
    getFavoriteList();
  }, []);

  const [tileActive, setTileActive] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const changeTile = () => {
    if (tileActive === 0) {
      setTileActive(1);
    } else {
      setTileActive(0);
    }
  };
  const id = open ? 'calendar-popover' : undefined;

  const handleDialogClose = () => {
    closeDialog();
  };

  const [selectedDate, setSelectedDate] = useState('');
  const extractDateData = (item: DayValue) => {
    if (!!!item) {
      return ' ';
    }

    const dateRes = `${item.year}-${item.month}-${item.day}`;
    setSelectedDate(new Date(dateRes).toISOString());
  };

  const [contractorTile, setContractorTile] = React.useState(
    'Contractor MarketPlace'
  );
  const [contractorText, setContractorText] = React.useState(
    ' This Shift will be available to all applicable , approved Shift2go Contractors. if your Contractor cancels on you, Shift2Go will find a replacement'
  );

  const [successDialogOpen, setSuccessDialog] = React.useState(false);

  const ContractorSelection = [
    {
      name: 'Favorites First',
      value: 'FAVORITE',
      content:
        'This Shift will only be available to Favorite Contractors. If the Favorites Contractor doesn’t accept it in one hour, this Shift will be available on the Marketplace',
    },
    {
      name: 'Contractor MarketPlace',
      value: 'MARKET',
      content:
        ' This Shift will be available to all applicable , approved Shift2go Contractors. if your Contractor cancels on you, Shift2Go will find a replacement',
    },
    {
      name: 'Manual Selection',
      value: 'MANUAL',
      content:
        " This Shift will only be available to the Contractor you select on the next page. If the selected Contractor doesn't accept it one hour, this Shift will be available on the Marketplace.",
    },
  ];
  const closeSuccessModal = () => {
    setSuccessDialog(false);
  };
  const [createShiftData, setCreateShiftData] = React.useState<any>({
    name: '',
    hotel_id: hotel_id,
    roles_ids: 0,
    startTime: '',
    endTime: '',
    pay: '',
    instructions: '',
    requiredCertificates: [],
    audienceType: 'MARKET',
  });

  const [role_ids, setRolesID] = useState(undefined);
  const [neededCerts, setNeededCerts] = useState([]);
  const [targetAudience, setTargetAudience] = React.useState<any[]>([]);
  const [manualId, setManualId] = useState('');
  const [updateShiftId, setUpdateShiftId] = useState<number | string>('');
  const [previousState, setPreviousState] = useState({});
  if (editShiftItem === null || editShiftItem === undefined) {
    // console.log('none');
  } else if (Object.entries(editShiftItem).length === 0) {
  } else if (editShiftItem.audienceType === 'MANUAL') {
    if (editShiftItem !== previousState) {
      setPreviousState(editShiftItem);
      setRolesID(editShiftItem.roles_ids);
      setManualId(editShiftItem.contractor_id);
      setCreateShiftData({
        name: editShiftItem.name,
        hotel_id: editShiftItem.hotel_id,
        roles_ids: editShiftItem.roles_ids,
        pay: editShiftItem.pay,
        instructions: editShiftItem.instructions,
        audienceType: editShiftItem.audienceType,
      });
      setNeededCerts(editShiftItem.requiredCertificatesTypes);
      setContractorTile('Manual Selection');
      setUpdateShiftId(editShiftItem.id);
    }
  } else if (editShiftItem.audienceType === 'MARKET') {
    if (editShiftItem !== previousState) {
      setPreviousState(editShiftItem);
      setRolesID(editShiftItem.roles_ids);
      setManualId(editShiftItem.contractor_id);
      setCreateShiftData({
        name: editShiftItem.name,
        hotel_id: editShiftItem.hotel_id,
        roles_ids: editShiftItem.roles_ids,
        pay: editShiftItem.pay,
        instructions: editShiftItem.instructions,
        audienceType: editShiftItem.audienceType,
      });
      setNeededCerts(editShiftItem.requiredCertificatesTypes);
      setContractorTile('Contractor MarketPlace');
      setUpdateShiftId(editShiftItem.id);
    }
  } else {
    if (editShiftItem !== previousState) {
      setPreviousState(editShiftItem);
      setRolesID(editShiftItem.roles_ids);
      setManualId(editShiftItem.contractor_id);
      setCreateShiftData({
        name: editShiftItem.name,
        hotel_id: editShiftItem.hotel_id,
        roles_ids: editShiftItem.roles_ids,
        pay: editShiftItem.pay,
        instructions: editShiftItem.instructions,
        audienceType: editShiftItem.audienceType,
      });
      setNeededCerts(editShiftItem.requiredCertificatesTypes);
      setContractorTile('Favorites First');
      setUpdateShiftId(editShiftItem.id);
      setTargetAudience(editShiftItem.targetAudience);
    }
  }

  const submitData = async () => {

    let start = moment(startTime)
    let end = moment(endTime)
    let shiftLength = end.diff(start, 'hours')

    if (start.isBefore()) {
      toast.error('Start time cannot be in the past');
      return
    }

    if (end.isBefore(start)) {
      toast.error('End time cannot be before start time');
      return
    }

    if (shiftLength < 4 || shiftLength > 10) {
      toast.error('Shift length must be between 4 and 10 hours');
      return
    }

    setCreatingShift(true);

    const api = `${baseUrl}/v1/shift/create`;
    let ApiData = {
      ...createShiftData,
      requiredCertificates: neededCerts,
      roles_ids: [role_ids],
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    // console.log(ApiData)
    //     if(ApiData) return;
    handleDialogClose();

    await axios
      .post(api, ApiData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreatingShift(false);
        res?.status === 201 && setSuccessDialog(true);
        setState();
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          roles_ids: [],

          audienceType: 'MARKET',
        });
        setTileActive(0);
        setNeededCerts([]);
        setRolesID(0);
      })
      .catch((error) => {
        setCreatingShift(false);
        toast.error('Please try again');
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        setTileActive(0);
        setNeededCerts([]);
        setRolesID(0);
      });
  };
  const updateSubmitData = async () => {
    setCreatingShift(true);

    const api = `${baseUrl}/v1/shift/update/${updateShiftId}`;
    let ApiData = {
      ...createShiftData,
      requiredCertificates: neededCerts,
      roles_ids: [role_ids],
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };

    await axios
      .post(api, ApiData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreatingShift(false);
        res?.status === 201 && setSuccessDialog(true);
        setState();
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.success('Shift successfully updated');
        setTileActive(0);
        setNeededCerts([]);
        setRolesID(0);
      })
      .catch((error) => {
        setCreatingShift(false);
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.error('Please try again');
        setTileActive(0);
        setNeededCerts([]);
        setRolesID(0);
      });
  };
  const submitFavesData = async () => {
    setCreatingShift(true);
    setOpenFaveList(false);
    const api = `${baseUrl}/v1/shift/create`;
    let ApiData = {
      ...createShiftData,
      requiredCertificates: neededCerts,
      roles_ids: [role_ids],
      targetAudience: targetAudience,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };
    if (targetAudience.length === 0) {
      return toast.error('Please choose at least favorite contractor');
    }



    handleDialogClose();

    await axios
      .post(api, ApiData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreatingShift(false);
        setOpenFaveList(false);

        res?.status === 201 && setSuccessDialog(true);
        setState();
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        setTileActive(0);
        setNeededCerts([]);
        setRolesID(0);
      })
      .catch((error) => {
        setCreatingShift(false);
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.error('Please try again');
        setTileActive(0);
        setNeededCerts([]);
        setRolesID(0);
      });
  };
  const updateSubmitFavesData = async () => {
    setCreatingShift(true);
    setOpenFaveList(false);
    const api = `${baseUrl}/v1/shift/update/${updateShiftId}`;
    let ApiData = {
      ...createShiftData,
      requiredCertificates: neededCerts,
      roles_ids: [role_ids],
      targetAudience: targetAudience,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    };
    if (targetAudience.length === 0) {
      return toast.error('Please choose at least favorite contractor');
    }
    handleDialogClose();

    await axios
      .post(api, ApiData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreatingShift(false);
        setOpenFaveList(false);

        res?.status === 201 && setSuccessDialog(true);
        setState();
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.success('Shift successfully updated');
        setNeededCerts([]);
        setRolesID(0);
      })
      .catch((error) => {
        setCreatingShift(false);
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.error(error);
        setNeededCerts([]);
        setRolesID(0);
      });
  };

  const submitManualData = async () => {
    setCreatingShift(true);
    setOpenManual(false);
    const api = `${baseUrl}/v1/shift/create`;
    let ApiData = {
      ...createShiftData,
      requiredCertificates: neededCerts,
      roles_ids: [role_ids],
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      contractor_id: parseInt(manualId),
    };
    if (manualId === '') {
      return toast.error('Please enter a contractor id ');
    }



    handleDialogClose();

    await axios
      .post(api, ApiData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreatingShift(false);
        res?.status === 201 && setSuccessDialog(true);
        setState();
        setTileActive(0);
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        setNeededCerts([]);
        setRolesID(0);
      })
      .catch((error) => {
        setCreatingShift(false);
        toast.error('Please try again');
        setTileActive(0);
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        setNeededCerts([]);
        setRolesID(0);
      });
  };
  const updateManualData = async () => {
    setCreatingShift(true);
    setOpenManual(false);
    const api = `${baseUrl}/v1/shift/update/${updateShiftId}`;
    let ApiData = {
      ...createShiftData,
      requiredCertificates: neededCerts,
      roles_ids: [role_ids],
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      contractor_id: manualId,
    };
    if (manualId === '') {
      return toast.error('Please enter a contractor id ');
    }
    handleDialogClose();

    await axios
      .post(api, ApiData, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreatingShift(false);

        res?.status === 201 && setSuccessDialog(true);
        setState();
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.success('Shift successfully updated');
        setNeededCerts([]);
        setRolesID(0);
      })
      .catch((error) => {
        console.log(error);
        setCreatingShift(false);
        setCreateShiftData({
          name: '',
          hotel_id: hotel_id,
          roles_ids: [],
          startTime: '',
          endTime: '',
          pay: '',
          instructions: '',
          requiredCertificates: [],
          audienceType: 'MARKET',
        });
        toast.error('Please try again');
        setNeededCerts([]);
        setRolesID(0);
      });
  };
  const [openFaveList, setOpenFaveList] = React.useState(false);
  const [openManual, setOpenManual] = useState(false);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCreateShiftData((prevState) => {

      try {
        let new_state = {
          ...prevState,
          [e.target.name]: e.target.value,
        };
        return new_state;
      } catch (error) {
        console.log(error)
      }
    });
  };

  const nextPage = () => {
    if (endTime === ' ' || startTime === '') {
      toast.error('Please input start time or end time of shift');
      return;
    }
    if (endTime === ' ') {
      toast.error('Please enter select an end time and date ');
      return;
    }
    if (startTime === ' ') {
      toast.error('Please enter select a start time and date  ');
      return;
    }
    if (
      new Date(endTime).toISOString() <= new Date(startTime).toISOString()
    ) {
      toast.error('Shift end time must be ahead of start time');
      return;
    }
    if (createShiftData?.pay <= 0) {
      toast.error('Hourly Rate must not be 0 or less ');
      return;
    }
    if (createShiftData?.pay === undefined) {
      toast.error('Please enter a value for shift pay');
      return;
    }
    if (createShiftData.name === ' ') {
      toast.error('Please enter the name of the shift');
      return;
    }
    console.log('role_ids', role_ids)
    if (role_ids === undefined || role_ids === 0) {
      toast.error('Please select one Job Role')
      return;
    }

    let start = moment(startTime)
    let end = moment(endTime)
    let shiftLength = end.diff(start, 'hours')

    if (start.isBefore()) {
      toast.error('Start time cannot be in the past');
      return
    }

    if (end.isBefore(start)) {
      toast.error('End time cannot be before start time');
      return
    }

    if (shiftLength < 4 || shiftLength > 10) {
      toast.error('Shift length must be between 4 and 10 hours');
      return
    }

    changeTile();

  };
  const closeModal = () => {
    closeDialog();
    setTileActive(0);
    setCreateShiftData({
      name: '',
      hotel_id: hotel_id,
      roles_ids: [],
      startTime: '',
      endTime: '',
      pay: '',
      instructions: '',
      requiredCertificates: [],
      audienceType: 'MARKET',
    });
    setNeededCerts([]);
    setRolesID(0);
  };

  const TileOne = () => {
    return tileActive === 0 ? (
      <div>
        <div className="grid lg:grid-cols-2 grid-cols-1 py-5 lg:px-6 lg:items-center">
          <div className="col-span-1 pb-2 lg:pb-0">
            <p className="text-lg font-bold text-black pb-4 ">Name of Shift</p>
            <div className="w-full lg:w-4/5">
              <input
                type="text"
                required
                name="name"
                style={{
                  width: '100%',
                  height: '3rem',
                  backgroundColor: '#F5F8FC',
                  color: '#424242',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
                value={createShiftData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>{' '}
          <div className="col-span-1 ">
            <p className="text-xl font-extrabold text-black pb-4 px-2">Pay</p>
            <div className="flex space-x-2 items-center ">
              <p className="text-lg font-semibold text-shadeOfBlack">$</p>
              <div className="lg:w-1/3  ">
                <input
                  name="pay"
                  required
                  type='number'
                  style={{
                    width: '100%',
                    height: '3rem',
                    backgroundColor: '#F5F8FC',
                    color: '#424242',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                  value={createShiftData?.pay}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-lg font-semibold text-shadeOfBlack">/hr</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 lg:py-8 lg:pt-8 lg:px-6 lg:gap-10  ">
          <div className="col-span-4 lg:col-span-2 pb-2 lg:pb-0">
            <p className="text-lg font-bold text-black ">Start Date Time </p>
            <div className="pt-4" style={{ display: 'flex', alignItems: "center" }}>
              <Datetime
                // renderInput={renderInput}
                value={startTime == '' ? "" : new Date(startTime)}
                inputProps={startDateInput}
                initialViewMode={"days"}
                timeFormat={false}
                onChange={(e) => setTime(e.toString())}
                // open={true}
                // closeOnClickOutside={false}
                isValidDate={valid}
                initialValue={startTime == '' ? "" : new Date(startTime)}
              />{' '}
              <TextField
                style={{ fontWeight: '100', paddingLeft:"10px" }}
                id="time"
                type="time"
                placeholder="Set Time"
                value={startTime == '' ? '' : moment(new Date(startTime)).format('HH:mm')}
                onChange={(e) => {
                  let time = e.target.value;
                  let date = moment(startTime == '' ? new Date() : new Date(startTime)).format('YYYY-MM-DD')
                  setTime(moment(date + ' ' + time).toString())

                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ disableUnderline: true }}
              />
            </div>
          </div>
          <div className="col-span-4 lg:col-span-2">
            <div className="">
              <p className="text-lg font-bold text-black ">End Date Time</p>
              <div className="pt-4 " style={{ display: 'flex' }}>
                <Datetime
                  value={endTime == '' ? '' : new Date(endTime)}
                  inputProps={endDateInput}
                  initialViewMode={"days"}
                  timeFormat={false}
                  onChange={(e) => setT(e.toString())}
                  // open={true}
                  isValidDate={valid}
                  initialValue={endTime == '' ? '' : new Date(endTime)}
                />{' '}
                <TextField
                  style={{ fontWeight: '100', paddingLeft:"10px" }}
                  id="time"
                  type="time"
                  placeholder="Set Time"
                  value={endTime == '' ? "" : moment(new Date(endTime)).format('HH:mm')}
                  onChange={(e) => {
                    let time = e.target.value;
                    let date = moment(endTime == '' ? new Date() : new Date(endTime)).format('YYYY-MM-DD')
                    setT(moment(date + ' ' + time).toString())

                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{ disableUnderline: true }}
                />{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 lg:gap-5 lg:px-6">
          <div className="col-span-4 lg:col-span-2">
            <p className="text-xl font-extrabold text-black py-3">
              Shifts role
            </p>
            <div className="flex flex-wrap ">
              {shiftRolesList.length > 0 &&
                shiftRolesList?.map((item) => (
                  <FormControlLabel
                    // value={item?.id}
                    classes={{
                      root: 'text-sm font-semibold  pr-2 mx-4',
                      label: 'text-sm font-semibold',
                    }}
                    control={
                      <BpCheckbox
                        value={role_ids}
                        checked={
                          role_ids === item.id ? true : false
                        }
                        onChange={() => setRolesID(item.id)}
                      // onChange={(e) => {
                      //   if (role_ids.includes(parseFloat(e.target.value))) {
                      //     setRolesID(
                      //       role_ids.filter(
                      //         (thatrole) =>
                      //           parseFloat(thatrole) !==
                      //           parseFloat(e.target.value)
                      //       )
                      //     );
                      //   } else {
                      //     setRolesID((prevState) => {
                      //       return [...prevState, parseFloat(e.target.value)];
                      //     });
                      //   }
                      // }}
                      />
                    }
                    label={
                      <p className="text-sm font-semibold text-shadeOfBlack">
                        {item.name}
                      </p>
                    }
                  />
                ))}
            </div>
          </div>
          <div className="col-span-4 lg:col-span-2">
            <p className="text-lg font-bold text-black pb-4 whitespace-nowrap ">
              Notes and Instructions
            </p>

            <TextareaAutosize
              onChange={handleInputChange}
              aria-label="minimum height"
              name="instructions"
              value={createShiftData?.instructions}
              rows={6}
              className="focus:border-transparent"
              style={{
                width: '100%',
                backgroundColor: '#F5F8FC',
                color: '#424242',
                fontSize: '0.875rem',
                fontWeight: 600,
                paddingLeft: '5px',
              }}
            />
          </div>
        </div>
        <div className=" flex flex-row-reverse pt-4 lg:pt-20">
          <div
            style={{
              width: '372px',
            }}
          >
            <Button
              className="justify-self-end"
              style={{ width: '60%' }}
              isActive={true}
              onClick={nextPage}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="grid grid-cols-4 lg:py-5 lg:px-6">
          <div className="col-span-4 lg:col-span-2">
            <p className="text-lg font-extrabold text-black py-3">
              Certificate Required
            </p>
            <div className="grid grid-cols-2">
              {requiredCertificates.length > 0 &&
                requiredCertificates?.map((item) => (
                  <FormControlLabel
                    classes={{
                      root: 'text-sm font-semibold  pr-2 mx-4',
                      label: 'text-sm font-semibold',
                    }}
                    control={
                      <BpCheckbox
                        value={item.id ?? ""}
                        checked={neededCerts.find(id => id === item.id)}
                        onChange={() => {
                          setNeededCerts(prevCert => {
                            if (prevCert.find(id => id === item.id)) {
                              return prevCert.filter(id => id !== item.id)
                            }
                            return [
                              ...prevCert,
                              item.id
                            ]
                          })
                        }}

                      // onChange={(e) => {
                      //   if (
                      //     neededCerts.includes(parseFloat(e.target.value))
                      //   ) {
                      //     setNeededCerts(
                      //       neededCerts.filter(
                      //         (thatrole) =>
                      //           parseFloat(thatrole) !==
                      //           parseFloat(e.target.value)
                      //       )
                      //     );
                      //   } else {
                      //     setNeededCerts((prevState) => {
                      //       return [...prevState, parseFloat(e.target.value)];
                      //     });
                      //   }
                      // }}
                      />
                    }
                    label={
                      <p className="text-sm font-semibold text-shadeOfBlack">
                        {item.name}
                      </p>
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="py-5">
          <p className="text-lg font-extrabold text-black py-3">
            Contractor Selection Method
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-3 justify-between items-center">
            {ContractorSelection.map((item, index) => {
              return (
                <>
                  <div
                    style={{
                      backgroundColor:
                        contractorTile === item.name
                          ? 'rgba(12, 119, 248, 1)'
                          : 'rgba(245, 248, 252, 1)rgba(245, 248, 252, 1)',
                      color:
                        contractorTile === item.name
                          ? '#fff'
                          : 'rgba(6, 6, 6, 1)',
                    }}
                    onClick={() => {
                      setContractorTile(item.name);
                      setContractorText(item.content);
                      setCreateShiftData((prevState) => {
                        return {
                          ...prevState,
                          audienceType: item.value,
                        };
                      });
                    }}
                    className={`flex flex-row justify-center font-bold lg:text-lg items-center p-4 lg:py-6 rounded-md holdTiles cursor-pointer  lg:col-span-1 col-span-3 ${
                      contractorTile === item.name ? 'text-white' : ''
                      }`}
                    key={index}
                  >
                    <h1 className="justify-center">{item.name}</h1>
                  </div>
                </>
              );
            })}
          </div>
          <div>
            <p className="text-sm text-shadeOfBlack lg:mx-auto font-semibold py-4 lg:text-center lg:w-3/5 w-full">
              {contractorText}
            </p>
          </div>
          <div className="  lg:grid lg:justify-items-end lg:pt-10">
            <div className="flex space-x-2">
              <button
                className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-4 py-4 rounded-md text-sm lg:text-base"
                onClick={() => setTileActive(0)}
              >
                Back
              </button>
              <button
                className="bg-statusBlue flex items-center  px-4 py-4 lg:px-8 rounded-md text-white text-sm lg:text-base"
                onClick={
                  contractorTile === 'Favorites First'
                    ? () => setOpenFaveList(true)
                    : contractorTile === 'Manual Selection'
                      ? () => setOpenManual(true)
                      : editShiftItem === undefined || editShiftItem === null
                        ? () => submitData()
                        : () => updateSubmitData()
                }
              >
                Complete Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Dialog
        open={openManual}
        onClose={() => setOpenManual(false)}
        scroll="body"
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <div className=" lg:p-4 px-2 lg:px-6 overflow-x-hidden">
          <div className="">
            <p className="lg:text-3xl text-2xl text-black font-extrabold whitespace-nowrap">
              Manual Selection
              <img src={UnderLine} className="w-50" />
            </p>
          </div>
        </div>
        <div className="flex justify-center text-base lg:text-lg font-medium flex-col lg:px-6 ">
          <p>Please enter the id of the chosen contractor</p>
          <Input
            value={manualId}
            autoFocus
            onChange={(e) => setManualId(e.target.value)}
          />
        </div>
        <div className="  lg:grid lg:justify-items-end lg:px-6 lg:pt-16 pt-8 flex">
          <div className="flex space-x-2">
            <button
              className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-2 py-2 rounded-md"
              onClick={() => setOpenManual(false)}
            >
              Back
            </button>
            <button
              className="bg-statusBlue flex items-center  px-2 py-4 lg:px-8 rounded-md text-white "
              onClick={
                editShiftItem === undefined || editShiftItem === null
                  ? () => submitManualData()
                  : () => updateManualData()
              }
            >
              Complete Request
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        scroll="body"
        open={openFaveList}
        onClose={() => setOpenFaveList(false)}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <div className="p-4 lg:px-6 overflow-x-hidden">
          <div
            style={{ width: '100%' }}
            className=" grid justify-items-end"
          ></div>
          <div className="lg:px-6">
            <h1
              className="lg:text-4xl text-2xl text-black font-extrabold "
              onClick={() => setOpenFaveList(false)}
            >
              Favorites
              <img src={UnderLine} className="w-40" />
            </h1>
          </div>
        </div>
        <div className="lg:px-10 lg:pl-12 lg:p-4 px-4">
          <div className="lg:grid lg:grid-cols-4 lg:grid-cols-2 flex justify-between ">
            <p className="font-semibold text-sm text-tableHeading text-center">
              Contractor
            </p>
            <p className="font-semibold text-sm text-tableHeading hidden lg:block">
              Completed Shifts
            </p>
            <p className="font-semibold text-sm text-tableHeading">Ratings</p>
            <p className="font-semibold text-sm text-tableHeading hidden lg:block">
              Badges
            </p>
          </div>
        </div>
        <div className="lg:px-10 lg:pl-12 pt-2">
          {faveList.length > 0 &&
            faveList?.map((item) => (
              <div className="lg:grid lg:grid-cols-4  flex justify-between my-3">
                <div className="flex items-center space-x-2">
                  <BpCheckbox
                    value={item.id}
                    onClick={(e) => {
                      if (targetAudience.includes(e.target.value)) {
                        setTargetAudience(
                          targetAudience.filter(
                            (item) => item !== e.target.value
                          )
                        );
                      } else {
                        setTargetAudience((prevState) => {
                          return [...prevState, parseInt(e.target.value)];
                        });
                      }
                    }}
                  />

                  <div className="flex space-x-1 items-center">
                    <Avatar src={item.profilePicture} className="w-6 h-6" />
                    <p className="font-semibold text-xs text-tableWriting">
                      {item.owner.lastname} {item.owner.firstname}
                    </p>
                  </div>
                </div>
                <div className="lg:flex mx-8 items-center hidden">
                  <p className="font-semibold text-xs text-tableWriting text-center">
                    {item?.completedShiftsCount === null
                      ? '0'
                      : item?.completedShiftsCount}{' '}
                  </p>
                </div>
                <div className="flex items-center">
                  <Rating value={5} size="small" readOnly precision={0.5} />
                </div>
                <div className="lg:flex mx-8 items-center hidden ">
                  <p className="font-semibold text-xs text-tableWriting text-center">
                    {item.badge_count}/4
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="  grid justify-items-end px-6 pt-16">
          <div className="flex space-x-4 lg:space-x-2">
            <button
              className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-2 py-2 rounded-md"
              onClick={() => setOpenFaveList(false)}
            >
              Back
            </button>
            <button
              className="bg-statusBlue flex items-center  px-2 py-4 lg:px-8 rounded-md text-white whitespace-nowrap"
              onClick={
                editShiftItem === undefined || editShiftItem === null
                  ? submitFavesData
                  : updateSubmitFavesData
              }
            >
              Complete Request
            </button>
          </div>
        </div>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Dialog
        scroll="body"
        open={openDialog}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <div className="p-4 lg:px-6 overflow-x-hidden">
          <div style={{ width: '100%' }} className=" grid justify-items-end">
            <div className="flex space-x-3 items-center">
              <div
                className="rounded-full py-1 px-4"
                style={{ border: '1px solid #343434' }}
              >
                <p className="text-xs">{tileActive + 1} of 2</p>
              </div>

              <IconButton
                onClick={closeModal}
                className="w-10 h-10 object-none object-right-top"
              >
                <img
                  src={CloseIcon}
                  alt=" "
                  className="w-full h-full object-contain"
                />
              </IconButton>
            </div>
          </div>
          <div className="lg:px-6">
            <h1 className="text-2xl lg:text-4xl text-black font-extrabold ">
              Create Shifts
              <img src={UnderLine} className="w-40" />
            </h1>
          </div>
          {TileOne()}
        </div>
      </Dialog>
      {creatingShift === true ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <Dialog
          fullWidth={false}
          onClose={closeSuccessModal}
          open={successDialogOpen}
          aria-labelledby="max-width-dialog-title"
          PaperProps={{
            style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
          }}
        >
          <div style={{ width: '100%' }} className=" grid justify-items-end">
            <div className="flex space-x-3 items-center">
              <IconButton
                disabled={creatingShift}
                onClick={closeSuccessModal}
                className="w-10 h-10 object-none object-right-top"
              >
                <img
                  src={CloseIcon}
                  alt=" "
                  className="w-full h-full object-contain"
                />
              </IconButton>
            </div>
          </div>

          <div className="justify-center items-center w-full p-4">
            <img src={Pulse} alt=" " className="w-1/2 mx-auto" />
            <div className="justify-center items-center">
              <p className="text-3xl text-black mx-auto text-center">
                Shift Request Sent <br /> Successfully
              </p>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default CreateShiftModal;
