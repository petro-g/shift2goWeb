/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  TableContainer,
  Paper,
  TableFooter,
  CircularProgress,
} from '@material-ui/core';
import { ReactSVG } from 'react-svg';

import { useHistory, useLocation, Link } from 'react-router-dom';
import BillTable from '../../../components/Table/BillTable';
import NoBillings from '@assets/dashboard/icons/NoBillings.svg';

import Popover from '@material-ui/core/Popover';
import MenuButton from '@assets/menu_button.svg';
import InfoIcon from '@assets/info_icon.svg';
import RemoveIcon from '@assets/remove_icon.svg';
import Datee from '@assets/dashboard/icons/DateSelect.svg';
import EditIcon from '@assets/icons/editIcon.svg';
import backicon from '@assets/icons/long_left.svg';
import { baseUrl } from '@utils/helpers';
import { Calendar, DayRange, utils } from 'react-modern-calendar-datepicker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    boxShadow: 'none',
  },
});
export const BillingTable = ({
  heading,
  data,
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
  const open = Boolean(anchorEl);
  const [selectedBill, setSelectedBill] = useState<any>({});
  const history = useHistory();

  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const token = localStorage.getItem('token');

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteBilling = async (id) => {
    let deleteEndpoint = ` ${baseUrl}/v1/billing/delete/${id}`;

    try {
      let res = await fetch(deleteEndpoint, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const item = await res.json();
      handleClose();
      toast.success('Billing deleted successfully');
    } catch (error) {
      handleClose();
      console.log(error);
      toast.error('Please try again');
    }
  };
  const classes = useStyles();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading === true ? (
        <CircularProgress style={{ color: '#77D4A2' }} />
      ) : data.length > 0 ? (
        <TableContainer component={Paper} className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="py-1 font-medium"
                  style={{ color: '#95A3C8' }}
                >
                  <p className="text-tableHeading text-sm font-medium lg:px-12">
                    Hotels
                  </p>
                </TableCell>
                <TableCell
                  className="py-1 font-medium"
                  style={{ color: '#95A3C8' }}
                >
                  <p className="text-tableHeading text-sm font-medium ">
                    Address
                  </p>
                </TableCell>
                <TableCell
                  className="py-1 font-medium"
                  style={{ color: '#95A3C8' }}
                >
                  <p className="text-tableHeading text-sm font-medium ">
                    Payment
                  </p>
                </TableCell>{' '}
                <TableCell
                  className="py-1 font-medium"
                  style={{ color: '#95A3C8' }}
                >
                  <p className="text-tableHeading text-sm font-medium ">
                    Total Bills
                  </p>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.length > 0 &&
                data.map((item, index) => (
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center space-x-10 ">
                        <p className="text-sm text-tableWriting font-medium">
                          {index + 1}
                        </p>
                        <div className="flex space-x-3 items-center ">
                          <Avatar
                            // src={item.hotel.pictures[0]}
                            src=""
                            className="w-4 h-4"
                          />
                          <p className="text-sm text-tableWriting font-medium">
                            {item.hotel.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.hotel.address === null ? (
                        <p className="text-sm text-tableWriting font-medium">
                          -
                        </p>
                      ) : (
                        <p className="text-sm text-tableWriting font-medium">
                          {item.hotel.address}
                        </p>
                      )}
                    </TableCell>{' '}
                    <TableCell>
                      <p className="text-sm text-tableWriting font-medium">
                        ${item.shift.pay}/hr{' '}
                      </p>
                    </TableCell>{' '}
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-tableWriting font-medium">
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
                            setSelectedBill(item);

                            sessionStorage.setItem(
                              'selectedHotel_id',
                              item.hotel_id
                            );
                          }}
                        >
                          <ReactSVG src={MenuButton} />
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
              <TableHead>
                <TableRow>
                  <TableCell
                    className="py-1 font-medium"
                    style={{ color: '#95A3C8' }}
                  >
                    <p className="text-tableHeading text-sm font-medium lg:px-12">
                      Hotels
                    </p>
                  </TableCell>
                  <TableCell
                    className="py-1 font-medium"
                    style={{ color: '#95A3C8' }}
                  >
                    <p className="text-tableHeading text-sm font-medium ">
                      Address
                    </p>
                  </TableCell>
                  <TableCell
                    className="py-1 font-medium"
                    style={{ color: '#95A3C8' }}
                  >
                    <p className="text-tableHeading text-sm font-medium ">
                      Payment
                    </p>
                  </TableCell>{' '}
                  <TableCell
                    className="py-1 font-medium"
                    style={{ color: '#95A3C8' }}
                  >
                    <p className="text-tableHeading text-sm font-medium whitespace-nowrap ">
                      Total Bills
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
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
          style: { borderRadius: 20, overflowX: 'hidden' },
        }}
      >
        <div className="flex justify-between p-2 space-x-3">
          <IconButton className="flex space-x-2 items-center">
            <Link to="more-info" className="flex space-x-2 items-center">
              <ReactSVG src={InfoIcon} alt="" className="px-1" />
              <p style={{ color: '#0C77F8' }} className="text-sm">
                Info
              </p>
            </Link>
          </IconButton>
          <IconButton
            // onClick={() => {
            //   setSuccessDialog(true);
            //   handleClose();
            // }}
            className="flex space-x-2 items-center"
          >
            <ReactSVG src={EditIcon} alt="" className="px-1" />
            <p style={{ color: '#0C77F8' }} className="text-sm">
              Edit
            </p>
          </IconButton>
          <IconButton
            className="flex space-x-2 items-center"
            onClick={() => deleteBilling(selectedBill?.id)}
          >
            <ReactSVG src={RemoveIcon} alt="" className="px-1" />
            <p style={{ color: '#0C77F8' }} className="text-sm">
              Remove
            </p>
          </IconButton>
        </div>
      </Popover>
    </>
  );
};

