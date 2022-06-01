/* eslint-disable max-len */
import React from 'react';
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
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@assets/close_big.svg';
import Button from '@components/home/Button';
import { makeStyles } from '@material-ui/core/styles';

import MenuButton from '@assets/menu_button.svg';
import InfoIcon from '@assets/info_icon.svg';

import Underline from '@assets/UnderLine.svg';
import FaveDialog from '@components/FaveDIalog/FaveDialog';

import NoBillings from '@assets/dashboard/icons/NoBillings.svg';
import { format } from 'date-fns';
import { baseUrl, useMergeState, getDuration } from '@utils/helpers';
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
const BillTable = ({
  row,
  heading,
  unAssigned,
  loading,
  shiftPaginationData,
  setPageNumber,
}) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    setPage(value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [selectedRow, setSelectedRow] = React.useState<any>({});
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log('selectedRole', selectedRow);
  const [successDialogOpen, setSuccessDialog] = React.useState(false);
  const [infoDialog, setInfoDialog] = React.useState(false);
  const [reviewModal, setReviewModal] = React.useState(false);
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
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const classes = useStyles();

  return (
    <>
      {loading === true ? (
        <div className="flex items-center justify-center w-full">
          <CircularProgress style={{ color: '#77D4A2' }} />
        </div>
      ) : row.length > 0 ? (
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {heading.map((headCell) => (
                  <TableCell
                    //   key={headCell.id}
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: '#95A3C8' }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {row.map((item) => (
                <TableRow className="flex items-center">
                  <TableCell className="text-sm font-medium whitespace-nowrap ">
                    <div className="flex space-x-2 items-center">
                      <p className="text-tableWriting text-sm font-medium">
                        000{item?.shift_id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-tableWriting flex ">
                    <div className="flex items-center space-x-1 ">
                      <Avatar
                        className="w-6 h-6"
                        src={item?.owner?.profilePicture}
                      />
                      <p className="  text-sm font-medium text-tableWriting text-center whitespace-nowrap">
                        {item?.owner?.lastname} {item?.owner?.firstname}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-tableWriting">
                    {Object.keys(item.shift.roles).length !== 0 ? (
                      item?.shift.roles?.map((itemFromMap, index) =>
                        index + 1 !== item?.shift.roles?.length ? (
                          <p className="  text-sm font-medium text-tableWriting">
                            {itemFromMap.name + ','}
                          </p>
                        ) : (
                          <p className="  text-sm font-medium text-tableWriting">
                            {itemFromMap.name}
                          </p>
                        )
                      )
                    ) : (
                      <p className="  text-sm font-medium text-tableWriting">
                        -
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-tableWriting ">
                    <p className="px-4  text-sm font-medium text-tableWriting whitespace-nowrap lg:whitespace-normal  ">
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
                  <TableCell
                    className={`text-sm font-medium items-center text-tableWriting  `}
                  >
                    <p
                      className={`text-sm font-medium text-center rounded-md ${
                        item.shift.status === 'ACCEPTED'
                          ? 'text-statusBlue bg-statusBlue bg-opacity-30'
                          : item.shift.status === 'PENDING'
                          ? ' text-statusYellow bg-statusYellow bg-opacity-30'
                          : item.shift.status === 'COMPLETED'
                          ? 'bg-completed text-completed bg-opacity-30'
                          : item.shift.status === 'ONGOING'
                          ? 'text-green-400 bg-green-400 bg-opacity-20'
                          : 'text-statusRed bg-statusRed bg-opacity-30'
                      } `}
                    >
                      {item.shift.status?.status === 'PENDING'
                        ? 'Unassigned'
                        : item.shift.status === 'CANCELLED'
                        ? 'Cancelled'
                        : item.shift.status === 'ACCEPTED'
                        ? ' Scheduled'
                        : item.shift.status === 'ONGOING'
                        ? 'Ongoing'
                        : 'Completed'}{' '}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-tableWriting ">
                    <p className="px-4  text-sm font-medium text-tableWriting">
                      ${item?.shift?.pay}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm font-medium items-center justify-between text-tableWriting">
                    <div className="text-sm font-medium items-center justify-between text-tableWriting flex flex-row">
                      <p className="text-tableWriting text-sm font-medium text-center">
                        $
                        {Number(
                          item.amountPayableToShift2go +
                            item.amountPayableToContractor
                        ).toFixed(2)}
                      </p>
                      <IconButton
                        aria-describedby={id}
                        onClick={(event) => {
                          handleClick(event);
                          setSelectedRow(item);
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
                    className="py-1 font-medium text-sm whitespace-nowrap"
                    style={{ color: '#95A3C8' }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </Table>
          </TableContainer>

          <div className="flex flex-col justify-center items-center w-full h-full py-5 ">
            <img
              src={NoBillings}
              className="w-48 h-auto items-center flex justify-center"
            />

            <p className="text-3xl text-center text-noDataText">
              No Billings Yet
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
        </div>
      </Popover>
      <FaveDialog open={successDialogOpen} handleClose={handleDialogClose}>
        <div className=" flex flex-col justify-center items-center w-full p-2 space-y-4">
          <div className="justify-center items-center mx-auto ">
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
            <p
              className="text-sm text-shadeOfBlack mx-auto py-4 text-center"
              onClick={() => setSuccessDialog(false)}
            >
              This action will permanently delete this Shift and you wont be
              able to access it anymore
            </p>
          </div>
          <div className="flex space-x-3">
            <div>
              <button className="hover:bg-statusBlue hover:text-white flex items-center lg:px-8  px-4 py-4 rounded-md">
                Cancel
              </button>
            </div>
            <div>
              <button className="bg-statusBlue flex items-center  px-4 py-4 lg:px-8 rounded-md text-white">
                Delete
              </button>
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
          style: { borderRadius: 20, padding: 10, overflowX: 'auto' },
        }}
      >
        {Object.keys(selectedRow).length !== 0 && (
          <div>
            <div style={{ width: '100%' }} className=" grid justify-items-end">
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
            <div className="py-4">
              <div className=" flex flex-col justify-center items-center w-full p-2 space-y-2">
                <div className="w-20 h-20">
                  <Avatar
                    src={selectedRow?.owner?.profilePicture}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <p className="text-black text-lg font-semibold">
                  {selectedRow?.owner?.lastname} {selectedRow?.owner?.firstname}{' '}
                </p>
              </div>
              <div className="flex justify-between items-center lg:space-x-16 lg:px-5 px-2  ">
                <div className="pt-4">
                  <div className="py-10">
                    <p className="text-xs text-littleText py-1">Shift Role</p>
                    {Object.keys(selectedRow.shift.roles).length !== 0 ? (
                      selectedRow?.shift.roles?.map((itemFromMap, index) =>
                        index + 1 !== selectedRow?.shift.roles?.length ? (
                          <p className="text-sm font-medium text-tableWriting">
                            {itemFromMap.name + ','}
                          </p>
                        ) : (
                          <p className="  text-sm font-medium text-tableWriting">
                            {itemFromMap.name}
                          </p>
                        )
                      )
                    ) : (
                      <p className="  text-sm font-medium text-tableWriting">
                        {selectedRow.owner.userType}
                      </p>
                    )}
                  </div>

                  {/* <p className="text-shadeOfBlack font-semibold text-sm lg:text-base py-1">
                    Start Time
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1">
                    End Time
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1">
                    Shift Length
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1">
                    Duration
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1">
                    Clocked in
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1">
                    Clocked Out
                  </p> */}
                </div>
                <div>
                  <div className="py-3">
                    <p className="text-xs text-littleText lg:text-right  ">
                      Pay
                    </p>
                    <p className="text-appTQ font-bold text-2xl text-right">
                      ${selectedRow?.shift?.pay}/hr
                    </p>
                  </div>
                  <div className="py-3">
                    <p className="text-xs text-littleText text-right">
                      Total Payment
                    </p>
                    <p className="text-appTQ font-bold text-2xl text-right">
                      ${' '}
                      {Number(
                        selectedRow?.amountPayableToShift2go +
                          selectedRow?.amountPayableToContractor
                      ).toFixed(2)}
                    </p>
                  </div>
                  {/* <p className="text-shadeOfBlack font-semibold text-right py-1">
                    {format(new Date(selectedRow?.shift?.startTime), 'hh:mm a')}
                    ,{' '}
                    {
                      monthNames[
                        new Date(selectedRow?.shift?.startTime).getMonth()
                      ]
                    }{' '}
                    {new Date(selectedRow?.shift?.startTime).getDate()}
                  </p>
                  <p className="text-shadeOfBlack font-semibold text-right py-1">
                    {format(new Date(selectedRow?.shift?.endTime), 'hh:mm a')},{' '}
                    {
                      monthNames[
                        new Date(selectedRow?.shift?.endTime).getMonth()
                      ]
                    }{' '}
                    {new Date(selectedRow?.shift?.endTime).getDate()}
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1 text-right">
                    {getDuration(
                      selectedRow?.shift?.startTime,
                      selectedRow?.shift?.endTime
                    )}
                  </p>
                  <p className="text-shadeOfBlack font-semibold py-1 text-right">
                    {getDuration(
                      selectedRow?.shift?.startedAt,
                      selectedRow?.shift?.endedAt
                    )}{' '}
                  </p>
                  <p className="text-shadeOfBlack text-right font-semibold py-1">
                    {format(new Date(selectedRow?.shift?.startedAt), 'hh:mm a')}
                    ,{console.log(selectedRow)}{' '}
                    {
                      monthNames[
                        new Date(selectedRow?.shift?.startedAt).getMonth()
                      ]
                    }{' '}
                    {new Date(selectedRow?.shift?.startedAt).getDate()}
                  </p>
                  <p className="text-shadeOfBlack text-right font-semibold py-1">
                    {format(new Date(selectedRow?.shift?.endedAt), 'hh:mm a')},{' '}
                    {
                      monthNames[
                        new Date(selectedRow?.shift?.endedAt).getMonth()
                      ]
                    }{' '}
                    {new Date(selectedRow?.shift?.endedAt).getDate()}
                  </p> */}
                </div>
              </div>
            </div>
            <div className="w-full lg:px-5 px-2 ">
              <div className="flex justify-between items-center">
                <p className="text-shadeOfBlack font-semibold text-sm lg:text-base py-1">
                  Start Time
                </p>
                <p className="text-shadeOfBlack font-semibold text-right py-1">
                  {format(new Date(selectedRow?.shift?.startTime), 'hh:mm a')},{' '}
                  {
                    monthNames[
                      new Date(selectedRow?.shift?.startTime).getMonth()
                    ]
                  }{' '}
                  {new Date(selectedRow?.shift?.startTime).getDate()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                {' '}
                <p className="text-shadeOfBlack font-semibold py-1">End Time</p>
                <p className="text-shadeOfBlack font-semibold text-right py-1">
                  {format(new Date(selectedRow?.shift?.endTime), 'hh:mm a')},{' '}
                  {monthNames[new Date(selectedRow?.shift?.endTime).getMonth()]}{' '}
                  {new Date(selectedRow?.shift?.endTime).getDate()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                {' '}
                <p className="text-shadeOfBlack font-semibold py-1">
                  Shift Length
                </p>
                <p className="text-shadeOfBlack font-semibold py-1 text-right">
                  {getDuration(
                    selectedRow?.shift?.startTime,
                    selectedRow?.shift?.endTime
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center">
                {' '}
                <p className="text-shadeOfBlack font-semibold py-1">Duration</p>
                <p className="text-shadeOfBlack font-semibold py-1 text-right">
                  {getDuration(
                    selectedRow?.shift?.startedAt,
                    selectedRow?.shift?.endedAt
                  )}{' '}
                </p>
              </div>
              <div className="flex justify-between items-center">
                {' '}
                <p className="text-shadeOfBlack font-semibold py-1">
                  Clocked in
                </p>
                <p className="text-shadeOfBlack text-right font-semibold py-1">
                  {format(new Date(selectedRow?.shift?.startedAt), 'hh:mm a')},
                  {console.log(selectedRow)}{' '}
                  {
                    monthNames[
                      new Date(selectedRow?.shift?.startedAt).getMonth()
                    ]
                  }{' '}
                  {new Date(selectedRow?.shift?.startedAt).getDate()}
                </p>
              </div>
              <div className="flex justify-between items-center">
                {' '}
                <p className="text-shadeOfBlack font-semibold py-1">
                  Clocked Out
                </p>{' '}
                <p className="text-shadeOfBlack text-right font-semibold py-1">
                  {format(new Date(selectedRow?.shift?.endedAt), 'hh:mm a')},{' '}
                  {monthNames[new Date(selectedRow?.shift?.endedAt).getMonth()]}{' '}
                  {new Date(selectedRow?.shift?.endedAt).getDate()}
                </p>
              </div>
              <div className="flex justify-between items-center"></div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default BillTable;
