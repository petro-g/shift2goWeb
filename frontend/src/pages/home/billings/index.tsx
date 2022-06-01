import React, { ReactElement, useEffect, useState } from 'react';
import Input from '@components/home/Input';
import Button from '@components/home/Button';

import { ReactSVG } from 'react-svg';
import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg';

import UnderLine from '@assets/UnderLine.svg';

import { baseUrl, useMergeState } from '@utils/helpers';

import CreateShiftModal from '../../../components/CreateShift/index';
import {
  IconButton,
  Popover,
  Dialog,
  FormControlLabel,
} from '@material-ui/core';
import Datee from '@assets/dashboard/icons/DateSelect.svg';
import BillTable from '../../../components/Table/BillTable';
import { BpCheckbox } from '@components/Checkbox/Checkbox';
import CloseIcon from '@assets/close_big.svg';
import { subDays, format } from 'date-fns';

import { Calendar, DayRange, utils } from 'react-modern-calendar-datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';
const BillingHeaders = [
  { label: 'Shift ID' },
  { label: 'Contractor' },
  { label: 'Shift Type' },
  { label: 'Scheduled Time' },
  { label: 'Shift Status' },
  { label: 'Pay/hr' },
  { label: 'FinalPay' },
];

const BillingBoard = () => {
  let todayDate = new Date().toDateString();

  const [billingModal, setBillingModal] = useState(true);
  const handleBillingModal = () => setBillingModal(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [billingData, setBillingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });
  const pastWeek = new Date(subDays(new Date(), 7));

  const [hide, setHidden] = useState(false);
  const d = new Date();
  const [billing_page_number, set_billing_page_number] = useState(1);
  const [billing_pagination_data, set_billing_pagination_data] = useState<
    any | undefined
  >();

  const set_bill_page = (value) => {
    set_billing_page_number(value);
  };
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
  {
    dayRange.to !== null && getBillingData;
  }
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (localStorage.getItem('hidden') === 'yes') {
      setBillingModal(false);
    }
    setLoading(true);

    getBillingData();
  }, [dayRange?.to, billing_page_number]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const id = open ? 'bill-popover' : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDialogOpen = (event) => {
    setDialogOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const list =
    billingData.length > 0 &&
    billingData?.map(
      (item) => item.amountPayableToShift2go + item.amountPayableToContractor
    );
  console.log('list', list);
  let total = list.length > 0 && list?.reduce((a, b) => a + b, 0);

  return (
    <div className=" w-full flex flex-col lg:px-10 sm:px-3 justify-around items-center">
      <div className="w-full flex flex-row justify-between mb-4 py-4 lg:py-8 ">
        <div>
          <p className="text-2xl font-bold text-black pb-1">Billing</p>
          <img src={UnderLine} className=" w-1/2 h-auto" />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row mb-5 lg:items-center justify-between">
        <h1 className="text-2xl text-black font-bold">{todayDate}</h1>
        <div className="border border-inputBorder flex flex-row w-3/10 justify-between items-center lg:pl-8 lg:pr-4 space-y-1">
          <p className="text-shadeOfBlack font-semibold">
            {dayRange.to === null
              ? `${pastWeek.getFullYear()}/${
                  pastWeek.getMonth() + 1
                }/${pastWeek.getDate()}-     ${utils('en').getToday().day}/${
                  utils('en').getToday().month
                }/${utils('en').getToday().year}`
              : `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day} -${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`}
          </p>
          <IconButton onClick={handlePopoverOpen} className="flex-end">
            <ReactSVG src={Datee} />
          </IconButton>
        </div>
        <p className="bg-completed w-1/4 p-4 rounded-md text-white text-center hidden lg:block">
          Current Billing Period
        </p>
        <p className="text-2xl text-black font-bold lg:text-center">
          ${Number(total).toFixed(2)}
        </p>
      </div>

      <BillTable
        row={billingData}
        heading={BillingHeaders}
        unAssigned={false}
        loading={loading}
        shiftPaginationData={billing_pagination_data}
        setPageNumber={set_bill_page}
      />

      <Dialog
        maxWidth="sm"
        fullWidth={false}
        open={billingModal}
        onClose={handleBillingModal}
        PaperProps={{
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <div style={{ width: '100%' }} className=" grid justify-items-end">
          <div className="flex space-x-3 items-center">
            <IconButton
              onClick={handleBillingModal}
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
        <div className="flex justify-center items-center flex-col">
          <p className="text-3xl"> Important Notice</p>
          <div>
            <img src={UnderLine} alt=" " width="70%" className="mx-auto" />
          </div>
        </div>
        <div className="p-2 flex flex-col space-y-4">
          <p className="text-shadeOfBlack text-semibold">
            A working week is Sunday through Saturday. You will be billed by
            Shift2Go on the Tuesday following a working week; the money is
            automatically withdrawn from your bank account (this is the only
            option we will allow).
          </p>
          <p className="text-shadeOfBlack text-semibold">
            Shift2Go charges you a fee of 43% of each shift’s rate.
          </p>
          <div>
            <p className="text-shadeOfBlack text-semibold">Example:</p>
            <p className="text-shadeOfBlack text-semibold">
              If you pay $10,000 to Shift2Go Contractors in a working week, the
              fee will be $4,300, and the total bill payable to Shift2Go will be
              $14,300.
            </p>
          </div>
        </div>
        <div className="px-4 flex flex-wrap lg:flex-nowrap justify-between pb-4">
          <FormControlLabel
            classes={{
              root: 'text-sm pr-2 m-1 font-semibold',
              label:
                'whitespace-nowrap text-xs text-shadeOfBlack mx-auto font-semibold',
            }}
            control={
              <BpCheckbox
                checked={hide}
                value={hide}
                onClick={() => {
                  setHidden(true);
                  localStorage.setItem('hidden', 'yes');
                }}
              />
            }
            label="Dont show this message again"
          />
          <Button isActive={true} onClick={handleBillingModal}>
            Okay, I understand
          </Button>
        </div>
      </Dialog>
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
      {/* <CreateShiftModal
        openDialog={dialogOpen}
        closeDialog={handleDialogClose}
      /> */}
    </div>
  );
};

export default BillingBoard;