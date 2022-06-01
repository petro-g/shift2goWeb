/* eslint-disable max-len */
import React, { useState } from 'react';
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
  Grid,
  CircularProgress,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';
import { makeStyles } from '@material-ui/core/styles';

import Rating from '@material-ui/lab/Rating';
import { useSelector } from 'react-redux';

import Popover from '@material-ui/core/Popover';
import CloseIcon from '@assets/close_big.svg';
import Button from '@components/home/Button';
import Input from '@components/home/Input';
import { BpCheckbox } from '@components/Checkbox/Checkbox';
import MenuButton from '@assets/menu_button.svg';
import StarImage from '@assets/star.svg';
import InfoIcon from '@assets/info_icon.svg';
import BlueCircle from '@assets/turquoise_circle.svg';
import RemoveIcon from '@assets/remove_icon.svg';
import Underline from '@assets/UnderLine.svg';
import FaveDialog from '@components/FaveDIalog/FaveDialog';
import PunctualImage from '@assets/punctual.svg';
import Ladder from '@assets/business_ladder.svg';
import Dress from '@assets/dressed_appropriately.svg';
import Badge from '@material-ui/core/Badge';

import StarFave from '@assets/StarFave.svg';
import BadgeFave from '@assets/BadgeFave.svg';
import PadlockSVG from '@assets/PadlockSVG.svg';
import EmptyStar from '@assets/EmptyStar.svg';
import FilledStar from '@assets/FilledStar.svg';
import { format } from 'date-fns';
import NoFavorites from '@assets/dashboard/icons/NoFavorites.svg';
import { baseUrl, useMergeState } from '@utils/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height: '100%',
  },
  root: {
    boxShadow: 'none',
  },
});
const MyTable = ({
  row,
  heading,
  loading,
  shiftPaginationData,
  setPageNumber,
  getFave,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // console.log('fave pagination', shiftPaginationData);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [successDialogOpen, setSuccessDialog] = useState(false);
  const [infoDialog, setInfoDialog] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [deletingFave, setDeletingFave] = useState(false);

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
  const token = useSelector<
    { token: string; userId: string; manager: Object },
    any
  >((state) => state);
  const hotel_id: string = sessionStorage.getItem('hotel_id');
  const userTOken = localStorage.getItem('token');

  const removeFavorite = async (e) => {
    setDeletingFave(true);
    const removeFaveEndpoint = `${baseUrl}/v1/hotel/favourites/remove?hotel_id=${hotel_id}&contractor_id=${e}`;

    try {
      let res = await fetch(removeFaveEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userTOken}`,
        },
      });
      setDeletingFave(false);

      const item = await res.json();
      // console.log('response', item);
      setSuccessDialog(false);
      toast.success('Favorite contractor successfully removed');
      getFave();
    } catch (error) {
      setDeletingFave(false);

      toast.error('Please try again');
      getFave();
    }
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    setPage(value);
  };
  const classes = useStyles();

  return (
    <>
      {deletingFave && (
        <div className="flex items-center justify-center w-full">
          <CircularProgress style={{ color: '#0C77F8' }} />
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
                    //   key={headCell.id}
                    className="py-2"
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
                      <Avatar className="w-6 h-6" src={item?.profilePicture} />
                      <p className="text-tableWriting text-sm font-medium">
                        {item?.owner.lastname} {item?.owner.firstname}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-tableWriting ">
                    <p className="px-4  text-sm font-medium text-tableWriting">
                      {item?.completedShiftsCount === null
                        ? '0'
                        : item?.completedShiftsCount}
                    </p>
                  </TableCell>

                  {item?.roles.length === 0 ? (
                    <TableCell
                      // align="center"
                      className="text-sm font-medium text-tableWriting"
                    >
                      <p
                        style={{ textTransform: 'capitalize' }}
                        className="text-sm flex font-medium text-tableWriting items-center "
                      >
                        {item.owner.userType}
                      </p>
                    </TableCell>
                  ) : (
                    <TableCell
                      align="left"
                      className="text-sm font-medium text-tableWriting"
                    >
                      <div className="flex space-x-1">
                        {item.roles.map((itemFromMap, index) =>
                          index + 1 !== item.roles.length ? (
                            <p className="  text-sm font-medium text-tableWriting">
                              {itemFromMap.name + '/'}
                            </p>
                          ) : (
                            <p className="text-sm font-medium text-tableWriting">
                              {itemFromMap.name}
                            </p>
                          )
                        )}
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-sm font-medium text-tableWriting">
                    <Rating
                      name="read-only"
                      value={item?.rating}
                      readOnly
                      size="small"
                      precision={0.5}
                    />
                  </TableCell>
                  <TableCell
                    style={{ display: 'flex' }}
                    className="text-sm font-medium items-center justify-between text-tableWriting"
                  >
                    <p className="text-tableWriting font-medium">
                      {item?.badge_count}/4
                    </p>
                    <IconButton
                      aria-describedby={id}
                      onClick={(event) => {
                        handleClick(event);
                        setSelectedRow(item);
                        console.log('item is ', item);
                      }}
                    >
                      <img src={MenuButton} />
                    </IconButton>
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
              src={NoFavorites}
              className="w-48 h-auto items-center flex justify-center"
            />

            <p className="text-3xl text-center text-noDataText">
              No Favorites Yet{' '}
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
          vertical: 'center',
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
        <div className="flex justify-around p-2 space-x-1">
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

      <Dialog
        maxWidth="sm"
        fullWidth={false}
        open={successDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <div className=" flex flex-col justify-center items-center  p-2 space-y-4">
          <div style={{ width: '100px', height: '100px' }} className=" p-2  ">
            <Avatar
              className="w-full h-full"
              src={''}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="justify-center items-center mx-auto ">
            <p
              className="text-2xl text-black text-bold mx-auto text-center pb-2"
              onClick={() => setSuccessDialog(false)}
              style={{ color: 'black' }}
            >
              Are you sure you want to remove {selectedRow?.owner?.lastname}{' '}
              {selectedRow?.owner?.firstname}{' '}
            </p>
            <div className="mx-auto">
              <img src={Underline} alt="" width="50%" className="mx-auto" />
            </div>
            <p
              className="text-sm text-shadeOfBlack mx-auto py-4 text-center"
              onClick={() => setSuccessDialog(false)}
            >
              This action will remove this Favorite and they wont have access to
              Favorite Shifts
            </p>
          </div>
          <div className="flex space-x-3">
            <div>
              <button
                className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-4 py-4 rounded-md"
                onClick={() => setSuccessDialog(false)}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="bg-statusBlue flex items-center  px-4 py-4 lg:px-8 rounded-md text-white"
                onClick={() => removeFavorite(selectedRow?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <FaveDialog open={infoDialog} handleClose={handleDialogClose}>
        <div className=" flex flex-col justify-center items-center w-full p-2 space-y-4">
          <div style={{ width: '100px', height: '100px' }} className="   ">
            <Avatar
              className="w-full h-full"
              src={selectedRow?.profilePicture}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="justify-center items-center mx-auto ">
            <p
              className="text-lg text-black text-bold mx-auto text-center "
              onClick={() => setSuccessDialog(false)}
              style={{ color: 'black' }}
            >
              {selectedRow?.owner?.lastname} {selectedRow?.owner?.firstname}
            </p>
            <p className="text-shadeOfBlack text-xs text-center pb-2">
              {selectedRow.role}
            </p>
            <p className="text-shadeOfBlack font-medium text-center text-sm">
              {selectedRow?.completedShiftsCount === null
                ? '0'
                : selectedRow?.completedShiftsCount}{' '}
              <br /> Completed Shifts
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 divide-x-shadeOfBlack divide-x pb-4">
              <div className="items-center flex justify-center flex-col ">
                <p className="text-shadeOfBlack font-bold"> Ratings</p>
                <div className="flex space-x-2  items-baseline">
                  <div className="flex justify-center items-center bg-circleBlue rounded-full w-7 h-7">
                    <ReactSVG src={StarFave} />
                  </div>
                  <p className=" text-3xl lg:text-5xl text-black">
                    {selectedRow?.rating === null
                      ? Number(0)?.toFixed(1)
                      : selectedRow?.rating?.toFixed(1)}
                  </p>
                  <p className="text-black text-sm lg:text-base font-medium ">
                    /5
                  </p>
                </div>
              </div>
              <div className="items-center flex justify-center flex-col ">
                <p className="text-shadeOfBlack font-bold"> Badges</p>

                <div className="flex space-x-2  items-baseline">
                  <div className="flex justify-center items-center bg-circleBlue rounded-full w-7 h-7">
                    <ReactSVG src={BadgeFave} />
                  </div>
                  <p className=" text-3xl lg:text-5xl text-black">
                    {selectedRow?.badge_count}
                  </p>
                  <p className="text-black  font-medium ">/4</p>
                </div>
              </div>
            </div>

            <div className=" grid sm:grid-cols-1 lg:grid-cols-2">
              <div
                style={{ width: '90%', paddingLeft: '10%' }}
                // className="lg:pl-15% pl-5"
              >
                <div className=" lg:pt-8 overflow-x-auto lg:overflow-x-visible w-full">
                  <Rating
                    name="read-only"
                    emptyIcon={<ReactSVG src={EmptyStar} />}
                    icon={<ReactSVG src={FilledStar} />}
                    value={selectedRow?.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                    // className="grid grid-cols-2 gap-2"
                  />
                </div>
                <button
                  disabled={selectedRow?.reviews?.length === 0 ? true : false}
                  className="font-semibold text-appBlue text-sm cursor-pointer"
                  onClick={() => setReviewModal(true)}
                >
                  {selectedRow?.reviews?.length}{' '}
                  {selectedRow?.reviews?.length > 1 ? 'reviews' : 'review'}
                </button>
              </div>
              <div
                style={{ width: '90%' }}
                className="lg:pl-15% pl-10 pt-4 lg:pt-0"
              >
                <p className="text-sm font-bold pb-3">Earned Badges</p>
                {selectedRow.badge_count === 0 ? (
                  <div className="grid grid-cols-2 gap-3 justify-between">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={PadlockSVG}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full "
                      />
                      <p className="text-xs text-center">On time</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={PadlockSVG}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full"
                      />
                      <p className="text-xs text-center">
                        Dressed Appropriately
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={PadlockSVG}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full"
                      />
                      <p className="text-xs text-center">
                        Advanced System Knowledge
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={PadlockSVG}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full"
                      />
                      <p className="text-xs text-center">Emergency Hero</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 justify-between">
                    <div className="flex flex-col items-center">
                      <img
                        src={PunctualImage}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full"
                      />
                      <p className="text-xs text-center">On time</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={Dress}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full rounded-full"
                      />
                      <p className="text-xs text-center">
                        Dressed Appropriately
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={Dress}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full rounded-full "
                      />
                      <p className="text-xs text-center">
                        Advanced System Knowledge
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={Ladder}
                        style={{ width: '60px', height: '60px' }}
                        className="w-full h-full rounded-full"
                      />
                      <p className="text-xs text-center">Emergency Hero</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </FaveDialog>

      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={reviewModal}
        onClose={handReviewModalClose}
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <div style={{ width: '100%' }}>
          <div className="flex items-center justify-between">
            <div style={{ width: '135px' }}>
              <p className="text-2xl text-black font-bold py-2">Comments</p>
              <img src={Underline} width="100%" />
            </div>
            <div className="flex space-x-3 items-center">
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
          </div>

          <div className="pt-5 space-y-4 flex flex-col">
            {selectedRow?.reviews?.map((item) => (
              <div
                className=" py-2 rounded-md "
                style={{ backgroundColor: '#F5F8FC' }}
              >
                <div className="m-6 flex justify-between items-start space-x-3">
                  <div className="flex space-x-5 lg:items-center">
                    <div className="flex lg:space-x-5 lg:items-center flex-col lg:flex-row">
                      <div className="w-14 h-14">
                        <Avatar
                          src={selectedRow?.profilePicture}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full flex flex-col items-start">
                        {selectedRow?.roles?.length === 0 ? (
                          <p
                            style={{ textTransform: 'capitalize' }}
                            className="text-lg text-black"
                          >
                            {selectedRow.owner.userType}
                          </p>
                        ) : (
                          <div className="flex space-x-1">
                            {selectedRow?.roles.map((itemFromMap, index) =>
                              index + 1 !== selectedRow?.roles?.length ? (
                                <p className="text-lg text-black">
                                  {itemFromMap.name + ','}
                                </p>
                              ) : (
                                <p className="text-lg text-black">
                                  {itemFromMap.name}
                                </p>
                              )
                            )}
                          </div>
                        )}
                        <p
                          style={{ color: '#A5A7AA' }}
                          className="pb-2 text-xs"
                        >
                          {format(
                            new Date(item?.createdAt?.split('T')[0]),
                            'do MMMM yyyy'
                          )}
                        </p>
                        <p className="text-sm text-shadeOfBlck">
                          {item?.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Rating
                      name="read-only"
                      value={item?.rating}
                      readOnly
                      size="small"
                      precision={0.5}
                    />
                  </div>
                </div>
              </div>
            ))}
            {selectedRow?.reviews?.length > 3 && (
              <div>
                <div className="rounded-full bg-appBlue w-40 mx-auto">
                  <p
                    className="text-white text-center py-1"
                    style={{ fontSize: '10px' }}
                  >
                    Scroll for more
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};
export {};
export default MyTable;
