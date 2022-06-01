/* eslint-disable max-len */
import { styled } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 18,
  height: 18,
  boxShadow: 'none',
  backgroundColor: ' #fff',
  backgroundImage: 'url(../../assets/Rectangle.svg)',
  border: ' 1px solid rgba(16,22,26,.2)',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#fff',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: '#94a3b8',
  },
}));
export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'rgba(48, 191, 163, 1)',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 0 0'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'rgba(48, 191, 163, 1)',
  },
});

export const BlueCheckIcon = styled(BpIcon)({
  backgroundColor: '#477DFB',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 18,
    height: 18,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: 'rgba(12, 119, 248, 1)',
  },
});

export function BpCheckbox(props) {
  // console.log('props', props);
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: '#fff' },
      }}
      disableRipple
      color="primary"
      checkedIcon={<BlueCheckIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}
