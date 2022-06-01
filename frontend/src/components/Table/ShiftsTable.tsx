/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  TableHead,
  Avatar,
  Dialog,
  CircularProgress,
  FormControlLabel,
  TableFooter,
  TableContainer,
  Paper,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Pagination from '@material-ui/lab/Pagination';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import Popover from '@material-ui/core/Popover';
import CloseIcon from '@assets/close_big.svg';
import Button from '@components/home/Button';
import { BpCheckbox } from '@components/Checkbox/Checkbox';

import MenuButton from '@assets/menu_button.svg';
import InfoIcon from '@assets/info_icon.svg';
import RemoveIcon from '@assets/remove_icon.svg';
import Underline from '@assets/UnderLine.svg';
import FaveDialog from '@components/FaveDIalog/FaveDialog';

import NoDataTable from '@assets/dashboard/icons/NoDataTable.svg';
import CreateShiftModal from '../CreateShift/index';

import { ReactSVG } from 'react-svg';
import { format } from 'date-fns';
import { baseUrl, useMergeState, getDuration } from '@utils/helpers';
import badgeSelected from '@assets/badgeSelected.svg';
import starfull from '@assets/blueStarFilled.svg';
import ratingIconActive from '@assets/blueStarEmpty.svg';
import EditIcon from '@assets/icons/editIcon.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height: '100%',
  },
  root: {
    boxShadow: 'none',
  },
});
const ShiftTable = ({
  row,
  heading,
  unAssigned,
  loading,
  assigned,
  getShiftData,
  setState,
  setRequests,
  shiftPaginationData,
  setPageNumber,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedRow, setSelectedRow] = useState<any>({});
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [ratingValue, setRatingValue] = React.useState(0);
  const [ratingBadge, setRatingBadge] = useState('');
  const [addFaveContractor, setAddFaveContractor] = useState(false);
  const [allBadges, setAllBadges] = useState([]);
  const [ratingComments, setRatingComments] = useState('');
  const [successDialogOpen, setSuccessDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [rateShiftModal, setRateShiftModal] = useState(false);
  const [runUpdate, setRunUpdate] = useState(false);
  const hideRatingShiftModal = () => setRateShiftModal(false);
  const [page, setPage] = React.useState(1);

  const handleDialogClose = () => {
    setSuccessDialog(false);
    setInfoDialog(false);
  };
  const handReviewModalClose = () => {
    handleDialogClose();
    setReviewModal(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const shiftDate = new Date(selectedRow?.startTime?.split('T')[0]);
  const hotel_id = sessionStorage.getItem('hotel_id');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const localToken = localStorage.getItem('token');
  const [deletingShift, setDeletingShift] = useState(false);
  const deleteShift = async () => {
    setDeletingShift(true);
    handleDialogClose();

    const deleteShiftEndpoint = `${baseUrl}/v1/shift/delete/${selectedRow.id}`;
    await axios
      .delete(deleteShiftEndpoint, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localToken}`,
        },
      })
      .then((res) => {
        res.status === 200 && toast.success('Shift successfully deleted');
        setDeletingShift(false);
        getShiftData();
      })
      .catch((error) => {
        toast.error(error);
        setDeletingShift(false);

        handleDialogClose();
        getShiftData();
      });
  };
  const [openEditShift, setEditShift] = useState(false);
  const closeEdit = () => {
    setEditShift(false);
  };
  const openEditShiftModal = () => {
    setEditShift(true);
  };
  const confirmCompletedShift = async () => {
    const confirmShiftEnd = `${baseUrl}/v1/shift/confirm`;
    setDeletingShift(true);
    // console.log('local token', localToken);
    await axios
      .post(confirmShiftEnd, null, {
        params: {
          shift_id: selectedRow.id,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localToken}`,
        },
      })
      .then((res) => {
        res.status === 200 &&
          toast.success('Shift completion successfully confirmed');
        setDeletingShift(false);
        getShiftData();
      })
      .catch((error) => {
        toast.error('Sorry please try again');
        setDeletingShift(false);

        handleDialogClose();
        getShiftData();
      });
  };
  const getBadges = async () => {
    let badgesEndpoint = `${baseUrl}/v1/badges?page=1`;

    try {
      await fetch(badgesEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localToken}`,
        },
      }).then((res) => {
        res.json().then(function (data) {
          let userBadges =
            data.length && data?.filter((o) => o.type === 'USER');
          setAllBadges(userBadges);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleReview = async () => {
    const addReviewEndpoint = `${baseUrl}/v1/review/add`;
    if (ratingValue === 0) {
      return toast.error('Please rate the contractor');
    } else if (ratingBadge === '') {
      return toast.error('Please choose a badge');
    }
    await axios
      .post(
        addReviewEndpoint,
        {
          shift_id: selectedRow?.id,
          reviewee_type: 'USER',
          comment: ratingComments,
          rating: ratingValue,
          badge_id: ratingBadge,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localToken}`,
          },
        }
      )
      .then((res) => {
        toast.success('Review successfully submitted');
      })
      .catch((error) => {
        toast.error('Please try again');
      });
  };
  const handleFave = async () => {
    const favEndpoint = `${baseUrl}/v1/hotel/favourites/add?hotel_id=${hotel_id}&contractor_id=${selectedRow?.contractor?.id}`;
    await axios
      .get(favEndpoint, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localToken}`,
        },
      })
      .then((res) => console.log('res', res))
      .catch((error) => console.log('error', error));
  };

  let containsUserReview =
    selectedRow?.reviews?.length > 0
      ? selectedRow.reviews.filter((o) => (o.reviewee_type = 'USER'))
      : '';
  // console.log('containers user review ', containsUserReview);
  const updateReview = async () => {
    if (ratingValue === 0) {
      return toast.error('Please rate the contractor');
    }
    let updateReviewEndpoint = `${baseUrl}/v1/review/edit?review_id=${containsUserReview[0].id}`;
    await axios
      .patch(
        updateReviewEndpoint,
        { comment: ratingComments, rating: ratingValue },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localToken}`,
          },
        }
      )
      .then((res) => toast.success('Review updated successfully'))
      .catch((error) => toast.error('Please try again'));
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    setPage(value);
  };
  useEffect(() => {
    getBadges();
  }, []);
  const classes = useStyles();
  return (
    <>
      {deletingShift && (
        <div className="flex items-center justify-center">
          <CircularProgress className="flex items-center justify-center w-full" />
        </div>
      )}
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
      {loading === true ? (
        <div className="flex items-center justify-center w-full">
          <CircularProgress style={{ color: '#0C77F8' }} />
        </div>
      ) : row.length > 0 ? (
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className="bg-white">
              <TableRow>
                {heading.map((headCell) => (
                  <TableCell
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: '#95A3C8' }}
                    align={headCell === 'Completed Shifts' ? 'right' : 'left'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {row?.map((item) => (
                <TableRow>
                  <TableCell className="text-sm font-medium whitespace-nowrap ">
                    <div className="flex space-x-2 items-center">
                      <p className="text-tableWriting text-sm font-medium">
                        000{item?.id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-tableWriting ">
                    <p className="px-4  text-sm font-medium text-tableWriting whitespace-nowrap lg:whitespace-normal ">
                      {format(
                        new Date(item?.startTime),
                        'eee MMM dd yyyy hh:mm aaa'
                      ) ||
                        format(
                          new Date(item?.shift?.startTime),
                          'eee MMM dd yyyy hh:mm aaa'
                        )}
                      {''}-{''}
                      {format(
                        new Date(item?.endTime),
                        'eee MMM dd yyyy hh:mm aaa'
                      ) ||
                        format(
                          new Date(item?.shift?.endTime),
                          'eee MMM dd yyyy hh:mm aaa'
                        )}
                    </p>
                  </TableCell>
                  {item?.contractor !== null
                    ? !!!unAssigned && (
                        <TableCell
                          align="center"
                          className="text-sm font-medium text-tableWriting flex "
                        >
                          <div className="flex items-center space-x-1">
                            <Avatar
                              className="w-6 h-6"
                              style={{ boxShadow: 'none' }}
                              src={item?.contractor?.profilePicture}
                            />
                            <p className="  text-sm font-medium text-tableWriting text-center whitespace-nowrap">
                              {item?.contractor?.owner?.lastname}{' '}
                              {item?.contractor?.owner?.firstname}
                            </p>
                          </div>
                        </TableCell>
                      )
                    : !!!unAssigned && (
                        <TableCell className="text-sm font-medium text-tableWriting flex space-x-2">
                          <div className="space-x-2">
                            <p className="  text-sm font-medium text-tableWriting ">
                              -
                            </p>
                          </div>
                        </TableCell>
                      )}

                  <TableCell className="text-sm font-medium text-tableWriting flex space-x-2">
                    <div className="space-x-2">
                      <p className="  text-sm font-medium text-tableWriting ">
                        {item.name}
                      </p>
                    </div>
                  </TableCell>
                  {unAssigned === true ? (
                    <>
                      <TableCell className="text-sm font-medium text-tableWriting">
                        <div
                          className="flex items-center space-x-1 cursor-pointer"
                          onClick={() => setRequests(item)}
                        >
                          <>
                            {item?.requests.length > 0 && (
                              <AvatarGroup max={3}>
                                {item.requests.map((requestItem) => (
                                  <Avatar
                                    alt={requestItem.id}
                                    src={requestItem.contractor.profilePicture}
                                    className="w-6 h-6"
                                  />
                                ))}
                              </AvatarGroup>
                            )}
                            <p className="  text-sm text-center font-medium text-appBlue">
                              {item?.requests.length === 0 ? '-' : ''}
                            </p>
                          </>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`text-sm font-medium items-center text-tableWriting  `}
                      >
                        <p
                          className={`text-sm font-medium text-center rounded-md ${
                            item.status === 'ACCEPTED'
                              ? 'text-statusBlue bg-statusBlue bg-opacity-30'
                              : item.status === 'PENDING'
                              ? ' text-statusYellow bg-statusYellow bg-opacity-30'
                              : item.status === 'COMPLETED'
                              ? 'bg-completed text-completed bg-opacity-30'
                              : 'text-statusRed bg-statusRed bg-opacity-30'
                          } `}
                        >
                          {item?.status === 'PENDING'
                            ? 'Unassigned'
                            : item.status === 'CANCELLED'
                            ? 'Cancelled'
                            : 'Completed'}{' '}
                        </p>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        className={`text-sm font-medium items-center text-tableWriting  `}
                      >
                        <p
                          className={`text-sm font-medium text-center rounded-md ${
                            item.status === 'ACCEPTED'
                              ? 'text-statusBlue bg-statusBlue bg-opacity-30'
                              : item.status === 'PENDING'
                              ? ' text-statusYellow bg-statusYellow bg-opacity-30'
                              : item.status === 'COMPLETED'
                              ? 'bg-completed text-completed bg-opacity-30'
                              : item.status === 'ONGOING'
                              ? 'text-green-400 bg-green-400 bg-opacity-20'
                              : 'text-statusRed bg-statusRed bg-opacity-30'
                          } `}
                        >
                          {item?.status === 'PENDING'
                            ? 'Unassigned'
                            : item.status === 'CANCELLED'
                            ? 'Cancelled'
                            : item.status === 'ACCEPTED'
                            ? ' Scheduled'
                            : item.status === 'ONGOING'
                            ? 'Ongoing'
                            : 'Completed'}{' '}
                        </p>
                      </TableCell>

                      {assigned !== true && (
                        <TableCell className="text-sm font-medium text-tableWriting ">
                          <p className="  text-sm text-center font-medium text-tableWriting">
                            {item?.requests.length === 0
                              ? '-'
                              : item?.requests.length}
                          </p>
                        </TableCell>
                      )}
                    </>
                  )}
                  <TableCell className="text-sm font-medium items-center justify-between text-tableWriting flex flex-row">
                    <div className="text-sm font-medium items-center justify-between text-tableWriting flex flex-row">
                      <p className="text-tableWriting font-medium">
                        ${item?.pay}/hr
                      </p>
                      <IconButton
                        aria-describedby={id}
                        onClick={(event) => {
                          handleClick(event);
                          setSelectedRow(item);
                          // console.log('item is ', item);
                        }}
                      >
                        <img src={MenuButton} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="  w-full pt-0">
          <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableRow>
                {heading.map((headCell) => (
                  <TableCell
                    className="py-1 font-medium"
                    style={{ color: '#95A3C8' }}
                    align={headCell === 'Completed Shifts' ? 'right' : 'left'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </Table>
          </TableContainer>

          <div className="flex flex-col justify-center items-center w-full h-full py-5 ">
            <img
              src={NoDataTable}
              className="w-48 h-auto items-center flex justify-center"
            />

            <p className="text-3xl text-center text-noDataText">
              No Shifts Here
            </p>
          </div>
        </div>
      )}
      {parseInt(shiftPaginationData?.page_count) > 1 && (
        <div className="flex w-full  justify-end py-2 ">
          <Pagination
            count={parseInt(shiftPaginationData?.page_count)}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        PaperProps={{
          style: { borderRadius: 20, marginRight: '0.8rem' },
        }}
      >
        <div className="flex justify-around p-2">
          {selectedRow.status === 'COMPLETED' ? (
            <div className="px-2 flex justify-around">
              <IconButton
                className="flex items-center"
                onClick={() => {
                  setInfoDialog(true);
                  handleClose();
                }}
              >
                <img src={InfoIcon} alt="" className="px-1 pl-2" />
                <p style={{ color: '#0C77F8' }} className="text-sm">
                  Info
                </p>
              </IconButton>
              {selectedRow.confirmed !== true && (
                <IconButton
                  onClick={() => {
                    handleClose();
                    confirmCompletedShift();
                  }}
                  className="flex  items-center"
                >
                  <img src={RemoveIcon} alt="" className="px-1" />
                  <p style={{ color: '#0C77F8' }} className="text-sm">
                    Confirm
                  </p>
                </IconButton>
              )}
              {containsUserReview === '' && (
                <IconButton
                  className="flex space-x-1 items-center"
                  onClick={() => {
                    // setInfoDialog(true);
                    handleClose();
                    setRateShiftModal(true);
                  }}
                >
                  <img src={RemoveIcon} alt="" className="px-1" />
                  <p style={{ color: '#0C77F8' }} className="text-sm">
                    Review
                  </p>
                </IconButton>
              )}
            </div>
          ) : (
            <>
              <IconButton
                className="flex space-x-1 items-center"
                onClick={() => {
                  setInfoDialog(true);
                  handleClose();
                }}
              >
                <img src={InfoIcon} alt="" className="px-1" />
                <p style={{ color: '#0C77F8' }} className="text-sm">
                  Info
                </p>
              </IconButton>
            </>
          )}
          <IconButton
            onClick={() => {
              setSuccessDialog(true);
              handleClose();
            }}
            className="flex space-x-1 items-center"
          >
            <img src={RemoveIcon} alt="" className="px-1" />
            <p style={{ color: '#0C77F8' }} className="text-sm">
              Remove
            </p>
          </IconButton>
        </div>
      </Popover>
      <FaveDialog open={successDialogOpen} handleClose={handleDialogClose}>
        <div className=" flex flex-col justify-center items-center w-full p-2 space-y-4">
          <div className="justify-center items-center mx-auto ">
            <p
              className="text-2xl text-black text-bold mx-auto text-center pb-2"
              style={{ color: 'black' }}
            >
              Are you sure you want to delete this shift
            </p>
            <div className="mx-auto">
              <img src={Underline} alt="" width="50%" className="mx-auto" />
            </div>
            <p className="text-sm text-shadeOfBlack mx-auto py-4 text-center">
              This action will permanently delete this Shift and you wont be
              able to access it anymore
            </p>
          </div>
          <div className="flex space-x-3">
            <div>
              <button
                onClick={handleDialogClose}
                className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-4 py-4 rounded-md"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="bg-statusBlue flex items-center  px-4 py-4 lg:px-8 rounded-md text-white"
                onClick={deleteShift}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </FaveDialog>
      <Dialog
        maxWidth="md"
        fullWidth={false}
        open={infoDialog}
        onClose={handReviewModalClose}
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        {Object.keys(selectedRow).length !== 0 && (
          <div style={{ width: '100%' }}>
            <div className="flex justify-between items-start">
              <div className="w-44 px-4">
                <p className="py-2 text-3xl text-black font-bold">
                  Shift Info{' '}
                </p>
                <img width="80%" height="50%" src={Underline} />
              </div>
              <IconButton
                onClick={handReviewModalClose}
                className="w-10 h-10 object-none object-right-top"
              >
                <img
                  src={CloseIcon}
                  alt=" "
                  className="w-full h-full object-contain"
                />
              </IconButton>
            </div>

            <div className="grid grid-cols-2 lg:gap-4  p-4">
              <div className="col-span-2 lg:col-span-1">
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold whitespace-nowrap">
                    Shift ID:
                  </p>
                  <p className="text-xs text-shadeOfBlack font-semibold">
                    {'000' + selectedRow?.id}
                  </p>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold whitespace-nowrap">
                    Shift Role:
                  </p>
                  {selectedRow?.roles?.map((itemFromMap, index) =>
                    index + 1 !== selectedRow?.roles?.length ? (
                      <p className="  text-sm font-medium text-tableWriting">
                        {itemFromMap.name + ','}
                      </p>
                    ) : (
                      <p className="text-xs text-shadeOfBlack font-semibold">
                        {itemFromMap.name}
                      </p>
                    )
                  )}
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold whitespace-nowrap">
                    Certificate Required:
                  </p>
                  <div className="flex space-x-1">
                    {selectedRow?.certificates_types?.length === 0 ? (
                      <p className="text-xs text-shadeOfBlack font-semibold">
                        {' '}
                        None{' '}
                      </p>
                    ) : (
                      selectedRow?.certificates_types?.map((item, index) =>
                        index + 1 !== selectedRow?.certificates_types.length ? (
                          <p className="text-xs text-shadeOfBlack font-semibold">
                            {item.name + ','}
                          </p>
                        ) : (
                          <p className="text-xs text-shadeOfBlack font-semibold">
                            {item.name}
                          </p>
                        )
                      )
                    )}
                  </div>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold whitespace-nowrap">
                    Scheduled Time:
                  </p>
                  <p className="text-xs text-shadeOfBlack font-semibold uppercase">
                    {format(new Date(selectedRow?.startTime), 'hh:mm a')}-{' '}
                    {format(new Date(selectedRow?.endTime), 'hh:mm a')}
                  </p>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Shift Date:</p>
                  <p className="text-xs text-shadeOfBlack font-semibold">
                    {shiftDate.getDate()}&nbsp;
                    {''}
                    {monthNames[shiftDate.getMonth()] + ' '}&nbsp;
                    {''}
                    {shiftDate.getFullYear() + ''}&nbsp;
                    {''}
                  </p>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Shift Duration:</p>
                  <p className="text-xs text-shadeOfBlack font-semibold">
                    {getDuration(selectedRow?.startTime, selectedRow?.endTime)}
                  </p>
                </div>

                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Request:</p>

                  {selectedRow.status === 'PENDING' ? (
                    <div className="flex space-x-1 items-center">
                      {selectedRow?.requests?.length > 0 ? (
                        <>
                          <AvatarGroup max={3}>
                            {selectedRow.requests.map((requestItem) => (
                              <Avatar
                                className="w-6 h-6"
                                alt={requestItem.id}
                                src={requestItem.contractor.profilePicture}
                              />
                            ))}
                          </AvatarGroup>

                          {/* <p className="text-appBlue text-sm  font-bold">
                            & {selectedRow?.requests.length} Others
                          </p> */}
                        </>
                      ) : (
                        <p className="text-appBlue text-sm  font-bold">None</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex space-x-1 items-center">
                      <Avatar
                        alt=""
                        className="w-6 h-6"
                        src={selectedRow?.contractor?.profilePicture}
                      />
                      <p className="text-xs text-shadeOfBlack font-semibold">
                        {selectedRow?.contractor?.owner?.lastname}
                        {''}&nbsp;&nbsp;
                        {selectedRow?.contractor?.owner?.firstname}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="flex  space-x-4 items-center lg:block ">
                  <p className="text-shadeOfBlack font-bold">Pay:</p>
                  <p className="text-appTQ text-2xl lg:text-4xl font-extrabold lg:py-4">
                    ${selectedRow?.pay}/hr
                  </p>
                </div>
                <div>
                  <p className="text-shadeOfBlack font-bold lg:py-4 pb-2">
                    Instructions
                  </p>
                  <p
                    style={{ fontSize: '10px' }}
                    className="text-shadeOfBlack  font-semibold"
                  >
                    {selectedRow?.instructions}
                  </p>
                </div>
                <div>
                  <p className="text-shadeOfBlack font-bold py-2">
                    Shift Status
                  </p>
                  <div className="w-24">
                    <p
                      className={`text-sm font-medium text-center rounded-md ${
                        selectedRow.status === 'ACCEPTED'
                          ? 'text-statusBlue bg-statusBlue bg-opacity-30'
                          : selectedRow.status === 'PENDING'
                          ? ' text-statusYellow bg-statusYellow bg-opacity-30'
                          : selectedRow.status === 'COMPLETED'
                          ? 'bg-completed text-completed bg-opacity-30'
                          : selectedRow.status === 'ONGOING'
                          ? 'text-green-400 bg-green-400 bg-opacity-20'
                          : 'text-statusRed bg-statusRed bg-opacity-30'
                      } `}
                    >
                      {selectedRow?.status === 'PENDING'
                        ? 'Unassigned'
                        : selectedRow.status === 'CANCELLED'
                        ? 'Cancelled'
                        : selectedRow.status === 'ACCEPTED'
                        ? ' Scheduled'
                        : selectedRow.status === 'ONGOING'
                        ? 'Ongoing'
                        : 'Completed'}{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {Object.keys(selectedRow).length !== 0 &&
              selectedRow.status === 'PENDING' && (
                <div className="flex space-x-5 justify-center Pt-5">
                  <div>
                    <button
                      className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-4 py-4 rounded-md"
                      onClick={() => {
                        openEditShiftModal();
                        handReviewModalClose();
                      }}
                    >
                      Edit Shift
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-statusBlue flex items-center  px-4 py-4 lg:px-8 rounded-md text-white"
                      onClick={() => {
                        setSuccessDialog(true);
                        handleClose();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </Dialog>{' '}
      <CreateShiftModal
        openDialog={openEditShift}
        closeDialog={closeEdit}
        setState={setState}
        editShiftItem={selectedRow}
      />
      <Dialog
        maxWidth="md"
        fullWidth={false}
        open={rateShiftModal}
        scroll="body"
        classes={{
          root: 'rounded-md',
          paper: 'rounded-full',
        }}
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
        // onClose={() => !shiftReview}
        // className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div
          className="flex items-end justify-center min-h-screen py-6 p-10 
										pb-20 text-center sm:block sm:p-0"
        >
          {/* Background overlay, show/hide based on modal state.*/}

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
                  onClick={() => {
                    setRateShiftModal(false);
                    setRatingBadge('');
                    setAddFaveContractor(false);
                    setRatingComments('');
                    setRatingValue(0);
                  }}
                >
                  x
                </div>
              </div>

              <div className=" mt-2">
                <p className="my-2 lg:text-2xl text-lg text-blue-700 font-semibold">
                  How well did this contractor perform?
                </p>
              </div>

              <div className="flex align-center mt-2">
                <Rating
                  name="read-only"
                  emptyIcon={
                    <ReactSVG
                      src={ratingIconActive}
                      style={{ width: '60px', height: '60px' }}
                    />
                  }
                  icon={
                    <ReactSVG
                      src={starfull}
                      style={{ width: '60px', height: '60px' }}
                    />
                  }
                  value={ratingValue}
                  size="large"
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                  classes={{
                    root: `grid gap-1`,
                    icon: `grid grid-cols-2`,
                  }}
                />

                <p className="text-xs my-auto">Rate</p>
              </div>

              <div className="mt-10">
                <p className="text-sm text-gray-500 font-medium">
                  Leave a comment
                </p>
                <textarea
                  cols={45}
                  rows={4}
                  value={ratingComments}
                  className="border rounded-md border-blue-100 p-2"
                  onChange={(e) => {
                    // console.log('comment', e.target.value);
                    setRatingComments(e.target.value);
                  }}
                ></textarea>
              </div>

              <div className="my-10">
                <p className="text-sm text-gray-500 font-medium">
                  Select badges
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  {allBadges?.length > 0 &&
                    allBadges.map((item) => (
                      <div>
                        <span
                          onClick={() => {
                            setRatingBadge(item.id);
                            console.log('item id', item.id);

                            console.log('state rabad', ratingBadge);
                          }}
                          className="flex flex-col"
                        >
                          <img
                            src={item.image}
                            className="h-12 w-12 mx-auto  absolute object-contain items-center"
                          />
                          {ratingBadge === item.id && (
                            <div className="h-16 bg-appBlue rounded-full bg-opacity-50 w-16 flex items-center justify-center">
                              <img
                                src={badgeSelected}
                                className="h-8  w-8 mx-auto  relative"
                              />
                            </div>
                          )}
                          <p className="text-center  text-xs ">{item.name}</p>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-center pt-4 ">
                <FormControlLabel
                  classes={{
                    root: 'bg-white',
                    label: 'text-sm-shadeOfBlack text-sm font-semibold ',
                  }}
                  control={
                    <BpCheckbox
                      disabled={selectedRow?.hotel?.favouriteContractors?.includes(
                        parseInt(selectedRow.contractor_id)
                      )}
                      checked={addFaveContractor}
                      onChange={() => setAddFaveContractor(!addFaveContractor)}
                    />
                  }
                  label="Add to Favorites"
                />
                {/* {console.log(
                  'fave list',
                  selectedRow?.hotel?.favouriteContractors.includes(
                    parseInt(selectedRow.contractor_id)
                  )
                )} */}
                <div className="w-1/2">
                  <Button
                    style={{ width: '100%' }}
                    isActive={true}
                    onClick={() => {
                      addFaveContractor && handleFave();
                      console.log('add contract', addFaveContractor);
                      containsUserReview.length === 0 ||
                      containsUserReview === ''
                        ? handleReview()
                        : updateReview();
                      setAddFaveContractor(false);
                      setRatingComments('');
                      setRatingValue(0);
                      setRatingBadge('');
                      setRateShiftModal(false);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ShiftTable;
