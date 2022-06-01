import React, { ReactElement, useEffect, useState } from 'react';
import Button from '@components/home/Button';
import { ReactSVG } from 'react-svg';
import CircleOutline from '@assets/dashboard/icons/CircleOutline.svg';
import UnderLine from '@assets/UnderLine.svg';
import ArrowDown from '@assets/dashboard/icons/ArrowDown.svg';
import { baseUrl } from '@utils/helpers';
import CreateShiftModal from '../../../components/CreateShift/index';
import MyTable from '@components/Table/Table';
import { GetFaveList } from '../../../context/actions/auth';
import { Layout } from '../../home/dashboard/index';
import { useDispatch, useSelector } from 'react-redux';
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
  CircularProgress,
} from '@material-ui/core';
import { BpCheckbox } from '@components/Checkbox/Checkbox';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface Props {}

const FavoriteColumns = [
  'Contractor',
  'Completed Shifts',
  'Contractor Role',
  'Ratings',
  'Badges',
];
const myTableHeading = [
  { id: 1, label: 'Contractor' },
  { id: 2, label: 'Completed Shifts' },
  { id: 3, label: 'Contractor Roles' },
  { id: 4, label: 'Ratings' },
  { id: 5, label: 'Badges' },
];

const FavoritesBoard = () => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [faveContractorList, setFaveList] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const hotel_id: string = sessionStorage.getItem('hotel_id');
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
      console.log(response)
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
  if(!hotel_id)getHotelId();
  const userDetails: any = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const [targetFilter, setTargetFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [jobRole, setJobRole] = useState<any>([]);
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  // console.log('userDetails', userDetails);
  const selectedPop = open ? 'simple-menu' : undefined;

  const userData = useSelector<
    { token: string; userId: string; manager: Object },
    any
  >((state) => state);
  const [favePage_number, setFavePage_number] = useState(1);
  const [favePagination, setFavePagination] = useState<any | undefined>();
  // console.log('userData', userData);
  const favePage = (value) => {
    setFavePage_number(value);
  };
  const getFavoriteList = async () => {
    const favelistEndpoint = new URL(
      `${baseUrl}/v1/hotel/favourites?hotel_id=${hotel_id}&page=${favePage_number}${
        roleFilter !== '' ? `&job_role_id=${roleFilter}` : ''
      }`
    );
    await axios
      .get(favelistEndpoint.toString(), {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFavePagination(res.headers);
        setFaveList(res?.data);
        dispatch(GetFaveList(res?.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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

    getFavoriteList();
    getRoles();
  }, [done, favePage_number]);
  return (
    <div className=" w-full flex flex-col lg:px-10 sm:px-3 justify-around items-center">
      <div className="w-full flex flex-row justify-between  py-4 lg:py-8 ">
        <div>
          <p className="text-2xl lg:text-4xl font-bold text-black pb-1">
            Favorites
          </p>
          <img src={UnderLine} className=" h-auto w-3/5 " />
        </div>
      </div>
      <div className="flex  flex-row-reverse lg:py-5 w-full">
        <div className="flex lg:space-x-2">
          <div className="relative">
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
                classes={{ root: 'items-center flex lg:space-x-2 ' }}
              >
                <p className="text-sm text-shadeOfBlack font-semibold px-2">
                  {' '}
                  Filter Favorites
                </p>
                <ReactSVG src={ArrowDown} className=" m-auto" />
              </IconButton>
            </div>
          </div>
        </div>
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
          style: { borderRadius: 20, padding: 20, overflowX: 'hidden' },
        }}
      >
        <MenuItem disableRipple className="flex px-2">
          <FormControlLabel
            classes={{
              root: 'bg-white',
              label: 'text-sm text-shadeOfBlack font-semibold',
            }}
            control={
              <BpCheckbox
                onChange={() => {
                  setTargetFilter('');
                  setRoleFilter('');
                  setDone(!done);
                }}
              />
            }
            label="All Job Roles"
          />
        </MenuItem>{' '}
        {jobRole.length > 0 &&
          jobRole.map((item) => (
            <MenuItem disableRipple className="flex px-2 ">
              <FormControlLabel
                classes={{
                  root: 'bg-white',
                  label: 'text-sm text-shadeOfBlack font-semibold',
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
      <MyTable
        row={userData?.user?.faveList}
        heading={myTableHeading}
        loading={loading}
        shiftPaginationData={favePagination}
        setPageNumber={favePage}
        getFave={getFavoriteList}
      />
    </div>
  );
};

export default FavoritesBoard;
