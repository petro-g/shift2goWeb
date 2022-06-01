/* eslint-disable max-len */
import React from 'react';
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
} from '@material-ui/core';
import CloseIcon from '@assets/close_big.svg';
import Button from '@components/home/Button';

import Underline from '@assets/UnderLine.svg';

const FaveDialog = ({ children, open, handleClose }) => {
  const [successDialogOpen, setSuccessDialog] = React.useState(false);

  return (
    <Dialog
      scroll="body"
      onClose={handleClose}
      open={successDialogOpen || open}
      // fullWidth={true}
      maxWidth="lg"
      classes={{
        root: 'rounded-md',
        paper: 'rounded-full',
      }}
      PaperProps={{
        style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
      }}
    >
      <div style={{ width: '100%' }} className=" grid justify-items-end">
        <div className="flex space-x-3 items-center">
          <IconButton
            onClick={() => {
              setSuccessDialog(false);
              handleClose();
            }}
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
      {children}
    </Dialog>
  );
};

export default FaveDialog;
