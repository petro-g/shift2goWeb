/* eslint-disable max-len */
import React, { useState } from 'react';
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
  Grid,
  CircularProgress,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AvatarGroup from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@assets/close_big.svg';
import Button from '@components/home/Button';

import MenuButton from '@assets/menu_button.svg';
import InfoIcon from '@assets/info_icon.svg';
import RemoveIcon from '@assets/remove_icon.svg';
import Underline from '@assets/UnderLine.svg';
import FaveDialog from '@components/FaveDIalog/FaveDialog';

import NoDataTable from '@assets/dashboard/icons/NoDataTable.svg';
import Pagination from '@material-ui/lab/Pagination';

import axios from 'axios';
import { format } from 'date-fns';
import { baseUrl, useMergeState } from '@utils/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    height: '100%',
  },
  root: {
    boxShadow: 'none',
  },
});
const CancelledSHiftTable = ({
  row,
  heading,
  unAssigned,
  loading,
  getShiftData,
  cancelledPagination,
  setPageNumber,
}) => {
  // console.log('bs row', row);
  const [anchorEl, setAnchorEl] = useState(null);

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
  const [deletingShift, setDeletingShift] = useState(false);

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

  const startTime = selectedRow?.shift?.startTIme;
  const endTime = selectedRow?.shift?.endTIme;
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
        toast.error('Please try again');
        setDeletingShift(false);

        handleDialogClose();
        getShiftData();
      });
  };
  const [page, setPage] = React.useState(1);
  // console.log('cancelled pagination', cancelledPagination);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    setPage(value);
  };
  const classes = useStyles();

  return (
    <>
      {deletingShift && (
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
                    className="py-2 font-semibold"
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
                        000{item?.shift?.id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-tableWriting ">
                    <p className="px-4  text-sm font-medium text-tableWriting whitespace-nowrap lg:whitespace-normal ">
                      {format(
                        new Date(item?.shift?.startTime),
                        'eee MMM dd yyyy hh:mm aaa'
                      )}
                      -
                      {format(
                        new Date(item?.shift?.endTime),
                        'eee MMM dd yyyy hh:mm aaa'
                      )}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-tableWriting capitalize ">
                      {item?.owner?.userType}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Avatar src="" className="w-8 h-8" />
                      <p className="  text-sm font-medium text-tableWriting">
                        {item?.owner?.lastname} {item?.owner?.firstname}
                      </p>{' '}
                    </div>
                  </TableCell>
                  {unAssigned === true ? (
                    <>
                      <TableCell className="text-sm font-medium text-tableWriting">
                        <div className="flex items-center space-x-1">
                          <AvatarGroup
                          //   max={3}
                          >
                            <Avatar alt="" src="" />
                          </AvatarGroup>
                          <p className="  text-sm text-center font-medium text-appBlue">
                            & {item?.requests} others
                          </p>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        className={`text-sm font-medium items-center text-tableWriting `}
                      >
                        <div className="flex justify-between items-center">
                          <p
                            className={`text-sm font-medium text-center rounded-md text-statusRed bg-statusRed bg-opacity-30 p-1 px-1.5`}
                          >
                            Cancelled
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
                        </div>
                      </TableCell>
                    </>
                  )}
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
      {parseInt(cancelledPagination?.page_count) > 1 && (
        <div className="flex w-full  justify-end py-2 ">
          <Pagination
            count={parseInt(cancelledPagination?.page_count)}
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
      <FaveDialog open={successDialogOpen} handleClose={handleDialogClose}>
        <div className=" flex flex-col justify-center items-center w-full p-2 space-y-4">
          <div
            className="justify-center items-center mx-auto "
            style={{ width: '325px' }}
          >
            <p
              className="text-2xl text-black text-bold mx-auto text-center pb-2"
              onClick={() => setSuccessDialog(false)}
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
            <div style={{ width: '187px' }}>
              <Button style={{ width: '187px' }} isActive={false}>
                Cancel
              </Button>
            </div>
            <div style={{ width: '187px' }}>
              <Button
                style={{ width: '187px' }}
                isActive={true}
                onClick={deleteShift}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </FaveDialog>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
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

            <div className="grid grid-cols-2 gap-4  p-4">
              <div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Shift ID:</p>
                  <p className="text-xs text-shadeOfBlack font-semibold">
                    {'000' + selectedRow?.shift?.id}
                  </p>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Shift Role:</p>
                  {selectedRow?.shift?.roles_ids?.length === 0 ? (
                    <p className="text-xs text-shadeOfBlack font-semibold">
                      None
                    </p>
                  ) : (
                    selectedRow?.shift?.roles?.map((itemFromMap, index) =>
                      index + 1 !== selectedRow?.roles?.length ? (
                        <p className="  text-sm font-medium text-tableWriting">
                          {itemFromMap.name.toString() + '/'}
                        </p>
                      ) : (
                        <p className="  text-sm font-medium text-tableWriting">
                          {itemFromMap.name}
                        </p>
                      )
                    )
                  )}
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">
                    Certificate Required:
                  </p>

                  <div className="flex space-x-1">
                    {selectedRow?.shift?.certificates_types?.length === 0 ? (
                      <p className="text-xs text-shadeOfBlack font-semibold">
                        {' '}
                        None{' '}
                      </p>
                    ) : (
                      selectedRow?.shift?.certificates_types?.map((item) => (
                        <p className="text-xs text-shadeOfBlack font-semibold">
                          {item.name},
                        </p>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Scheduled Time:</p>
                  <p className="text-xs text-shadeOfBlack font-semibold uppercase">
                    {format(selectedRow?.startTime, 'hh:mm a')}-
                    {format(selectedRow?.endTime, 'hh:mm a')}
                  </p>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Shift Date:</p>
                  <p className="text-xs text-shadeOfBlack font-semibold">
                    {startTime?.getDate()}&nbsp;
                    {''}
                    {monthNames[startTime?.getMonth()] + ' '}&nbsp;
                    {''}
                    {startTime?.getFullYear() + ''}&nbsp;
                    {''}
                  </p>
                </div>
                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Shift Duration:</p>
                  <p className="text-xs text-shadeOfBlack font-semibold">
                    {endTime?.getHours() - startTime?.getHours() === 0
                      ? ' '
                      : endTime?.getHours() - startTime?.getHours() + 'hours'}
                    {endTime?.getMinutes() - startTime?.getMinutes() === 0
                      ? ' '
                      : endTime?.getMinutes() -
                        startTime?.getMinutes() +
                        'minutes'}{' '}
                  </p>
                </div>

                <div className="flex space-x-1 py-1 items-center">
                  <p className="text-shadeOfBlack font-bold">Request:</p>

                  {selectedRow.status === 'PENDING' ? (
                    <div className="flex space-x-1 items-center">
                      <AvatarGroup
                      //   max={3}
                      >
                        <Avatar className="w-8 h-8" alt="" src="" />
                        <Avatar className="w-8 h-8" alt="" src="" />
                        <Avatar className="w-8 h-8" alt="" src=" " />
                        <Avatar alt="" src="" />
                        <Avatar alt="" src="" />
                      </AvatarGroup>

                      <p className="text-appBlue text-sm  font-bold">
                        & {selectedRow?.requests} Others
                      </p>
                    </div>
                  ) : (
                    <div className="flex space-x-1 items-center">
                      <Avatar alt="Jack Sparrow" src="" />
                      <p className="text-shadeofBlack text-xs  font-semibold">
                        {selectedRow?.owner?.firstname}
                        {'   '}
                        {selectedRow?.owner?.lastname}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <p className="text-shadeOfBlack font-bold">Pay:</p>
                  <p className="text-appTQ text-4xl font-extrabold py-4">
                    ${selectedRow?.shift?.pay}/hr
                  </p>
                </div>
                <div>
                  <p className="text-shadeOfBlack font-bold py-4 pb-2">
                    Instructions
                  </p>
                  <p
                    style={{ fontSize: '10px' }}
                    className="text-shadeOfBlack  font-semibold"
                  >
                    {selectedRow?.shift?.instructions}
                  </p>
                </div>
                <div>
                  <p className="text-shadeOfBlack font-bold py-2">
                    Shift Status
                  </p>
                  <div className="w-24">
                    <p
                      style={{ fontSize: '10px' }}
                      className={` text-center  rounded-md   p-1  
                        text-statusRed bg-statusRed bg-opacity-30
                    }`}
                    >
                      Cancelled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>{' '}
    </>
  );
};
export {};
export default CancelledSHiftTable;
