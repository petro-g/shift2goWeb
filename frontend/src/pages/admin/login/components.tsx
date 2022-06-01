import React, { ReactElement } from 'react';
import Input from '@components/home/Input';
import Button from '@components/home/Button';
import CheckMark from '@assets/login/checkMark.svg'
import { Link } from 'react-router-dom';
interface Props {
  goToReset: () => void;
}

export const Login = ({ goToReset }: Props): ReactElement => {
  return (
    <form className="formHolder">
      <div className="header">
        <h1>Sign In</h1>
      </div>
      <div className="form-group">
        <Input label="Email" />
      </div>
      <div className="form-group">
        <Input label="Password" type="password" />
      </div>
      <div className="form-group">
        <button type="button" onClick={goToReset} className="forgot">
          Forgot password?
        </button>
      </div>
      <Button isActive={false}>Login</Button>
    </form>
  );
};

export const Reset = ({ goToReset }: Props): ReactElement => {
  return (
    <form className="formHolder">
      <div className="header">
        <h1>
          Reset <br />
          Password
        </h1>
        <small>
          Please enter your registered Email Address to receive a verification
          code
        </small>
      </div>
      <div className="form-group">
        <Input label="Email Address" />
      </div>

      <Button isActive={false}>Proceed</Button>
    </form>
  );
};

export const Verification = ({ goToReset }: Props): ReactElement => {
  return (
    <form className="formHolder verification">
      <button className="resend" type="button">
        Resend Code
      </button>
      <div className="header">
        <h1>
          Email <br />
          Verification
        </h1>
        <small>
          Please enter the 4 digit code sent to oyewusimicheal61@gmail.com
        </small>
      </div>
      <div className="form-group">
        <Input noLabel={true} maxLength={1} />
        <Input noLabel={true} maxLength={1} />
        <Input noLabel={true} maxLength={1} />
        <Input noLabel={true} maxLength={1} />
      </div>

      <Button isActive={false}>Proceed</Button>
    </form>
  );
};

export const SetPassword = ({ goToReset }: Props): ReactElement => {
  return (
    <form className="formHolder setPassword">
      <div className="header">
        <h1>
          Reset <br />
          Password
        </h1>

      </div>
      <div className="form-group">
        <Input label="New Password" type="password" />
        <Input label="Confirm Password" type="password" />
      </div>

      <Button isActive={false}>Proceed</Button>
    </form>
  );
};

export const ResetSuccessModal = ({ goToReset }: Props): ReactElement => {
  return (
    <div className="resetSuccess">
      <div className="ripple-1">
        <div className="ripple-2">
          <div className="ripple-3">
            <div className="ripple-4">
              <img src={CheckMark} />
            </div>
          </div>
        </div>
      </div>

      <h1>Password Reset
        Successful</h1>

    </div>
  );
};
