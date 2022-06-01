import React, { ReactElement } from 'react';
import { SideBarStyled } from './styles';
import { ISideBarProps } from './type';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { ReactSVG } from 'react-svg';
import Home from '@assets/dashboard/icons/Home.svg';
import Heart from '@assets/dashboard/icons/Heart.svg';
import Billing from '@assets/dashboard/icons/Billing.svg';
import Settings from '@assets/dashboard/icons/Settings.svg';
import Help from '@assets/dashboard/icons/Help.svg';
import Logout from '@assets/dashboard/icons/Logout.svg';
import Shifts from '@assets/dashboard/icons/Shifts.svg';
import Hotels from '@assets/dashboard/icons/Hotels.svg';
import Contractors from '@assets/dashboard/icons/3Users.svg';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory, useLocation, Link, useRouteMatch } from 'react-router-dom';
import LogoIcon from '@assets/dashboard/logoIcon.svg';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
const MenusTop: Array<pageName> = ['Home', 'Shifts', 'Favorites', 'Billing'];
const MenusBottom: Array<pageName> = ['Settings', 'Help', 'Logout'];

const AdminTop: Array<pageName> = [
  'Home',
  'Contractors',
  'Hotels',
  'Billing',
  'Job Role',
  'Certificates',
];

const AdminBottom: Array<pageName> = ['Logout'];

const Icons = {
  Home: <ReactSVG src={Home} />,
  Shifts: <ReactSVG src={Shifts} />,
  Favorites: <ReactSVG src={Heart} />,
  Billing: <ReactSVG src={Billing} />,
  Settings: <ReactSVG src={Settings} />,
  Help: <ReactSVG src={Help} />,
  Logout: <ReactSVG src={Logout} />,
  Contractors: <ReactSVG src={Contractors} />,
  Hotels: <ReactSVG src={Hotels} />,
  'Job Role': <ReactSVG src={Billing} />,
  Certificates: <ReactSVG src={Shifts} />,
};

type pageName =
  | 'Home'
  | 'Shifts'
  | 'Favorites'
  | 'Billing'
  | 'Settings'
  | 'Help'
  | 'Logout'
  | 'Contractors'
  | 'Hotels'
  | 'Job Role'
  | 'Certificates';

