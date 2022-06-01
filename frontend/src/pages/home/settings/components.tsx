import React, { ReactElement } from 'react'
import Input from '@components/home/Input';
import Button from '@components/home/Button'
import { Link } from 'react-router-dom';
interface Props {
    
}

export const Login = ({}: Props): ReactElement => {
    return (
        <form className="formHolder">
          <div className="header">
            <h1>Sign In</h1>
          </div>
          <div className="form-group">
            <Input label="Email"  />
          </div>
          <div className="form-group">
            <Input label="Password" type="password"  />
          </div>
          <div className="form-group">
            <Link to="" className="forgot">Forgot password?</Link>
          </div>
          <Button isActive={false}>Login</Button>
        </form>
    )
}

function Reset({}: Props): ReactElement {
    return (
        <form className="formHolder">
          <div className="header">
            <h1>Reset <br/>Password</h1>
            <small>Please enter your registered Email Address
to receive a verification code</small>
          </div>
          <div className="form-group">
            <Input label="Email Address"  />
          </div>
         
          <Button isActive={false}>Proceed</Button>
        </form>
    )
}


