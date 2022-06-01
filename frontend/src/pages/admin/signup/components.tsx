import React, { ReactElement } from 'react'
import Input from '@components/home/Input';
import Button from '@components/home/Button'
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io'
interface Props {
  onSubmit: React.FormEventHandler;
}


export const First = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Business Information</h1>
      <small className="subTitle">
        Please enter your Business Information</small>
      <div className="form-group flex flex-col">
        <Input label="Company’s Email Address" />
        <Input label="Company’s Legal Name" />
        <Input label="Business Address" type="address" />
        <div className="form-group flex flex-row justify-between
       half">
          <Input label="Create Password" type="password" />
          <Input label="Confirm Password" type="password" />
        </div>
        <div className="flex flex-row subForm">
          <small>Minimum of 8 characters</small>
          <small> One UPPERCASE character </small>
          <small>One Unique Character (e.g: !@#$%&*?)</small>
        </div>
        <div className="form-group flex flex-row half">
          <Input label="Phone Number" type="tel" />
        </div>
        <div className="w-full flex flex-row-reverse">
          <Button className="firstButton">
            Next
            <IoMdArrowForward />
          </Button>
        </div>
      </div>
    </form>
  )
}

export const Second = (props: Props) => {
  const { onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Account Information</h1>
      <small className="subTitle">
      Please enter your Account Information for tax and payment purposes</small>
      <div className="form-group flex flex-col">
        <Input label="Employer Identification Number (EIN) " />
        <Input label="Bank Account Number" />
        <Input label="Confirm Bank Account Number" type="address" />
        <Input label="Bank Routing Number" type="address" />
        <Input label="Confirm Bank Routing Number" type="address" />
       
        <div className="flex flex-row subForm mb-2">
          <small className="font-bold">By Creating your account, 
          you have read and 
            agree to our <Link to="/terms" className="text-blue-500">Terms and 
            Conditions</Link></small>
        </div>
        <div className="w-full flex flex-row-reverse justify-between">
          <Button className="secondButton font-bold">
          Save & Continue
          </Button>
          <Link className=" uppercase font-bold text-blue-500" to="">
            Previous Step
          </Link>
        </div>
        <div className="w-full flex flex-row-reverse justify-between">
          <Link to="/dashboard" className=" font-bold text-blue-500">
            Skip this Step for now
          </Link>
        </div>
      </div>
    </form>
  )
}