function Input(props: ISideBarProps): ReactElement {
  const [activeMenu, setActiveMenu] = React.useState<string>(MenusTop[0]);
  const { active, setPage, admin, open, ToggleDrawer } = props;
  const [selectedItem, setSelectedItem] = React.useState<any>('home');
  React.useEffect(() => {
    setActiveMenu(active);
  }, [active]);

  const getIcon = (page: pageName) => {
    return Icons[page];
  };
  const match = useRouteMatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: true,
  });
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string
  ) => {
    setSelectedItem(index);
  };
  return (
    <>
      <SideBarStyled className="lg:flex flex-col justify-between w-full hidden   ">
        <div className="flex flex-col w-full items-center">
          <ul className="w-full flex flex-col items-center">
            {!admin &&
              MenusTop.map((item: pageName, index: number) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveMenu(MenusTop[index]);
                      setSelectedItem(item);
                      // console.log('item', item);
                    }}
                  >
                    <Link
                      to={`${match.url}/${item.toLowerCase()}`}
                      className={
                        item.toLowerCase() === selectedItem?.toLowerCase()
                          ? 'active '
                          : ''
                      }
                    >
                      {getIcon(item)} {item}
                    </Link>
                  </li>
                );
              })}
            {admin &&
              AdminTop.map((item: pageName, index: number) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveMenu(MenusTop[index]);
                      setSelectedItem(item);
                    }}
                  >
                    <Link
                      to={`${item.toLowerCase()}`}
                      className={
                        item.toLowerCase() === selectedItem.toLowerCase()
                          ? 'active '
                          : ''
                      }
                    >
                      {getIcon(item)} {item}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="flex flex-col w-full items-center">
          <ul className="w-full flex flex-col items-center">
            {!admin &&
              MenusBottom.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveMenu(MenusTop[index]);
                      setSelectedItem(item);
                    }}
                  >
                    <Link
                      to={`${item.toLowerCase()}`}
                      className={
                        item.toLowerCase() === selectedItem.toLowerCase()
                          ? 'active'
                          : ''
                      }
                    >
                      {getIcon(item)}
                      {item}
                    </Link>
                  </li>
                );
              })}
            {admin &&
              AdminBottom.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveMenu(MenusTop[index]);
                      setSelectedItem(item);
                    }}
                  >
                    <Link
                      to={`${item.toLowerCase()}`}
                      className={item.toLowerCase() === active ? 'active' : ''}
                    >
                      {getIcon(item)}
                      {item}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </SideBarStyled>

      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={ToggleDrawer}
        className="block lg:hidden"
      >
        <List
          className={`h-full w-full flex flex-col space-y-4 items-center justify-center ${
            classes.list
          } ${admin ? 'bg-gray-900' : 'bg-blue-600'}`}
        >
          <ListItem>
            <ListItemIcon>
              <img src={LogoIcon} className="w-10 h-10 logo mr-2" />
            </ListItemIcon>

            <h1 className="text-xl font-bold text-white">Shift2go</h1>
          </ListItem>
          {!admin &&
            MenusTop.map((i, index) => (
              <Link
                style={{ width: '90%' }}
                to={`${match.url}/${i.toLowerCase()}`}
                className="flex items-center justify-center w-9/10"
              >
                <ListItem
                  button
                  disableRipple
                  key={i}
                  onClick={(event) => {
                    setActiveMenu(MenusTop[index]);
                    handleListItemClick(event, i);
                    ToggleDrawer();
                  }}
                  style={{
                    width: '100%',
                    borderRadius: '0.375rem',
                    backgroundColor:
                      `${i}`.toLowerCase() === `${selectedItem}`.toLowerCase()
                        ? 'white'
                        : 'inherit',
                  }}
                  selected={selectedItem === i}
                  className={
                    i.toLowerCase() === selectedItem?.toLowerCase()
                      ? 'bg-white  '
                      : ' px-2 '
                  }
                >
                  <ListItemIcon
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' last:stroke-shadeOfBlack drawerActive    '
                        : ' drawerInactive '
                    }
                  >
                    {getIcon(i)}
                  </ListItemIcon>
                  <ListItemText
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' text-shadeOfBlack   '
                        : ' text-white'
                    }
                    primary={i}
                  />
                </ListItem>
              </Link>
            ))}{' '}
          {admin &&
            AdminTop.map((i, index) => (
              <Link
                style={{ width: '90%' }}
                to={`${match.url}/${i.toLowerCase()}`}
                className="flex items-center justify-center w-9/10"
              >
                <ListItem
                  button
                  disableRipple
                  key={i}
                  onClick={(event) => {
                    setActiveMenu(MenusTop[index]);
                    handleListItemClick(event, i);
                    ToggleDrawer();
                  }}
                  style={{
                    width: '100%',
                    borderRadius: '0.375rem',
                    backgroundColor:
                      `${i}`.toLowerCase() === `${selectedItem}`.toLowerCase()
                        ? 'white'
                        : 'inherit',
                  }}
                  selected={selectedItem === i}
                  className={
                    i.toLowerCase() === selectedItem?.toLowerCase()
                      ? 'bg-white  '
                      : ' px-2 '
                  }
                >
                  <ListItemIcon
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' last:stroke-shadeOfBlack drawerActive    '
                        : ' drawerInactive '
                    }
                  >
                    {getIcon(i)}
                  </ListItemIcon>
                  <ListItemText
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' text-shadeOfBlack   '
                        : ' text-white'
                    }
                    primary={i}
                  />
                </ListItem>
              </Link>
            ))}
          {!admin &&
            MenusBottom.map((i, index) => (
              <Link
                style={{ width: '90%' }}
                to={`${match.url}/${i.toLowerCase()}`}
                className="flex items-center justify-center w-9/10"
              >
                <ListItem
                  button
                  disableRipple
                  key={i}
                  onClick={(event) => {
                    setActiveMenu(MenusTop[index]);
                    handleListItemClick(event, i);
                    ToggleDrawer();
                  }}
                  style={{
                    width: '100%',
                    borderRadius: '0.375rem',
                    backgroundColor:
                      `${i}`.toLowerCase() === `${selectedItem}`.toLowerCase()
                        ? 'white'
                        : 'inherit',
                  }}
                  selected={selectedItem === i}
                  className={
                    i.toLowerCase() === selectedItem?.toLowerCase()
                      ? 'bg-white  '
                      : ' px-2 '
                  }
                >
                  <ListItemIcon
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' last:stroke-shadeOfBlack drawerActive    '
                        : ' drawerInactive '
                    }
                  >
                    {getIcon(i)}
                  </ListItemIcon>
                  <ListItemText
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' text-shadeOfBlack   '
                        : ' text-white'
                    }
                    primary={i}
                  />
                </ListItem>
              </Link>
            ))}{' '}
          {admin &&
            AdminBottom.map((i, index) => (
              <Link
                style={{ width: '90%' }}
                to={`${match.url}/${i.toLowerCase()}`}
                className="flex items-center justify-center w-9/10"
              >
                <ListItem
                  button
                  disableRipple
                  key={i}
                  onClick={(event) => {
                    setActiveMenu(MenusTop[index]);
                    handleListItemClick(event, i);
                    ToggleDrawer();
                  }}
                  style={{
                    width: '100%',
                    borderRadius: '0.375rem',
                    backgroundColor:
                      `${i}`.toLowerCase() === `${selectedItem}`.toLowerCase()
                        ? 'white'
                        : 'inherit',
                  }}
                  selected={selectedItem === i}
                  className={
                    i.toLowerCase() === selectedItem?.toLowerCase()
                      ? 'bg-white  '
                      : ' px-2 '
                  }
                >
                  <ListItemIcon
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' last:stroke-shadeOfBlack drawerActive    '
                        : ' drawerInactive '
                    }
                  >
                    {getIcon(i)}
                  </ListItemIcon>
                  <ListItemText
                    className={
                      i.toLowerCase() === selectedItem?.toLowerCase()
                        ? ' text-shadeOfBlack   '
                        : ' text-white'
                    }
                    primary={i}
                  />
                </ListItem>
              </Link>
            ))}
        </List>
      </Drawer>
    </>
  );
}

export default Input;