export const MoreBillingInfo = () => {
  const history = useHistory();
  let hotel = sessionStorage.getItem('selectedHotel_id');
  const [billing_page_number, set_billing_page_number] = useState(1);
  const [billing_pagination_data, set_billing_pagination_data] = useState<
    any | undefined
  >();

  const set_bill_page = (value) => {
    set_billing_page_number(value);
  };
  const token = localStorage.getItem('token');
  const [billing, setBilling] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const id = open ? 'bill-popover' : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });
  // console.log('dayRande', dayRange);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogOpen = (event) => {
    setDialogOpen(true);
  };
  const extractDateData = (item: DayRange) => {
    if (item.from === null) {
      return null;
    }

    const dateRes = `${item.from.year}-${item.from.month}-${item.from.day}`;
    return dateRes;
  };
  const extractDatEndData = (item: DayRange) => {
    if (item.to === null) {
      return null;
    }

    const dateRes = `${item.to.year}-${item.to.month}-${item.to.day}`;
    return dateRes;
  };
  const getHotelShifts = async () => {
    // const getHotelEnd = `${base_url}/v1/billings/hotel/${hotel}?page=${billing_page_number}`;
    const getHotelEnd = `${baseUrl}/v1/billings/hotel/${hotel}`;
    setLoading(true);
    axios
      .get(getHotelEnd, {
        params: {
          page: billing_page_number,
          start_date: extractDateData(dayRange),
          end_date: extractDatEndData(dayRange),
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set_billing_pagination_data(res.headers);

        setBilling(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Please try again');
        setLoading(false);
      });
  };
  const list =
    billing.length > 0 &&
    billing?.map(
      (item) => item.amountPayableToShift2go + item.amountPayableToContractor
    );
  let total = list.length > 0 && list?.reduce((a, b) => a + b, 0);
  const BillingHeaders = [
    { label: 'Shift ID' },
    { label: 'Contractor' },
    { label: 'Shift Type' },
    { label: 'Scheduled Time' },
    { label: 'Shift Status' },
    { label: 'Pay/hr' },
    { label: 'FinalPay' },
  ];
  let todayDate = new Date().toDateString();
  useEffect(() => {
    getHotelShifts();
  }, [dayRange.to]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className=" w-full flex flex-col px-5  ">
        <div className="w-full flex flex-row justify-between mb-10">
          <div
            className="font-bold text-gray-500 mt-4 cursor-pointer flex space-x-2 items-center"
            onClick={() => history.goBack()}
          >
            <ReactSVG src={backicon} />
            <p>Back</p>
          </div>
        </div>
        <div>
          <div className="w-full flex flex-col lg:flex-row mb-5  lg:items-center justify-start lg:justify-between">
            <h1 className="text-2xl text-black font-bold">{todayDate}</h1>
            <div className="border border-inputBorder flex flex-row   justify-between items-center lg:pl-8 lg:pr-4">
              <p className="text-shadeOfBlack font-semibold">
                {dayRange.to === null
                  ? `${utils('en').getToday().day}/${
                      utils('en').getToday().month
                    }/${utils('en').getToday().year}`
                  : `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day} -${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`}
              </p>
              <IconButton onClick={handlePopoverOpen} className="flex-end">
                <ReactSVG src={Datee} />
              </IconButton>
            </div>
            <p className="bg-completed w-1/3 p-4 rounded-md text-white text-center hidden lg:block">
              Current Billing Period
            </p>
            <p className="text-2xl text-black font-bold r">
              ${Number(total).toFixed(2)}
            </p>
          </div>
        </div>
        <BillTable
          row={billing}
          heading={BillingHeaders}
          unAssigned={false}
          loading={loading}
          shiftPaginationData={billing_pagination_data}
          setPageNumber={set_bill_page}
          // admin={true}
        />
      </div>

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
          value={dayRange}
          onChange={setDayRange}
          colorPrimary="#0C77F8"
          colorPrimaryLight="#333333"
          shouldHighlightWeekends={false}
        />
      </Popover>
    </>
  );
};
