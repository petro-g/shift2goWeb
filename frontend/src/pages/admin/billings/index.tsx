import React, { useState, useEffect } from 'react';
import Input from '@components/home/Input';
import Button from '@components/home/Button';
import { BsFillBellFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import Datee from '@assets/dashboard/icons/DateSelect.svg';
import { Popover, IconButton, TablePagination } from '@material-ui/core';

import DatePicker, {
  Calendar,
  DayRange,
  utils,
} from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { subDays, format } from 'date-fns';

import { BillingTable } from './components';
const BillingsColumns = ['Hotels', 'Address', 'Payment', 'Total Bills'];
import { baseUrl, useMergeState, getDuration } from '@utils/helpers';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BillingBoard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [homePage, setHomePage] = useState('home');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [billingData, setBillingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });
  const open = Boolean(anchorEl);

  const id = open ? 'bill-popover' : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [billing_page_number, set_billing_page_number] = useState(1);
  const [billing_pagination_data, set_billing_pagination_data] = useState<
    any | undefined
  >();

  const set_bill_page = (value) => {
    set_billing_page_number(value);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  console.log('date', format(new Date(), 'yyyy-MM-dd'));

  console.log('format', format(subDays(new Date(), 7), 'yyyy-MM-d'));

  {
    console.log('date sub', subDays(new Date(), 7));
  }
  const pastWeek = new Date(subDays(new Date(), 7));
  const d = new Date();
  const billingEndPoint = `${baseUrl}/v1/billings?page=${billing_page_number}${
    dayRange.from === null
      ? `&start_date=${pastWeek.getFullYear()}-${
          pastWeek.getMonth() + 1
        }-${pastWeek.getDate()}`
      : `&start_date=${dayRange.from.year}-${dayRange.from.month}-${dayRange.from.day}`
  }${
    dayRange.to === null
      ? `&end_date=${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
      : `&end_date=${dayRange.to.year}-${dayRange.to.month}-${dayRange.to.day}`
  }`;
  const token = localStorage.getItem('token');
  const list =
    billingData.length > 0 &&
    billingData?.map(
      (item) => item.amountPayableToShift2go + item.amountPayableToContractor
    );
  let total = list.length > 0 && list?.reduce((a, b) => a + b, 0);
  const getBillingData = async () => {
    await axios
      .get(billingEndPoint, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set_billing_pagination_data(res.headers);
        setBillingData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Please try again');
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getBillingData();
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
      <div className=" flex flex-col items-center h-full  lg:px-10 sm:px-3 overflow-hidden">
        {homePage === 'home' && (
          <>
            <div className="w-full flex flex-col lg:flex-row mb-5 lg:items-center lg:justify-between space-y-4  py-8 ">
              <div className="flex space-x-2 items-center  lg:flex-col lg:items-start">
                {dayRange.to === null ? (
                  <p className="text-sm text-totalBillText">
                    Total billings this week
                  </p>
                ) : (
                  <p className="text-sm text-totalBillText">
                    Total billings for period
                  </p>
                )}

                <p className=" text-2xl  lg:text-4xl font-extrabold text-black">
                  ${Number(total).toFixed(2)}
                </p>
              </div>

              <div className="border border-inputBorder flex flex-row  justify-between items-center lg:pl-8 pr-4">
                <p>
                  {dayRange.to === null
                    ? `${pastWeek.getFullYear()}/${
                        pastWeek.getMonth() + 1
                      }/${pastWeek.getDate()}-     ${
                        utils('en').getToday().day
                      }/${utils('en').getToday().month}/${
                        utils('en').getToday().year
                      }`
                    : `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day} -${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`}
                </p>
                <IconButton onClick={handlePopoverOpen} className="flex-end">
                  <ReactSVG src={Datee} />
                </IconButton>{' '}
              </div>
              <p className="bg-completed w-1/4 p-4 rounded-md text-white text-center hidden lg:block">
                Current Billing Period
              </p>
            </div>
            <BillingTable
              heading={BillingsColumns}
              loading={loading}
              data={billingData}
              shiftPaginationData={billing_pagination_data}
              setPageNumber={set_bill_page}
            />
          </>
        )}

        {/* <div className="tableHolder">
        <Table
          noDataIcon={<ReactSVG src={NoBillings} className=" mb-5" />}
          noData="No Billings yet"
          columns={BillingsColumns}
        />
      </div> */}

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
            colorPrimaryLight="#85C1E9"
            shouldHighlightWeekends={false}
          />
        </Popover>
      </div>
    </>
  );
};
export default BillingBoard;
